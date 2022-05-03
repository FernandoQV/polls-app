import React from "react"
import { GetServerSideProps, NextPage } from "next"
import { prismaAdmin } from "@/../db"
import { PollQestion } from "@prisma/client"
import { Center, Code, Heading } from "@chakra-ui/react"

interface Props {
  //qestions:PollQestion[]|null
}
const HomePage: NextPage = (props: any) => {
  const a = JSON.parse(props.questions)
  console.log(a)

  return (
    <Center>
      <Heading>List of Questions</Heading>
      <Code>{props.questions}</Code>
      {/* {qestions?<List>
    {qestions.map(q=>(
    <ListItem key={q.id}>{q.question}</ListItem>
    ))}
  </List>:<Text>Not found</Text>} */}
    </Center>
  )
}
export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {
  const questions: PollQestion[] = await prismaAdmin.pollQestion.findMany()
  return {
    props: {
      questions: JSON.stringify(questions),
    },
  }
}
