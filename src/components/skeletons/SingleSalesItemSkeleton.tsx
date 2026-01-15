import { Skeleton } from "../ui/skeleton";

export default function SingleSaleItemSkeleton() {
  return (
    <div className={"space-y-6"}>
      <Skeleton className="w-full h-[300px] rounded-2xl" />
      <div className={"space-y-3"}>
        <Skeleton className="w-1/2 h-5 rounded-2xl" />
        <Skeleton className="w-1/2 h-5 rounded-2xl" />
        <Skeleton className="w-1/2 h-5 rounded-2xl" />
      </div>

      <Skeleton className="w-full h-[200px] rounded-2xl" />
      <div className={"flex justify-around"}>
        <Skeleton className="w-[40%] h-12 rounded-2xl" />
        <Skeleton className="w-[40%] h-12 rounded-2xl" />
      </div>
    </div>
  );
}
