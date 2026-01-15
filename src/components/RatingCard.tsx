"use client"

import { Loader2, Star } from "lucide-react"
import { useGetInstitutions } from "@/hooks/useGetInstitutions"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function RatingCard() {
  const { data, isLoading } = useGetInstitutions({ page: 1, per_page: 10 });
  const [rating, setRating] = useState(4)
  const [loading, setLoading] = useState(true)

  return (
    <div className="w-full mx-auto">
      <Card className="border-0 shadow-none">
        <CardHeader className="p-0">
          <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-black">
            {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-05%20151408-PGpS5MgdOjsePbbgZbiKEcRxCIBVMy.png"
              alt="Restaurant interior"
              fill
              className="object-cover"
            /> */}
          </div>
          <div className="flex flex-col items-center -mt-8">
            <div className="relative w-16 h-16 rounded-full bg-[#FFB800] flex items-center justify-center border-4 border-white">
              <span className="text-white text-xl">{data ? data.name.charAt(0) : ''}</span>

              <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center pt-4 space-y-4">
          <div className="space-y-1">
            <h2 className="font-semibold text-xl">{data?.name || 'Loading...'}</h2>
            <p className="text-sm text-muted-foreground">{data?.address || 'Loading...'}</p>
            <Badge variant="secondary" className="bg-green-50 text-green-600 hover:bg-green-50">
              ● Verified
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="font-medium">Please Rate Service</p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${
                    star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div> 

            <p className="flex-"></p>
          </div>

          <div className="space-y-8 border-t items-center">
            <Textarea placeholder="Write review" className="min-h-[100px] resize-none border-gray-200 " />
            <Button className="w-64 h-14 rounded-full bg-primary hover:bg-primary text-white">
              {loading}
              SUBMIT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
