import { useSession } from "next-auth/react"
import Head from "next/head"
import { useEffect } from "react"


export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1>
        Hello, {session.user.firstName}
      </h1>
    </>
  )
}
