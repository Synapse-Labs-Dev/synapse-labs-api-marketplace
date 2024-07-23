'use client'

import { ChevronDownIcon, ChevronRightIcon, Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import * as React from 'react'

import { cn } from '@/_utils/cn'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'

import { Logo } from '../logo'

export function Navbar() {
  const { data: session } = useSession()
  return (
    <header className="flex items-center justify-between md:justify-between w-full">
      <div className="md:block">
        <Image src={'/logo.svg'} width={36} height={24} alt="brand-logo" className="dark:invert" />
      </div>

      <div className="hidden md:flex flex-1">
        <div className="flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>EXPLORE</NavigationMenuTrigger>
                <NavigationMenuContent className="left-[0.5rem]">
                  <ul className="flex flex-col w-[80px] gap-3 p-4 font-normal text-xs">
                    <Link href={'/about'} className="hover:cursor-pointer hover:underline">
                      ABOUT
                    </Link>
                    <Link
                      href={process.env.NEXT_PUBLIC_BLOG_LINK!}
                      target="_blank"
                      className="hover:cursor-pointer hover:underline"
                    >
                      BLOG
                    </Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={process.env.NEXT_PUBLIC_DOCS_LINK!} target="_blank">
                  <div className={navigationMenuTriggerStyle()}>DOCS</div>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>CONNECT</NavigationMenuTrigger>
                <NavigationMenuContent className="left-[10.5rem]">
                  <ul className="flex flex-col w-[270px] gap-3 p-4 font-normal text-xs">
                    <Link
                      href={process.env.NEXT_PUBLIC_GITHUB_LINK!}
                      target="_blank"
                      className="hover:cursor-pointer hover:underline"
                    >
                      GITHUB
                    </Link>
                    <Link
                      href={process.env.NEXT_PUBLIC_DISCORD_LINK!}
                      target="_blank"
                      className="hover:cursor-pointer hover:underline"
                    >
                      DISCORD
                    </Link>
                    <Link
                      href={process.env.NEXT_PUBLIC_TWITTER_LINK!}
                      target="_blank"
                      className="hover:cursor-pointer hover:underline"
                    >
                      X(Twitter)
                    </Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-end justify-end ">
          <div>
            {!session ? (
              <Link href="/auth/login" legacyBehavior passHref>
                <div className={navigationMenuTriggerStyle()}>Login</div>
              </Link>
            ) : (
              <div onClick={() => signOut()} className="hover:cursor-pointer hover:underline">
                <p className="text-xs px-4">Logout</p>
              </div>
            )}
          </div>

          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <MobileMenu />
    </header>
  )
}
const MobileMenu = () => {
  const [open, setOpen] = React.useState(false)
  const { data: session } = useSession()

  return (
    <div className={`flex items-center gap-3 md:hidden min-h-[6vh]`}>
      <button onClick={() => setOpen(true)} className={`block ${open ? 'hidden' : null}`}>
        <HamburgerMenuIcon height={28} width={28} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col z-50"
          >
            <div className="flex items-center justify-end p-3 min-h-[9vh]">
              {/* <Logo height={36} width={36} /> */}
              <button
                onClick={() => {
                  setOpen(false)
                }}
              >
                <Cross2Icon height={28} width={28} />
              </button>
            </div>
            <div className="flex flex-col justify-between h-screen overflow-y-scroll bg-neutral-100 p-4 text-black dark:invert">
              <div className="flex flex-col gap-6 text-xl font-thin justify-center items-center h-[50%]">
                <div>About</div>
                <div>Blog</div>
                <div>
                  <Link href={process.env.NEXT_PUBLIC_DOCS_LINK!} target="_blank">
                    <p>Docs</p>
                  </Link>
                </div>
                <div>
                  {!session ? (
                    <Link href="/auth/login">
                      <div>Login</div>
                    </Link>
                  ) : (
                    <div onClick={() => signOut()} className="hover:cursor-pointer hover:underline">
                      <p className="">Logout</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-around font-light text-xs">
                <Link
                  href={process.env.NEXT_PUBLIC_GITHUB_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  GITHUB
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_DISCORD_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  DISCORD
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_TWITTER_LINK!}
                  target="_blank"
                  className="hover:cursor-pointer hover:underline"
                >
                  X(Twitter)
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <div className={`block ${open ? 'hidden' : null}`}>
        <ThemeToggle />
      </div>
    </div>
  )
}
