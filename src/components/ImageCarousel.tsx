import { Swiper, SwiperSlide } from "swiper/react";
import { GetImage } from "@/utils/getImages";
import ImageShow from "@/components/ImageShow";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

/*
 * Carousel component
 * */
export default function ImageCarousels({ images }: { images: string[] }) {
  const blobImages: string[] = [];
  images?.forEach((image) => {
    const currentImage = GetImage(image);
    if (currentImage) {
      blobImages.push(currentImage);
    }
  });
  return (
    <div className="w-full h-full">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {blobImages.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <ImageShow src={image} alt="image" fill />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
