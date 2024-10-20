import { useState, useCallback } from 'react';
import { useAuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import useGetConversations from './useGetConversations';

const useCreateChat = () => {
  const { authUser } = useAuthContext(); 
  const [creatingChat, setCreatingChat] = useState(false);
  const [chatData, setChatData] = useState(null);
  const { refreshConversations } = useGetConversations();
  const setSelectedConversation = useConversation((state) => state.setSelectedConversation);

  const handleCreateChat = useCallback(async (user_id) => {
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
        const newChatData = await response.json();
        setChatData(newChatData);
        setSelectedConversation(newChatData);
        
        // Refresh the conversation list to include the new chat
        refreshConversations();
        
        toast.success('Chat created successfully');
      } else {
        throw new Error('Failed to create chat');
      }
    } catch (error) {
      toast.error('Error creating chat');
    } finally {
      setCreatingChat(false);
    }
  }, [authUser.jwt, refreshConversations, setSelectedConversation]);

  return { creatingChat, chatData, handleCreateChat };
};

export default useCreateChat;