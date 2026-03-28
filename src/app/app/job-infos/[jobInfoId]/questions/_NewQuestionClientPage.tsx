"use client"

import { BackLink } from "@/components/BackLink"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/ui/loading-swap"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  JobInfoTable,
  questionDifficulties,
  QuestionDifficulty,
} from "@/drizzle/schema"
import { formatQuestionDifficulty } from "@/features/questions/formatters"
import { useMemo, useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { errorToast } from "@/lib/errorToast"
import z from "zod"

type Status = "awaiting-answer" | "awaiting-difficulty" | "init"

export function NewQuestionClientPage({
  jobInfo,
}: {
  jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title">
}) {
  const [status, setStatus] = useState<Status>("init")
  const [answer, setAnswer] = useState<string | null>(null)
  const [loadingButton, setLoadingButton] = useState<
    QuestionDifficulty | "answer" | "skip" | null
  >(null)

  const {
    complete: generateQuestion,
    completion: question,
    setCompletion: setQuestion,
    isLoading: isGeneratingQuestion,
    data,
  } = useCompletion({
    api: "/api/ai/questions/generate-question",
    onFinish: () => {
      setStatus("awaiting-answer")
      setLoadingButton(null)
    },
    onError: error => {
      errorToast(error.message)
      setLoadingButton(null)
    },
  })

  const {
    complete: generateFeedback,
    completion: feedback,
    setCompletion: setFeedback,
    isLoading: isGeneratingFeedback,
  } = useCompletion({
    api: "/api/ai/questions/generate-feedback",
    onFinish: () => {
      setStatus("awaiting-difficulty")
      setLoadingButton(null)
    },
    onError: error => {
      errorToast(error.message)
      setLoadingButton(null)
    },
  })

  const questionId = useMemo(() => {
    const item = data?.at(-1)
    if (item == null) return null
    const parsed = z.object({ questionId: z.string() }).safeParse(item)
    if (!parsed.success) return null

    return parsed.data.questionId
  }, [data])

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[2000px] mx-auto flex-grow h-screen-header">
      <div className="container flex gap-4 mt-4 items-center justify-between">
        <div className="flex-grow basis-0">
          <BackLink href={`/app/job-infos/${jobInfo.id}`}>
            {jobInfo.name}
          </BackLink>
        </div>
        <Controls
          reset={() => {
            setStatus("init")
            setQuestion("")
            setFeedback("")
            setAnswer(null)
          }}
          disableAnswerButton={
            answer == null || answer.trim() === "" || questionId == null
          }
          status={status}
          loadingButton={loadingButton}
          generateFeedback={() => {
            if (answer == null || answer.trim() === "" || questionId == null)
              return

            setLoadingButton("answer")
            generateFeedback(answer?.trim(), { body: { questionId } })
          }}
          generateQuestion={difficulty => {
            setQuestion("")
            setFeedback("")
            setAnswer(null)
            setLoadingButton(difficulty)
            generateQuestion(difficulty, { body: { jobInfoId: jobInfo.id } })
          }}
        />
        <div className="flex-grow hidden md:block" />
      </div>
      <QuestionContainer
        question={question}
        feedback={feedback}
        answer={answer}
        status={status}
        setAnswer={setAnswer}
      />
    </div>
  )
}

function QuestionContainer({
  question,
  feedback,
  answer,
  status,
  setAnswer,
}: {
  question: string | null
  feedback: string | null
  answer: string | null
  status: Status
  setAnswer: (value: string) => void
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
      <ResizablePanel
        id="question-and-feedback"
        defaultSize={50}
        minSize={5}
        className="min-w-0"
      >
        <ResizablePanelGroup direction="vertical" className="flex-grow">
          <ResizablePanel id="question" defaultSize={25} minSize={5} className="min-h-0">
            <ScrollArea className="h-full w-full min-w-48 *:h-full">
              {status === "init" && question == null ? (
                <p className="text-base md:text-lg flex items-center justify-center h-full p-6 text-center">
                  Get started by selecting a question difficulty above.
                </p>
              ) : (
                question && (
                  <MarkdownRenderer className="p-6 w-full">
                    {question}
                  </MarkdownRenderer>
                )
              )}
            </ScrollArea>
          </ResizablePanel>
          {feedback && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel id="feedback" defaultSize={75} minSize={5} className="min-h-0">
                <ScrollArea className="h-full w-full min-w-20 *:h-full">
                  <MarkdownRenderer className="p-6 w-full">
                    {feedback}
                  </MarkdownRenderer>
                </ScrollArea>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel
        id="answer"
        defaultSize={50}
        minSize={5}
        className="flex flex-col min-w-0"
      >
        <Textarea
          disabled={status !== "awaiting-answer"}
          onChange={e => setAnswer(e.target.value)}
          value={answer ?? ""}
          placeholder="Type your answer here..."
          className="w-full flex-grow resize-none border-none rounded-none focus-visible:ring focus-visible:ring-inset !text-base p-6"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function Controls({
  status,
  loadingButton,
  disableAnswerButton,
  generateQuestion,
  generateFeedback,
  reset,
}: {
  disableAnswerButton: boolean
  status: Status
  loadingButton: QuestionDifficulty | "answer" | "skip" | null
  generateQuestion: (difficulty: QuestionDifficulty) => void
  generateFeedback: () => void
  reset: () => void
}) {
  return (
    <div className="flex gap-2">
      {status === "awaiting-answer" ? (
        <>
          <Button
            onClick={reset}
            disabled={loadingButton != null}
            variant="outline"
            size="sm"
          >
            Skip
          </Button>
          <Button
            onClick={generateFeedback}
            disabled={disableAnswerButton || loadingButton != null}
            size="sm"
          >
            <LoadingSwap isLoading={loadingButton === "answer"}>
              Answer
            </LoadingSwap>
          </Button>
        </>
      ) : (
        questionDifficulties.map(difficulty => (
          <Button
            key={difficulty}
            size="sm"
            disabled={loadingButton != null}
            onClick={() => generateQuestion(difficulty)}
          >
            <LoadingSwap isLoading={loadingButton === difficulty}>
              {formatQuestionDifficulty(difficulty)}
            </LoadingSwap>
          </Button>
        ))
      )}
    </div>
  )
}
