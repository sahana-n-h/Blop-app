"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"

import { Eye, Plus, Save, X, Download } from "lucide-react"

export default function CreateBlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/create")
    }
  }, [status, router])

  if (status === "loading") return <p className="text-center p-10">Loading...</p>
  if (!session) return null

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    const postData = {
      title,
      content,
      category,
      tags,
      author: session.user?.name || "Anonymous",
      authorId: session.user?.id,
      createdAt: new Date().toISOString(),
      published: true,
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Failed to publish blog")
      }

      toast.success("Blog published successfully!")
      router.push("/blogs")
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const downloadAsJSON = () => {
    const blogData = {
      title,
      content,
      category,
      tags,
      createdAt: new Date().toISOString(),
      author: session.user?.name || "Anonymous",
    }

    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blogData, null, 2))
    const fileName = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", fileName)
    linkElement.click()
  }

  const downloadAsMarkdown = () => {
    const markdownContent = `# ${title}

**Category:** ${category}  
**Tags:** ${tags.join(", ")}  
**Created:** ${new Date().toLocaleDateString()}

---

${content}`

    const dataUri = "data:text/markdown;charset=utf-8," + encodeURIComponent(markdownContent)
    const fileName = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.md`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", fileName)
    linkElement.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            BlogSpace
          </Link>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button onClick={() => setShowDownloadDialog(true)} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
            <p className="text-gray-600">Welcome, {session.user?.name || "User"}</p>
          </div>

          {!isPreview ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Blog Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter blog title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your blog content here..."
                        className="min-h-[400px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">Technology</SelectItem>
                          <SelectItem value="webdev">Web Development</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Tags</Label>
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{title || "Untitled Post"}</CardTitle>
                <CardDescription>{category}</CardDescription>
                <div className="flex gap-2 mt-4 flex-wrap">
                  {tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose">
                  <p className="whitespace-pre-wrap">{content}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download & Publish</DialogTitle>
            <DialogDescription>Would you like to download your post before publishing?</DialogDescription>
          </DialogHeader>
          <div className="flex gap-4">
            <Button variant="outline" onClick={downloadAsJSON}>
              <Download className="h-4 w-4 mr-2" />
              JSON
            </Button>
            <Button variant="outline" onClick={downloadAsMarkdown}>
              <Download className="h-4 w-4 mr-2" />
              Markdown
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDownloadDialog(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Publish Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
