import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, User, ArrowRight, Search } from "lucide-react"

// Mock data - replace with actual database calls
const allPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    excerpt:
      "Learn the latest features and improvements in Next.js 15, including enhanced performance and new developer tools.",
    author: "John Doe",
    date: "2024-01-15",
    category: "Technology",
    readTime: "5 min read",
    tags: ["nextjs", "react", "web-development"],
  },
  {
    id: "2",
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging trends and technologies that will shape the future of web development in 2024 and beyond.",
    author: "Jane Smith",
    date: "2024-01-12",
    category: "Web Development",
    readTime: "8 min read",
    tags: ["trends", "future", "technology"],
  },
  {
    id: "3",
    title: "Building Scalable Applications",
    excerpt:
      "Best practices and architectural patterns for building applications that can scale with your growing user base.",
    author: "Mike Johnson",
    date: "2024-01-10",
    category: "Architecture",
    readTime: "12 min read",
    tags: ["architecture", "scalability", "best-practices"],
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt:
      "A comprehensive guide to understanding the differences between CSS Grid and Flexbox and when to use each layout method.",
    author: "Sarah Wilson",
    date: "2024-01-08",
    category: "Design",
    readTime: "6 min read",
    tags: ["css", "layout", "design"],
  },
  {
    id: "5",
    title: "Introduction to TypeScript",
    excerpt:
      "Get started with TypeScript and learn how it can improve your JavaScript development experience with static typing.",
    author: "David Brown",
    date: "2024-01-05",
    category: "Technology",
    readTime: "10 min read",
    tags: ["typescript", "javascript", "programming"],
  },
  {
    id: "6",
    title: "Modern Authentication Patterns",
    excerpt:
      "Explore modern authentication patterns including OAuth, JWT, and session management for secure web applications.",
    author: "Emily Davis",
    date: "2024-01-03",
    category: "Security",
    readTime: "15 min read",
    tags: ["authentication", "security", "oauth"],
  },
]

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            BlogSpace
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/blogs" className="text-gray-900 font-medium">
              All Blogs
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/create">
              <Button variant="outline" size="sm">
                Write
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
          <p className="text-xl text-gray-600">Discover amazing content from our community of writers</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input placeholder="Search blog posts..." className="pl-10" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="ghost" className="w-full group-hover:bg-blue-50 group-hover:text-blue-600">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  )
}
