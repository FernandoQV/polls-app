import React from "react"
import { GetServerSideProps, NextPage } from "next"
import { prismaAdmin } from "@/../db"
import { PollQestion } from "@prisma/client"
import { Center, Code, Heading } from "@chakra-ui/react"

interface Props {
questions:any
}
const HomePage: NextPage<Props> = ({questions}) => {
  
  
  return (
    <Center>
      <Heading>List of Questions</Heading>
      <Code>{questions}</Code>
      
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
