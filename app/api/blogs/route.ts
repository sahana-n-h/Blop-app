import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { createBlogPost, getBlogPosts } from "@/lib/blog"

const secret = process.env.NEXTAUTH_SECRET!

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret })

  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { title, content, category, tags } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const excerpt = content.substring(0, 200) + "..."

    const newPost = {
      title,
      content,
      excerpt,
      author: token.name || "Anonymous",
      authorId: token.id ?? " ",
      category: category || "Uncategorized",
      tags: tags || [],
      published: true,
    }

    const result = await createBlogPost(newPost)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
