import { NuqsAdapter } from "nuqs/adapters/react-router/v7"
import { Route, Routes } from "react-router"
import E404 from "./E404"
import Base from "./base.layout"
import Books from "./books"
import EditBook from "./books/[id]/edit"
import { BooksProvider } from "./books/books.ctx"
import NewBook from "./books/new"
import ChangeLog from "./changelog"
import Home from "./home"

export default function Pages() {
  return (
    <NuqsAdapter>
      <BooksProvider>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={<Home />} />
            <Route path="changelog" element={<ChangeLog />} />
            <Route path="books">
              <Route index element={<Books />} />
              <Route path="new" element={<NewBook />} />
              <Route path=":id">
                <Route path="edit" element={<EditBook />} />
              </Route>
            </Route>
            <Route path="*" element={<E404 />} />
          </Route>
        </Routes>
      </BooksProvider>
    </NuqsAdapter>
  )
}
