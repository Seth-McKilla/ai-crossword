interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen justify-center">
      <main className="container max-w-[750px] p-4">{children}</main>
    </div>
  )
}
