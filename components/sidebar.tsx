"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, FileText, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Snippet } from "@/types/snippet"
import { cn } from "@/lib/utils"

interface SidebarProps {
  snippets: Snippet[]
  currentSnippet: Snippet | null
  onLoadSnippet: (snippet: Snippet) => void
  onDeleteSnippet: (id: string) => void
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ snippets, currentSnippet, onLoadSnippet, onDeleteSnippet, isOpen, onToggle }: SidebarProps) {
  const { t } = useLanguage()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("sidebar.snippets")}</h2>
          <Button variant="ghost" size="icon" onClick={onToggle} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {snippets.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t("sidebar.noSnippets")}</p>
              <p className="text-sm">{t("sidebar.createFirst")}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className={cn(
                    "group p-3 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700",
                    currentSnippet?.id === snippet.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      : "border-gray-200 dark:border-gray-700",
                  )}
                  onClick={() => onLoadSnippet(snippet)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{snippet.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {t(`language.${snippet.language}`)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(snippet.updatedAt)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSnippet(snippet.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  )
}
