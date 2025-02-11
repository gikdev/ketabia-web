import pb from "@/lib/pb"
import BookForm from "./book.form"
import { useBooksContext } from "./books.ctx"
import type { BookBase } from "./books.types"

export default function NewBook() {
  const { reloadBooks } = useBooksContext()

  const handleSubmit = (newBook: BookBase, cb: () => void) => {
    pb.collection("books")
      .create(newBook)
      .then(() => {
        reloadBooks()
        cb()
      })
      .catch(err => console.error("ERROR: ", err))
  }

  return (
    <div>
      <title>Ketabia | Add New Book</title>
      <h1 className="text-3xl mb-5 text-center font-bold">Add a New Book</h1>

      <BookForm handleSubmit={handleSubmit} mode="create" />
    </div>
  )
}
