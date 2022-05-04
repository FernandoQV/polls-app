import { prismaAdmin } from "@/../db"
import * as trpc from "@trpc/server"
export const questionRouter = trpc.router()
  .query("get-all", {
    async resolve() {
      const questions = await prismaAdmin.pollQestion.findMany()
      return questions
    },
  })



