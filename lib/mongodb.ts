// lib/mongodb.ts

import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {}

if (!uri) {
  throw new Error("❌ Missing MONGODB_URI in environment")
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// ✅ Helper to get DB directly
export async function connectToDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db() // optionally pass your DB name like: client.db("blogDB")
}
