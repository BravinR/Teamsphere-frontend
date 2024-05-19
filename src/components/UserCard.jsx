import React, {MouseEventHandler, useState} from 'react';



function UserCard({ username, profileImageUrl, user_id, handleCreateChat }) {
    const [isCreatingChat, setCreatingChat] = useState(false);

    const handleClick = async (user_id) => {
        try {
            setCreatingChat(true);

            await handleCreateChat(user_id);

            // Do other logic after successful chat creation if needed

        } catch (error) {
            console.error('Error creating chat:', error);
        } finally {
            setCreatingChat(false);
        }
    };

    return (
        <div className="">
            <div className="mt-2 flex items-center justify-center px-2 bg-white rounded-xl shadow-lg space-y-0 space-x-6">
                <Image
                    src={profileImageUrl}
                    alt={`${username}'s profile`}
                    width={40}
                    height={40}
                    className="rounded-full my-2"
                    style={{ width: 'auto', height: 'auto' }}
                />
                <div className="flex items-center text-center">
                    <div className="space-y-0.5">
                        <p className="px-4 text-sm text-black font-semibold">{username}</p>
                    </div>
                    <button
                        onClick={() => handleClick(user_id)}
                        className={`px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border ${
                            isCreatingChat ? 'bg-gray-300' : 'border-purple-200'
                        }`}
                        disabled={isCreatingChat}
                    >
                        {isCreatingChat ? 'Creating Chat...' : 'Message'}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default UserCard;
