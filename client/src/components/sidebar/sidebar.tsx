import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip, Image, AvatarIcon } from "@nextui-org/react";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PlanetIcon } from "../icons/sidebar/planet-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { useRouter } from "next/router";
import { InventoryIcon } from "../icons/sidebar/inventory-icon";
import { RocketIcon } from "../icons/sidebar/rocket-icon";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Image
            isBlurred
            isZoomed
            // width={240}
            src={'https://i.imgur.com/sl8yi6n.png'}
            alt="Starmine Logo"
          // className="m-1"
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Planets"
              icon={<PlanetIcon />}
              isActive={router.pathname === "/planets"}
              href="/planets"
            />
            <SidebarMenu title="Menus">
              <SidebarItem
                isActive={router.pathname === "/store"}
                title="Intergalatic Shop"
                icon={<AccountsIcon />}
                href="store"
              />
              {/* <SidebarItem
                isActive={router.pathname === "/payments"}
                title="Mining"
                icon={<RocketIcon />}
              /> */}
              {/* <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              /> */}
              <SidebarItem
                isActive={router.pathname === "/inventory"}
                title="Inventory"
                icon={<InventoryIcon />}
                href="/inventory"
              />
              {/* <SidebarItem
                isActive={router.pathname === "/products"}
                title="Ores"
                icon={<ProductsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={router.pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            {/* <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip> */}
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                icon={<AvatarIcon />}
                size="sm"
                classNames={{
                  base: "bg-gradient-to-br from-[#f8b559] to-[#8a4b00]",
                  icon: "text-black/80",
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
