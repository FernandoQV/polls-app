import React from "react"
import { NextPage } from "next"
import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { trpc } from "@/utils/trpc"
interface Props {}
const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data: question, isLoading } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ])
  if (!isLoading && !question) {
    return <Heading>NO found id</Heading>
  }
  return <Heading>{question?.question}</Heading>
}
const QuestionPage: NextPage<Props> = ({}) => {
  const { query } = useRouter()
  const { id } = query
  if (!id || typeof id !== "string") {
    return <Heading>Not id</Heading>
  }
  return <QuestionPageContent id={id} />
}
export default QuestionPage
