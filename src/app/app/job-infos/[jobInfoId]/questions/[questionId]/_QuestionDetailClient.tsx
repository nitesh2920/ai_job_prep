"use client"

import { BackLink } from "@/components/BackLink"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { QuestionTable } from "@/drizzle/schema"
import { Badge } from "@/components/ui/badge"
import { formatQuestionDifficulty } from "@/features/questions/formatters"

export function QuestionDetailClient({
  question,
}: {
  question: typeof QuestionTable.$inferSelect & {
    jobInfo: { id: string; name: string }
  }
}) {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[2000px] mx-auto flex-grow h-screen-header">
      <div className="container flex gap-4 mt-4 items-center justify-between">
        <div className="flex-grow basis-0">
          <BackLink href={`/app/job-infos/${question.jobInfo.id}/questions`}>
            {question.jobInfo.name} History
          </BackLink>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            {formatQuestionDifficulty(question.difficulty)}
          </Badge>
        </div>
        <div className="flex-grow hidden md:block" />
      </div>
      <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
        <ResizablePanel
          id="question-and-feedback"
          defaultSize={50}
          minSize={5}
          className="min-w-0"
        >
          <ResizablePanelGroup direction="vertical" className="flex-grow">
            <ResizablePanel id="question" defaultSize={50} minSize={5} className="min-h-0">
              <ScrollArea className="h-full w-full min-w-48 *:h-full">
                <MarkdownRenderer className="p-6 w-full">
                  {question.text}
                </MarkdownRenderer>
              </ScrollArea>
            </ResizablePanel>
            {question.feedback && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel id="feedback" defaultSize={50} minSize={5} className="min-h-0">
                  <ScrollArea className="h-full w-full min-w-20 *:h-full">
                    <MarkdownRenderer className="p-6 w-full">
                      {question.feedback}
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
            disabled
            value={question.answer ?? "No answer provided."}
            className="w-full flex-grow resize-none border-none rounded-none focus-visible:ring focus-visible:ring-inset !text-base p-6 bg-muted/20 cursor-default"
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
