import { useFetchCollection } from "@/lib/hooks"
import { createContext, useContext } from "react"
import type { BookWId } from "./books.types"

interface BooksContext {
  books: BookWId[]
  reloadBooks: () => void
}

const defaultBooksContextValue: BooksContext = {
  books: [],
  reloadBooks: () => {},
}

const BooksContext = createContext(defaultBooksContextValue)

interface Props {
  children: React.ReactNode
}

export function BooksProvider({ children }: Props) {
  const [books, reloadBooks] = useFetchCollection<BookWId>("books")

  const value = { books, reloadBooks }

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}

export const useBooksContext = () => useContext(BooksContext)
