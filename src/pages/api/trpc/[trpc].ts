import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { object, z } from 'zod';

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  }).query('getPolls',{
      input:z.object({h:z.number()}).nullish(),resolve({input}){
          return {
              message:`el numero es: ${input?.h ?? 7}`
          }
      }
  })

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});