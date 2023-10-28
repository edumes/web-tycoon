import {
  Avatar,
  AvatarIcon,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";

export const UserDropdown = () => {
  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-gradient-to-br from-[#f8b559] to-[#8a4b00]",
              icon: "text-black/80",
            }}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as StarMiner</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" className="text-danger ">
          Log Out
        </DropdownItem>
        {/* <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem> */}
      </DropdownMenu>
    </Dropdown>
  );
};
