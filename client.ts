import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from './server'

const client = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({ url: 'http://localhost:3000', })
	],
})

//us them properly
console.log( await client.greet.query('Ros') )
console.log( await client.goodbye.query('Ros') )

/* force errors */
try{
	//@ts-ignore
	const res = await client.greet.query(123)
}catch(e:any){
	console.log('using typeof validation')
	console.log(e.name, ':', e.message)
}
try{
	//@ts-ignore
	const res = await client.goodbye.query(123)
}catch(e:any){
	console.log('using zod')
	console.log(e.name, ':', e.message)
}


