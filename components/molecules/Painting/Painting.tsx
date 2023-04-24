import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import { iSanityPainting } from "lib/models/objects/sanityPainting"
import { imageBuilder } from "lib/sanity"
import { useCombinedStore } from "lib/store"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { BsYoutube } from "react-icons/bs"
import { FaExclamation } from "react-icons/fa"
// import { GrMultiple } from "react-icons/gr"
// import { RiMovieFill } from "react-icons/ri"
import { TbBoxMultiple } from "react-icons/tb"

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
  },
  transition: {
    type: "spring",
    // bounce: 0.2,
    // duration: 1,
  },
}

interface iProjectProps {
  paintingData: iSanityPainting
  shouldBeLazy?: boolean
}

const Painting = ({ paintingData, shouldBeLazy = false }: iProjectProps) => {
  const router = useRouter()
  const filterList = useCombinedStore((state) => state.filterList)

  if (!paintingData) {
    return <div>No painting data</div>
  }

  const isNsfwUrl = router.query.slug === "nsfw" || filterList.includes("nsfw")

  const {
    image = {},
    // fetchedPainting = "",
    title = "",
    // format = "square",
    slug = "",
    video = "",
    tagsV2 = [],
    imagesCount = 0,
    // className = "",
  } = paintingData

  // filter out null values of tagsV2
  const filteredTags = tagsV2?.filter((t) => t !== null)

  const salesTagObj = filteredTags?.find((t) => t.name === "Store") || {}

  // tagsV2 contains NSFW tag
  const nsfwTagObj = filteredTags?.find((t) => t.name === "NSFW") || {}

  // check if salesTag is empty
  const hasStoreLinks = Object.keys(salesTagObj).length > 0
  // check if nsfwTag is empty
  const isNsfw = Object.keys(nsfwTagObj).length > 0

  const linkString = `/painting/${slug}`

  return (
    <Link href={linkString} className="rounded-lg">
      <AnimatePresence>
        <motion.article
          // layout
          // layoutId={title}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardVariants}
          // transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
          className="relative w-full h-full @container group bg-white rounded-lg overflow-clip hover:ring hover:ring-primary drop-shadow-xl"
        >
          <div className="relative aspect-square bg-primary overflow-clip">
            <Image
              src={imageBuilder(image).width(400).height(400).quality(55).url()}
              blurDataURL={imageBuilder(image)
                .width(20)
                .height(20)
                .quality(10)
                .url()}
              placeholder="blur"
              sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
              fill
              alt=""
              priority={!shouldBeLazy}
              className={clsx(
                !isNsfw && !isNsfwUrl && "group-hover:scale-110",
                "object-cover w-full h-full transition-all duration-[2000ms] ease-in-out transform bg-center bg-cover bg-gray-100"
              )}
            />
            {hasStoreLinks && (
              <div className="absolute flex items-center flex-shrink-0 gap-2 p-2 text-xs rounded-lg left-2 top-2 bg-highlight">
                <div className="relative w-2 h-2 rounded-full bg-dark">
                  <span className="absolute inset-0 inline-flex w-full h-full rounded-full opacity-100 bg-dark animate-ping"></span>
                </div>
                <strong>For sale</strong>
              </div>
            )}
            {isNsfw && !isNsfwUrl && (
              <div className="absolute inset-0 rounded-lg backdrop-blur-xl" />
            )}
          </div>

          <div className="flex items-start justify-between gap-2 p-2 text-xs bg-white border-t-4 border-t-primary ">
            <h2 className="text-lg capitalize line-clamp-1">
              <strong>{title}</strong>
            </h2>
            <div className="flex items-start gap-1">
              {video && (
                <div className="flex items-center justify-center p-2 text-white rounded-lg bg-primary">
                  <BsYoutube />
                </div>
              )}
              {imagesCount && imagesCount > 0 && (
                <div className="flex items-center justify-center p-2 text-white rounded-lg bg-primary stroke-white">
                  <TbBoxMultiple />
                </div>
              )}
              {isNsfw && (
                <div className="flex items-center justify-center p-2 text-white rounded-lg bg-primary">
                  <FaExclamation />
                </div>
              )}
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </Link>
  )
}

export default Painting
