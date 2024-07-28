import type { ActionFunctionArgs } from '@remix-run/cloudflare'
import { Form, type MetaFunction, json, useActionData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import MessageBox from '~/components/ui/MessageBox'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { Message, Role } from '~/types'

export async function action({ context, request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const message = formData.get('message')

	const messages = [
		{
			role: 'system',
			content: 'You can only speak English.',
		},
		{
			role: 'user',
			content: message ?? 'What is LLaMA 3.1?',
		},
	]

	const { response } = (await context.cloudflare.env.AI.run(
		// @ts-ignore
		'@cf/meta/llama-3.1-8b-instruct',
		{ messages },
	)) as { response: string }

	return json({
		responseObject: {
			message: response,
			role: 'ai',
		},
	})
}

export default function ChatBot() {
	const [query, setQuery] = useState('')
	const [messages, setMessages] = useState<Message[]>([])
	const actionData = useActionData<typeof action>()

	useEffect(() => {
		setMessages((prev) => {
			return [
				...prev,
				{
					role: actionData?.responseObject.role as Role,
					message: actionData?.responseObject.message as string,
				},
			].filter((msg) => msg.message)
		})
	}, [actionData])

	return (
		<div className='sm:px-10 px-4 py-6'>
			<h1 className='font-bold text-2xl mb-4'>LLaMA 3.1 ChatBot</h1>
			<div className='flex flex-col gap-4 mb-6'>
				{messages.map((msg, index) => (
					<MessageBox speaker={msg.role} key={`${new Date()}${index}`}>
						{msg.message}
					</MessageBox>
				))}
			</div>
			<Form
				method='post'
				className='flex gap-4'
				onSubmit={() => {
					setMessages((prev) => [...prev, { role: 'user', message: query }])
					setQuery('')
				}}
			>
				<Input
					type='text'
					name='message'
					value={query}
					onChange={(event) => setQuery(event.currentTarget.value)}
					placeholder='Enter your message...'
				/>
				<Button type='submit' disabled={query.length === 0}>
					전송
				</Button>
			</Form>
		</div>
	)
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'LLaMA 3.1 Chatbot' },
		{
			name: 'description',
			content: 'LLaMA 3.1 Chatbot',
		},
	]
}
