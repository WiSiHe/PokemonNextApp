import { iSanityTag } from "./SanityTag"
import { iSanityImage } from "./sanityImage"

interface iSanitySlug {
  _type: string
  current: string
}

export interface iSanityProject {
  _id: string
  title: string
  description: string
  slug: iSanitySlug
  tags: iSanityTag[]
  status: "onHold" | "inProgress" | "completed" | "cancelled" | "abandoned"
  projectStart: string
  projectEnd: string
  content: any
  connectedPaintings: any
  image: iSanityImage
}
