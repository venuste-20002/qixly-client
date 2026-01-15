import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

/*
 * @SalesItemSkeleton
 * @description The skeleton for the sales item
 * */
export default function SalesItemSkeleton() {
  return (
    <div className="space-y-3">
      <Card className="px-1 py-2 items-center flex justify-around gap-1">
        <Skeleton className="w-20 h-20 rounded-2xl" />
        <div className="space-y-1">
          <Skeleton className="w-22 h-5 rounded-2xl" />
          <Skeleton className="w-24 h-5 rounded-2xl" />
          <Skeleton className="w-16 h-5 rounded-2xl" />
        </div>
        <Skeleton className="w-16 h-5 rounded-2xl" />
        <Skeleton className="w-24 h-10 rounded-2xl" />
      </Card>
      <Card className="px-1 py-2 items-center flex justify-around gap-1">
        <Skeleton className="w-20 h-20 rounded-2xl" />
        <div className="space-y-1">
          <Skeleton className="w-22 h-5 rounded-2xl" />
          <Skeleton className="w-24 h-5 rounded-2xl" />
          <Skeleton className="w-16 h-5 rounded-2xl" />
        </div>
        <Skeleton className="w-16 h-5 rounded-2xl" />
        <Skeleton className="w-24 h-10 rounded-2xl" />
      </Card>
      <div className="w-full flex justify-center items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-10 h-10 rounded-xl" />
      </div>
    </div>
  );
}
