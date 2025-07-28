"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "tr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  tr: {
    // Header
    "header.title": "KodKutusu",
    "header.untitled": "Başlıksız",
    "header.new": "Yeni",
    "header.save": "Kaydet",
    "header.share": "Paylaş",

    // Sidebar
    "sidebar.snippets": "Kod Parçacıkları",
    "sidebar.noSnippets": "Henüz kod parçacığı yok",
    "sidebar.createFirst": "İlk kod parçacığınızı oluşturun!",

    // Languages
    "language.javascript": "JavaScript",
    "language.typescript": "TypeScript",
    "language.python": "Python",
    "language.java": "Java",
    "language.cpp": "C++",
    "language.csharp": "C#",
    "language.php": "PHP",
    "language.ruby": "Ruby",
    "language.go": "Go",
    "language.rust": "Rust",
    "language.html": "HTML",
    "language.css": "CSS",
    "language.json": "JSON",
    "language.xml": "XML",
    "language.sql": "SQL",

    // Share Dialog
    "share.title": "Kod Parçacığını Paylaş",
    "share.titleLabel": "Başlık",
    "share.languageLabel": "Dil",
    "share.preview": "Kod Önizleme",
    "share.generateLink": "Paylaşım Bağlantısı Oluştur",
    "share.shareUrl": "Paylaşım URL'si",
    "share.linkDescription": "Bu bağlantıya sahip herkes kod parçacığınızı görüntüleyebilir",

    // Share Page
    "sharePage.title": "KodKutusu",
    "sharePage.shared": "Paylaşılan Kod Parçacığı",
    "sharePage.notFound": "Kod Parçacığı Bulunamadı",
    "sharePage.notFoundDesc": "Paylaşılan kod parçacığı bulunamadı.",
    "sharePage.copyCode": "Kodu Kopyala",
    "sharePage.copied": "Kopyalandı!",
    "sharePage.sharedOn": "Paylaşım tarihi",

    // Welcome message
    "welcome.message":
      "// KodKutusu'na Hoş Geldiniz\n// Kodunuzu buraya yazmaya başlayın...\n\nconsole.log('Merhaba Dünya!');",
    "new.message": "// Yeni kod parçacığı\n// Kodunuzu buraya yazmaya başlayın...",

    // Settings
    "settings.language": "Dil",
    "settings.theme": "Tema",
    "settings.light": "Açık",
    "settings.dark": "Koyu",
    "settings.system": "Sistem",
  },
  en: {
    // Header
    "header.title": "CodeBin",
    "header.untitled": "Untitled",
    "header.new": "New",
    "header.save": "Save",
    "header.share": "Share",

    // Sidebar
    "sidebar.snippets": "Snippets",
    "sidebar.noSnippets": "No snippets yet",
    "sidebar.createFirst": "Create your first snippet!",

    // Languages
    "language.javascript": "JavaScript",
    "language.typescript": "TypeScript",
    "language.python": "Python",
    "language.java": "Java",
    "language.cpp": "C++",
    "language.csharp": "C#",
    "language.php": "PHP",
    "language.ruby": "Ruby",
    "language.go": "Go",
    "language.rust": "Rust",
    "language.html": "HTML",
    "language.css": "CSS",
    "language.json": "JSON",
    "language.xml": "XML",
    "language.sql": "SQL",

    // Share Dialog
    "share.title": "Share Code Snippet",
    "share.titleLabel": "Title",
    "share.languageLabel": "Language",
    "share.preview": "Code Preview",
    "share.generateLink": "Generate Share Link",
    "share.shareUrl": "Share URL",
    "share.linkDescription": "Anyone with this link can view your code snippet",

    // Share Page
    "sharePage.title": "CodeBin",
    "sharePage.shared": "Shared Snippet",
    "sharePage.notFound": "Snippet Not Found",
    "sharePage.notFoundDesc": "The shared code snippet could not be found.",
    "sharePage.copyCode": "Copy Code",
    "sharePage.copied": "Copied!",
    "sharePage.sharedOn": "Shared on",

    // Welcome message
    "welcome.message": "// Welcome to CodeBin\n// Start typing your code here...\n\nconsole.log('Hello, World!');",
    "new.message": "// New snippet\n// Start typing your code here...",

    // Settings
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("codebin-language") as Language
    if (savedLanguage && (savedLanguage === "tr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("codebin-language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
