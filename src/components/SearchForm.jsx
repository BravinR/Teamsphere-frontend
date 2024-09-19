import React, { FormEvent, useEffect, useState } from "react";
import SearchSvg from "./../components/svg/SearchSvg";
import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import useSearch from "../hooks/useSearch";
import useSearchResults from "../zustand/useSearch";
import toast from "react-hot-toast";
import useCreateChat from "../hooks/useCreateChat";
import useProfile from "../zustand/useProfile";

const SearchForm = ({
}) => {

	const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, setSearchResults } = useSearchResults();
  const { search, loading } = useSearch();
  const { creatingChat, chatData, handleCreateChat } = useCreateChat();
  const { profile } = useProfile();

  useEffect(() => {
    if (searchQuery.length < 1) {
      setSearchResults([]);
      return;
    }
    const handler = setTimeout(() => {
      search(searchQuery);
    }, 1000); // 1 second debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const clearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <div className="w-full relative">
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium sr-only text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchSvg aria-hidden="true" />
          </div>
          <input
            type="search"
            id="default-search"
            name="default-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="chats, groups, files..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="w-full flex flex-col space-y-2 border-none rounded-md bg-slate-800 py-2">
        {searchResults && searchResults.length > 0 ? (
          searchResults.filter(user => user.id !== profile.id).map((filterUser) => (
            <UserCard
              key={filterUser.id}
              username={filterUser.username}
              profileImageUrl={filterUser.profilePicture}
              user_id={filterUser.id}
              profile_id={profile.id}
              clearSearchResults={clearSearchResults}
            />
          ))
        ) : (
          <p className="hidden"></p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;


function UserCard({ username, profileImageUrl, user_id, profile_id, clearSearchResults }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { creatingChat, chatData, handleCreateChat } = useCreateChat();

  useEffect(() => {
    if (chatData) {
      const filteredUser = chatData.users.filter(user => user.id !== profile_id);
      setSelectedConversation({ chatId: chatData.id, user: filteredUser[0]});
      clearSearchResults();
    }
  }, [chatData, profile_id, setSelectedConversation]);

  const handleClick = async (user_id) => {
    await handleCreateChat(user_id);
  };

  return (
    <div className="">
      <div className="flex items-center justify-center px-2 bg-chat-gray rounded-xl shadow-lg space-y-0 space-x-6">
        <img className='rounded-2xl w-14' src={profileImageUrl} alt='user avatar' />
        <div className="flex items-center text-center">
          <div className="space-y-0.5">
            <p className="px-4 text-sm text-black font-semibold">{username}</p>
          </div>
          <button
            onClick={() => handleClick(user_id)}
            className={`px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border ${creatingChat ? 'bg-gray-300' : 'border-purple-200'
              }`}
            disabled={creatingChat}
          >
            {creatingChat ?
              <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
              :
              'Message'
            }
          </button>
        </div>
      </div>
    </div>
  );
};
