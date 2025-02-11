import { ccn } from "@/lib/cns"
import { useEffect, useState } from "react"
import type { BookWId } from "./books.types"

function useRandomItem<T>(items: T[]) {
  const [randomItem, setRandomItem] = useState<T | null>(items[0])

  useEffect(() => {
    if (items && items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length)
      setRandomItem(items[randomIndex])
    }
  }, [items])

  return randomItem
}

const BOOK_COVER_FONTS = ["font-mono", "font-serif", "font-serif", "font-sans", "font-sans"]

const BOOK_COVER_COLORS = [
  "bg-gray-08",
  "bg-mauve-08",
  "bg-slate-08",
  "bg-sage-08",
  "bg-olive-08",
  "bg-sand-08",
  "bg-tomato-08",
  "bg-red-08",
  "bg-ruby-08",
  "bg-crimson-08",
  "bg-pink-08",
  "bg-plum-08",
  "bg-purple-08",
  "bg-violet-08",
  "bg-iris-08",
  "bg-indigo-08",
  "bg-blue-08",
  "bg-cyan-08",
  "bg-teal-08",
  "bg-jade-08",
  "bg-green-08",
  "bg-grass-08",
  "bg-bronze-08",
  "bg-gold-08",
  "bg-brown-08",
  "bg-orange-08",
  "bg-amber-08",
  "bg-yellow-08",
  "bg-lime-08",
  "bg-mint-08",
  "bg-sky-08",
]

interface Props {
  book: BookWId
  className?: string
}

export default function BookCover({ book, className }: Props) {
  const bookCoverColor = useRandomItem(BOOK_COVER_COLORS)
  const bookCoverFont = useRandomItem(BOOK_COVER_FONTS)

  return (
    <div
      {...ccn(
        "w-full min-h-40 rounded-lg *:text-balance *:break-words *:truncate flex flex-col justify-center items-center text-center p-1 text-slate-12",
        bookCoverColor,
        bookCoverFont,
        className,
      )}
    >
      <p className="font-bold text-lg">{book.name}</p>
      <p className="italic">{book.authorName}</p>
    </div>
  )
}
