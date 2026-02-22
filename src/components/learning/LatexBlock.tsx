import { useEffect, useRef } from 'react'
import katex from 'katex'

interface LatexBlockProps {
  latex: string
  displayMode?: boolean
  className?: string
}

export function LatexBlock({
  latex,
  displayMode = false,
  className = '',
}: LatexBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          trust: true,
          strict: false,
        })
      } catch (error) {
        console.error('KaTeX render error:', error)
        if (containerRef.current) {
          containerRef.current.textContent = latex
        }
      }
    }
  }, [latex, displayMode])

  return <div ref={containerRef} className={className} />
}
