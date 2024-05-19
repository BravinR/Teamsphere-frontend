import { useState, useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";
import useProfile from '../zustand/useProfile';


const useUserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext(); 
  const { setProfile } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.jwt}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    if (authUser) {
      fetchProfile();
    }
  }, [authUser,setProfile]); // Include authUser in the dependency array
  return { loading, error };
};

export default useUserProfile;
