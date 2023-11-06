import type { NextPage } from "next";
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, CardFooter, Chip, Image, Skeleton } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { AuthContext } from "../components/contexts/AuthContext";
import { InventoryIcon } from "../components/icons/sidebar/inventory-icon";
import { MineralIcon } from "../components/icons/mineral-icon";
import CardSkeleton from "../components/ui/CardSkeleton";

const Inventory: NextPage = () => {
  const apiClient = setupAPIClient();
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [inventory, setInventory] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<any>("ores");

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const response = await apiClient.get(`/api/inventory/${user?.user?._id}`);
          setInventory(response.data.items);
          setLoading(false);
        } catch (err) {
          console.error("error on loading inventory", err);
          setLoading(false);
        }
      }, 1000); // Atraso de 2 segundos (2000 milissegundos)
    };
    fetchData();
  }, []);

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-semibold mb-4">
          <Breadcrumbs underline="hover" onAction={(key) => setCurrentPage(key)}>
            <BreadcrumbItem key="inventory" isCurrent={currentPage === "inventory"} startContent={<InventoryIcon />}>
              Inventory
            </BreadcrumbItem>
            <BreadcrumbItem key="ores" isCurrent={currentPage === "ores"} startContent={<MineralIcon />}>
              Ores
            </BreadcrumbItem>
          </Breadcrumbs>
        </h3>
        {loading ? (
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {inventory.length === 0 ? (
              <div className="text-center">Inventory is empty</div>
            ) : (
              inventory.map((item, index) => (
                <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      isZoomed
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.resourceName}
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;