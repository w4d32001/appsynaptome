import { Sidebar } from "@/components/synaptome/Sidebar"
import { Navbar } from "@/components/synaptome/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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