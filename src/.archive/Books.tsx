import { useFetchCollection } from "@/lib/hooks"
import pb from "@/lib/pb"
import { type FieldValues, useForm } from "react-hook-form"

export default function Books() {
  const { register, handleSubmit, reset } = useForm()
  const [books, reloadBooks] = useFetchCollection<BookWId>("books")

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl pb-5 text-center font-black">Ketabia</h1>
      <div className="flex flex-col gap-2">
        {books?.map(b => (
          <div key={b.id} className="flex w-full gap-1">
            <p>
              📚 <strong>{b.name}</strong> <em>({b.authorName})</em>{" "}
            </p>
            <span className="flex gap-1">
              {b.isConfirmed ? "✅" : "⬛"}
              {b.isBought ? "✅" : "⬛"}
              {b.isRead ? "✅" : "⬛"}
              {b.hasBeenApplied ? "✅" : "⬛"}
            </span>
            <span className="ms-auto">
              {new Array(5).fill(true).map((_star, i) => (b.rating >= i + 1 ? "★" : "☆"))}
            </span>
            <button type="button" className="cursor-pointer" onClick={() => onDeleteBtnClick(b.id)}>
              ❌
            </button>
          </div>
        ))}
      </div>

      <div className="my-2 h-0.5 bg-slate-500 " />
      <h2 className="text-2xl mb-5 text-center font-bold">Add New Books!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          className="p-2 border border-slate-600"
          placeholder="Book Name:"
          {...register("name")}
        />
        <input
          className="p-2 border border-slate-600"
          placeholder="Author Name:"
          {...register("authorName")}
        />
        <input
          min={0}
          max={5}
          type="number"
          className="p-2 border border-slate-600"
          placeholder="Rating:"
          {...register("rating")}
        />
        <div className="flex flex-wrap gap-3">
          <label className="cursor-pointer flex gap-1 items-center">
            <input type="checkbox" {...register("isConfirmed")} />
            <span>It's Confirmed</span>
          </label>
          <label className="cursor-pointer flex gap-1 items-center">
            <input type="checkbox" {...register("isBought")} />
            <span>It's Bought</span>
          </label>
          <label className="cursor-pointer flex gap-1 items-center">
            <input type="checkbox" {...register("isRead")} />
            <span>It's Read</span>
          </label>
          <label className="cursor-pointer flex gap-1 items-center">
            <input type="checkbox" {...register("hasBeenApplied")} />
            <span>It's Been Applied</span>
          </label>
        </div>

        <button
          className="bg-slate-900 text-white cursor-pointer p-2 active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed"
          type="submit"
        >
          Add Book 📚
        </button>
      </form>
    </div>
  )
}
