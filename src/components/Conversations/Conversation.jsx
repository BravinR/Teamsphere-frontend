import useConversation from "../../zustand/useConversation";
const Conversation = ({ chatId, user }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?.user.id === user.id;

	return (
		<div
			className={`flex max-w-sm py-4 px-2 hover:bg-gray-700 hover:rounded-3xl
		    ${isSelected ? "bg-gray-600 rounded-3xl" : ""}
			`}
			onClick={() => setSelectedConversation({chatId, user})}
		>
			<img className='rounded-2xl w-12' src={user.profile_picture} alt='user avatar' />
			<div>
				<h1 className="mb-2 mx-4 text-sm font-bold tracking-tight text-white">{user.username}</h1>
				<p className=" mx-4 text-sm text-gray-400">Some random last message</p>
			</div>
		</div>
	);
};
export default Conversation;
