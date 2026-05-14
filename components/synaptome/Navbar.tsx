"use client"

import { UserButton, SignInButton, useAuth } from "@clerk/react"
import { Search, Bell, Command } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
	title?: string
}

export function Navbar({ title = "Dashboard" }: NavbarProps) {
	const { isSignedIn } = useAuth()
	return (
		<header
			className="fixed top-0 right-0 left-55 h-15 flex items-center px-6 gap-4 z-30"
			style={{
				background: "oklch(from var(--bg-base) l c h / 0.85)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderBottom: "1px solid var(--border-subtle)",
			}}
		>
			<h1
				className="text-[15px] font-semibold mr-2 hidden md:block"
				style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)" }}
			>
				{title}
			</h1>
			<div className="flex-1 max-w-120">
				<div
					className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg cursor-pointer transition-all"
					style={{
						background: "var(--bg-muted)",
						border: "1px solid var(--border-subtle)",
					}}
				>
					<Search className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--text-muted)" }} />
					<span className="text-[13px] flex-1" style={{ color: "var(--text-muted)" }}>
						Buscar apuntes, cursos, conceptos…
					</span>
					<div
						className="flex items-center gap-0.5 px-1.5 py-0.5 rounded"
						style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}
					>
						<Command className="w-2.5 h-2.5" style={{ color: "var(--text-muted)" }} />
						<span className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>K</span>
					</div>
				</div>
			</div>

			<div className="flex-1" />

			<div className="flex items-center gap-3">
				<button
					className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-(--bg-muted)"
				>
					<Bell className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
					<span
						className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full syn-brand-gradient"
						style={{ animation: "pulse-dot 2s ease infinite" }}
					/>
				</button>

				{isSignedIn ? (
					<UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
				) : (
					<SignInButton>
						<Button size="sm" className="h-8 text-[13px] syn-brand-gradient text-white border-0 hover:opacity-90">
							Iniciar sesión
						</Button>
					</SignInButton>
				)}
			</div>
		</header>
	)
}