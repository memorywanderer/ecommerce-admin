export const Loading = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center">
      <div className="animate-spin w-16 h-16 border-8 border-y-secondary-dark border-x-secondary-light rounded-full"></div>
    </div>
  )
}