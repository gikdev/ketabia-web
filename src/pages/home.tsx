import config from "@/assets/config"

export default function Home() {
  return (
    <div className="text-center font-serif">
      <img src="/Ketabia.svg" className="max-w-64 mx-auto block mb-5" alt="" />
      <h1 className="font-bold text-3xl">
        📚 Welcome to <em>Ketabia</em>{" "}
        <code className="text-xs align-middle py-1 px-2 bg-slate-03 rounded-sm border border-slate-07">
          {config.version}
        </code>
      </h1>
      <hr className="my-5 border-none bg-slate-06 h-0.5 max-w-96 mx-auto" />
      <p className="">
        In <strong>Ketabia</strong>, you're able to manage your books; <br />
        Not only you'll be able to <em>track</em> them, but <br />
        also helps you <em>apply</em> what you read... ✅ <br />
        <br />
        Go on; read books, apply what you
        <br />
        learn, & change <strong>YOUR LIFE</strong> 😉
      </p>
    </div>
  )
}
