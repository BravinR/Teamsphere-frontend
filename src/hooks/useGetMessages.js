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
			setLoading(true);
			try {
                const response = await fetch(`/api/message/chat/${selectedConversation.chatId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authUser.jwt}`
                    }
                });
				const data = await response.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?.chatId) getMessages();
	}, [selectedConversation?.chatId, setMessages]);

	return { messages, loading };
};
export default useGetMessages;