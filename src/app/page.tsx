'use client'

import Head from 'next/head'
import { useAuth } from '@/hooks/auth'

export default function Home() {
  useAuth({ middleware: 'guest' })

  return (
    <>
      <Head>
        <title>My Finance</title>
      </Head>

      <div className="w-full h-screen flex items-center justify-center">
        <h2 className="text-4xl tracking-widest font-bold text-center">
          Coming Soon..
        </h2>
      </div>
    </>
  )
}
