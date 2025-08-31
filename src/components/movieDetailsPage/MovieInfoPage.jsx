import { useSelector } from "react-redux";

// Components
import MovieInfoBanner from "./MovieInfoBanner";
import MovieInfoDetail from "./MovieInfoDetail";
import MovieInfoCtaButtons from "./MovieInfoCtaButtons";
import MovieInfoOverView from "./MovieInfoOverView";
import MovieCarouselList from "../MovieCarouselList";
import MovieProductionInfo from "./MovieProductionInfo";
import MovieInfoLanguage from "./MovieInfoLanguage";
import MovieInfoReviews from "./MovieInfoReviews";

const MovieInfoPage = ({ mediaType }) => {
    const {
        movieDetails,
        movieCredits,
        movieRecommendations,
        movieReviews,
        movieSimilar,
        movieVideos,
        loading,
    } = useSelector((store) => store?.details);
    const {
        tvDetails,
        tvCredits,
        tvRecommendations,
        tvReviews,
        tvSimilar,
        tvVideos,
        tvLoading,
    } = useSelector((store) => store?.tvDetail);

    // Check if required data is available based on media type
    const isDataReady = () => {
        if (mediaType === "movie") {
            return movieDetails && movieCredits && movieRecommendations &&
                movieReviews && movieSimilar && movieVideos;
        } else if (mediaType === "tv") {
            return tvDetails && tvCredits && tvRecommendations &&
                tvReviews && tvSimilar && tvVideos;
        }
        return false;
    };

    // Early return if data isn't ready
    if (!isDataReady()) {
        return null;
    }

    // Get the relevant data based on media type
    const details = mediaType === "movie" ? movieDetails : tvDetails;
    const credits = mediaType === "movie" ? movieCredits : tvCredits;
    const recommendations = mediaType === "movie" ? movieRecommendations : tvRecommendations;
    const reviews = mediaType === "movie" ? movieReviews : tvReviews;
    const similar = mediaType === "movie" ? movieSimilar : tvSimilar;
    const videos = mediaType === "movie" ? movieVideos : tvVideos;
    const isLoading = mediaType === "movie" ? loading : tvLoading;

    return (
        <div className="min-h-screen bg-black">
            <MovieInfoBanner mediaType={mediaType} />

            {/* Content Sections */}
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">

                {/* Movie Details */}
                <MovieInfoDetail title="Movie Details" mediaType={mediaType} />

                {/* CTA Buttons */}
                <MovieInfoCtaButtons />

                {/* Overview Section */}
                <MovieInfoOverView title="Synopsis" mediaType={mediaType} />

                {/* Production Info */}
                <MovieProductionInfo title="Production Companies" mediaType={mediaType} />

                {/* Spoken Languages */}
                <MovieInfoLanguage title="Languages" mediaType={mediaType} />

                {/* Cast */}
                <MovieCarouselList
                    title="Cast"
                    moviesData={credits?.cast}
                    isLoading={isLoading}
                    movieId={details?.id}
                    mediaType={mediaType}
                    type="cast"
                />

                {/* Crew */}
                <MovieCarouselList
                    title="Crew"
                    moviesData={credits?.crew}
                    isLoading={isLoading}
                    movieId={details?.id}
                    mediaType={mediaType}
                    type="crew"
                />

                {/* Recommendations */}
                <MovieCarouselList
                    title="Recommendations"
                    moviesData={recommendations?.results}
                    isLoading={isLoading}
                    movieId={details?.id}
                    mediaType={mediaType}
                    type="recommendations"
                />

                {/* Similar Movies */}
                <MovieCarouselList
                    title="Similar Movies"
                    moviesData={similar?.results}
                    isLoading={isLoading}
                    movieId={details?.id}
                    mediaType={mediaType}
                    type="similar"
                />

                {/* Reviews */}
                <MovieInfoReviews title="Reviews" mediaType={mediaType} />

            </div>
        </div>
    );
};

export default MovieInfoPage;