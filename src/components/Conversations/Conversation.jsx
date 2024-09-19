import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?.id === conversation.id;
	
	const handleClick = () => {
		setSelectedConversation({
			chatId: conversation.id,
			user: {
				id: conversation.createdBy,
				username: conversation.chatName,
				profilePicture: conversation.chatImage
			}
		});
	};

	return (
		<div
			className={`flex max-w-sm py-4 px-2 hover:bg-gray-700 hover:rounded-3xl
		    ${isSelected ? "bg-gray-600 rounded-3xl" : ""}
			`}
			onClick={handleClick}
		>
			<img className='rounded-2xl w-12' src={conversation.chatImage} alt='chat avatar' />
			<div>
				<h1 className="mb-2 mx-4 text-sm font-bold tracking-tight text-white">{conversation.chatName}</h1>
				<p className="mx-4 text-sm text-gray-400">
					{conversation.lastMessage ? conversation.lastMessage.content : "No messages yet"}
				</p>
			</div>
		</div>
	);
};

export default Conversation;
