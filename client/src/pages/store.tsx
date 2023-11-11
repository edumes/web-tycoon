import type { NextPage } from "next";
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, CardFooter, Chip, Image, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "../services/api";
import { canSSRAuth } from "../utils/canSSRAuth";
import { AuthContext } from "../components/contexts/AuthContext";
import { InventoryIcon } from "../components/icons/sidebar/inventory-icon";
import { MineralIcon } from "../components/icons/mineral-icon";
import CardSkeleton from "../components/ui/CardSkeleton";
import { UpgradeIcon } from "../components/icons/upgrade-icon";

const Store: NextPage = () => {
  const apiClient = setupAPIClient();
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [inventory, setInventory] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<any>("ores");

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-2">
        
      </div>
    </div>
  );
};

export default Store;