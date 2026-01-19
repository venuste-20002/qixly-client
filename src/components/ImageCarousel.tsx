import { Swiper, SwiperSlide } from "swiper/react";
import { useGetImage } from "@/utils/getImages";
import ImageShow from "@/components/ImageShow";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

/*
 * Individual image component that uses the hook
 * */
function CarouselImage({ image }: { image: string }) {
  const imageUrl = useGetImage(image);
  return <ImageShow src={imageUrl} alt="image" fill />;
}

/*
 * Carousel component
 * */
export default function ImageCarousels({ images }: { images: string[] }) {
  return (
    <div className="w-full h-full">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {images?.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <CarouselImage image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
