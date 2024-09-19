import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const { authUser } = useAuthContext();

	const fetchConversations = useCallback(async (pageNumber) => {
		if (!hasMore || loading) return;
		setLoading(true);
		try {
			const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/chat/summaries?page=${pageNumber}&size=10`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${authUser.jwt}`
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			if (data.error) {
				throw new Error(data.error);
			}

			if (data.length === 0) {
				setHasMore(false);
			} else {
				setConversations(prevConversations => {
					const newConversations = pageNumber === 0 ? data : [...prevConversations, ...data];
					const uniqueConversations = Array.from(new Set(newConversations.map(c => c.id)))
						.map(id => newConversations.find(c => c.id === id));
					return uniqueConversations;
				});
				setPage(prevPage => pageNumber === 0 ? 1 : prevPage + 1);
				setHasMore(data.length === 10);
			}
		} catch (error) {
			toast.error(error.message);
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	}, [authUser.jwt]);

	useEffect(() => {
		fetchConversations(0);
	}, [fetchConversations]);

	const loadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchConversations(page);
		}
	}, [loading, hasMore, page, fetchConversations]);

	const refreshConversations = useCallback(() => {
		setPage(0);
		setHasMore(true);
		fetchConversations(0);
	}, [fetchConversations]);

	return { loading, conversations, loadMore, hasMore, refreshConversations };
};

export default useGetConversations;