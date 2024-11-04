'use client'
import {
	Avatar,
	Button,
	NavbarItem,
	Popover,
	PopoverTrigger,
	PopoverContent
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import * as actions from '@/actions'

export default function HeaderAuth() {
	const { status, data } = useSession()

	const renderAuthContent = () => {
		if (status === 'loading') return null

		if (data?.user) {
			return (
				<Popover placement="left">
					<PopoverTrigger>
						<Avatar src={data.user.image || ''} />
					</PopoverTrigger>
					<PopoverContent>
						<div className="p-4">
							<form action={actions.signOut}>
								<Button type="submit">Sign out</Button>
							</form>
						</div>
					</PopoverContent>
				</Popover>
			)
		}

		return (
			<>
				<NavbarItem>
					<form action={actions.signIn}>
						<Button type="submit" color="secondary" variant="bordered">
							Sign In
						</Button>
					</form>
				</NavbarItem>
				<NavbarItem>
					<form action={actions.signOut}>
						<Button type="submit" color="primary" variant="flat">
							Sign up
						</Button>
					</form>
				</NavbarItem>
			</>
		)
	}

	return renderAuthContent()
}
