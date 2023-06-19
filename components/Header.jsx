import Link from "next/link"
import { Logo } from "./Logo"
import { SigninButton } from "./SigninButton"

export const Header = ({handleShowNav}) => {

  return (
    <header className="flex justify-between items-center flex-grow px-3 py-2 m-2 bg-primary-dark rounded-xl h-16 z-10 relative">
      <div className="flex items-center gap-2">
        <button onClick={handleShowNav} className="flex items-center cursor-pointer p-2 z-10 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-primary-light">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <SigninButton />
    </header>
  )
}