import React, { useRef, useCallback, useEffect } from 'react'
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

export default function Conversations() {
    const { loading, conversations, loadMore, hasMore } = useGetConversations();
    const observer = useRef();
    const containerRef = useRef();

    const lastConversationRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, loadMore]);

    useEffect(() => {
        const container = containerRef.current;
        if (container && conversations.length > 0 && container.scrollHeight <= container.clientHeight && hasMore) {
            loadMore();
        }
    }, [conversations, hasMore, loadMore]);

    return (
        <div ref={containerRef} className='hidden bg-chat-gray rounded-2xl md:flex md:flex-col overflow-y-auto'>
            {conversations.map((conversation, index) => (
                <div 
                    ref={index === conversations.length - 1 ? lastConversationRef : null} 
                    key={conversation.id}
                >
                    <Conversation conversation={conversation} />
                </div>
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );
}