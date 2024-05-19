import React, { FormEvent, useState } from "react";
import SearchSvg from "./../components/svg/SearchSvg";
import UserCard from "./../components/UserCard";

const SearchForm = ({
  handleSubmitSearch,
  searchQuery,
  setSearchQuery,
  searchResults,
  handleCreateChat,
}) => {
  return (
    <div className="w-full ">
      <form className="max-w-md mx-auto" onSubmit={handleSubmitSearch}>
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
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <UserCard
              key={user.id}
              username={user.username}
              profileImageUrl={user.profile_picture}
              user_id={user.id}
              handleCreateChat={handleCreateChat}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
