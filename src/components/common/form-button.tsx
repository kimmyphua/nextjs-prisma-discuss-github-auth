'use client'

import { useFormStatus } from 'react-dom'

import React from 'react'
import { Button } from '@nextui-org/react'

export default function FormButton({
	children
}: {
	children: React.ReactNode
}) {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" isLoading={pending}>
			{children}
		</Button>
	)
}
