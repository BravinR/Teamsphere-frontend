import { useState } from 'react'
import useSearchResults from '../zustand/useSearch';
import { useAuthContext } from '../context/AuthContext';

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const { searchResults, setSearchResults } = useSearchResults();

  const search = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/user/search?name=${query}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.jwt}`
          }
        });
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }
      const data = await response.json();
      setSearchResults(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return {search, loading}
}

export default useSearch