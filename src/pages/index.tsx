import React, { useRef } from "react"
import { NextPage } from "next"

import {
  Center,
  FormLabel,
  Heading,
  HStack,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react"
import { trpc } from "@/utils/trpc"

const QuestionCreator = () => {
  const client =trpc.useContext()
  const { mutate,isLoading  } = trpc.useMutation("questions.create",{
    onSuccess:(data)=>{
      console.log(data);
      client.invalidateQueries("questions.get-all")
    }
  })
  const ref = useRef<HTMLInputElement>(null)
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        const question = ref.current?.value as string
        if (!question) return
        mutate({ question })
      }}
    >
      <Input type={"text"} ref={ref} placeholder="Add question" />
      {isLoading? <Text>Cargando</Text>:<FormLabel>Todo ok</FormLabel>}
    </form>
  )
}
const HomePage: NextPage = () => {
  const { data: questions, isLoading } = trpc.useQuery(["questions.get-all"])
  if (isLoading || !questions) return <Heading>Loading...</Heading>

  return (
    <VStack w="full">
      <Heading>List of Questions</Heading>
      <List spacing={4} flexDir="row" w={"full"}>
        {questions?.map((q) => (
          <ListItem key={q.id}>
            <HStack padding={4} rounded={4} border="1px solid #333">
              <Text>{q.id}</Text>
              <Text>{q.question}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
      <QuestionCreator />
    </VStack>
  )
}
export default HomePage
