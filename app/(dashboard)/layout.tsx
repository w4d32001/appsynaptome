import { Sidebar } from "@/components/synaptome/Sidebar"
import { Navbar } from "@/components/synaptome/Navbar"
import { syncCurrentUser } from "@/lib/sync-user"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Sincroniza el usuario de Clerk con la BD del backend en cada carga del layout.
  // Es idempotente: si el usuario ya existe, solo actualiza si hay cambios.
  await syncCurrentUser();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <Navbar title="Dashboard" />
      <main
        className="pt-[60px] pl-[220px] min-h-screen"
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}