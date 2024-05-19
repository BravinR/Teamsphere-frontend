import React from "react";
import SearchSvg from "./svg/SearchSvg";
import CallSvg from "./svg/CallSvg";

const ChatTitle = ({ chatData }) => {
  return (
    <div className="bg-gray-900 flex justify-between mx-8 my-4 text-sm">
        <div className="flex flex-col">
            <h1 className="text-white">Hello</h1>
            <p className="text-gray-400">online</p>
        </div>
        <div className="flex">
           <SearchSvg className="stroke-gray-400 w-5 mx-2"/>
           <CallSvg className="fill-gray-400 w-5 mx-2"/>
        </div>
    </div>
  );
}

export default ChatTitle;