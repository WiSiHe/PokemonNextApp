import { Filters, Footer, Main, Meta, Navigation, Painting } from "components"
import { getAllTags, getAllTagsAndPaintingsLight } from "lib/api"
import React from "react"
import { slugify } from "utils/string"
// import { imageBuilder } from "lib/sanity"

export interface iTag {
  label: string
  count: number
}
export interface iPaintingTag {
  label: string
  value: string
}

export interface iPainting {
  _id: string
  _type: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  aspectRatio?: string
  redbubbleUrl?: string
  format?: string
  title: string
  slug: {
    current: string
    _type: string
  }
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  tags: iPaintingTag[]
  tagsV2: {
    name: string
  }
}

export interface PaintingsPageProps {
  slug: string
  paintings: iPainting[]
  tags: iTag[]
}

const PaintingsPage = ({
  slug = "",
  paintings = [],
  tags = [],
}: PaintingsPageProps) => {
  const tagsWithAll = [{ name: "All" }, ...tags]
  return (
    <>
      <Meta
        title="Gallery"
        url="https://wisihe.no/gallery"
        description="A gallery of some of my paintings"
      />
      <Navigation />

      <Main noTopPadding>
        <section className="relative grid flex-1 flex-grow h-full min-h-screen grid-cols-12 overflow-clip">
          <section className="col-span-full">
            <div className="sticky top-0 z-20 p-4 bg-stone-200 bg-opacity-10 backdrop-blur-lg">
              <Filters
                filteredTags={tagsWithAll}
                activeFilter={slug}
                amountOfPaintings={paintings.length}
              />
            </div>
            <div className="p-2 xl:p-4">
              <h1 className="text-2xl font-bold">Browse some of my: {slug}</h1>
            </div>
            {/* <PaintingGrid paintings={paintings} filterTag={slug} /> */}
            <div className="grid grid-cols-12 gap-2 p-2 mb-10 xl:gap-4 xl:p-4">
              {paintings.map((p) => {
                const { _id } = p
                return <Painting paintingData={p} key={_id} />
              })}
            </div>
          </section>
        </section>
      </Main>
      <Footer />
    </>
  )
}

export default PaintingsPage

export async function getStaticProps({ params }) {
  const { slug = "" } = params

  const data = await getAllTagsAndPaintingsLight()

  if (data.length < 1) {
    return { props: {} }
  }

  // const imageWidth = {
  //   square: 400,
  //   landscape: 800,
  //   portrait: 400
  // }

  // const imageHeight = {
  //   square: 400,
  //   landscape: 400,
  //   portrait: 800
  // }

  const { paintings = [], tags = [] } = data

  // sort paintings by paintingsCount
  const sortedTags = tags
    .filter((p) => p.paintingsCount > 5)
    .sort((a, b) => b.paintingsCount - a.paintingsCount)

  const filteredPaintings =
    paintings.filter((p) => p.tagsV2?.find((t) => slugify(t.name) === slug)) ||
    []

  // const paintingsWithPriority = filteredPaintings.map(p => {
  //   const { format = "square", image = {} } = p
  //   const fetchedPainting = imageBuilder(image)
  //     .width(imageWidth[format])
  //     .height(imageHeight[format])
  //     .quality(45)
  //     .url()

  //   return { ...p, fetchedPainting }
  // })

  return {
    props: {
      paintings: filteredPaintings,
      slug: slug,
      tags: sortedTags,
    },
    revalidate: 7200, // 120  min
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTags()

  const paths = allTags
    .filter((p) => p.paintingsCount < 5)
    .map((tag) => {
      const { name = "" } = tag
      const slug = slugify(name)
      return {
        params: { slug: slug },
      }
    })

  return {
    paths,
    fallback: true,
  }
}
