"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import night from "public/images/night-forest.jpeg"
import celestial from "public/images/paintings/Celestial.jpg"
import creepy from "public/images/paintings/creepy.jpg"
import hell from "public/images/paintings/hell.jpg"
import space from "public/images/paintings/Space.jpg"
import sunlight from "public/images/paintings/sunlight.jpg"
import winter from "public/images/paintings/winter.jpg"
import { useEffect, useState } from "react"
import { isEmptyArray } from "utils/array"

const paintings = [
  {
    id: 1,
    name: "Celestial",
    image: celestial,
    description: "Celesital",
  },
  {
    id: 4,
    name: "Night",
    image: night,
    description: "Night",
  },
  {
    id: 5,
    name: "Space",
    image: space,
    description: "Space",
  },
  {
    id: 6,
    name: "Hell",
    image: hell,
    description: "Hell",
  },
  {
    id: 7,
    name: "Creepy",
    image: creepy,
    description: "Creepy",
  },
  {
    id: 8,
    name: "Sunlight",
    image: sunlight,
    description: "Sunlight",
  },
  {
    id: 9,
    name: "Winter",
    image: winter,
    description: "Winter",
  },
]

const CarouselStatic = () => {
  const [sortedPaintings, setSortedPaintings] = useState(paintings)

  useEffect(() => {
    if (!paintings || isEmptyArray(paintings)) return
    setSortedPaintings(paintings.sort(() => 0.5 - Math.random()))
  }, [])

  return (
    <section className="relative ">
      <ul className="flex flex-no-wrap items-start w-full gap-4 py-8 pl-4 pr-8 overflow-x-scroll scrolling-touch snap-x">
        {sortedPaintings.map((painting, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ stiffness: 260, damping: 20, bounce: 0.8 }}
            viewport={{ once: true }}
            className="relative flex-none aspect-square xl:aspect-portrait rounded-lg h-80 xl:h-[820px] overflow-clip drop-shadow"
          >
            <Image
              src={painting.image}
              placeholder="blur"
              quality={50}
              alt={painting.description}
              className="object-cover w-full h-full"
              sizes="(min-width: 1280px) 540px, 224px"
              fill
            />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default CarouselStatic
