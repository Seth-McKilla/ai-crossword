interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen justify-center">
      <main className="container max-w-[1000px] p-4">{children}</main>
    </div>
  )
}
