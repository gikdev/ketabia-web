import { ccn } from "@/lib/cns"
import type { Icon } from "@phosphor-icons/react"

interface ITProps {
  className?: string
  text: string
  Icon: Icon
}

export function IconTag({ Icon, text, className }: ITProps) {
  return (
    <span
      {...ccn(
        "transition-all bg-slate-03 inline-flex gap-1 items-center py-1 px-2 rounded-sm",
        className,
      )}
    >
      <Icon size={16} weight="duotone" />
      <span className="text-xs">{text}</span>
    </span>
  )
}
