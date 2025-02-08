import { Book, PlusSquare } from "@phosphor-icons/react"
import { Link } from "react-router"

export default function Nav() {
  return (
    <nav className="px-5 py-2 flex gap-2 items-center">
      <Link to="/" className="font-bold text-lg me-auto hover:text-slate-12">
        Ketabia
      </Link>

      <Link
        to="/books"
        className="flex gap-0.5 items-center border-b-2 border-transparent hover:text-slate-12 hover:border-current"
      >
        <Book weight="duotone" size={20} />
        <span>Books</span>
      </Link>

      <Link
        to="/books/new"
        className="flex gap-0.5 items-center border-b-2 border-transparent hover:text-slate-12 hover:border-current"
      >
        <PlusSquare weight="duotone" size={20} />
        <span>Create</span>
      </Link>
    </nav>
  )
}
