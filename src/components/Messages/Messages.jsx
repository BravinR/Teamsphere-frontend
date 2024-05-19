import useGetMessages from "../../hooks/useGetMessages";
import ChatBubble from "../ChatBubble";

const Messages = () => {
	const { messages, loading } = useGetMessages();

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message.id} >
					<ChatBubble messageData={message}/>	
					</div>
				))}

			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;

