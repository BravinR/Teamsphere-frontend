import NavigationMenu from "./../../components/NavigationMenu"
import React, {FormEvent, useState} from "react";
import LogoutButton from "../../components/LogoutButton";
import Conversations from "../../components/Conversations/Conversations";
import MessageContainer from "../../components/Messages/MessageContainer";
import SearchForm from "../../components/SearchForm";
import useProfile from "../../zustand/useProfile";
import useUserProfile from "../../hooks/useGetProfile";

export default function Chat() {
  const { profile, userloading } = useUserProfile();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    try {
      const results = await handleSearch(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle the error as needed, e.g., display an error message
    }

  };

  const handleSearch = async (query) => {
    const authorizationToken = await getCookies();
    const headers = {
      Authorization: `${authorizationToken?.value}`,
      'Content-Type': 'application/json', // Adjust content type if needed
    };
    try {
      const response = await fetch(`http://localhost:5454/api/user/search?name=${query}`,
        {
          method: 'GET',
          headers
          // headers: {
          //     'Content-Type': 'application/json'
          // },
          // credentials: 'include'
        });
      // Handle the response as needed, e.g., update state with search results
      if (response.ok) {
        const data = await response.json();
        // Handle the data as needed, e.g., update state with search results
        return data;
      } else {
        console.error('Error fetching search results:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  return (
    <div className="flex w-full h-[calc(100dvh)] overflow-hidden">
      <div className="flex">
        <NavigationMenu />
        <div className="h-screen bg-chat-gray">
          <SearchForm
            handleSearch={handleSearch}
            handleSubmitSearch={handleSubmitSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
          />
          <Conversations />
        </div>
      </div>
      <MessageContainer/>
    </div>

  )
}
