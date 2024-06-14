import React, {MouseEventHandler, useEffect, useState} from 'react';
import useConversation from '../zustand/useConversation';
import useCreateChat from '../hooks/useCreateChat';

 export default function UserCard({ username, profileImageUrl, user_id, profile_id}) {
	const { selectedConversation, setSelectedConversation } = useConversation();
    const { creatingChat, chatData, handleCreateChat } = useCreateChat();

    useEffect(() => {

        if (chatData) {
            const filteredUser = chatData.users.filter(user => user.id !== profile_id);
            setSelectedConversation({chatId:chatData.id, user:filteredUser });
        }
    }, [chatData, profile_id, setSelectedConversation]);

    const handleClick = async (user_id) => {
        await handleCreateChat(user_id);
    };

    return (
        <div className="">
            <div className="mt-2 flex items-center justify-center px-2 bg-white rounded-xl shadow-lg space-y-0 space-x-6">
                <img className='rounded-2xl w-20' src={profileImageUrl} alt='user avatar' />
                <div className="flex items-center text-center">
                    <div className="space-y-0.5">
                        <p className="px-4 text-sm text-black font-semibold">{username}</p>
                    </div>
                    <button
                        onClick={() => handleClick(user_id)}
                        className={`px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border ${
                            creatingChat ? 'bg-gray-300' : 'border-purple-200'
                        }`}
                        disabled={creatingChat}
                    >
                        {creatingChat ? 
                            <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div>
                        : 
                        'Message'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};
