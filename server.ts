import { initTRPC } from '@trpc/server'
import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { z } from 'zod'
// import express, { Request, Response } from 'express'

export type AppRouter = typeof appRouter

// const app = express()

// app.get('/', (req: Request, res: Response) => {
// 	res.send('Hello World!\n')
// })

// const server = app.listen(3000, () => console.log('Server is running on port 3000'))

const t = initTRPC.create()

const publicProcedure = t.procedure
const router = t.router

const appRouter = t.router({
	greet: t.procedure
	.input((val: unknown) => {
		if(typeof val === 'string') return val;
		throw new TypeError(`invalid input: ${typeof val}`)
	})
	.query(({ input }) => ({ greeting: `hello, ${input}!`})),
	goodbye: t.procedure
	.input(z.string())
	.query(({input}) => ({ sayGoodbye: `goodbye, ${input} McFuck`})),
})

createHTTPServer({
	router: appRouter,
	createContext() { return {}; }
}).listen(3000)

