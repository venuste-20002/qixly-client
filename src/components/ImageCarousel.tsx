import { Swiper, SwiperSlide } from "swiper/react";
import { useGetImage } from "@/utils/getImages";
import ImageShow from "@/components/ImageShow";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function CarouselImage({ image }: { image: string }) {
  const imageUrl = useGetImage(image);
  return (
    <div className="relative w-full h-full">
      <ImageShow src={imageUrl} alt="image" fill />
    </div>
  );
}

export default function ImageCarousels({ images }: { images: string[] }) {
  return (
    <div className="w-full h-full">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={true}
        loop={images && images.length > 1}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={true}
        className="w-full h-full"
      >
        {images?.map((image: string, index: number) => (
          <SwiperSlide key={index} style={{ width: "100%", height: "100%" }}>
            <CarouselImage image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
