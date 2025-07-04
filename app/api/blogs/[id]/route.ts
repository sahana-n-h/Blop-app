// app/api/blogs/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/blog"
import { getToken } from "next-auth/jwt"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const secret = process.env.NEXTAUTH_SECRET!

// ✅ FIXED GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    const posts = await getBlogPosts(100)
    const post = posts.find((p: any) => p.id === id || p._id?.toString() === id)

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching single post:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// ✅ FIXED DELETE handler
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req, secret })
  const { id } = params

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = token.sub

  try {
    const db = await connectToDatabase()
    const result = await db
      .collection("blogs")
      .deleteOne({ _id: new ObjectId(id), authorId: userId })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not allowed or post not found" }, { status: 403 })
    }

    return NextResponse.json({ success: true }) // Avoid frontend crash
  } catch (err) {
    console.error("Error deleting post:", err)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
