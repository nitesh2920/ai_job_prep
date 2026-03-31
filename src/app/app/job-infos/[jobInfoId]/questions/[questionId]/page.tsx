import { db } from "@/drizzle/db"
import { QuestionTable } from "@/drizzle/schema"
import { getQuestionIdTag } from "@/features/questions/dbCache"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { eq } from "drizzle-orm"
import { Loader2Icon } from "lucide-react"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { QuestionDetailClient } from "./_QuestionDetailClient"

export default async function QuestionDetailsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string; questionId: string }>
}) {
  const { questionId } = await params

  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="animate-spin size-24" />
        </div>
      }
    >
      <SuspendedComponent questionId={questionId} />
    </Suspense>
  )
}

async function SuspendedComponent({ questionId }: { questionId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  const question = await getQuestion(questionId, userId)
  if (question == null) return notFound()

  return <QuestionDetailClient question={question} />
}

async function getQuestion(id: string, userId: string) {
  "use cache"
  cacheTag(getQuestionIdTag(id))

  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.id, id),
    with: { jobInfo: { columns: { id: true, userId: true, name: true } } },
  })

  if (question == null || question.jobInfo.userId !== userId) return null
  return question
}
