import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { clearGenereCategoryList } from "../store/slices/genereCategorySlice";

const GenereMediaList = () => {
    const { genereId, mediaType, type } = useParams();
    const { results, page, total_pages, total_results, loaderRef, loading, error } = usePaginatedFetch({ genereId, mediaType });
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearGenereCategoryList());
        }
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-white text-2xl font-bold">Genere Media Listing</h1>
            <div className="text-white text-2xl font-bold">Total Results: {total_results}</div>
            {results?.map((result) => (
                <div key={result?.id}>
                    <h2 className="text-white text-2xl font-bold">{result?.title || result?.name}</h2>
                </div>
            ))}

            {/* Infinite scroll loader - positioned outside the grid */}
            {page < total_pages && (
                <div className="mt-8">
                    <div ref={loaderRef} className="w-full">
                        {loading ? (
                            // Show shimmer cards while loading more content
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                                {Array.from({ length: 14 }).map((_, index) => (
                                    <div key={`shimmer-${index}`} className="flex-shrink-0">
                                        <ShimmerMovieCard />
                                    </div>
                                ))}
                            </div>
                            // <LoadingSpinner />
                        ) : (
                            // Invisible loader for intersection observer
                            <div className="h-1 sm:h-2 bg-transparent rounded"></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GenereMediaList;