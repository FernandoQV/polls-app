import React from "react"
import { GetServerSideProps, NextPage } from "next"

import { Center, Code, Heading, List, ListItem } from "@chakra-ui/react"
import { trpc } from "@/utils/trpc"


const HomePage: NextPage = () => {
  
  const {data:questions,isLoading} = trpc.useQuery(['getAllQuestions'])
  if(isLoading || !questions)return <Heading>Loading...</Heading>
  return (
    <Center>
      <Heading>List of Questions</Heading>
      <List>
        {questions?.map(q=>(
          <ListItem key={q.id}>{q.question}</ListItem>
        ))}
      </List>
      
    </Center>
  )
}
export default HomePage


