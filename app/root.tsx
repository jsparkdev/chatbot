import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'
import { ClerkApp } from '@clerk/remix'
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export async function loader(args: LoaderFunctionArgs) {
	return rootAuthLoader(args)
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ko-KR'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

function App() {
	return <Outlet />
}

export default ClerkApp(App)
