"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, User, ArrowRight, PenTool } from "lucide-react"

export default function HomePage() {
  const { data: session } = useSession()

  const [latestPosts, setLatestPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/blogs?limit=3")
        const data = await res.json()
        setLatestPosts(data)
      } catch (error) {
        console.error("Failed to load latest posts", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BlogSpace
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/blogs" className="text-gray-600 hover:text-gray-900 transition-colors">All Blogs</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
          </nav>
          <div className="flex items-center space-x-3">
            {/* <Link href={session ? "/create" : "/auth/signin?callbackUrl=/create"}>
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 bg-transparent">
                <PenTool className="h-4 w-4" />
                Write
              </Button>
            </Link> */}
            {!session ? (
              <Link href="/auth/signin">
                <Button size="sm">Sign In</Button>
              </Link>
            ) : (
              <Button size="sm" variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
                Log Out
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern platform for writers and readers. Share your thoughts, discover amazing content, and connect with a community of passionate storytellers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blogs">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Explore Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={session ? "/create" : "/auth/signin?callbackUrl=/create"}>
              <Button size="lg" variant="outline">
                Start Writing 
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts - Latest Blogs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most recent blog posts published on BlogSpace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post._id || post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category || "General"}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime || "5 min read"}</span>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt || post.content?.slice(0, 100)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{new Date(post.date || post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${post._id || post.id}`}>
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-blue-50 group-hover:text-blue-600">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <p className="text-blue-100 mb-2">Want to post a blog? Sign in or sign up to get started.</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Share Your Story?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who trust BlogSpace to share their ideas with the world.
          </p>
          {/* <Link href={session ? "/create" : "/auth/signin?callbackUrl=/create"}>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Join US!
            </Button>
          </Link> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                BlogSpace
              </h3>
              <p className="text-gray-400">
                A modern platform for sharing stories and connecting with readers worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blogs" className="hover:text-white">All Blogs</Link></li>
                <li><Link href="/create" className="hover:text-white">Write</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BlogSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
