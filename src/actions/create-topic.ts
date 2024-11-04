'use server'
import { z } from 'zod'
import { auth } from '@/auth'
import type { Topic } from '@prisma/client'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'

const regex = (key: string) => /^[a-z0-9-]+$/.test(key)
const createTopicSchema = z.object({
	name: z.string().min(3).refine(regex, {
		message: 'Must be lowercase letters or dashes without spaces'
	}),
	description: z.string().min(10)
})

// errors: {
// 		name: ['error'],
// 		description: ['error']
// }
interface CreateTopicFormState {
	errors: {
		name?: string[]
		description?: string[]
		_form?: string[]
	}
}
export async function createTopic(
	formState: CreateTopicFormState,
	formData: FormData
): Promise<CreateTopicFormState> {
	// await new Promise((resolve) => setTimeout(resolve, 2000))
	const result = createTopicSchema.safeParse({
		name: formData?.get('name'),
		description: formData?.get('description')
	})

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors
		}
	}

	const session = await auth()
	if (!session || !session.user) {
		return {
			errors: {
				_form: ['SIGN IN FIRST!!!']
			}
		}
	}

	let topic: Topic
	//handle every kind of error possible, eg failed to save to db, network error
	try {
		topic = await db.topic.create({
			data: {
				slug: result.data.name,
				description: result.data.description
			}
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				errors: {
					_form: [err.message]
				}
			}
		} else {
			return {
				errors: {
					_form: ['Oops! Something went wrong']
				}
			}
		}
	}
	revalidatePath('/')
	//redirects throws an error, will not execute anything else after this line
	redirect(paths.topicShow(topic.slug))
}
