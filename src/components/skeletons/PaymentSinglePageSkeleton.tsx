import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PaymentSinglePageSkeleton() {
  return (
    <div className={"space-y-6"}>
      <div className="space-y-3">
        <Card className={"p-5 flex items-center gap-10"}>
          <Skeleton className={"w-20 h-20 rounded-xl"} />
          <div className={"space-y-2"}>
            <Skeleton className={"w-[100px] h-5 rounded-xl"} />
            <Skeleton className={"w-[100px] h-5 rounded-xl"} />
            <Skeleton className={"w-[100px] h-5 rounded-xl"} />
          </div>
          <Skeleton className={"w-[100px] h-[30px] rounded-2xl"} />
        </Card>
        <Card className={"p-5 flex items-center gap-10"}>
          <Skeleton className={"w-20 h-20 rounded-xl"} />
          <div className={"space-y-2"}>
            <Skeleton className={"w-[100px] h-5 rounded-xl"} />
            <Skeleton className={"w-[100px] h-5 rounded-xl"} />
            <Skeleton className={"w-[100px] h-5 rounded-xl"} />
          </div>
          <Skeleton className={"w-[100px] h-[30px] rounded-2xl"} />
        </Card>
      </div>
      <div className={"space-y-3"}>
        <Skeleton className={"w-40 h-5 rounded-xl"} />
        <div className={"flex justify-between"}>
          <Skeleton className={"w-20 h-5 rounded-xl"} />
          <Skeleton className={"w-20 h-5 rounded-xl"} />
        </div>
        <div className={"flex justify-between"}>
          <Skeleton className={"w-20 h-5 rounded-xl"} />
          <Skeleton className={"w-20 h-5 rounded-xl"} />
        </div>
        <div className={"flex justify-between"}>
          <Skeleton className={"w-20 h-5 rounded-xl"} />
          <Skeleton className={"w-20 h-5 rounded-xl"} />
        </div>
      </div>
      <Skeleton className={"w-full h-16 rounded-xl"} />
    </div>
  );
}
