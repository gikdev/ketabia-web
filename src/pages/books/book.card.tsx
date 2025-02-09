import {
  BookOpenText,
  CheckSquare,
  ListChecks,
  Pen,
  ShoppingCart,
  Star,
  Trash,
} from "@phosphor-icons/react"
import type { BookWId } from "./books.types"
import { IconTag } from "./icon-tag.comp"

const ICON_SIZE = 20
const ICON_WEIGHT = "duotone"

interface Props {
  book: BookWId
  handleDeleteBtnClick: (id: string) => void
  handleEditBtnClick?: (id: string) => void
}

export default function BookCard({ book, handleDeleteBtnClick, handleEditBtnClick }: Props) {
  const isCompleted = book.isRead && book.isBought && book.isConfirmed && book.hasBeenApplied

  return (
    <div className="flex flex-col gap-2 bg-slate-02 p-2 rounded-lg min-w-72">
      <p className="flex font-bold gap-1 text-lg items-center text-center mx-auto">
        {isCompleted && <CheckSquare weight="duotone" className="text-green-11" />} {book.name}
      </p>

      <p className="flex gap-1 italic items-center text-sm text-center mx-auto">
        {book.authorName}
      </p>

      <div className="grid grid-cols-2 gap-1">
        <IconTag
          Icon={CheckSquare}
          text={book.isConfirmed ? "Verified" : "Unverified"}
          className={book.isConfirmed ? "bg-green-03 text-green-11" : ""}
        />
        <IconTag
          Icon={ShoppingCart}
          text={book.isBought ? "Bought" : "Unpurchased"}
          className={book.isBought ? "bg-green-03 text-green-11" : ""}
        />
        <IconTag
          Icon={BookOpenText}
          text={book.isRead ? "Read" : "Unread"}
          className={book.isRead ? "bg-green-03 text-green-11" : ""}
        />
        <IconTag
          Icon={ListChecks}
          text={book.hasBeenApplied ? "Applied" : "Ingored"}
          className={book.hasBeenApplied ? "bg-green-03 text-green-11" : ""}
        />
      </div>

      <div className="flex justify-between items-center gap-1">
        <div className="flex">
          {new Array(book.rating).fill(true).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Star key={i} size={ICON_SIZE} weight="fill" color="goldenrod" />
          ))}
          {new Array(5 - book.rating).fill(true).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Star key={i} size={ICON_SIZE} />
          ))}
        </div>

        <button
          disabled={!handleEditBtnClick}
          type="button"
          className="ms-auto cursor-pointer p-1 hover:bg-slate-03 text-slate-11 rounded-lg disabled:bg-slate-04 disabled:text-slate-10 disabled:cursor-not-allowed"
          onClick={() => handleEditBtnClick?.(book.id)}
        >
          <Pen size={ICON_SIZE} weight={ICON_WEIGHT} />
        </button>
        <button
          type="button"
          className="cursor-pointer p-1 hover:bg-red-03 text-red-11 rounded-lg"
          onClick={() => handleDeleteBtnClick(book.id)}
        >
          <Trash size={ICON_SIZE} weight={ICON_WEIGHT} />
        </button>
      </div>
    </div>
  )
}
