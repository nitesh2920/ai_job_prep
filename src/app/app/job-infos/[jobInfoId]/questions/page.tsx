import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { JobInfoTable, QuestionTable } from "@/drizzle/schema"
import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { getQuestionJobInfoTag } from "@/features/questions/dbCache"
import { formatDateTime } from "@/lib/formatters"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, desc, eq } from "drizzle-orm"
import { ArrowRightIcon, Loader2Icon, PlusIcon } from "lucide-react"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { formatQuestionDifficulty } from "@/features/questions/formatters"

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>
}) {
  const { jobInfoId } = await params

  return (
    <div className="container py-4 gap-4 h-screen-header flex flex-col items-start">
      <JobInfoBackLink jobInfoId={jobInfoId} />

      <Suspense
        fallback={<Loader2Icon className="size-24 animate-spin m-auto" />}
      >
        <SuspendedPage jobInfoId={jobInfoId} />
      </Suspense>
    </div>
  )
}

async function SuspendedPage({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  const questions = await getQuestions(jobInfoId, userId)
  if (questions.length === 0) {
    return redirect(`/app/job-infos/${jobInfoId}/questions/new`)
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex gap-2 justify-between">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Technical Questions</h1>
        <Button asChild>
          <Link href={`/app/job-infos/${jobInfoId}/questions/new`}>
            <PlusIcon />
            New Question
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 has-hover:*:not-hover:opacity-70">
        <Link
          className="transition-opacity"
          href={`/app/job-infos/${jobInfoId}/questions/new`}
        >
          <Card className="h-full flex items-center justify-center border-dashed border-3 bg-transparent hover:border-primary/50 transition-colors shadow-none min-h-32">
            <div className="text-lg flex items-center gap-2">
              <PlusIcon className="size-6" />
              New Question
            </div>
          </Card>
        </Link>
        {questions.map(question => (
          <Link
            className="hover:scale-[1.02] transition-[transform_opacity]"
            href={`/app/job-infos/${jobInfoId}/questions/${question.id}`}
            key={question.id}
          >
            <Card className="h-full">
              <div className="flex items-center justify-between h-full">
                <CardHeader className="gap-1 flex-grow">
                  <CardTitle className="text-lg">
                    {formatDateTime(question.createdAt)}
                  </CardTitle>
                  <CardDescription>
                    {formatQuestionDifficulty(question.difficulty)} - {question.text.slice(0, 80)}...
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

async function getQuestions(jobInfoId: string, userId: string) {
  "use cache"
  cacheTag(getQuestionJobInfoTag(jobInfoId))
  cacheTag(getJobInfoIdTag(jobInfoId))

  const data = await db
    .select({
      id: QuestionTable.id,
      text: QuestionTable.text,
      difficulty: QuestionTable.difficulty,
      createdAt: QuestionTable.createdAt,
      updatedAt: QuestionTable.updatedAt,
      jobInfo: {
        userId: JobInfoTable.userId,
      },
    })
    .from(QuestionTable)
    .innerJoin(JobInfoTable, eq(QuestionTable.jobInfoId, JobInfoTable.id))
    .where(
      and(
        eq(QuestionTable.jobInfoId, jobInfoId),
        eq(JobInfoTable.userId, userId)
      )
    )
    .orderBy(desc(QuestionTable.updatedAt))

  return data
}
