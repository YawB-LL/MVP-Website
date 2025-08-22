export const metadata = {
  title: 'LandLedger CMS - Sanity Studio',
  description: 'Content management system for LandLedger',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
