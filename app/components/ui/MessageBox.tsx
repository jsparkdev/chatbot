import { cn } from '~/utils/misc'

function Who({ speaker }: { speaker: 'ai' | 'user' }) {
	return <p className='font-bold mb-2'>{speaker === 'ai' ? 'AI' : 'You'}</p>
}

export default function MessageBox({
	children,
	speaker,
}: { children: React.ReactNode; speaker: 'user' | 'ai' }) {
	return (
		<div
			className={cn(
				'p-4 border rounded-xl',
				speaker === 'ai' ? 'border-sky-400' : 'border-red-400',
			)}
		>
			<Who speaker={speaker} />
			{children}
		</div>
	)
}
