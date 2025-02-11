import { Book } from "@phosphor-icons/react"
import { Link } from "react-router"

export default function Nav() {
  return (
    <nav className="bg-slate-02 px-5 py-2 flex gap-2 items-center">
      <Link
        to="/"
        className="flex items-center gap-1 font-bold text-lg me-auto hover:text-slate-12"
      >
        <img src="/Ketabia.svg" className="size-6" alt="" />
        <span className="">Ketabia</span>
      </Link>

      <Link
        to="/books"
        className="flex gap-0.5 items-center border-b-2 border-transparent hover:text-slate-12 hover:border-current"
      >
        <Book weight="duotone" size={20} />
        <span>Books</span>
      </Link>
    </nav>
  )
}
