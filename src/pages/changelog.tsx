import changelog from "@/assets/changelog.json"

interface Changelog {
  [v: string]: string[]
}

export default function ChangeLog() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-3xl">Changelog</h1>
      <hr className="my-0 border-none bg-slate-06 h-0.5 max-w-96" />
      {Object.keys(changelog).map(k => (
        <div key={k}>
          <p className="font-bold text-lg">
            <code>{k}</code>:
          </p>
          <ul className="list-disc *:ms-8">
            {(changelog as Changelog)[k].map((change: string) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
