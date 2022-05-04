import React from "react"
import { GetServerSideProps, NextPage } from "next"
import { prismaAdmin } from "@/../db"
import { PollQestion } from "@prisma/client"
import { Center, Code, Heading } from "@chakra-ui/react"
import { trpc } from "@/utils/trpc"

interface Props {
questions:any
}
const HomePage: NextPage<Props> = ({questions}) => {
  
  const fde=trpc.useQuery(['getPolls',{h:45}])
  console.log(fde);
  
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
