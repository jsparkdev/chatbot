// import type { ActionFunctionArgs } from '@remix-run/cloudflare'
// import { Form, json, useActionData } from '@remix-run/react'
// import { useEffect, useState } from 'react'
// import MessageBox from '~/components/ui/MessageBox'
// import { Button } from '~/components/ui/button'
// import { Input } from '~/components/ui/input'

// export async function action({ context, request }: ActionFunctionArgs) {
// 	const formData = await request.formData()
// 	const message = formData.get('message')

// 	const messages = [
// 		{ role: 'system', content: 'You are a friendly assistant' },
// 		{
// 			role: 'user',
// 			content: message ?? 'What is LLaMA 3.1?',
// 		},
// 	]

// 	const response = await context.cloudflare.env.AI.run(
// 		// @ts-ignore
// 		'@cf/meta/llama-3.1-8b-instruct',
// 		{ messages },
// 	)

// 	return json({ response })
// }

// export default function ChatBot() {
// 	const [query, setQuery] = useState('')
// 	const [messages, setMessages] = useState<string[]>([])
// 	const actionData = useActionData<typeof action>()

// 	useEffect(() => {
// 		setMessages((prev) =>
// 			[...prev, String(actionData?.response.response)].filter(
// 				(msg) => msg !== 'undefined',
// 			),
// 		)
// 	}, [actionData])

// 	return (
// 		<div className='px-10 py-6'>
// 			<h1 className='font-bold text-xl mb-4'>ChatBot</h1>
// 			<div className='flex flex-col gap-4 mb-10'>
// 				{messages.map((msg, index) => (
// 					<MessageBox key={index.toString()}>{msg}</MessageBox>
// 				))}
// 			</div>
// 			<Form
// 				method='post'
// 				className='flex gap-4'
// 				onSubmit={() => {
// 					setQuery('')
// 				}}
// 			>
// 				<Input
// 					type='text'
// 					name='message'
// 					value={query}
// 					onChange={(event) => setQuery(event.currentTarget.value)}
// 					placeholder='메시지를 입력하세요...'
// 				/>
// 				<Button type='submit'>전송</Button>
// 			</Form>
// 		</div>
// 	)
// }
