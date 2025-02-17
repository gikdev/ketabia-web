import { useFetchCollectionItem } from "@/lib/hooks"
import pb from "@/lib/pb"
import { useNavigate, useParams } from "react-router"
import BookForm from "../../book.form"
import { useBooksContext } from "../../books.ctx"
import type { BookBase } from "../../books.types"

export default function EditBook() {
  const navigate = useNavigate()
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
        setTimeout(() => navigate("/books"), 1000)
      })
      .catch(err => console.error("ERROR: ", err))
  }

  return id && book ? (
    <div>
      <title>Ketabia | Edit Book</title>
      <h1 className="text-3xl mb-5 text-center font-bold">Edit "{book?.name}"</h1>

      <BookForm handleSubmit={handleSubmit} mode="edit" defaultBook={book} />
    </div>
  ) : (
    <p>Loading...</p>
  )
}
