import NavigationMenu from "./../../components/NavigationMenu"
import React, {useState} from "react";
import Conversations from "../../components/Conversations/Conversations";
import MessageContainer from "../../components/Messages/MessageContainer";
import SearchForm from "../../components/SearchForm";
import useUserProfile from "../../hooks/useGetProfile";

export default function Chat() {
  const { loading, error } = useUserProfile();
  return (
    <div className="flex w-full h-[calc(100dvh)] overflow-hidden">
      <div className="flex">
        <NavigationMenu />
        <div className="h-screen bg-chat-gray">
          <SearchForm />
          <Conversations />
        </div>
      </div>
      <MessageContainer/>
    </div>

  )
}
