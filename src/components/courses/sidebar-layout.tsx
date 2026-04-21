"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { Bars3Icon, XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon as CheckCircleSolid } from "@heroicons/react/24/solid"

interface SidebarModule {
  id: string
  title: string
  lessons: Array<{
    id: string
    slug: string
    title: string
    isPreview: boolean
  }>
}

interface SidebarLayoutProps {
  courseSlug: string
  modules: SidebarModule[]
  completedLessonIds: string[]
  children: React.ReactNode
  courseTitle: string
}

export function SidebarLayout({
  courseSlug,
  modules,
  completedLessonIds,
  children,
  courseTitle,
}: SidebarLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const sidebar = (
    <div className="space-y-8 p-6">
      <div>
        <Link
          href={`/kurs/${courseSlug}`}
          className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-950 transition-colors"
        >
          &larr; Tilbake til kurs
        </Link>
        <h2 className="mt-3 text-sm font-semibold text-gray-950 line-clamp-2">{courseTitle}</h2>
      </div>

      {modules.map((module) => (
        <div key={module.id}>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            {module.title}
          </h3>
          <ul className="space-y-1 border-l border-gray-200">
            {module.lessons.map((lesson) => {
              const href = `/kurs/${courseSlug}/leksjoner/${lesson.slug}`
              const isActive = pathname === href
              const isCompleted = completedLessonIds.includes(lesson.id)

              return (
                <li key={lesson.id}>
                  <Link
                    href={href}
                    className={cn(
                      "-ml-px flex items-center gap-2 border-l pl-4 py-1.5 text-sm transition-colors",
                      isActive
                        ? "border-gray-950 font-medium text-gray-950"
                        : "border-transparent text-gray-600 hover:border-gray-400 hover:text-gray-950"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircleSolid className="size-4 shrink-0 text-green-500" />
                    ) : (
                      <CheckCircleIcon className="size-4 shrink-0 text-gray-300" />
                    )}
                    <span className="line-clamp-2">{lesson.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-gray-200 bg-white lg:block overflow-y-auto">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto">
            <div className="flex justify-end p-4">
              <button onClick={() => setSidebarOpen(false)} aria-label="Lukk meny">
                <XMarkIcon className="size-6 text-gray-600" />
              </button>
            </div>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-30 flex items-center gap-4 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} aria-label="Vis innholdsfortegnelse">
            <Bars3Icon className="size-6 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-950 truncate">{courseTitle}</span>
        </div>
        {children}
      </div>
    </div>
  )
}
