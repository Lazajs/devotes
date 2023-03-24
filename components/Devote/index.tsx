import { TDevote } from "@/types";

export default function Devote ({data}: {data: TDevote}) {
  const {title, createdAt, content, userId, id} = data

  return (
    <div className="w-full border-[1px] relative border-primary mt-small p-small pt-medium">
      <p className="text-text font-heavy bg-background ml-small p-smaller absolute top-1">{title}</p>
      <span className="w-full overflow-hidden h-full max-h-[100px] border-[1px] border-primary block pt-medium p-small">
        <p className="text-small">{content}</p>
      </span>
    </div>
  )
}