import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <>
            <Card className="w-[168px] h-[190px] overflow-hidden bg-transparent">
                <Skeleton className={"w-full rounded-2xl h-[60%]"} />
                <div className={"p-3 flex flex-col gap-2"}>
                    <Skeleton className={"w-[80%] h-2"} />
                    <Skeleton className={"w-[80%] h-2"} />
                    <Skeleton className={"w-[80%] h-2"} />
                </div>
            </Card>
        </>
    );
}

export function ProductCardOneSkeleton() {
    return (
        <>
            {/*Card skeleton*/}
            <Card className={"w-full h-[100px] p-2 flex gap-2"}>
                <Skeleton className={"h-full w-[65%] rounded-2xl"} />
                <div
                    className={
                        "w-full space-y-4 flex flex-col px-3"
                    }
                >
                    <Skeleton className={"h-4 w-full"} />
                    <Skeleton className={"h-4 w-full"} />
                    <Skeleton className={"h-4 w-1/2"} />
                </div>
            </Card>
        </>
    )
}