import Link from 'next/link'
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/react'
import HeaderAuth from './header-auth'
import styles from './header.module.scss'
import SearchInput from './search-input'
import { Suspense } from 'react'

export default function Header() {
	return (
		<Navbar className="shadow mb-6">
			<NavbarBrand>
				<NavbarContent justify="start">
					<Link className={styles.discuss} href="/">
						Discuss
					</Link>
				</NavbarContent>
				<NavbarContent justify="center">
					<NavbarItem>
						{/* search */}
						{/* Generating static pages (3/6) [= ] ⨯ useSearchParams() should be
						wrapped in a suspense boundary at page "/404". Read more:
						https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout */}
						<Suspense>
							<SearchInput />
						</Suspense>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify="end">
					<HeaderAuth />
				</NavbarContent>
			</NavbarBrand>
		</Navbar>
	)
}
