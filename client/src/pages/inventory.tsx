import type { NextPage } from "next";
import { Card, CardBody, CardFooter, Chip, Image } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { AuthContext } from "../components/contexts/AuthContext";

const Inventory: NextPage = () => {
  const apiClient = setupAPIClient();
  const user = useContext(AuthContext);
  const [inventory, setInventory] = useState<any[]>();

  useEffect(() => {
    apiClient.get(`/api/inventory/${user?.user?.inventoryId}`).then((res) => {
      setInventory(res.data);
    }).catch((err) => {
      console.error("error on loading planets");
    });
  }, [inventory])

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

  return {
    props: {}
  };
});