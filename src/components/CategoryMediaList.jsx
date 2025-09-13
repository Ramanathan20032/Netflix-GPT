import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { clearMediaCategory } from "../store/slices/mediaCategorySlice";
import PaginationedMediaListing from "./PaginationedMediaListing";

const CategoryMediaList = () => {

    const { mediaType, type, endPoint, } = useParams();
    const { results, page, total_pages, total_results, loaderRef, loading, error } = usePaginatedFetch({ endPoint, mediaType });
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearMediaCategory());
        }
    }, [dispatch]);

    return (
        <PaginationedMediaListing mediaType={mediaType} endPoint={endPoint} type={type} page={page} total_pages={total_pages} loaderRef={loaderRef} loading={loading} error={error} results={results} />
    )
}

export default CategoryMediaList;