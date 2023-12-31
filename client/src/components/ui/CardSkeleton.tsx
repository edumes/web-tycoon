import { Card, Skeleton, Image, CardBody, CardFooter, Chip } from "@nextui-org/react";
import type { NextPage } from "next";

const CardSkeleton: NextPage = () => {
    return (
        <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
                <Skeleton className="rounded-lg">
                    <div className="h-72 rounded-lg bg-default-300"></div>
                </Skeleton>
            </CardBody>
            <CardFooter className="text-small justify-between">
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
            </CardFooter>
        </Card>
    )
}

export default CardSkeleton;