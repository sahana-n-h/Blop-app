"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, User, Clock, ArrowLeft, Share2 } from "lucide-react"

export default function BlogPostPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`)
        if (!res.ok) throw new Error("Post not found")
        const data = await res.json()
        setPost(data)
      } catch (err) {
        console.error("Error:", err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  const handleShare = () => {
    const shareURL = `${window.location.origin}/blog/${id}`
    navigator.clipboard.writeText(shareURL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return
  
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" })
  
      if (res.ok) {
        alert("Post deleted successfully!")
        window.location.href = "/blogs"
      } else {
        // Only try to parse JSON if there's something to parse
        const text = await res.text()
        const data = text ? JSON.parse(text) : {}
        alert(data.error || "Failed to delete post.")
      }
    } catch (err) {
      console.error("Delete failed:", err)
      alert("Something went wrong.")
    }
  }
  

  if (loading) return <p className="p-4 text-center">Loading...</p>

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link href="/blogs">
              <Button>Back to Blogs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blogs" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to All Blogs
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{post.category || "General"}</Badge>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  {copied ? "Link Copied!" : "Share"}
                </Button>

                {session?.user?.id === post.authorId && (
                  <Button variant="destructive" size="sm" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(post.date || post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag: string) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </header>

          <Separator className="mb-8" />

          <div className="prose prose-lg max-w-none whitespace-pre-wrap text-gray-800">
            {post.content}
          </div>

          <Separator className="my-8" />
        </article>
      </div>
    </div>
  )
}
