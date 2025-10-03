"use client"

import { cn } from "@/lib/utils"

interface RichTableProps {
  headers: string[]
  rows: string[][]
  caption?: string
  className?: string
}

export function RichTable({ 
  headers, 
  rows, 
  caption, 
  className 
}: RichTableProps) {
  return (
    <div className={cn("my-8 overflow-x-auto", className)}>
      <table className="w-full border-collapse border border-text-secondary/20 rounded-lg overflow-hidden">
        {caption && (
          <caption className="text-sm text-text-secondary mb-4 text-left font-medium">
            {caption}
          </caption>
        )}
        
        <thead>
          <tr className="bg-text-secondary/5">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-text border-b border-text-secondary/20"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "border-b border-text-secondary/10",
                rowIndex % 2 === 0 ? "bg-transparent" : "bg-text-secondary/2"
              )}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-sm text-text-secondary"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
