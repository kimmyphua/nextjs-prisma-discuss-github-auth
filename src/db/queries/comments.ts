import type { Comment } from '@prisma/client'
import { db } from '@/db'
import { cache } from 'react'

export type CommentWithAuthor = Comment & {
	user: { name: string | null; image: string | null }
}

// cache req so will not fetch multiple same queries (consolidate)
export const fetchCommentsByPostId = cache((postId: string) => {
	console.log({ postId })

	return db.comment.findMany({
		where: { postId },
		include: {
			user: {
				select: {
					name: true,
					image: true
				}
			}
		}
	})
})
