import type { NextPage } from "next";
import { Avatar, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, Chip, Image, Radio, RadioGroup, Skeleton, Spinner, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Tooltip, colors } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { AuthContext } from "../components/contexts/AuthContext";
import { InventoryIcon } from "../components/icons/sidebar/inventory-icon";
import { MineralIcon } from "../components/icons/mineral-icon";
import CardSkeleton from "../components/ui/CardSkeleton";
import { UpgradeIcon } from "../components/icons/upgrade-icon";
import { EyeIcon } from "../components/icons/table/eye-icon";
import { AtIcon } from "../components/icons/at-icon";
import { CoinIcon } from "../components/icons/coin-icon";

const Store: NextPage = () => {
  const apiClient = setupAPIClient();
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [inventory, setInventory] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<any>("ores");

  useEffect(() => {
    if (user?.user?._id) {
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
    }
  }, []);
  console.log(inventory)

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-3">
        <h3 className="text-3xl font-semibold mb-4">
          <Tabs
            aria-label="Inventory Tabs"
            selectedKey={currentPage}
            onSelectionChange={setCurrentPage}
          >
            <Tab key="ores" title={
              <div className="flex items-center space-x-2">
                <MineralIcon />
                <span>Ores</span>
              </div>
            }>
              <div className="w-full mb-4 grid justify-end">
                <Button color="success" size="lg" variant="flat" endContent={<CoinIcon />}>
                  Sell
                </Button>
              </div>
              <Table
                color="warning"
                selectionMode="multiple"
                removeWrapper
                aria-label="Inventory Table"
              >
                <TableHeader>
                  <TableColumn>PHOTO</TableColumn>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>QUANTITY</TableColumn>
                </TableHeader>
                <TableBody isLoading={loading} emptyContent="Your inventory is empty">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton className="flex rounded-full w-12 h-12" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-3/5 rounded-lg" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-1/5 rounded-lg" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    inventory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Avatar src={item.img_url} size="md" isBordered radius="sm" />
                        </TableCell>
                        <TableCell>{item.resourceName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="upgrades" title={
              <div className="flex items-center space-x-2">
                <UpgradeIcon />
                <span>Upgrades</span>
              </div>
            }>
              <Card>
                <CardBody>
                  Em breve...
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </h3>
      </div>
    </div>
  );
};

export default Store;