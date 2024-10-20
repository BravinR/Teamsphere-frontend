import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext(); 

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation?.chatId) return;
			
			setLoading(true);
			try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/message/chat/${selectedConversation.chatId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authUser.jwt}`
                    }
                });
				if (!response.ok) {
					throw new Error('Failed to fetch messages');
				}
				const data = await response.json();
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation?.chatId, setMessages, authUser.jwt]);

	return { messages, loading };
};

export default useGetMessages;