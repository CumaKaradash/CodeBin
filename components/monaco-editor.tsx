"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface MonacoProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function Monaco({ value, onChange, language }: MonacoProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const monacoRef = useRef<any>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.src = "https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js"
      script.onload = () => {
        // @ts-ignore
        window.require.config({ paths: { vs: "https://unpkg.com/monaco-editor@0.44.0/min/vs" } })
        // @ts-ignore
        window.require(["vs/editor/editor.main"], () => {
          if (editorRef.current && !monacoRef.current) {
            // @ts-ignore
            monacoRef.current = window.monaco.editor.create(editorRef.current, {
              value,
              language,
              theme: theme === "dark" ? "vs-dark" : "vs",
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              wordWrap: "on",
              lineNumbers: "on",
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
            })

            monacoRef.current.onDidChangeModelContent(() => {
              onChange(monacoRef.current.getValue())
            })
          }
        })
      }
      document.head.appendChild(script)

      return () => {
        if (monacoRef.current) {
          monacoRef.current.dispose()
          monacoRef.current = null
        }
      }
    }
  }, [])

  useEffect(() => {
    if (monacoRef.current && monacoRef.current.getValue() !== value) {
      monacoRef.current.setValue(value)
    }
  }, [value])

  useEffect(() => {
    if (monacoRef.current) {
      // @ts-ignore
      const model = monacoRef.current.getModel()
      // @ts-ignore
      window.monaco.editor.setModelLanguage(model, language)
    }
  }, [language])

  // Update theme when it changes
  useEffect(() => {
    if (monacoRef.current) {
      // @ts-ignore
      window.monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs")
    }
  }, [theme])

  return <div ref={editorRef} className="w-full h-full" />
}
