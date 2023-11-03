import type { NextPage } from "next";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";

const Inventory: NextPage = (props: any) => {
  const [inventory, setInventory] = useState<any[]>(props.inventory.items);

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-semibold mb-4">Inventory</h3>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {inventory.map((item, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <Image
                  isZoomed
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.resourceName}
                  // className="w-full object-cover h-[140px]"
                  src={item.img_url}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.resourceName}</b>
                <Chip variant="bordered" color="success" className="p-1 text-white">
                  x{item.quantity}
                </Chip>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/api/inventory/653e5b167513aa9933ce90db");

  return {
    props: {
      inventory: response.data,
    }
  };
});