import { prismaAdmin } from "@/../db"
import * as trpc from "@trpc/server"
import { z } from "zod"
export const questionRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      const questions = await prismaAdmin.pollQestion.findMany()
      return questions
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const question = await prismaAdmin.pollQestion.findFirst({
        where: {
          id: { equals: input.id },
        },
      })
      return question
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(150),
    }),
    resolve: async ({ input }) => {
      return await prismaAdmin.pollQestion.create({
        data: {
          question: input.question,
        },
      })
    },
  })
