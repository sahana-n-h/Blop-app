// MongoDB setup script
// Run this in MongoDB Compass or MongoDB Shell

// Create database and collections
const blogspace = db.getSiblingDB("blogspace")
const db = blogspace

// Create posts collection with indexes
db.createCollection("posts")
db.posts.createIndex({ title: "text", content: "text", tags: "text" })
db.posts.createIndex({ category: 1 })
db.posts.createIndex({ authorId: 1 })
db.posts.createIndex({ createdAt: -1 })
db.posts.createIndex({ published: 1 })

// Create users collection with indexes
db.createCollection("users")
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ username: 1 }, { unique: true })

// Insert sample blog posts
db.posts.insertMany([
  {
    title: "Getting Started with Next.js 15",
    content: "Next.js 15 brings exciting new features and improvements...",
    excerpt:
      "Learn the latest features and improvements in Next.js 15, including enhanced performance and new developer tools.",
    author: "John Doe",
    authorId: "user1",
    category: "Technology",
    tags: ["nextjs", "react", "web-development"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    published: true,
    likes: 42,
    views: 156,
  },
  {
    title: "The Future of Web Development",
    content: "Exploring emerging trends and technologies...",
    excerpt:
      "Exploring emerging trends and technologies that will shape the future of web development in 2024 and beyond.",
    author: "Jane Smith",
    authorId: "user2",
    category: "Web Development",
    tags: ["trends", "future", "technology"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    published: true,
    likes: 38,
    views: 203,
  },
  {
    title: "Building Scalable Applications",
    content: "Best practices and architectural patterns...",
    excerpt:
      "Best practices and architectural patterns for building applications that can scale with your growing user base.",
    author: "Mike Johnson",
    authorId: "user3",
    category: "Architecture",
    tags: ["architecture", "scalability", "best-practices"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    published: true,
    likes: 67,
    views: 289,
  },
])

console.log("Database setup completed!")
