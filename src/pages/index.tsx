import React from "react"
import { NextPage } from "next"

import { Center, Heading, List, ListItem } from "@chakra-ui/react"
import { trpc } from "@/utils/trpc"


const HomePage: NextPage = () => {
  
  const {data:questions,isLoading} = trpc.useQuery(["questions.get-all"])
  console.log(questions);
  if(isLoading || !questions)return <Heading>Loading...</Heading>
  console.log(questions);
  
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


