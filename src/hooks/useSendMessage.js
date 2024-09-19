import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useGetConversations from "./useGetConversations";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuthContext();
    const { refreshConversations } = useGetConversations();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_API_HOST}/api/message/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
                    'Authorization': `Bearer ${authUser.jwt}`
				},
                body: JSON.stringify({
                    chatId: selectedConversation.chatId,
                    userId: selectedConversation.user.id,
                    content: message
                })
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
			// We're not calling refreshConversations here anymore
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;