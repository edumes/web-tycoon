import { Card, Skeleton } from "@nextui-org/react";
import type { NextPage } from "next";

const CardSkeleton: NextPage = () => {
    return (
        <Card className="w-[300px] space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-72 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>
        </Card>
    )
}

export default CardSkeleton;