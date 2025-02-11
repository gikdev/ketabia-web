import { ccn } from "@/lib/cns"
import { Star } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

interface SIProps {
  className?: string
  value?: number
  onChange?: (v: number) => void
}

export default function StarsInput({ className, value: defaultValue = 0, onChange }: SIProps) {
  const [value, _setValue] = useState(defaultValue)

  useEffect(() => _setValue(defaultValue), [defaultValue])

  const setValue = (v: number) => {
    _setValue(v)
    onChange?.(v)
  }

  return (
    <div {...ccn("flex gap-1", className)}>
      <button
        className="cursor-pointer"
        type="button"
        onClick={() => setValue(value === 1 ? 0 : 1)}
      >
        <Star
          size={36}
          weight={value >= 1 ? "fill" : "regular"}
          className={value >= 1 ? "text-amber-11" : "text-slate-11"}
        />
      </button>
      <button className="cursor-pointer" type="button" onClick={() => setValue(2)}>
        <Star
          size={36}
          weight={value >= 2 ? "fill" : "regular"}
          className={value >= 2 ? "text-amber-11" : "text-slate-11"}
        />
      </button>
      <button className="cursor-pointer" type="button" onClick={() => setValue(3)}>
        <Star
          size={36}
          weight={value >= 3 ? "fill" : "regular"}
          className={value >= 3 ? "text-amber-11" : "text-slate-11"}
        />
      </button>
      <button className="cursor-pointer" type="button" onClick={() => setValue(4)}>
        <Star
          size={36}
          weight={value >= 4 ? "fill" : "regular"}
          className={value >= 4 ? "text-amber-11" : "text-slate-11"}
        />
      </button>
      <button className="cursor-pointer" type="button" onClick={() => setValue(5)}>
        <Star
          size={36}
          weight={value >= 5 ? "fill" : "regular"}
          className={value >= 5 ? "text-amber-11" : "text-slate-11"}
        />
      </button>
    </div>
  )
}
