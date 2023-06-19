import { Header } from "./Header"
import { NavMenu } from "./NavMenu"
import { useSession } from "next-auth/react"
import Login from "../pages/signin"
import { useMemo, useState } from "react"
import { Loading } from "./Loading"

export const Layout = ({ children }) => {
  const [showNav, setShowNav] = useState()
  const { data: session, status } = useSession()
  const loading = useMemo(() => status === 'loading', [status])

  const [pageLoading, setPageLoading] = useState(false)
  const handleLoadingState = (state) => {
    setPageLoading(state)
  }


  if (loading) {
    return <Loading/>
  }
  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center bg-secondary-light">
        <Login />
      </div>
    )
  }
  return (
    <>
      <Header handleShowNav={()=>setShowNav(prev => !prev)}/>
      <div className="flex gap-2 p-2">
        <div className={`${showNav ? 'absolute top-0 left-0 bottom-0 right-0 bg-primary-dark bg-opacity-25' : 'hidden'}`}></div>
        <NavMenu showNav={showNav} handleShowNav={() => setShowNav(false)} handleLoadingState={handleLoadingState}/>
        <main className={`flex-grow w-full md:w-screen p-4 pt-2 rounded-xl bg-primary-light`}>
          {pageLoading ? <Loading/> : children}
        </main>
      </div>
    </>
  )
}