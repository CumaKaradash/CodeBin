"use client"

import { useState, useEffect } from "react"
import { Monaco } from "@/components/monaco-editor"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ShareDialog } from "@/components/share-dialog"
import { useLanguage } from "@/contexts/language-context"
import type { Snippet } from "@/types/snippet"

export default function CodeBinApp() {
  const { t } = useLanguage()
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Initialize with welcome message
  useEffect(() => {
    setCode(t("welcome.message"))
  }, [t])

  // Load snippets from localStorage on mount
  useEffect(() => {
    const savedSnippets = localStorage.getItem("codebin-snippets")
    if (savedSnippets) {
      setSnippets(JSON.parse(savedSnippets))
    }
  }, [])

  // Save snippets to localStorage whenever snippets change
  useEffect(() => {
    localStorage.setItem("codebin-snippets", JSON.stringify(snippets))
  }, [snippets])

  const handleSave = async () => {
    const snippet: Snippet = {
      id: currentSnippet?.id || Date.now().toString(),
      title: currentSnippet?.title || `${t("header.untitled")} ${t(`language.${language}`)}`,
      code,
      language,
      createdAt: currentSnippet?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (currentSnippet) {
      setSnippets((prev) => prev.map((s) => (s.id === snippet.id ? snippet : s)))
    } else {
      setSnippets((prev) => [...prev, snippet])
    }

    setCurrentSnippet(snippet)
  }

  const handleLoadSnippet = (snippet: Snippet) => {
    setCode(snippet.code)
    setLanguage(snippet.language)
    setCurrentSnippet(snippet)
    setIsSidebarOpen(false)
  }

  const handleNewSnippet = () => {
    setCode(t("new.message"))
    setLanguage("javascript")
    setCurrentSnippet(null)
  }

  const handleDeleteSnippet = (id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id))
    if (currentSnippet?.id === id) {
      handleNewSnippet()
    }
  }

  const handleShare = () => {
    setIsShareDialogOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        snippets={snippets}
        currentSnippet={currentSnippet}
        onLoadSnippet={handleLoadSnippet}
        onDeleteSnippet={handleDeleteSnippet}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          onSave={handleSave}
          onNew={handleNewSnippet}
          onShare={handleShare}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          currentSnippet={currentSnippet}
        />

        <div className="flex-1 p-4">
          <div className="h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <Monaco value={code} onChange={setCode} language={language} />
          </div>
        </div>
      </div>

      <ShareDialog
        isOpen={isShareDialogOpen}
        onClose={() => setIsShareDialogOpen(false)}
        snippet={currentSnippet}
        code={code}
        language={language}
      />
    </div>
  )
}
