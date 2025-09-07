import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { clearMediaCategory } from "../store/slices/mediaCategorySlice";

const CategoryMediaList = () => {

    const { mediaType, type, endPoint,} = useParams();
    const { results, page, total_pages, total_results, loaderRef, loading, error } = usePaginatedFetch({ endPoint, mediaType });
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearMediaCategory());
        }
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-white text-2xl font-bold">Category Media List</h1>
            <div className="text-white text-2xl font-bold">Total Results: {total_results}</div>
            {results?.map((result) => (
                <div key={result?.id}>
                    <h2 className="text-white text-2xl font-bold">{result?.title || result?.name}</h2>
                </div>
            ))}
        </div>
    )
}

export default CategoryMediaList;