import { Outlet } from "react-router"
import Nav from "./nav.comp"

export default function Base() {
  return (
    <div className="">
      <Nav />

      <main className="p-5">
        <Outlet />
      </main>
    </div>
  )
}
