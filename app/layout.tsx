import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body>
        <div className="flex flex-col h-full">
          <div className="p-4 border">
            <p className="text-2xl font-bold">Help Desk Support Ticket Management</p>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
