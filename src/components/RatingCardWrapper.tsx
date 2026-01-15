"use client"

import dynamic from "next/dynamic"

const RatingCard = dynamic(() => import("./RatingCard"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function RatingCardWrapper() {
  return <RatingCard />
}

