import { UserButton } from '@clerk/remix'
import { getAuth } from '@clerk/remix/ssr.server'
import { type LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'

export const loader = async (args: LoaderFunctionArgs) => {
	const { userId } = await getAuth(args)
	if (!userId) {
		return redirect('/sign-in')
	}
	return {}
}

export default function Index() {
	return (
		<div>
			<h1>Index route</h1>
			<UserButton />
		</div>
	)
}
