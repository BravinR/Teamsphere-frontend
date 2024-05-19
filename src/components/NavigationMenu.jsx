import React from "react";
import logo from "./../assets/logo.png"
import FolderSvg from "./svg/FolderSvg"
import CalendarSvg from "./svg/CalendarSvg"
import RatingSvg from "./svg/RatingSvg"
import SavedSvg from "./svg/SaveSvg"
import SettingsSvg from "./svg/SettingsSvg"
import ChatsSvg from "./svg/ChatSvg";

function NavigationMenu() {

  return (
    <div className="hidden md:flex md:flex-col md:items-center h-screen text-neutral-400 w-40 text-sm justify-between">
        {/* Logo */}
        <div className="mb-16 pt-4">
            <a href="#">
                <img src={logo} alt="Teamsphere company logo" />
            </a>
        </div>
        <div className="h-1/2 flex flex-col justify-between mb-52">
            {/* First Section */}
            <div>
                <a href="#" className="flex flex-col items-center">
                <ChatsSvg className="w-5 mb-2 stroke-white"/>
                </a>
                <h1>All chats</h1>
            </div>
            <div>
                <a href="#" className="flex flex-col items-center">
                    <FolderSvg className="fill-white w-5 mb-2"/> 
                    <h1>Work</h1>
                </a>
            </div>
            <div>
                <a href="#" className="flex flex-col items-center">
                    <FolderSvg className="fill-white w-5 mb-2"/> 
                    <h1>Meet</h1>
                </a>
            </div>
            <div className="border-t border-gray-400 w-full h-0"></div>


            <div>
                <a href="#" className="flex flex-col items-center">
                    <CalendarSvg className="fill-white w-5 mb-2"/>
                    <h1>Calendar</h1>
                </a>
            </div>
            <div>
                <a href="#" className="flex flex-col items-center">
                    <RatingSvg className="fill-white w-5 mb-2"/>
                    <h1>Rating</h1>

                </a>
            </div>
            <div>
                <a href="#" className="flex flex-col items-center">
                    <SavedSvg className="fill-white w-5 mb-2"/>
                    <h1>Saved</h1>
                </a>
            </div>

        </div>

        {/* Settings Section */}
        <div className="mb-4">
            <a href="#" className="flex flex-col items-center">
                <SettingsSvg className="fill-white w-5 mb-2"/>
                <h1>Settings</h1>
            </a>
        </div>
    </div>

  );
}

export default NavigationMenu;