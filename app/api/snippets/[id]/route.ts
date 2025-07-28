import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a database
const snippets: any[] = []

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const snippet = snippets.find((s) => s.id === params.id)

  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 })
  }

  return NextResponse.json(snippet)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const index = snippets.findIndex((s) => s.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 })
  }

  snippets.splice(index, 1)
  return NextResponse.json({ success: true })
}
