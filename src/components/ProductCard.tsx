import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { GetImage } from "@/utils/getImages";
import ImageShow from "@/components/ImageShow";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

/*
 * @Goto card
 * @description Handle category change
 * @param id {string} The id of the card
 * @return {TSX.Element}
 * */
function handleGotoCard(id: string, router: AppRouterInstance) {
  router.push(`/cards/${id}`);
}

/*
 * @ProductCardProps
 * @description The props for the ProductCard
 * @name {string} The name of the product
 * @image {string} The image of the product
 * @institutionName {string} The name of the institution
 * @expiryDate {string} The expiry date of the product
 * @startPrice {string} The starting price of the product
 * @return {TSX.Element}
 **/
interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  institutionName: string;
  expiryDate: Date;
  startPrice: number;
}

/*
 * @ProductCard
 * @return {TSX.Element}
 * */
export function ProductCard({
  id,
  name,
  image,
  institutionName,
  expiryDate,
  startPrice,
}: ProductCardProps) {
  const imageUrl: string = GetImage(image);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return (
    <Card
      className="w-[168px] overflow-hidden cursor-pointer rounded-2xl hover:bg-primaryGray/5"
      onClick={(e) => {
        e.preventDefault();
        handleGotoCard(id, router);
      }}
    >
      {/*The top part*/}
      <div className="relative">
        {/*The price and the background image */}
        <div className="h-[112px] relative bg-cover bg-center rounded-b-2xl overflow-hidden">
          {/*The background Effect*/}
          {imageUrl && (
            <ImageShow
              src={imageUrl || "/pizza.jpg"}
              alt={"Card Image"}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl" />
        </div>
        {/*The price part*/}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] flex justify-center items-center">
          <Badge variant={"price"}>
            <p className="text-center">
              {startPrice === Infinity ? (
                <span>-</span>
              ) : (
                <>
                  <strong className="text-primary">from</strong>{" "}
                  {startPrice?.toLocaleString()} rwf
                </>
              )}
            </p>
          </Badge>
        </div>
      </div>

      {/*The bottom part*/}
      <div className="p-2 pt-5 flex flex-col gap-1">
        {/*The name of the product*/}
        <p className="text-md font-bold capitalize">{name}</p>
        <p className="text-sm text-primaryGray capitalize">{institutionName}</p>
        <p className="text-[12px] text-primaryGray ">
          Deal ends on{" "}
          {new Date(expiryDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </Card>
  );
}

interface ProductCardOneProps {
  id: string;
  name: string;
  image: string;
  institutionName: string;
  expiryDate: Date;
}

export function ProductCardOne({
  id,
  name,
  image,
  institutionName,
  expiryDate,
}: ProductCardOneProps) {
  const imageUrl: string = GetImage(image);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return (
    <>
      {/*Card structure*/}
      <Card
        className={"w-full p-3 flex gap-2 hover:bg-primaryGray/5"}
        onClick={(e) => {
          e.preventDefault();
          handleGotoCard(id, router);
        }}
      >
        <div className={"w-[40%] relative"}>
          {imageUrl && (
            <ImageShow
              src={imageUrl}
              alt={"card image"}
              fill
              className={"rounded-2xl"}
            />
          )}
        </div>
        <div className={""}>
          <p className="text-lg font-semibold capitalize">{name}</p>
          <p className="text-md text-primaryGray capitalize">
            {institutionName}
          </p>
          <p className="text-sm text-primaryGray ">
            Deal ends on{" "}
            {new Date(expiryDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>{" "}
        </div>
      </Card>
    </>
  );
}
