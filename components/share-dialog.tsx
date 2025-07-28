"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Snippet } from "@/types/snippet"

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  snippet: Snippet | null
  code: string
  language: string
}

export function ShareDialog({ isOpen, onClose, snippet, code, language }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")
  const { t } = useLanguage()

  const generateShareUrl = async () => {
    const shareId = Math.random().toString(36).substring(2, 15)
    const url = `${window.location.origin}/share/${shareId}`
    setShareUrl(url)

    const shareData = {
      id: shareId,
      title: snippet?.title || t("header.untitled"),
      code,
      language,
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(`share-${shareId}`, JSON.stringify(shareData))
  }

  const copyToClipboard = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    await generateShareUrl()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("share.title")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">{t("share.titleLabel")}</Label>
            <Input id="title" value={snippet?.title || t("header.untitled")} readOnly className="mt-1" />
          </div>

          <div>
            <Label htmlFor="language">{t("share.languageLabel")}</Label>
            <Input id="language" value={t(`language.${language}`)} readOnly className="mt-1" />
          </div>

          <div>
            <Label htmlFor="preview">{t("share.preview")}</Label>
            <Textarea
              id="preview"
              value={code.substring(0, 200) + (code.length > 200 ? "..." : "")}
              readOnly
              className="mt-1 font-mono text-sm"
              rows={4}
            />
          </div>

          {!shareUrl ? (
            <Button onClick={handleShare} className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t("share.generateLink")}
            </Button>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="share-url">{t("share.shareUrl")}</Label>
              <div className="flex gap-2">
                <Input id="share-url" value={shareUrl} readOnly className="flex-1" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500">{t("share.linkDescription")}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
