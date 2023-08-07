"use client"
import clsx from "clsx"
import AnimatedLogo from "components/atoms/AnimatedLogo"
import NavigationModal from "components/molecules/NavigationModal"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaHamburger } from "react-icons/fa"

interface iNavigationProps {
  isAbsolute?: boolean
}
const Navigation = ({ isAbsolute = true }: iNavigationProps) => {
  const pathName = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  // if router navigates close the modal
  useEffect(() => {
    setIsOpen(false)
  }, [pathName])

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={clsx(
          "z-20 flex items-center justify-between py-2 px-4 mix-blend-difference text-white",
          isAbsolute ? "absolute top-0 left-0 right-0" : "relative"
        )}
      >
        <AnimatedLogo theme="light" />
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-2 transition-all hover:bg-primary active:text-white hover:text-white active:bg-primary"
        >
          <FaHamburger />
        </button>
      </nav>
      <NavigationModal
        isOpen={isOpen}
        closeModal={() => setIsOpen((prev) => !prev)}
      />
    </>
  )
}

export default Navigation
