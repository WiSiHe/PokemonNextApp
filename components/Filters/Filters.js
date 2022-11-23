import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import Link from "next/link"
import { IoClose } from "react-icons/io5"
import { BsFilter } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"

const Filters = ({ filteredTags = [], activeFilter = "" }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(false)
  }, [activeFilter])

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setActive(prev => !prev)}
          className={clsx(
            "flex gap-1 items-center overflow-clip px-4 py-1 hover:ring text-sm font-medium text-white bg-primary rounded-full"
          )}>
          {active && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ type: "spring", delay: 0.2, bounce: 0.4 }}
              className="flex items-center gap-1">
              <strong>Close</strong> <IoClose />
            </motion.div>
          )}
          {!active && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ type: "spring", delay: 0.2, bounce: 0.4 }}
              className="flex items-center gap-1">
              <strong>Filter</strong> <BsFilter />
            </motion.div>
          )}
        </button>
        <div
          className={clsx(
            "relative snap-start capitalize  transition py-2 px-4 text-xs  whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
            "bg-highlight hover:bg-highlight text-black"
          )}>
          <strong>{activeFilter}</strong>
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.ul
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring" }}
            className="absolute left-0 right-0 flex flex-wrap gap-3 p-4 shadow-xl top-16 bg-stone-200 backdrop-blur-lg ">
            {filteredTags.map((tag, i) => {
              const { name = "" } = tag
              const convertedLabel = name.toLowerCase()
              const isBuyable = convertedLabel === "store"
              const isActive = convertedLabel === activeFilter.toLocaleLowerCase()
              const url = name === "all" ? "/paintings" : `/paintings/${convertedLabel}`
              return (
                <li key={i}>
                  <Link
                    href={url}
                    className={clsx(
                      "relative snap-start transition py-2 px-4 text-xs  whitespace-nowrap hover:opacity-90 rounded-lg active:bg-highlight focus:outline-none focus:ring focus:ring-highlight",
                      isBuyable && "ring ring-highlight",
                      isActive
                        ? "bg-highlight hover:bg-highlight text-black"
                        : "text-white bg-primary"
                    )}>
                    <strong className="capitalize">{name}</strong>
                    {isBuyable && (
                      <div className="absolute flex items-center justify-center w-4 h-4 rounded-full -right-2 -top-2 text-dark bg-highlight">
                        <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 animate-ping bg-highlight" />
                        <strong>!</strong>
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  )
}

Filters.propTypes = {
  activeFilter: PropTypes.string,
  filteredTags: PropTypes.array,
  paintingsAmount: PropTypes.number,
  setFilterTag: PropTypes.func
}

export default Filters
