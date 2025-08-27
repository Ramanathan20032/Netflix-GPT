import { useSelector } from "react-redux";
import { formatDate } from "../utils/constants";
import StarRating from "./ui/StarRating";
import { useState } from "react";

const MovieInfoReviews = ({ title }) => {
    const { movieReviews } = useSelector((store) => store?.details);
    if (!movieReviews) return null;

    const [showAllReviews, setShowAllReviews] = useState(false);

    const getLatestReview = (reviews) => {
        const createdAt = reviews?.created_at ? new Date(reviews?.created_at) : null;
        const updatedAt = reviews?.updated_at ? new Date(reviews?.updated_at) : null;
        if (createdAt && updatedAt) {
            return formatDate(updatedAt > createdAt ? updatedAt : createdAt);
        }
        return formatDate(createdAt || updatedAt);
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    movieReviews?.results
                        .filter((review) => review?.content !== "" || review?.author_details?.rating !== 0)
                        // sort by created_at ascending
                        .sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at))
                        .sort((a, b) => b.author_details.rating - a.author_details.rating)
                        .slice(0, showAllReviews ? movieReviews?.total_results : 4)
                        .map((review) => (
                            <div key={review?.id} className="bg-white/15 text-white backdrop-blur-sm px-4.5 py-4 rounded-lg">
                                <h3 className="text-lg md:text-xl font-bold mb-1.5 text-capitalize">{review?.author_details?.name || review?.author_details?.username || review?.author}</h3>
                                <StarRating rating={review?.author_details?.rating} />
                                <p className="text-sm md:text-base leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-5 mt-2">{review?.content}</p>
                                <p className="text-sm text-gray-300 mt-1.5">{getLatestReview(review)}</p>
                            </div>
                        ))
                }
            </div>
            {movieReviews?.total_results > 4 && !showAllReviews && (
                <p className="text-sm text-gray-400 text-center mt-4 cursor-pointer hover:underline"
                    onClick={() => { setShowAllReviews(true) }}
                >
                    +{movieReviews?.total_results - 4} more reviews
                </p>
            )
            }
        </>
    )
}

export default MovieInfoReviews;