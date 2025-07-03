import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, User, Clock, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"

// Mock data - replace with actual database call
const getBlogPost = (id: string) => {
  const posts = {
    "1": {
      id: "1",
      title: "Getting Started with Next.js 15",
      content: `Next.js 15 brings exciting new features and improvements that make building React applications even more powerful and developer-friendly. In this comprehensive guide, we'll explore the key updates and how to leverage them in your projects.

## What's New in Next.js 15

The latest version of Next.js introduces several groundbreaking features:

### Enhanced Performance
Next.js 15 includes significant performance optimizations that reduce bundle sizes and improve loading times. The new compiler optimizations can reduce JavaScript bundle sizes by up to 30% in many cases.

### Improved Developer Experience
The development server now starts up to 50% faster, and hot module replacement (HMR) is more reliable than ever. Error messages have been enhanced to provide clearer guidance on fixing issues.

### New App Router Features
The App Router continues to evolve with new capabilities:
- Enhanced streaming support
- Improved error boundaries
- Better TypeScript integration
- New middleware capabilities

## Getting Started

To start using Next.js 15, you can create a new project with:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

### 1. Server Components by Default
Server Components are now the default in the App Router, providing better performance and SEO out of the box.

### 2. Enhanced Image Optimization
The Image component has been further optimized with better lazy loading and format detection.

### 3. Improved Caching
The new caching system provides more granular control over data fetching and revalidation.

## Conclusion

Next.js 15 represents a significant step forward in React development. Whether you're building a simple blog or a complex application, these new features will help you create better user experiences with less effort.

The framework continues to push the boundaries of what's possible with React, making it easier than ever to build fast, scalable applications.`,
      author: "John Doe",
      date: "2024-01-15",
      category: "Technology",
      readTime: "5 min read",
      tags: ["nextjs", "react", "web-development"],
      likes: 42,
      comments: 8,
    },
  }

  return posts[id as keyof typeof posts] || null
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
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
            <Link href="/blogs" className="text-gray-600 hover:text-gray-900 transition-colors">
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
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blogs" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Blogs
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    {post.likes}
                  </Button>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-gray-800">{post.content}</div>
            </div>

            <Separator className="my-8" />

            {/* Article Footer */}
            <footer className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like ({post.likes})
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comments ({post.comments})
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </footer>
          </article>

          {/* Author Card */}
          <Card className="mt-12">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{post.author}</h3>
                  <p className="text-gray-600 mb-4">
                    Passionate developer and writer sharing insights about modern web development, React, and the latest
                    technologies shaping our digital world.
                  </p>
                  <Button variant="outline" size="sm">
                    Follow Author
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-2">
                    Technology
                  </Badge>
                  <h3 className="font-semibold mb-2">React 18 Features You Should Know</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Explore the latest features in React 18 including concurrent rendering and automatic batching.
                  </p>
                  <Link href="/blog/2">
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-2">
                    Web Development
                  </Badge>
                  <h3 className="font-semibold mb-2">Modern CSS Techniques</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn about the latest CSS features and how to use them in your projects.
                  </p>
                  <Link href="/blog/3">
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
