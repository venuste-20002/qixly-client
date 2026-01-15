import { Skeleton } from "@/components/ui/skeleton";

export default function SingleCardSkeleton() {
  return (
    <>
      <div className={"space-y-6 my-5"}>
        <Skeleton className={"w-full h-[200px] shadow-lg"} />
        <Skeleton className={"w-1/2 h-5"} />
        <div className={"flex items-center justify-between"}>
          <Skeleton className={"w-[100px] h-5"} />
          <Skeleton className={"w-[100px] h-5"} />
        </div>
        <div className={"space-y-2"}>
          <Skeleton className={"w-1/2 h-5"} />
          <div className={"space-y-2"}>
            <Skeleton className={"w-full h-10"} />
            <Skeleton className={"w-full h-10"} />
            <Skeleton className={"w-full h-10"} />
          </div>
        </div>
        <Skeleton className={"w-1/2 h-5"} />
        <Skeleton className={"w-full h-[100px]"} />
      </div>
    </>
  );
}
