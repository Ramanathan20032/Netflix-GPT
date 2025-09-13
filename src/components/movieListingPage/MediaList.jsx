import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import { clearMediaCategory } from "../../store/slices/mediaCategorySlice";
import { clearGenereCategoryList } from "../../store/slices/genereCategorySlice";
import { getGenreName } from "../../utils/constants";
import PaginationedMediaListing from "./PaginationedMediaListing";


// ! Media List for both category and genere listings
const MediaList = () => {
    const { mediaType, type, endPoint, genereId } = useParams();
    const { results, page, total_pages, total_results, loaderRef, loading, error } = usePaginatedFetch({ endPoint, genereId, mediaType });
    const dispatch = useDispatch();

    // Get genre lists from Redux store (only needed for genre listings)
    const { movieGenereList } = useSelector((store) => store.genereList.movie);
    const { tvGenereList } = useSelector((store) => store.genereList.tv);
    const mediaGenereData = mediaType === "movie" ? movieGenereList : tvGenereList;

    // Get genre name from ID (only for genre listings)
    const genreName = genereId ? getGenreName(genereId, mediaGenereData) : null;

    useEffect(() => {
        return () => {
            // Clear the appropriate store based on the type of listing
            if (endPoint) {
                dispatch(clearMediaCategory());
            } else if (genereId) {
                dispatch(clearGenereCategoryList());
            }
        }
    }, [dispatch, endPoint, genereId]);

    return (
        <PaginationedMediaListing
            mediaType={mediaType}
            endPoint={endPoint}
            genereId={genereId}
            genreName={genreName}
            type={type}
            page={page}
            total_pages={total_pages}
            total_results={total_results}
            loaderRef={loaderRef}
            loading={loading}
            error={error}
            results={results}
        />
    )
}

export default MediaList;
