import React, { useEffect } from 'react'
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import ChatInput from '../ChatInput';
import Messages from './Messages';
import useGetMessages from '../../hooks/useGetMessages';

export default function MessageContainer() {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { messages, loading } = useGetMessages();

    useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='flex flex-col w-full md:w-3/5 bg-gray-900'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.users[0]}</span>
					</div>
                    <Messages messages={messages} loading={loading} />
					<ChatInput />
				</>
			)}
		</div>
	);
}

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
			</div>
		</div>
	);
};