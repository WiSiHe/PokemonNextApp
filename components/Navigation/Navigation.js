import PropTypes from "prop-types"
import React from "react"

import Link from "next/link"
import clsx from "clsx"

import { NavItems } from "constants/navigation"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import LogoQR from "icons/LogoQR"

export default function Navigation({ hideOnDesktop = false, isAbsolute = false }) {
  const router = useRouter()
  return (
    <motion.nav
      aria-label="Main Navigation"
      aria-hidden={hideOnDesktop}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        type: "spring"
      }}
      className={clsx(
        "bg-stone-900/40 backdrop-blur-lg z-20 text-white",
        hideOnDesktop && "xl:hidden",
        isAbsolute ? "fixed top-0 left-0 right-0" : "relative"
      )}>
      <div className="flex items-center justify-between px-4 py-2 mx-auto">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -180 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", delay: 0.5, bounce: 0.25 }}
            className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center justify-center p-2 text-sm text-white hover:underline decoration-4 group-active:bg-highlight group-focus:ring group-focus:ring-highlight ">
              <LogoQR color="white" fill="white" width="2.5rem" height="2.5rem" />
              {/* <b className="font-bold hover:text-highlight">WiSiHe</b> */}
            </Link>
            {/* <span>|</span> */}
          </motion.div>
          <motion.ul className="flex items-center gap-4 px-4">
            {NavItems.map((item, i) => {
              const { asPath = "" } = router

              const asPathWithSpacing = asPath.replace(/\//g, "/")

              const isActive = asPathWithSpacing.includes(item.url)

              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ type: "spring", delay: 0.4 + (i - 0.8), bounce: 0.4 }}>
                  <Link
                    href={item.url}
                    className={clsx(
                      "transition-all hover:text-highlight  active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                      isActive &&
                        "underline underline-offset-1 decoration-highlight text-highlight decoration-2 font-semibold"
                    )}>
                    {item.text}
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </motion.nav>
  )
}

Navigation.propTypes = {
  darkMode: PropTypes.bool,
  hideOnDesktop: PropTypes.bool,
  isAbsolute: PropTypes.bool
}
