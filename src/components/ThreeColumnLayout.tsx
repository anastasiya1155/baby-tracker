import { useRef, useEffect, useCallback, ReactNode, Children } from 'react'

interface ThreeColumnLayoutProps {
  children: ReactNode
}

/**
 * A 3-column layout where content flows across columns like a newspaper.
 * Each column is independently scrollable but scrolling is synchronized
 * so they act as one continuous scroll.
 */
export function ThreeColumnLayout({ children }: ThreeColumnLayoutProps) {
  const column1Ref = useRef<HTMLDivElement>(null)
  const column2Ref = useRef<HTMLDivElement>(null)
  const column3Ref = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  const syncScroll = useCallback((sourceIndex: number) => {
    if (isScrollingRef.current) return
    isScrollingRef.current = true

    const columns = [column1Ref.current, column2Ref.current, column3Ref.current]
    const source = columns[sourceIndex]
    if (!source) return

    // Calculate total virtual scroll across all columns
    const getMaxScroll = (col: HTMLDivElement | null) =>
      col ? Math.max(0, col.scrollHeight - col.clientHeight) : 0

    // Calculate current virtual position (accumulated scroll from previous columns + current)
    let virtualPosition = source.scrollTop
    for (let i = 0; i < sourceIndex; i++) {
      virtualPosition += getMaxScroll(columns[i])
    }

    // Sync other columns based on virtual position
    columns.forEach((col, index) => {
      if (index === sourceIndex || !col) return

      const colMaxScroll = getMaxScroll(col)

      // Calculate where this column starts in virtual space
      let colStart = 0
      for (let i = 0; i < index; i++) {
        colStart += getMaxScroll(columns[i])
      }
      const colEnd = colStart + colMaxScroll

      if (virtualPosition <= colStart) {
        col.scrollTop = 0
      } else if (virtualPosition >= colEnd) {
        col.scrollTop = colMaxScroll
      } else {
        col.scrollTop = virtualPosition - colStart
      }
    })

    // Reset scrolling flag after a short delay
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current)
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false
    }, 50)
  }, [])

  useEffect(() => {
    const columns = [
      { ref: column1Ref, index: 0 },
      { ref: column2Ref, index: 1 },
      { ref: column3Ref, index: 2 }
    ]

    const handlers = columns.map(({ ref, index }) => {
      const handler = () => syncScroll(index)
      ref.current?.addEventListener('scroll', handler, { passive: true })
      return { ref, handler }
    })

    return () => {
      handlers.forEach(({ ref, handler }) => {
        ref.current?.removeEventListener('scroll', handler)
      })
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [syncScroll])

  // Split children into 3 groups for each column
  const childArray = Children.toArray(children)
  const itemsPerColumn = Math.ceil(childArray.length / 3)

  const column1Items = childArray.slice(0, itemsPerColumn)
  const column2Items = childArray.slice(itemsPerColumn, itemsPerColumn * 2)
  const column3Items = childArray.slice(itemsPerColumn * 2)

  return (
    <>
      {/* Desktop: 3-column grid */}
      <div className="three-column-layout h-[calc(100vh-180px)] hidden md:grid md:grid-cols-3 gap-4">
        <div
          ref={column1Ref}
          className="column overflow-y-auto scrollbar-thin pr-2"
        >
          {column1Items}
        </div>
        <div
          ref={column2Ref}
          className="column overflow-y-auto scrollbar-thin px-2"
        >
          {column2Items}
        </div>
        <div
          ref={column3Ref}
          className="column overflow-y-auto scrollbar-thin pl-2"
        >
          {column3Items}
        </div>
      </div>

      {/* Mobile: single column */}
      <div className="md:hidden">
        {children}
      </div>
    </>
  )
}
