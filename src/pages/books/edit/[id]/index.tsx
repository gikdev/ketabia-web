import { useFetchCollectionItem } from "@/lib/hooks"
import pb from "@/lib/pb"
import { useParams } from "react-router"
import BookForm from "../../book.form"
import { useBooksContext } from "../../books.ctx"
import type { BookBase } from "../../books.types"

export default function EditBook() {
  const { reloadBooks } = useBooksContext()
  const { id } = useParams()
  const [book] = useFetchCollectionItem<BookBase>("books", id ?? "")

  const handleSubmit = (editedBook: BookBase, cb: () => void) => {
    pb.collection("books")
      .update(
        id ?? "",
        {},
        {
          body: JSON.stringify(editedBook),
        },
      )
      .then(() => {
        cb()
        reloadBooks()
      })
      .catch(err => console.error("ERROR: ", err))
  }

  return id ? (
    <div>
      <h1 className="text-3xl mb-5 text-center font-bold">Edit "{book?.name}"</h1>

      <BookForm handleSubmit={handleSubmit} mode="edit" defaultBook={book} />
    </div>
  ) : (
    <p>Loading...</p>
  )
}
