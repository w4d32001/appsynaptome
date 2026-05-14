import {
	ArrowLeft,
	Share2,
	MoreHorizontal,
	Sparkles,
	Clock,
	Tag,
	Network,
	BookMarked,
	ChevronRight,
	Zap,
	BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

function KnowledgeGraphPlaceholder() {
	const nodes = [
		{ id: "main", label: "Límites", x: 50, y: 50, size: 28, brand: true },
		{ id: "continui", label: "Continuidad", x: 72, y: 28, size: 20, brand: false },
		{ id: "derivada", label: "Derivadas", x: 75, y: 68, size: 20, brand: false },
		{ id: "lhopital", label: "L'Hôpital", x: 88, y: 45, size: 16, brand: false },
		{ id: "epsilon", label: "ε-δ", x: 28, y: 28, size: 16, brand: false },
		{ id: "asintota", label: "Asíntotas", x: 25, y: 70, size: 16, brand: false },
		{ id: "serie", label: "Series", x: 55, y: 78, size: 14, brand: false },
	]
	const edges = [
		["main", "continui"],
		["main", "derivada"],
		["main", "epsilon"],
		["main", "asintota"],
		["derivada", "lhopital"],
		["derivada", "serie"],
		["continui", "epsilon"],
	]
	return (
		<div
			className="relative w-full rounded-xl overflow-hidden"
			style={{
				height: 220,
				background: "var(--bg-muted)",
				border: "1px solid var(--border-subtle)",
			}}
		>
			<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
				{edges.map(([a, b], i) => {
					const na = nodes.find((n) => n.id === a)!
					const nb = nodes.find((n) => n.id === b)!
					return (
						<line
							key={i}
							x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
							stroke="var(--border-default)"
							strokeWidth="0.6"
						/>
					)
				})}
				{/* Nodes */}
				{nodes.map((node) => (
					<g key={node.id}>
						<circle
							cx={node.x} cy={node.y} r={node.size / 10}
							fill={node.brand ? "var(--brand-500)" : "var(--bg-elevated)"}
							stroke={node.brand ? "var(--brand-400)" : "var(--border-default)"}
							strokeWidth="0.5"
						/>
						<text
							x={node.x} y={node.y + node.size / 14 + 2.5}
							textAnchor="middle"
							fontSize="2.8"
							fill={node.brand ? "white" : "var(--text-secondary)"}
							fontFamily="var(--font-main)"
							fontWeight={node.brand ? "700" : "500"}
						>
							{node.label}
						</text>
					</g>
				))}
			</svg>
		</div>
	)
}

// ── Related concepts ───────────────────────────────────────
const RELATED = [
	{ label: "Regla de L'Hôpital", strength: 95 },
	{ label: "Continuidad uniforme", strength: 82 },
	{ label: "Teorema del valor intermedio", strength: 74 },
	{ label: "Series de Taylor", strength: 61 },
]

// ── Page ───────────────────────────────────────────────────
export default function NotePage() {
	return (
		<div
			className="max-w-[1100px] mx-auto"
			style={{ animation: "fadeUp 0.35s ease both" }}
		>
			{/* Top bar */}
			<div className="flex items-center gap-3 mb-6">
				<Link href="/dashboard">
					<Button variant="ghost" size="sm" className="gap-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
						<ArrowLeft className="w-3.5 h-3.5" />
						Volver
					</Button>
				</Link>
				<div className="flex-1" />
				<Button variant="ghost" size="sm" className="gap-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
					<Share2 className="w-3.5 h-3.5" />
					Compartir
				</Button>
				<Button variant="ghost" size="icon" className="w-8 h-8">
					<MoreHorizontal className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
				</Button>
			</div>

			<div className="flex gap-7">
				{/* ── Main reading area ─────────────────────────── */}
				<article className="flex-1 min-w-0">
					{/* Meta */}
					<div className="flex items-center gap-2 mb-4">
						<Badge
							style={{
								background: "var(--brand-50)",
								color: "var(--brand-600)",
								border: "1px solid var(--brand-100)",
								fontSize: "11px",
							}}
						>
							Cálculo I
						</Badge>
						<div className="flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
							<Clock className="w-3 h-3" />
							<span className="text-[11.5px]">Actualizado hace 2h</span>
						</div>
					</div>

					{/* Title */}
					<h1
						className="text-[30px] font-bold tracking-tight mb-2 leading-tight"
						style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
					>
						Límites y Continuidad
					</h1>
					<p className="text-[15px] mb-6" style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
						Una introducción formal a los límites de funciones reales y su relación con la continuidad.
					</p>

					{/* Tags */}
					<div className="flex flex-wrap gap-1.5 mb-7">
						{["límites", "continuidad", "ε-δ", "cálculo", "funciones reales"].map((tag) => (
							<span
								key={tag}
								className="flex items-center gap-1 text-[11.5px] px-2.5 py-1 rounded-full font-mono"
								style={{
									background: "var(--bg-muted)",
									color: "var(--text-muted)",
									border: "1px solid var(--border-subtle)",
								}}
							>
								<Tag className="w-2.5 h-2.5" />
								{tag}
							</span>
						))}
					</div>

					<Separator style={{ background: "var(--border-subtle)" }} className="mb-7" />

					{/* Content */}
					<div className="prose-synaptome space-y-5" style={{ color: "var(--text-primary)" }}>
						<h2
							className="text-[19px] font-bold mb-3"
							style={{ fontFamily: "var(--font-display)" }}
						>
							1. Definición Formal de Límite
						</h2>
						<p className="text-[14.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
							Decimos que el <strong style={{ color: "var(--text-primary)" }}>límite de f(x) cuando x → a es L</strong>, y
							lo escribimos como lim<sub>x→a</sub> f(x) = L, si para todo ε &gt; 0 existe un δ &gt; 0 tal que si
							0 &lt; |x − a| &lt; δ, entonces |f(x) − L| &lt; ε.
						</p>

						{/* Formula block */}
						<div
							className="px-5 py-4 rounded-xl my-5"
							style={{
								background: "var(--bg-muted)",
								border: "1px solid var(--border-subtle)",
								fontFamily: "var(--font-mono)",
							}}
						>
							<p className="text-[13px]" style={{ color: "var(--brand-500)" }}>
								∀ε &gt; 0, ∃δ &gt; 0 : 0 &lt; |x − a| &lt; δ ⟹ |f(x) − L| &lt; ε
							</p>
						</div>

						<h2
							className="text-[19px] font-bold mb-3 mt-7"
							style={{ fontFamily: "var(--font-display)" }}
						>
							2. Propiedades de los Límites
						</h2>
						<p className="text-[14.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
							Los límites cumplen propiedades algebraicas que permiten calcularlos de forma modular:
						</p>
						<ul className="space-y-2 ml-4">
							{[
								"Suma: lim[f(x) + g(x)] = lim f(x) + lim g(x)",
								"Producto: lim[f(x) · g(x)] = lim f(x) · lim g(x)",
								"Cociente: lim[f(x)/g(x)] = lim f(x) / lim g(x), si lim g(x) ≠ 0",
								"Composición: lim f(g(x)) = f(lim g(x)) si f es continua",
							].map((prop) => (
								<li key={prop} className="flex items-start gap-2.5">
									<span
										className="w-1.5 h-1.5 rounded-full mt-[6px] flex-shrink-0 syn-brand-gradient"
									/>
									<span
										className="text-[13.5px] font-mono leading-relaxed"
										style={{ color: "var(--text-secondary)" }}
									>
										{prop}
									</span>
								</li>
							))}
						</ul>

						<h2
							className="text-[19px] font-bold mb-3 mt-7"
							style={{ fontFamily: "var(--font-display)" }}
						>
							3. Continuidad
						</h2>
						<p className="text-[14.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
							Una función f es <strong style={{ color: "var(--text-primary)" }}>continua en el punto a</strong> si
							se cumplen las tres condiciones: f(a) está definida, el límite lim<sub>x→a</sub> f(x) existe,
							y ese límite coincide con f(a).
						</p>

						{/* Callout */}
						<div
							className="flex gap-3 p-4 rounded-xl"
							style={{
								background: "var(--brand-50)",
								border: "1px solid var(--brand-100)",
							}}
						>
							<Zap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--brand-500)" }} />
							<p className="text-[13.5px]" style={{ color: "var(--brand-700)" }}>
								<strong>Truco mnemónico:</strong> Una función es continua si puedes dibujarla sin levantar
								el lápiz del papel. Las discontinuidades son los "saltos" visibles en la gráfica.
							</p>
						</div>
					</div>

					{/* AI Quiz CTA */}
					<div className="mt-10">
						<Button
							size="lg"
							className="w-full gap-3 text-white border-0 syn-brand-gradient hover:opacity-90 transition-opacity h-12"
							style={{ boxShadow: "var(--shadow-brand)", fontSize: "14px" }}
						>
							<Sparkles className="w-4.5 h-4.5" />
							Generar Quiz con IA sobre este apunte
							<ChevronRight className="w-4 h-4 ml-auto opacity-70" />
						</Button>
					</div>
				</article>

				{/* ── Right panel ──────────────────────────────── */}
				<aside
					className="w-[260px] flex-shrink-0 space-y-5 sticky top-[80px] self-start hidden xl:block"
				>
					{/* Knowledge Graph */}
					<div className="syn-card p-4">
						<div className="flex items-center gap-2 mb-3">
							<Network className="w-4 h-4" style={{ color: "var(--brand-500)" }} />
							<h3
								className="text-[13.5px] font-semibold"
								style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
							>
								Grafo de Conocimiento
							</h3>
						</div>
						<KnowledgeGraphPlaceholder />
						<Button
							variant="ghost"
							size="sm"
							className="w-full mt-2 text-[12px] gap-1.5"
							style={{ color: "var(--brand-500)" }}
						>
							Abrir grafo completo
							<ChevronRight className="w-3.5 h-3.5" />
						</Button>
					</div>

					{/* Related concepts */}
					<div className="syn-card p-4">
						<div className="flex items-center gap-2 mb-3">
							<BookMarked className="w-4 h-4" style={{ color: "var(--accent-cyan)" }} />
							<h3
								className="text-[13.5px] font-semibold"
								style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
							>
								Conceptos relacionados
							</h3>
						</div>
						<div className="space-y-2">
							{RELATED.map((r) => (
								<div key={r.label} className="flex items-center gap-2">
									<div className="flex-1 min-w-0">
										<p className="text-[12.5px] font-medium truncate" style={{ color: "var(--text-primary)" }}>
											{r.label}
										</p>
										<div className="w-full h-1 rounded-full mt-1" style={{ background: "var(--bg-muted)" }}>
											<div
												className="h-full rounded-full"
												style={{ width: `${r.strength}%`, background: "var(--accent-cyan)" }}
											/>
										</div>
									</div>
									<span className="text-[10.5px] font-mono flex-shrink-0" style={{ color: "var(--text-muted)" }}>
										{r.strength}%
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Progress */}
					<div className="syn-card p-4">
						<div className="flex items-center gap-2 mb-3">
							<BarChart3 className="w-4 h-4" style={{ color: "var(--accent-emerald)" }} />
							<h3
								className="text-[13.5px] font-semibold"
								style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
							>
								Tu progreso
							</h3>
						</div>
						<div className="text-center py-2">
							<p
								className="text-[32px] font-bold"
								style={{ fontFamily: "var(--font-display)", color: "var(--accent-emerald)" }}
							>
								78%
							</p>
							<p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
								Dominio del tema
							</p>
						</div>
						<Button
							size="sm"
							variant="outline"
							className="w-full mt-2 text-[12px] gap-1.5"
							style={{ borderColor: "var(--accent-emerald)", color: "var(--accent-emerald)" }}
						>
							<Sparkles className="w-3 h-3" />
							Repasar con IA
						</Button>
					</div>
				</aside>
			</div>
		</div>
	)
}