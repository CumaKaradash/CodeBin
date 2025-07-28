"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Plus, Share, Menu, Code } from "lucide-react"
import { SettingsDropdown } from "@/components/settings-dropdown"
import { useLanguage } from "@/contexts/language-context"
import type { Snippet } from "@/types/snippet"

interface HeaderProps {
  language: string
  onLanguageChange: (language: string) => void
  onSave: () => void
  onNew: () => void
  onShare: () => void
  onToggleSidebar: () => void
  currentSnippet: Snippet | null
}

export function Header({
  language,
  onLanguageChange,
  onSave,
  onNew,
  onShare,
  onToggleSidebar,
  currentSnippet,
}: HeaderProps) {
  const { t } = useLanguage()

  const languages = [
    { value: "javascript", label: t("language.javascript") },
    { value: "typescript", label: t("language.typescript") },
    { value: "python", label: t("language.python") },
    { value: "java", label: t("language.java") },
    { value: "cpp", label: t("language.cpp") },
    { value: "csharp", label: t("language.csharp") },
    { value: "php", label: t("language.php") },
    { value: "ruby", label: t("language.ruby") },
    { value: "go", label: t("language.go") },
    { value: "rust", label: t("language.rust") },
    { value: "html", label: t("language.html") },
    { value: "css", label: t("language.css") },
    { value: "json", label: t("language.json") },
    { value: "xml", label: t("language.xml") },
    { value: "sql", label: t("language.sql") },
  ]

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t("header.title")}</h1>
          </div>

          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            {currentSnippet ? currentSnippet.title : t("header.untitled")}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={onNew}>
            <Plus className="h-4 w-4 mr-1" />
            {t("header.new")}
          </Button>

          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-1" />
            {t("header.save")}
          </Button>

          <Button variant="default" size="sm" onClick={onShare}>
            <Share className="h-4 w-4 mr-1" />
            {t("header.share")}
          </Button>

          <SettingsDropdown />
        </div>
      </div>
    </header>
  )
}
