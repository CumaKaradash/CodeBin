import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a database
// This is a simplified in-memory storage for demonstration
const snippets: any[] = []

export async function GET() {
  return NextResponse.json(snippets)
}

export async function POST(request: NextRequest) {
  const snippet = await request.json()

  // Add timestamp and ID if not provided
  const newSnippet = {
    ...snippet,
    id: snippet.id || Date.now().toString(),
    createdAt: snippet.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // Check if snippet exists (update) or create new
  const existingIndex = snippets.findIndex((s) => s.id === newSnippet.id)
  if (existingIndex >= 0) {
    snippets[existingIndex] = newSnippet
  } else {
    snippets.push(newSnippet)
  }

  return NextResponse.json(newSnippet)
}
