import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const NavMenu = ({showNav, handleShowNav, handleLoadingState}) => {
  /* Link styles */
  const linkStyles = "flex text-sm md:text-md w-full gap-1 font-bold px-3 py-2 rounded-lg"
  const inActiveLinkStyles = 'text-primary-dark'
  const activeLinkStyles = "bg-secondary-dark text-primary-light"
  const icon = "w-6 h-6"
  const inActiveIcon = icon + "text-primary-dark"
  const activeIcon = icon + " text-primary-light"
  const router = useRouter()
  const { pathname } = router

  const isActivePath = (path) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  useEffect(()=>{
  
    router.events.on("routeChangeStart", () => handleLoadingState(true))
    router.events.on("routeChangeComplete", () => handleLoadingState(false))
    router.events.on("routeChangeError",() => handleLoadingState(false))

    return () => {
      router.events.off("routeChangeStart", () => handleLoadingState(true));
      router.events.off("routeChangeComplete", () => handleLoadingState(false));
      router.events.off("routeChangeError", () => handleLoadingState(false));
    };
  }, [router])

  return (
    <nav className={`${showNav ? `left-0 right-0 top-20 bottom-0` : '-left-full'} fixed rounded-lg m-2 bg-primary-light md:bg-secondary-light p-4 md:p-0 transition-all md:static md:w-auto`}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            href="/"
            onClick={handleShowNav}
            className={`${linkStyles} 
            ${isActivePath('/')
                ? activeLinkStyles
                : inActiveLinkStyles
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={isActivePath('/')
                ? activeIcon
                : inActiveIcon
              }>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>
              Dashboard
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            onClick={handleShowNav}
            className={`${linkStyles} 
            ${isActivePath('/products')
                ? activeLinkStyles
                : inActiveLinkStyles
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={isActivePath('/products')
                ? activeIcon
                : inActiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <span>
              Products
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/categories"
            onClick={handleShowNav}
            className={`${linkStyles} 
            ${isActivePath('/categories')
                ? activeLinkStyles
                : inActiveLinkStyles
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                isActivePath('/categories')
                  ? activeIcon
                  : inActiveIcon
              }>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span>
              Categories
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/orders"
            onClick={handleShowNav}
            className={`
            ${linkStyles} 
            ${isActivePath('/orders')
                ? activeLinkStyles
                : inActiveLinkStyles
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                isActivePath('/orders')
                  ? activeIcon
                  : inActiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
            <span>
              Orders
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            onClick={handleShowNav}
            className={`
            ${linkStyles} 
            ${isActivePath('/settings')
                ? activeLinkStyles
                : inActiveLinkStyles
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={
                isActivePath('/settings')
                  ? activeIcon
                  : inActiveIcon
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              Settings
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}