import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import "./styles.css"
import Pages from "./pages"

const container = document.getElementById("root")!
const root = createRoot(container)
root.render(
  <StrictMode>
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </StrictMode>,
)
