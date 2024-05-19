import NavigationMenu from "./../../components/NavigationMenu"
import React, {FormEvent, useState} from "react";
import LogoutButton from "../../components/LogoutButton";
import Conversations from "../../components/Conversations/Conversations";
import MessageContainer from "../../components/Messages/MessageContainer";

export default function Chat() {

  return (
    <div className="flex w-full h-[calc(100dvh)] overflow-hidden">
      <div className="flex">
        <NavigationMenu />
        <Conversations />
        <LogoutButton />
      </div>
      <MessageContainer/>
    </div>

  )
}
