"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
	LayoutDashboard,
	BookOpen,
	Brain,
	FolderOpen,
	Users,
	Sparkles,
	Settings,
	ChevronRight,
	Zap,
	ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
	label: string
	href: string
	icon: React.ComponentType<any>
	badge?: string
}

interface NavSection {
	title: string
	items: NavItem[]
	defaultOpen?: boolean
}

const NAV_SECTIONS: NavSection[] = [
	{
		title: "Principal",
		defaultOpen: true,
		items: [
			{
				label: "Dashboard",
				href: "/dashboard",
				icon: LayoutDashboard,
			},
		],
	},
	{
		title: "Aprendizaje",
		defaultOpen: true,
		items: [
			{
				label: "Apuntes",
				href: "/dashboard/notes",
				icon: BookOpen,
			},
			{
				label: "Grafo Mental",
				href: "/dashboard/graph",
				icon: Brain,
			},
			{
				label: "Cursos",
				href: "/dashboard/courses",
				icon: FolderOpen,
			},
		],
	},
	{
		title: "Comunidad & IA",
		defaultOpen: true,
		items: [
			{
				label: "Comunidad",
				href: "/dashboard/community",
				icon: Users,
			},
			{
				label: "IA Asistente",
				href: "/dashboard/ai",
				icon: Sparkles,
				badge: "Beta",
			},
		],
	},
]

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
	return (
		<Link
			href={item.href}
			className={cn(
				"flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 group",
				active
					? "text-white syn-brand-gradient shadow-sm"
					: "hover:bg-(--bg-muted)"
			)}
			style={
				active
					? {}
					: { color: "var(--text-secondary)" }
			}
		>
			<item.icon
				className={cn("w-4 h-4 shrink-0", active ? "text-white" : "")}
				style={active ? {} : { color: "var(--text-muted)" }}
			/>
			<span className="flex-1">{item.label}</span>
			{item.badge && (
				<span
					className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
					style={{
						background: active ? "oklch(1 0 0 / 0.2)" : "var(--brand-100)",
						color: active ? "white" : "var(--brand-600)",
					}}
				>
					{item.badge}
				</span>
			)}
			{active && (
				<ChevronRight className="w-3.5 h-3.5 text-white/70" />
			)}
		</Link>
	)
}

function SidebarSection({
	section,
	pathname,
	isOpen,
	onToggle,
}: {
	section: NavSection
	pathname: string
	isOpen: boolean
	onToggle: () => void
}) {
	const isSectionActive = section.items.some(
		(item) => pathname === item.href || pathname.startsWith(item.href + "/")
	)

	return (
		<div>
			<button
				onClick={onToggle}
				className={cn(
					"w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-150",
					isSectionActive
						? "text-white"
						: ""
				)}
				style={{
					color: isSectionActive ? "var(--brand-500)" : "var(--text-tertiary)",
				}}
			>
				<ChevronDown
					className={cn(
						"w-4 h-4 transition-transform duration-200",
						isOpen ? "" : "-rotate-90"
					)}
				/>
				<span className="flex-1 text-left">{section.title}</span>
			</button>

			{isOpen && (
				<div className="space-y-0.5 mt-1 pl-1">
					{section.items.map((item) => {
						const active = pathname === item.href || pathname.startsWith(item.href + "/")
						return (
							<NavLink
								key={item.href}
								item={item}
								active={active}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export function Sidebar() {
	const pathname = usePathname()
	const [openSections, setOpenSections] = useState<Record<string, boolean>>(
		Object.fromEntries(
			NAV_SECTIONS.map((section) => [section.title, section.defaultOpen ?? false])
		)
	)

	const toggleSection = (sectionTitle: string) => {
		setOpenSections((prev) => ({
			...prev,
			[sectionTitle]: !prev[sectionTitle],
		}))
	}

	return (
		<aside
			className="fixed left-0 top-0 h-screen w-55 flex flex-col z-40"
			style={{
				background: "var(--bg-surface)",
				borderRight: "1px solid var(--border-subtle)",
			}}
		>
			<div
				className="flex items-center gap-2.5 px-5 py-5"
				style={{ borderBottom: "1px solid var(--border-subtle)" }}
			>
				<div
					className="w-8 h-8 rounded-lg flex items-center justify-center syn-brand-gradient"
				>
					<Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
				</div>
				<span
					className="text-[15px] font-bold tracking-tight"
					style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
				>
					Synap<span style={{ color: "var(--brand-500)" }}>Tome</span>
				</span>
			</div>

			<nav className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
				{NAV_SECTIONS.map((section) => (
					<SidebarSection
						key={section.title}
						section={section}
						pathname={pathname}
						isOpen={openSections[section.title]}
						onToggle={() => toggleSection(section.title)}
					/>
				))}
			</nav>

			<div className="px-3 pb-4">
				<Link
					href="/dashboard/settings"
					className={cn(
						"flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150",
						pathname === "/dashboard/settings"
							? "text-white syn-brand-gradient shadow-sm"
							: "hover:bg-(--bg-muted)"
					)}
					style={
						pathname === "/dashboard/settings"
							? {}
							: { color: "var(--text-muted)" }
					}
				>
					<Settings className="w-4 h-4" />
					Configuración
					{pathname === "/dashboard/settings" && (
						<ChevronRight className="w-3.5 h-3.5 text-white/70 ml-auto" />
					)}
				</Link>
				<div
					className="mt-3 p-3 rounded-lg"
					style={{ background: "var(--brand-50)", border: "1px solid var(--brand-100)" }}
				>
					<div className="flex items-center justify-between mb-1.5">
						<span className="text-[11px] font-semibold" style={{ color: "var(--brand-600)" }}>
							Créditos IA
						</span>
						<span className="text-[11px] font-mono" style={{ color: "var(--brand-500)" }}>
							73 / 100
						</span>
					</div>
					<div className="w-full h-1.5 rounded-full" style={{ background: "var(--brand-100)" }}>
						<div
							className="h-full rounded-full syn-brand-gradient"
							style={{ width: "73%" }}
						/>
					</div>
				</div>
			</div>
		</aside>
	)
}