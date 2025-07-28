"use client"

import { useEffect, useState } from "react"
import { Monaco } from "@/components/monaco-editor"
import { Button } from "@/components/ui/button"
import { Code, Copy, Check } from "lucide-react"
import { useParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface SharedSnippet {
  id: string
  title: string
  code: string
  language: string
  createdAt: string
}

export default function SharePage() {
  const params = useParams()
  const { t } = useLanguage()
  const [snippet, setSnippet] = useState<SharedSnippet | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (params.id) {
      const shareData = localStorage.getItem(`share-${params.id}`)
      if (shareData) {
        setSnippet(JSON.parse(shareData))
      }
    }
  }, [params.id])

  const copyCode = async () => {
    if (snippet) {
      await navigator.clipboard.writeText(snippet.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Code className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("sharePage.notFound")}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t("sharePage.notFoundDesc")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Code className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t("sharePage.title")}</h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t("sharePage.shared")}</div>
          </div>

          <Button variant="outline" size="sm" onClick={copyCode}>
            {copied ? <Check className="h-4 w-4 mr-1 text-green-600" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? t("sharePage.copied") : t("sharePage.copyCode")}
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{snippet.title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{t(`language.${snippet.language}`)}</span>
            <span>
              {t("sharePage.sharedOn")} {new Date(snippet.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="h-[calc(100vh-200px)] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <Monaco value={snippet.code} onChange={() => {}} language={snippet.language} />
        </div>
      </div>
    </div>
  )
}
