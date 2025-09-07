import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mediaCategoryThunk } from "../store/thunks/mediaCategoryThunk";
import { genereCategoryThunk } from "../store/thunks/genereCategoryThunk";

const usePaginatedFetch = ({ mediaType, endPoint, genereId }) => {
    const dispatch = useDispatch();
    const loaderRef = useRef(null);

    const { mediaCategoryData, mediaCategoryLoading, mediaCategoryError } = useSelector((store) => store.mediaCategory);
    const { genereCategoryData, genereCategoryListLoading, genereCategoryListError } = useSelector((store) => store.genereCategoryList);

    const activeLoading = endPoint ? mediaCategoryLoading : genereCategoryListLoading;
    const activeError = endPoint ? mediaCategoryError : genereCategoryListError;
    const activeData = endPoint ? mediaCategoryData : genereCategoryData;

    // Add null checks to prevent destructuring errors
    const { results = [], page = 0, total_pages = 0, total_results = 0 } = activeData || {};

    // First Page Fetch
    useEffect(() => {
        // nothing to fetch if no type/mediaType
        if (!endPoint && !genereId) return;

        if (endPoint) {
            dispatch(mediaCategoryThunk({ mediaType, endPoint, page: 1 }));
        }
        else if (genereId) {
            dispatch(genereCategoryThunk({ mediaType, genereId, page: 1 }));
        }

    }, [dispatch, mediaType, endPoint, genereId]);

    // Infinite scroll
    useEffect(() => {
        if (!endPoint && !genereId) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && page < total_pages && !activeLoading) {
                    if (endPoint) {
                        dispatch(mediaCategoryThunk({ mediaType, endPoint, page: page + 1 }));
                    }
                    else if (genereId) {
                        dispatch(genereCategoryThunk({ mediaType, genereId, page: page + 1 }));
                    }
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };

    }, [dispatch, mediaType, genereId, endPoint, page, results, total_pages, total_results, activeLoading]);

    return { results, page, total_pages, total_results, loaderRef, loading: activeLoading, error: activeError };
}


export default usePaginatedFetch;