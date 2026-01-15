import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import ImageCarousels from "@/components/ImageCarousel";
import React from "react";

export default function HeaderImage({ image }: { image: string[] }) {
    const router = useRouter();
    return (
        <div className="w-full h-[35vh] rounded-2xl bg-cover relative overflow-hidden border shadow-lg">
            {/*the buttons*/}
            <div className="flex items-center justify-between absolute top-0 left-0 right-0 p-3 z-50">
                <Button variant="header" onClick={() => router.back()}>
                    <ChevronLeft />
                </Button>
                {/*<Badge variant="button" className="p-2">*/}
                {/*  <Heart className="fill-white text-sm" />*/}
                {/*</Badge>*/}
            </div>
            {/* Image */}
            {!image ? (
                <div className="w-full h-full">
                    <Skeleton className="w-full h-full" />
                </div>
            ) : (
                <div className={"w-full h-full z-40"}>
                    <ImageCarousels images={image} />
                </div>
            )}
        </div>
    );
}
