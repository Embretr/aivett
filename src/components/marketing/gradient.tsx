import { cn } from "../../lib/utils"

export function Gradient({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-blue-100 from-[28%] via-indigo-100 via-[70%] to-violet-100",
        className
      )}
    />
  )
}

export function GradientBackground() {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={cn(
          "absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0",
          "bg-[conic-gradient(from_182deg_at_top,_#3b82f6_0deg,_#6366f1_32.2deg,_#8b5cf6_82.2deg,_#6366f1_142.2deg,_#3b82f6_180deg,_#3b82f6_282.2deg,_#6366f1_360deg)]",
          "[--gradient-angle:182deg] blur-3xl opacity-20"
        )}
      />
    </div>
  )
}
