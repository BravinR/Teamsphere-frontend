import { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useCreateChat = () => {
  const { authUser } = useAuthContext(); 
  const [creatingChat, setCreatingChat] = useState(false);
  const [chatData, setChatData] = useState(null);

  const handleCreateChat = async (user_id) => {
    try {
      setCreatingChat(true);

      const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/chat/single`, {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authUser.jwt}`
          },
          body: JSON.stringify({ userId: user_id }),
      });

      if (response.ok) {
        const chatData = await response.json();
        setChatData(chatData);
      } else {
        throw new Error('Failed to create chat');
      }
    } catch (error) {
      toast.error('Error creating chat');
    } finally {
      setCreatingChat(false);
    }
  };

  return { creatingChat, chatData, handleCreateChat };
};

export default useCreateChat;
