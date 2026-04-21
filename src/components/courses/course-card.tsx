import Link from "next/link"
import { formatNOK } from "../../lib/utils"
import { Badge } from "../ui/badge"
import { BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline"

const levelLabels: Record<string, string> = {
  BEGINNER: "Nybegynner",
  INTERMEDIATE: "Videregående",
  ADVANCED: "Avansert",
}

const levelVariants: Record<string, "success" | "warning" | "secondary"> = {
  BEGINNER: "success",
  INTERMEDIATE: "warning",
  ADVANCED: "secondary",
}

interface CourseCardProps {
  course: {
    id: string
    slug: string
    title: string
    description: string
    price: number
    isFree: boolean
    level: string
    category: string
    thumbnail: string | null
    duration: number | null
    modules: Array<{
      lessons: Array<{ id: string }>
    }>
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <Link href={`/kurs/${course.slug}`} className="group block">
      <article className="h-full rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all hover:shadow-md hover:border-gray-300">
        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          {course.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpenIcon className="size-12 text-indigo-300" />
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={levelVariants[course.level] ?? "default"}>
              {levelLabels[course.level] ?? course.level}
            </Badge>
            {course.isFree && <Badge variant="success">Gratis</Badge>}
          </div>
          <h2 className="text-base font-semibold text-gray-950 group-hover:text-blue-700 transition-colors line-clamp-2">
            {course.title}
          </h2>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{course.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <BookOpenIcon className="size-3.5" />
                {lessonCount} leksjoner
              </span>
              {course.duration && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3.5" />
                  {course.duration} min
                </span>
              )}
            </div>
            <span className="text-sm font-semibold text-gray-950">
              {course.isFree ? "Gratis" : formatNOK(course.price)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
