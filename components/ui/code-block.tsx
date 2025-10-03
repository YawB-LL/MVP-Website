"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

// Simple syntax highlighting for common languages
const highlightCode = (code: string, language: string): string => {
  if (language === "javascript" || language === "typescript") {
    return code
      .replace(/(\b(?:const|let|var|function|class|interface|type|enum)\b)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(\b(?:if|else|for|while|return|import|export|from|async|await)\b)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(["'`][^"'`]*["'`])/g, '<span class="text-green-400">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
  }
  
  if (language === "python") {
    return code
      .replace(/(\b(?:def|class|if|else|elif|for|while|import|from|return|try|except|finally|with|as)\b)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(["'`][^"'`]*["'`])/g, '<span class="text-green-400">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-gray-500">$1</span>')
  }
  
  if (language === "css") {
    return code
      .replace(/([.#]?[\w-]+)\s*{/g, '<span class="text-blue-400">$1</span> {')
      .replace(/([\w-]+)\s*:/g, '<span class="text-green-400">$1</span>:')
      .replace(/(["'`][^"'`]*["'`])/g, '<span class="text-yellow-400">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500">$1</span>')
  }
  
  if (language === "html") {
    return code
      .replace(/(<[^>]+>)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(["'`][^"'`]*["'`])/g, '<span class="text-green-400">$1</span>')
  }
  
  return code
}

export function CodeBlock({ 
  code, 
  language, 
  filename, 
  showLineNumbers = false, 
  className 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }
  
  const highlightedCode = highlightCode(code, language)
  const lines = code.split('\n')
  
  return (
    <div className={cn("relative group bg-gray-900 rounded-lg overflow-hidden border border-gray-700", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-sm text-gray-300 font-medium">{filename}</span>
          )}
          <span className="text-xs text-gray-400 uppercase tracking-wide">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Code Content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          {showLineNumbers ? (
            <div className="flex">
              <div className="flex-shrink-0 pr-4 text-gray-500 select-none">
                {lines.map((_, index) => (
                  <div key={index} className="leading-relaxed">
                    {String(index + 1).padStart(2, ' ')}
                  </div>
                ))}
              </div>
              <div 
                className="flex-1 text-gray-100"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>
          ) : (
            <code 
              className="text-gray-100"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
        </pre>
      </div>
    </div>
  )
}
