import React from "react";
import useUserProfile from "../../hooks/useGetProfile";
import useConversation from "../../zustand/useConversation";
import ChatBubble from "../ChatBubble";
import ChatMessageSender from "../ChatMessageSender";
import { extractTime } from "../../utils/extractTime";

const Message = ({ messageData }) => {
    const { profile, userloading } = useUserProfile();
    const { selectedConversation } = useConversation();
    const fromMe = messageData?.senderId === profile?.id;
    const formattedTime = extractTime(messageData?.timeStamp);
    const profilePic = fromMe ? profile?.profile_picture : selectedConversation?.user.profile_picture;
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
