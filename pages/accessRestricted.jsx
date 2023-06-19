import Link from "next/link"

const accessRestricted = () => {
  return (
    <div className="p-2">
      <h3 className="text-primary-light bg-warning text-2xl text-bold p-2 rounded-lg">This page is only for admin user</h3>
      <p>If you want to get access contact the administrator or <Link className=" text-secondary-dark" href="/signin">login</Link></p>
      
    </div>
  )
}
export default accessRestricted