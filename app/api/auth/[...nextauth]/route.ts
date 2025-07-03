import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { createBlogPost, getBlogPosts } from "@/lib/blog"

const secret = process.env.NEXTAUTH_SECRET!

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const skip = Number.parseInt(searchParams.get("skip") || "0")
  const category = searchParams.get("category") || undefined

  try {
    const posts = await getBlogPosts(limit, skip, category)
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

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
      authorId: token.id,
      category: category || "Uncategorized",
      tags: tags || [],
      published: true,
    }

    const result = await createBlogPost(newPost)
    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("Publish error:", error)
    return NextResponse.json({ error: "Failed to publish blog post" }, { status: 500 })
  }
}
