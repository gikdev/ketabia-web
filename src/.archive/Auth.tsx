import { useForceUpdate, useLogin, useLogout } from "@/lib/hooks"
import pb from "@/lib/pb"
import { type FieldValues, useForm } from "react-hook-form"

export default function Auth() {
  const { register, handleSubmit, reset } = useForm()
  const { login, isLoading } = useLogin()
  const logout = useLogout()
  const forceUpdate = useForceUpdate()

  const isLoggedIn = pb.authStore.isValid

  const onSubmit = (data: FieldValues) => login(data.email, data.password, reset, console.warn)
  const onLogout = () =>
    logout(() => {
      forceUpdate()
      reset()
    })

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl mb-5 text-center font-black">PocketBase Auth!</h1>

      {isLoading && <p>Loading...</p>}

      {isLoggedIn ? (
        <>
          <p>Logged in: {isLoggedIn.toString()}</p>
          <p>Name: {pb.authStore.record?.name}</p>
          <p>Email: {pb.authStore.record?.email}</p>

          <button
            onClick={onLogout}
            className="bg-slate-900 mt-5 text-white cursor-pointer py-2 px-5 active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed"
          >
            Log Out
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            className="p-2 border border-slate-600"
            type="text"
            placeholder="Email:"
            {...register("email")}
          />
          <input
            className="p-2 border border-slate-600"
            type="password"
            placeholder="Password:"
            {...register("password")}
          />

          <button
            className="bg-slate-900 text-white cursor-pointer p-2 active:scale-95 disabled:bg-slate-700 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      )}
    </div>
  )
}
