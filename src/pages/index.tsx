import { Route, Routes } from "react-router"
import Base from "./base.layout"
import Books from "./books"
import { BooksProvider } from "./books/books.ctx"
import EditBook from "./books/edit/[id]"
import NewBook from "./books/new"
import Home from "./home"

export default function Pages() {
  return (
    <BooksProvider>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="books">
            <Route index element={<Books />} />
            <Route path="new" element={<NewBook />} />
            <Route path="edit/:id" element={<EditBook />} />
          </Route>
        </Route>
      </Routes>
    </BooksProvider>
  )
}
