"use client"

import { useState } from "react"
import {
	ArrowLeft,
	Upload,
	ImageIcon,
	Sparkles,
	Copy,
	Check,
	RefreshCw,
	FileText,
	AlertCircle,
	X,
	ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const MOCK_EXTRACTED = `Límites - Definición ε-δ

Sea f: D → ℝ y a ∈ D'. Decimos que:
  lim f(x) = L
  x→a

si ∀ε > 0, ∃δ > 0 tal que:
  0 < |x − a| < δ ⟹ |f(x) − L| < ε

Propiedades:
1. Unicidad del límite
2. Acotación local
3. Conservación del signo
4. Álgebra de límites (suma, producto, cociente)

Continuidad en a:
• f(a) definida
• lim f(x) existe
  x→a
• lim f(x) = f(a)
  x→a

Tipos de discontinuidad:
- Evitable (o removible)
- De salto (1ª especie)
- Esencial (2ª especie)`

function DropZone({
	hasImage,
	onSimulateUpload,
	onClear,
}: {
	hasImage: boolean
	onSimulateUpload: () => void
	onClear: () => void
}) {
	const [dragging, setDragging] = useState(false)

	if (hasImage) {
		return (
			<div
				className="relative rounded-xl overflow-hidden"
				style={{
					border: "1px solid var(--border-subtle)",
					background: "var(--bg-muted)",
				}}
			>
				<div
					className="w-full flex items-center justify-center"
					style={{ height: 340, background: "linear-gradient(135deg, oklch(0.97 0.005 280), oklch(0.95 0.010 290))" }}
				>
					<div className="text-center px-8 w-full">
						{/* Simulated lines of handwriting */}
						<div className="space-y-3 text-left max-w-85 mx-auto">
							{[
								{ text: "Límites - Def. ε-δ", w: "80%", h: "3px", thick: true },
								{ text: "", w: "65%", h: "2px" },
								{ text: "", w: "90%", h: "2px" },
								{ text: "", w: "55%", h: "2px" },
								{ text: "", w: "75%", h: "2px" },
								{ text: "", w: "40%", h: "2px" },
								{ text: "", w: "85%", h: "2px" },
								{ text: "", w: "60%", h: "2px" },
								{ text: "", w: "70%", h: "2px" },
								{ text: "Continuidad:", w: "50%", h: "2.5px", thick: true },
								{ text: "", w: "80%", h: "2px" },
								{ text: "", w: "65%", h: "2px" },
							].map((line, i) => (
								<div
									key={i}
									className="rounded-full"
									style={{
										width: line.w,
										height: line.h || "2px",
										background: line.thick
											? "oklch(0.35 0.02 280)"
											: `oklch(${0.55 + Math.random() * 0.1} 0.01 280)`,
										opacity: 0.7 + Math.random() * 0.3,
										transform: `rotate(${(Math.random() - 0.5) * 0.8}deg)`,
									}}
								/>
							))}
						</div>
					</div>
				</div>
				<button
					onClick={onClear}
					className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all"
					style={{ background: "oklch(0 0 0 / 0.5)" }}
				>
					<X className="w-3.5 h-3.5 text-white" />
				</button>
				<div
					className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
					style={{ background: "oklch(0 0 0 / 0.55)", backdropFilter: "blur(8px)" }}
				>
					<div className="w-1.5 h-1.5 rounded-full bg-green-400" />
					<span className="text-[11px] text-white font-medium">Imagen cargada</span>
				</div>
			</div>
		)
	}

	return (
		<div
			onDragEnter={() => setDragging(true)}
			onDragLeave={() => setDragging(false)}
			onDragOver={(e) => e.preventDefault()}
			onDrop={(e) => { e.preventDefault(); setDragging(false); onSimulateUpload() }}
			onClick={onSimulateUpload}
			className="w-full rounded-xl cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4"
			style={{
				height: 340,
				border: `2px dashed ${dragging ? "var(--brand-500)" : "var(--border-default)"}`,
				background: dragging ? "var(--brand-50)" : "var(--bg-muted)",
				transform: dragging ? "scale(1.01)" : "scale(1)",
			}}
		>
			<div
				className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all"
				style={{
					background: dragging ? "var(--brand-100)" : "var(--bg-elevated)",
					border: "1px solid var(--border-subtle)",
				}}
			>
				{dragging ? (
					<Upload className="w-7 h-7" style={{ color: "var(--brand-500)" }} />
				) : (
					<ImageIcon className="w-7 h-7" style={{ color: "var(--text-muted)" }} />
				)}
			</div>
			<div className="text-center">
				<p
					className="text-[15px] font-semibold mb-1"
					style={{ fontFamily: "var(--font-display)", color: dragging ? "var(--brand-600)" : "var(--text-primary)" }}
				>
					{dragging ? "Suelta para cargar" : "Sube tu apunte manuscrito"}
				</p>
				<p className="text-[12.5px]" style={{ color: "var(--text-muted)" }}>
					Arrastra una imagen o haz clic para seleccionar
				</p>
				<p className="text-[11.5px] mt-1 font-mono" style={{ color: "var(--text-muted)" }}>
					PNG, JPG, HEIC · máx. 20 MB
				</p>
			</div>
			{!dragging && (
				<Button
					size="sm"
					className="gap-2 text-white border-0 syn-brand-gradient hover:opacity-90"
					onClick={(e) => { e.stopPropagation(); onSimulateUpload() }}
				>
					<Upload className="w-3.5 h-3.5" />
					Seleccionar imagen
				</Button>
			)}
		</div>
	)
}

export default function EditorPage() {
	const [hasImage, setHasImage] = useState(false)
	const [extracting, setExtracting] = useState(false)
	const [extracted, setExtracted] = useState("")
	const [editedText, setEditedText] = useState("")
	const [copied, setCopied] = useState(false)
	const [title, setTitle] = useState("")

	const handleUpload = () => {
		setHasImage(true)
		setExtracting(true)
		setExtracted("")
		let i = 0
		const chars = MOCK_EXTRACTED.split("")
		const interval = setInterval(() => {
			i += 3
			setExtracted(chars.slice(0, i).join(""))
			if (i >= chars.length) {
				clearInterval(interval)
				setExtracting(false)
				setEditedText(MOCK_EXTRACTED)
			}
		}, 18)
	}

	const handleClear = () => {
		setHasImage(false)
		setExtracted("")
		setEditedText("")
		setExtracting(false)
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(editedText || extracted)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const extractionDone = !extracting && extracted.length > 0

	return (
		<div
			className="max-w-275 mx-auto"
			style={{ animation: "fadeUp 0.35s ease both" }}
		>
			<div className="flex items-center gap-3 mb-6">
				<Link href="/dashboard">
					<Button variant="ghost" size="sm" className="gap-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
						<ArrowLeft className="w-3.5 h-3.5" />
						Volver
					</Button>
				</Link>
				<Separator orientation="vertical" className="h-5" style={{ background: "var(--border-subtle)" }} />
				<div className="flex-1">
					<Input
						placeholder="Título del apunte…"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="border-0 shadow-none text-[16px] font-semibold px-0 h-auto focus-visible:ring-0 bg-transparent placeholder:text-(--text-muted)"
						style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
					/>
				</div>
				<div className="flex items-center gap-2">
					{extractionDone && (
						<Button
							variant="outline"
							size="sm"
							className="gap-1.5 text-[12.5px]"
							style={{ borderColor: "var(--brand-200)", color: "var(--brand-600)" }}
						>
							<Sparkles className="w-3.5 h-3.5" />
							Mejorar con IA
						</Button>
					)}
					<Button
						size="sm"
						disabled={!extractionDone}
						className="gap-1.5 text-white border-0 syn-brand-gradient hover:opacity-90 disabled:opacity-40"
					>
						Guardar apunte
						<ChevronRight className="w-3.5 h-3.5" />
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<ImageIcon className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
						<h2
							className="text-[13.5px] font-semibold"
							style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
						>
							Imagen del apunte
						</h2>
					</div>
					<DropZone
						hasImage={hasImage}
						onSimulateUpload={handleUpload}
						onClear={handleClear}
					/>
					{!hasImage && (
						<div
							className="flex gap-2.5 p-3 rounded-lg"
							style={{
								background: "var(--bg-muted)",
								border: "1px solid var(--border-subtle)",
							}}
						>
							<AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
							<p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
								Para mejores resultados usa buena iluminación, escribe con tinta oscura y mantén el papel alineado.
							</p>
						</div>
					)}
					{hasImage && extractionDone && (
						<div
							className="flex gap-2.5 p-3 rounded-lg"
							style={{
								background: "var(--brand-50)",
								border: "1px solid var(--brand-100)",
							}}
						>
							<Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "var(--brand-500)" }} />
							<p className="text-[12px]" style={{ color: "var(--brand-600)" }}>
								Extracción completada con <strong>97% de confianza</strong>. Revisa y edita el texto a la derecha.
							</p>
						</div>
					)}
				</div>
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
							<h2
								className="text-[13.5px] font-semibold"
								style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
							>
								Texto extraído
							</h2>
							{extracting && (
								<div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: "var(--brand-50)" }}>
									<RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ color: "var(--brand-500)" }} />
									<span className="text-[10.5px] font-medium" style={{ color: "var(--brand-600)" }}>
										Procesando…
									</span>
								</div>
							)}
						</div>
						{extractionDone && (
							<Button
								variant="ghost"
								size="sm"
								className="gap-1.5 text-[12px] h-7"
								style={{ color: "var(--text-muted)" }}
								onClick={handleCopy}
							>
								{copied ? (
									<><Check className="w-3 h-3 text-green-500" /> Copiado</>
								) : (
									<><Copy className="w-3 h-3" /> Copiar</>
								)}
							</Button>
						)}
					</div>
					<div className="relative">
						<Textarea
							placeholder={
								hasImage
									? extracting
										? "Extrayendo texto…"
										: "Texto extraído aparecerá aquí…"
									: "Sube una imagen para extraer el texto automáticamente con IA…"
							}
							value={extracting ? extracted : editedText}
							onChange={(e) => setEditedText(e.target.value)}
							readOnly={extracting}
							className="resize-none text-[13px] leading-relaxed rounded-xl"
							style={{
								height: 340,
								fontFamily: "var(--font-mono)",
								background: "var(--bg-muted)",
								border: "1px solid var(--border-subtle)",
								color: "var(--text-primary)",
							}}
						/>
						{extracting && (
							<div
								className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
								style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
							>
								<div
									className="w-1.5 h-1.5 rounded-full syn-brand-gradient"
									style={{ animation: "pulse-dot 1s ease infinite" }}
								/>
								<span className="text-[10.5px] font-mono" style={{ color: "var(--text-muted)" }}>
									OCR activo
								</span>
							</div>
						)}
					</div>
					{extractionDone && (
						<p className="text-[11.5px]" style={{ color: "var(--text-muted)" }}>
							Puedes editar el texto directamente. Los cambios se guardarán con el apunte.
						</p>
					)}
				</div>
			</div>
			{extractionDone && (
				<div
					className="mt-6 p-4 rounded-xl flex items-center gap-4"
					style={{
						background: "var(--bg-elevated)",
						border: "1px solid var(--border-subtle)",
						animation: "fadeUp 0.3s ease both",
					}}
				>
					<div className="flex-1">
						<p
							className="text-[13.5px] font-semibold"
							style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
						>
							¿Qué quieres hacer con este apunte?
						</p>
						<p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
							La IA puede generar un resumen, flashcards o un quiz automáticamente.
						</p>
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						{[
							{ label: "Resumir", icon: "📝" },
							{ label: "Flashcards", icon: "⚡" },
							{ label: "Quiz IA", icon: "🧠" },
						].map((action) => (
							<Button
								key={action.label}
								variant="outline"
								size="sm"
								className="gap-1.5 text-[12.5px]"
								style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
							>
								<span>{action.icon}</span>
								{action.label}
							</Button>
						))}
					</div>
				</div>
			)}
		</div>
	)
}