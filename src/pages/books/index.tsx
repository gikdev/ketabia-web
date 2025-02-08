import pb from "@/lib/pb"
import { useNavigate } from "react-router"
import BookCard from "./book.card"
import { useBooksContext } from "./books.ctx"

export default function Books() {
  const { books, reloadBooks } = useBooksContext()
  const navigate = useNavigate()

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
      <h1 className="text-3xl mb-5 text-center font-bold">All Books</h1>
      <div className="flex gap-5 items-center justify-center flex-wrap max-w-[60rem] mx-auto">
        {books?.map(book => (
          <BookCard
            key={book.id}
            book={book}
            handleDeleteBtnClick={handleDeleteBtnClick}
            handleEditBtnClick={handleEditBtnClick}
          />
        ))}
      </div>
    </div>
  )
}
