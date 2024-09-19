import React from "react";
import useConversation from "../../zustand/useConversation";
import ChatBubble from "../ChatBubble";
import ChatMessageSender from "../ChatMessageSender";
import { extractTime } from "../../utils/extractTime";
import useProfile from "../../zustand/useProfile";

const Message = ({ messageData }) => {
    const { profile } = useProfile();
    const { selectedConversation } = useConversation();
    const fromMe = messageData.userId === profile?.id;
    const formattedTime = extractTime(messageData.timeStamp);
    const profilePic = fromMe ? profile?.profilePicture : selectedConversation?.user.profilePicture;
    const sender = fromMe ? profile?.username : selectedConversation?.user.username;

    return (
        <>
            {fromMe ? (
                <ChatMessageSender messageData={messageData} profilePic={profilePic} sender={sender} formattedTime={formattedTime}/>
            ) : (
                <ChatBubble messageData={messageData} profilePic={profilePic} sender={sender} formattedTime={formattedTime}/>
            )}
        </>
    );
};

export default Message;
