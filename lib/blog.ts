import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export interface BlogPost {
  _id?: ObjectId
  title: string
  content: string
  excerpt: string
  author: string
  authorId: string
  category: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  published: boolean
  likes: number
  views: number
}

export async function createBlogPost(post: Omit<BlogPost, "_id" | "createdAt" | "updatedAt" | "likes" | "views">) {
  const client = await clientPromise
  const db = client.db("blogspace")

  const newPost: BlogPost = {
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    views: 0,
  }

  const result = await db.collection("posts").insertOne(newPost)
  return result
}

export async function getBlogPosts(limit = 10, skip = 0, category?: string) {
  const client = await clientPromise
  const db = client.db("blogspace")

  const filter = category ? { category, published: true } : { published: true }

  const posts = await db.collection("posts").find(filter).sort({ createdAt: -1 }).limit(limit).skip(skip).toArray()

  return posts
}

export async function getBlogPost(id: string) {
  const client = await clientPromise
  const db = client.db("blogspace")

  const post = await db.collection("posts").findOne({
    _id: new ObjectId(id),
    published: true,
  })

  if (post) {
    // Increment view count
    await db.collection("posts").updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } })
  }

  return post
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const client = await clientPromise
  const db = client.db("blogspace")

  const result = await db.collection("posts").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    },
  )

  return result
}

export async function deleteBlogPost(id: string) {
  const client = await clientPromise
  const db = client.db("blogspace")

  const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) })
  return result
}
