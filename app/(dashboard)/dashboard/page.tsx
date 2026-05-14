import {
	BookOpen,
	Plus,
	Clock,
	TrendingUp,
	Brain,
	Flame,
	ArrowRight,
	Sparkles,
	FileText,
	Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const RECENT_NOTES = [
	{
		id: "1",
		title: "Límites y Continuidad",
		course: "Cálculo I",
		updatedAt: "hace 2h",
		tags: ["derivadas", "límites"],
		color: "var(--brand-500)",
		excerpt: "Un límite describe el comportamiento de una función cuando su argumento se acerca a un valor particular…",
		progress: 78,
	},
	{
		id: "2",
		title: "Teorema de Bayes",
		course: "Estadística",
		updatedAt: "hace 5h",
		tags: ["probabilidad", "inferencia"],
		color: "var(--accent-cyan)",
		excerpt: "El teorema de Bayes establece la probabilidad condicional de un evento dada la ocurrencia de otro…",
		progress: 45,
	},
	{
		id: "3",
		title: "Complejidad Algorítmica",
		course: "Algoritmia",
		updatedAt: "ayer",
		tags: ["O(n)", "Big-O"],
		color: "var(--accent-emerald)",
		excerpt: "La notación Big-O describe el comportamiento asintótico de un algoritmo en términos de su entrada…",
		progress: 91,
	},
	{
		id: "4",
		title: "Sistemas de Ecuaciones",
		course: "Álgebra Lineal",
		updatedAt: "hace 2d",
		tags: ["matrices", "gauss"],
		color: "var(--accent-amber)",
		excerpt: "La eliminación Gaussiana transforma el sistema a una forma escalonada mediante operaciones elementales…",
		progress: 30,
	},
]

const ACTIVE_COURSES = [
	{ id: "1", name: "Cálculo I", notes: 12, progress: 65, color: "var(--brand-500)", emoji: "∫" },
	{ id: "2", name: "Estadística", notes: 8, progress: 42, color: "var(--accent-cyan)", emoji: "σ" },
	{ id: "3", name: "Algoritmia", notes: 15, progress: 80, color: "var(--accent-emerald)", emoji: "Σ" },
]

const STATS = [
	{ label: "Apuntes totales", value: "47", icon: FileText, delta: "+3 esta semana" },
	{ label: "Racha actual", value: "12d", icon: Flame, delta: "¡Récord personal!" },
	{ label: "Conceptos mapeados", value: "284", icon: Brain, delta: "+18 esta semana" },
	{ label: "Quizzes completados", value: "31", icon: Star, delta: "89% precisión" },
]

function StatCard({ stat }: { stat: typeof STATS[0] }) {
	return (
		<div className="syn-card p-4">
			<div className="flex items-start justify-between mb-3">
				<div
					className="w-9 h-9 rounded-lg flex items-center justify-center"
					style={{ background: "var(--brand-50)" }}
				>
					<stat.icon className="w-4.5 h-4.5" style={{ color: "var(--brand-500)" }} />
				</div>
				<TrendingUp className="w-3.5 h-3.5" style={{ color: "var(--accent-emerald)" }} />
			</div>
			<p
				className="text-[26px] font-bold tracking-tight"
				style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
			>
				{stat.value}
			</p>
			<p className="text-[12px] font-medium mt-0.5" style={{ color: "var(--text-muted)" }}>
				{stat.label}
			</p>
			<p className="text-[11px] mt-1" style={{ color: "var(--accent-emerald)" }}>
				{stat.delta}
			</p>
		</div>
	)
}

function NoteCard({ note }: { note: typeof RECENT_NOTES[0] }) {
	return (
		<Link href={`/dashboard/notes/${note.id}`}>
			<div className="syn-card p-4 cursor-pointer h-full">
				<div
					className="w-full h-0.5 rounded-full mb-4"
					style={{ background: note.color }}
				/>
				<div className="flex items-start justify-between mb-2">
					<div className="flex-1 min-w-0">
						<p className="text-[13px] font-medium mb-0.5 truncate" style={{ color: "var(--text-muted)" }}>
							{note.course}
						</p>
						<h3
							className="text-[15px] font-semibold leading-snug"
							style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
						>
							{note.title}
						</h3>
					</div>
					<div className="shrink-0 ml-2">
						<div
							className="w-8 h-8 rounded-lg flex items-center justify-center"
							style={{ background: "var(--bg-muted)" }}
						>
							<BookOpen className="w-3.5 h-3.5" style={{ color: "var(--text-muted)" }} />
						</div>
					</div>
				</div>
				<p
					className="text-[12.5px] leading-relaxed mb-3 line-clamp-2"
					style={{ color: "var(--text-secondary)" }}
				>
					{note.excerpt}
				</p>
				<div className="flex flex-wrap gap-1 mb-3">
					{note.tags.map((tag) => (
						<span
							key={tag}
							className="text-[11px] px-2 py-0.5 rounded-full font-mono"
							style={{
								background: "var(--bg-muted)",
								color: "var(--text-muted)",
								border: "1px solid var(--border-subtle)",
							}}
						>
							#{tag}
						</span>
					))}
				</div>
				<div className="flex items-center gap-2">
					<div className="flex-1 h-1.5 rounded-full" style={{ background: "var(--bg-muted)" }}>
						<div
							className="h-full rounded-full transition-all"
							style={{ width: `${note.progress}%`, background: note.color }}
						/>
					</div>
					<span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
						{note.progress}%
					</span>
				</div>
				<div className="flex items-center gap-1 mt-3">
					<Clock className="w-3 h-3" style={{ color: "var(--text-muted)" }} />
					<span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
						{note.updatedAt}
					</span>
				</div>
			</div>
		</Link>
	)
}

export default function DashboardPage() {
	return (
		<div
			className="max-w-300 mx-auto space-y-8"
			style={{ animation: "fadeUp 0.4s ease both" }}
		>
			<div className="flex items-end justify-between">
				<div>
					<p className="text-[13px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>
						Bienvenido de vuelta 👋
					</p>
					<h1
						className="text-[28px] font-bold tracking-tight"
						style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
					>
						Tu espacio de{" "}
						<span className="syn-text-gradient">inteligencia colectiva</span>
					</h1>
				</div>
				<Button
					className="gap-2 text-white border-0 syn-brand-gradient hover:opacity-90 transition-opacity"
					style={{ boxShadow: "var(--shadow-brand)" }}
				>
					<Plus className="w-4 h-4" />
					Nuevo apunte
				</Button>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{STATS.map((stat) => (
					<StatCard key={stat.label} stat={stat} />
				))}
			</div>
			<div
				className="flex items-center gap-4 p-4 rounded-xl"
				style={{
					background: "linear-gradient(135deg, var(--brand-50), oklch(0.96 0.02 210))",
					border: "1px solid var(--brand-100)",
				}}
			>
				<div
					className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 syn-brand-gradient"
				>
					<Sparkles className="w-5 h-5 text-white" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-[13.5px] font-semibold" style={{ color: "var(--text-primary)" }}>
						Sugerencia de la IA
					</p>
					<p className="text-[12.5px]" style={{ color: "var(--text-secondary)" }}>
						Llevas 3 días sin repasar <strong>Límites y Continuidad</strong>. Te recomiendo un quiz rápido de 5 preguntas.
					</p>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="flex-shrink-0 text-[12.5px] gap-1.5"
					style={{ borderColor: "var(--brand-200)", color: "var(--brand-600)" }}
				>
					Generar quiz
					<ArrowRight className="w-3.5 h-3.5" />
				</Button>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-4">
					<div className="flex items-center justify-between">
						<h2
							className="text-[16px] font-semibold"
							style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
						>
							Apuntes recientes
						</h2>
						<Button variant="ghost" size="sm" className="text-[12.5px] gap-1" style={{ color: "var(--brand-500)" }}>
							Ver todos <ArrowRight className="w-3 h-3" />
						</Button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{RECENT_NOTES.map((note, i) => (
							<div
								key={note.id}
								style={{ animation: `fadeUp 0.4s ease ${i * 0.06}s both` }}
							>
								<NoteCard note={note} />
							</div>
						))}
					</div>
				</div>
				<div className="space-y-4">
					<div>
						<h2
							className="text-[16px] font-semibold mb-3"
							style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
						>
							Cursos activos
						</h2>
						<div className="space-y-2.5">
							{ACTIVE_COURSES.map((course) => (
								<div key={course.id} className="syn-card p-3.5">
									<div className="flex items-center gap-3 mb-2.5">
										<div
											className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[14px] font-bold flex-shrink-0"
											style={{ background: course.color, fontFamily: "var(--font-mono)" }}
										>
											{course.emoji}
										</div>
										<div className="flex-1 min-w-0">
											<p
												className="text-[13.5px] font-semibold truncate"
												style={{ color: "var(--text-primary)" }}
											>
												{course.name}
											</p>
											<p className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
												{course.notes} apuntes
											</p>
										</div>
										<Badge
											className="text-[10px] font-mono flex-shrink-0"
											style={{
												background: "var(--bg-muted)",
												color: "var(--text-secondary)",
												border: "none",
											}}
										>
											{course.progress}%
										</Badge>
									</div>
									<div className="w-full h-1 rounded-full" style={{ background: "var(--bg-muted)" }}>
										<div
											className="h-full rounded-full transition-all"
											style={{ width: `${course.progress}%`, background: course.color }}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					<div>
						<h2
							className="text-[16px] font-semibold mb-3"
							style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
						>
							Acciones rápidas
						</h2>
						<div className="space-y-2">
							{[
								{ label: "Subir apunte manuscrito", icon: "📷", href: "/dashboard/editor" },
								{ label: "Explorar grafo mental", icon: "🧠", href: "/dashboard/graph" },
								{ label: "Repasar con flashcards", icon: "⚡", href: "/dashboard/flashcards" },
							].map((action) => (
								<Link key={action.label} href={action.href}>
									<div
										className="syn-card flex items-center gap-3 p-3 cursor-pointer"
									>
										<span className="text-[18px]">{action.icon}</span>
										<span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
											{action.label}
										</span>
										<ArrowRight className="w-3.5 h-3.5 ml-auto" style={{ color: "var(--text-muted)" }} />
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}