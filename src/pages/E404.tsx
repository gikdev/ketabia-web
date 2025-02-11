import { Link } from "react-router"

export default function E404() {
  return (
    <div className="text-center ">
      <title>Ketabia | 404 - Not Found</title>
      <h1 className="font-bold text-3xl">404; Not Found 😐</h1>
      <hr className="my-5 border-none bg-slate-06 h-0.5 max-w-96 mx-auto" />
      <p className="">
        Seems someone is <em>lost</em>... <br />
        Why not{" "}
        <Link to="/" className="border-b text-blue-11">
          Go Home?
        </Link>
      </p>
    </div>
  )
}
