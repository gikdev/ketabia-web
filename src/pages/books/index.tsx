import pb from "@/lib/pb"
import { parseAsStringEnum, useQueryState } from "nuqs"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import BookCard from "./book.card"
import { useBooksContext } from "./books.ctx"

enum BooksListSortingMode {
  NameAsc = "name",
  AuthorAsc = "author-name",
  StarsMost = "stars",
}

export default function Books() {
  const { books, reloadBooks } = useBooksContext()
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsStringEnum<BooksListSortingMode>(Object.values(BooksListSortingMode)).withDefault(
      BooksListSortingMode.NameAsc,
    ),
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (sortBy === BooksListSortingMode.NameAsc) return reloadBooks("name")
    if (sortBy === BooksListSortingMode.AuthorAsc) return reloadBooks("authorName")
    if (sortBy === BooksListSortingMode.StarsMost) return reloadBooks("-rating")
  }, [sortBy, reloadBooks])

  const handleEditBtnClick = (id: string) => navigate(`/books/edit/${id}`)

  const handleDeleteBtnClick = (id: string) => {
    const isConfirmed = confirm("U sure?")
    if (!isConfirmed) return

    pb.collection("books")
      .delete(id)
      .then(() => reloadBooks())
      .catch(err => console.error("ERROR: ", err))
  }

  return (
    <div>
      <h1 className="text-3xl mb-3 text-center font-bold">All Books</h1>

      <form className="mb-5 flex items-center justify-center" onSubmit={e => e.preventDefault()}>
        <select
          value={sortBy}
          onChange={e => {
            setSortBy(e.target.value as BooksListSortingMode)
            reloadBooks(e.target.value as BooksListSortingMode)
          }}
          className="bg-slate-03 border border-slate-07 focus:bg-slate-04 focus:border-slate-08 p-2 rounded-md"
        >
          <option value={BooksListSortingMode.NameAsc}>Sort by name</option>
          <option value={BooksListSortingMode.AuthorAsc}>Sort by author name</option>
          <option value={BooksListSortingMode.StarsMost}>Sort by stars</option>
        </select>
      </form>

      <div className="flex gap-5 items-center justify-center flex-wrap max-w-[60rem] mx-auto">
        {books?.map(book => (
          <BookCard
            key={book.id}
            book={book}
            handleEditBtnClick={handleEditBtnClick}
            handleDeleteBtnClick={handleDeleteBtnClick}
          />
        ))}
      </div>
    </div>
  )
}
