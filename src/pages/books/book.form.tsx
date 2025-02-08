import { useObjectState } from "@/lib/hooks"
import { BookOpenText, CheckSquare, ListChecks, ShoppingCart } from "@phosphor-icons/react"
import { useEffect } from "react"
import type { BookBase } from "./books.types"
import { IconTag } from "./icon-tag.comp"

const DEFAULT_BOOK: BookBase = {
  name: "",
  authorName: "",
  hasBeenApplied: false,
  isBought: false,
  isConfirmed: false,
  isRead: false,
  rating: 0,
}

type FormMode = "view" | "create" | "edit"

interface Props {
  defaultBook?: BookBase
  mode: FormMode
  handleSubmit: (book: BookBase, cb: () => void) => void
}

export default function BookForm({
  handleSubmit,
  mode = "create",
  defaultBook = DEFAULT_BOOK,
}: Props) {
  const [book, alterBook, setBook] = useObjectState<BookBase>(defaultBook)

  useEffect(() => setBook(defaultBook), [defaultBook])

  return (
    <form
      className="flex flex-col gap-3 max-w-[50rem] mx-auto"
      onSubmit={e => {
        e.preventDefault()
        handleSubmit(book, () => {
          setBook(DEFAULT_BOOK)
        })
      }}
    >
      <input
        className="p-2 border border-slate-07 focus:border-slate-08"
        placeholder="Book Name:"
        value={book.name}
        onChange={e => alterBook("name", e.target.value)}
      />

      <input
        className="p-2 border border-slate-07 focus:border-slate-08"
        placeholder="Author Name:"
        value={book.authorName}
        onChange={e => alterBook("authorName", e.target.value)}
      />

      <input
        min={0}
        max={5}
        type="number"
        className="p-2 border border-slate-07 focus:border-slate-08"
        placeholder="Rating:"
        value={book.rating}
        onChange={e => alterBook("rating", Number(e.target.value))}
      />

      <div className="flex justify-center gap-2">
        <label className="cursor-pointer flex gap-1 items-center">
          <input
            className="hidden"
            type="checkbox"
            checked={book.isConfirmed}
            onChange={e => alterBook("isConfirmed", e.target.checked)}
          />

          <IconTag
            Icon={CheckSquare}
            text={book.isConfirmed ? "Verified" : "Unverified"}
            className={book.isConfirmed ? "bg-green-03 text-green-11" : ""}
          />
        </label>

        <label className="cursor-pointer flex gap-1 items-center">
          <input
            className="hidden"
            type="checkbox"
            checked={book.isBought}
            onChange={e => alterBook("isBought", e.target.checked)}
          />
          <IconTag
            Icon={ShoppingCart}
            text={book.isBought ? "Bought" : "Unpurchased"}
            className={book.isBought ? "bg-green-03 text-green-11" : ""}
          />
        </label>

        <label className="cursor-pointer flex gap-1 items-center">
          <input
            className="hidden"
            type="checkbox"
            checked={book.isRead}
            onChange={e => alterBook("isRead", e.target.checked)}
          />
          <IconTag
            Icon={BookOpenText}
            text={book.isRead ? "Read" : "Unread"}
            className={book.isRead ? "bg-green-03 text-green-11" : ""}
          />
        </label>

        <label className="cursor-pointer flex gap-1 items-center">
          <input
            className="hidden"
            type="checkbox"
            checked={book.hasBeenApplied}
            onChange={e => alterBook("hasBeenApplied", e.target.checked)}
          />
          <IconTag
            Icon={ListChecks}
            text={book.hasBeenApplied ? "Applied" : "Ingored"}
            className={book.hasBeenApplied ? "bg-green-03 text-green-11" : ""}
          />
        </label>
      </div>

      {["edit", "create"].includes(mode) && (
        <button
          className="bg-green-09 hover:bg-green-10 text-white cursor-pointer p-2 active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed"
          type="submit"
        >
          📚 {mode === "create" && "Create"} {mode === "edit" && "Edit"} Book
        </button>
      )}
    </form>
  )
}
