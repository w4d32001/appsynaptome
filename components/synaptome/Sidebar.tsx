"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
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
]

export function Sidebar() {
	const pathname = usePathname()

	return (
		<aside
			className="fixed left-0 top-0 h-screen w-55 flex flex-col z-40"
			style={{
				background: "var(--bg-surface)",
				borderRight: "1px solid var(--border-subtle)",
			}}
		>
			{/* Logo */}
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

			{/* Nav */}
			<nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
				{NAV_ITEMS.map((item) => {
					const active = pathname === item.href || pathname.startsWith(item.href + "/")
					return (
						<Link
							key={item.href}
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
				})}
			</nav>
			<div className="px-3 pb-4">
				<Link
					href="/dashboard/settings"
					className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all hover:bg-(--bg-muted)"
					style={{ color: "var(--text-muted)" }}
				>
					<Settings className="w-4 h-4" />
					Configuración
				</Link>

				{/* AI Credits */}
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