import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieSuggestionThunk } from "../store/thunks/movieSuggestionThunk";

export const useInfiniteMovies = ({ type, movieId, mediaType = "movie" }) => {
    const dispatch = useDispatch();
    const { [type]: suggestions = { results: [], total_pages: 0, page: 0, loading: false, error: null } } = useSelector((store) => store?.suggestions);
    const { results, total_pages, page, loading, error } = suggestions;

    const loaderRef = useRef(null);

    // first Page fetch
    useEffect(() => {
        // Always fetch first page when component mounts or parameters change
        if (movieId && type && mediaType) {
            dispatch(movieSuggestionThunk({ mediaType, movieId, type, page: 1 }));
        }
    }, [dispatch, movieId, type, mediaType]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && page < total_pages && !loading) {
                    dispatch(movieSuggestionThunk({ mediaType, movieId, type, page: page + 1 }));
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [page, total_pages, loading, movieId, type, mediaType, dispatch]);

    return { results, page, total_pages, loaderRef, loading, error };
};
