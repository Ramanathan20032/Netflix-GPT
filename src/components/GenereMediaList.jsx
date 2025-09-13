import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { clearGenereCategoryList } from "../store/slices/genereCategorySlice";
import { getGenreName } from "../utils/constants";
import PaginationedMediaListing from "./PaginationedMediaListing";

const GenereMediaList = () => {
    const { genereId, mediaType, type } = useParams();
    const { results, page, total_pages, total_results, loaderRef, loading, error } = usePaginatedFetch({ genereId, mediaType });
    const dispatch = useDispatch();

    // Get genre lists from Redux store
    const { movieGenereList } = useSelector((store) => store.genereList.movie);
    const { tvGenereList } = useSelector((store) => store.genereList.tv);
    const mediaGenereData = mediaType === "movie" ? movieGenereList : tvGenereList;

    // Get genre name from ID
    const genreName = getGenreName(genereId, mediaGenereData);

    useEffect(() => {
        return () => {
            dispatch(clearGenereCategoryList());
        }
    }, [dispatch]);

    return (
        <PaginationedMediaListing mediaType={mediaType} genereId={genereId} type={type} page={page} total_pages={total_pages} loaderRef={loaderRef} loading={loading} error={error} results={results} genreName={genreName} />
    )
}

export default GenereMediaList;