import type { Role } from '~/types'
import { cn } from '~/utils/misc'

function Who({ speaker }: { speaker: Role }) {
	return <p className='font-bold mb-2'>{speaker === 'ai' ? 'AI' : 'You'}</p>
}

export default function MessageBox({
	children,
	speaker,
}: { children: React.ReactNode; speaker: Role }) {
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
