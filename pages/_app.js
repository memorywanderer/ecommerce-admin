import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    // <SessionProvider session={session}>
    //   <Component {...pageProps} />
    // </SessionProvider>
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
