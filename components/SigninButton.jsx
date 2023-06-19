import { signIn, signOut, useSession } from 'next-auth/react'

export const SigninButton = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div className='flex items-center gap-2'>
        <span className='text-md font-bold text-primary-light hidden md:flex'>{session.user.firstName} {session.user.lastName}</span>
        <button
          onClick={() => signOut()}
          className="text-md font-bold bg-primary-light text-primary-dark flex items-center px-2 py-2 rounded-2xl">
          Sign out
        </button>
      </div>
    )
  }
  return (
    <button
      onClick={() => signIn()}
      className="text-md font-bold bg-primary-light text-primary-dark flex items-center px-3 py-2 rounded-2xl">
      Sign in
    </button>
  )
}