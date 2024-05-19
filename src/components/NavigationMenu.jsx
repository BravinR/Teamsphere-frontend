import React from "react";
import logo from "./../assets/logo.png"
import FolderSvg from "./svg/FolderSvg"
import CalendarSvg from "./svg/CalendarSvg"
import RatingSvg from "./svg/RatingSvg"
import SavedSvg from "./svg/SaveSvg"
import SettingsSvg from "./svg/SettingsSvg"
import ChatsSvg from "./svg/ChatSvg";
import LogoutButton from "./LogoutButton";

const navItems = [
  { id: 1, href: "#", component: <ChatsSvg className="w-5 mb-2 stroke-white" />, label: "All chats" },
  { id: 2, href: "#", component: <FolderSvg className="fill-white w-5 mb-2" />, label: "Work" },
  { id: 3, href: "#", component: <FolderSvg className="fill-white w-5 mb-2" />, label: "Meet" },
  { id: 4, href: "#", component: <CalendarSvg className="fill-white w-5 mb-2" />, label: "Calendar" },
  { id: 5, href: "#", component: <RatingSvg className="fill-white w-5 mb-2" />, label: "Rating" },
  { id: 6, href: "#", component: <SavedSvg className="fill-white w-5 mb-2" />, label: "Saved" },
  { id: 7, href: "#", component: <SettingsSvg className="fill-white w-5 mb-2" />, label: "Settings" },
];

function NavigationMenu() {
  return (
    <div className="hidden md:flex md:flex-col md:items-center h-screen text-neutral-400 w-40 text-sm justify-between bg-chat-dark">
      {/* Logo */}
      <div className="mb-16 pt-4">
            <a href="#">
                <img src={logo} alt="Teamsphere company logo" />
            </a>
      </div>
      <div className="h-1/2 flex flex-col justify-between mb-52">
        {navItems.slice(0, 6).map(item => (
          <div key={item.id}>
            <a href={item.href} className="flex flex-col items-center">
              {item.component}
              <h1>{item.label}</h1>
            </a>
          </div>
        ))}
        <div className="border-t border-gray-400 w-full h-0"></div>
      </div>
      {/* Settings Section */}
      <div className="mb-4">
        <a href={navItems[6].href} className="flex flex-col items-center">
          {navItems[6].component}
          <h1>{navItems[6].label}</h1>
        </a>
      </div>
    </div>
  );
}

export default NavigationMenu;