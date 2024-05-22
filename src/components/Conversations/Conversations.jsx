import React from 'react'
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import useProfile from '../../zustand/useProfile';

export default function Conversations() {
    const { loading, conversations } = useGetConversations();

    const { profile} = useProfile();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='hidden bg-chat-gray rounded-2xl  md:flex md:flex-col'>
            {conversations.map(conversation => (
                <div key={conversation.id} className=''>
                    {conversation.chat_name ? (
                        <h2>Conversation Name: {conversation.chat_name}</h2>
                    ) : (
                        <div>
                            {conversation.users
                                .filter(user => user.id !== profile.id)
                                .map(filteredUser => (
                                    <Conversation
                                        key={filteredUser.id}
                                        user={filteredUser}
                                        chatId={conversation.id}
                                    />
                                ))
                            }
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
