import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import {MouseEvent} from "react";

/*
 * @CategoriesButtonSkeleton
 * @return {TSX.Element}
 * */
export function CategoriesButtonSkeleton() {
  return (
    <div className={"category_container h-[120px] gap-4"}>
      <Skeleton
        className={
          "w-[40px] mt-5 h-[40px] animate-pulse bg-primaryGray/10 rounded-full"
        }
      />
      <Skeleton className={"w-full p-1 rounded-full"} />
    </div>
  );
}

/*
 * @CategoriesButtonProps
 * @param id {string} The id of the category
 * @param name {string} The name of the category
 * */
interface categoriesButtonProps {
  id?: string;
  name: string;
}

/*
 * @CategoriesButton
 * @return {TSX.Element}
 **/
export default function CategoriesButton({ id, name }: categoriesButtonProps) {
  const router = useRouter();

  /*
   * @CategoriesButton
   * @description Handle category change
   * @param id {string} The id of the category
   * @return {TSX.Element}
   * */
  const handleGotoCategory = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/cards?categories=${id}`);
  };

  return (
    <>
      <div
        onClick={handleGotoCategory(id!)}
        className={
          "group hover:text-white cursor-pointer category_container gap-2 hover:bg-primary"
        }
      >
        <div
          className={
            "rounded-full p-3 group-hover:bg-white shadow-md group-hover:text-white"
          }
        >
          <SlidersHorizontal className={"text-primary text-2xl"} />
        </div>
        <p className={"font-medium text-[0.75rem]"}>{name}</p>
      </div>
    </>
  );
}
