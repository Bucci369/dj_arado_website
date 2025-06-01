import type { Metadata } from 'next'
import { Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import GSAPInitializer from '@/components/GSAPInitializer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'DJ ARADO - Deep & Tech House Artist',
  description: 'Official website of DJ ARADO - Deep & Tech House Artist from Berlin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <GSAPInitializer />
        {children}
      </body>
    </html>
  )
}