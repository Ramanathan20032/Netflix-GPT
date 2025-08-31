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

const MovieInfoPage = () => {
    const {
        movieDetails,
        movieCredits,
        movieRecommendations,
        movieReviews,
        movieSimilar,
        movieVideos,
        loading,
    } = useSelector((store) => store?.details);
    if (!movieDetails || !movieCredits || !movieRecommendations || !movieReviews || !movieSimilar || !movieVideos) return null;

    return (
        <div className="min-h-screen bg-black">
            <MovieInfoBanner />

            {/* Content Sections */}
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">

                {/* Movie Details */}
                <MovieInfoDetail title="Movie Details" />

                {/* CTA Buttons */}
                <MovieInfoCtaButtons />

                {/* Overview Section */}
                <MovieInfoOverView title="Synopsis" />

                {/* Production Info */}
                <MovieProductionInfo title="Production Companies" />

                {/* Spoken Languages */}
                <MovieInfoLanguage title="Languages" />

                {/* Cast */}
                <MovieCarouselList
                    title="Cast"
                    moviesData={movieCredits?.cast}
                    isLoading={loading}
                />

                {/* Crew */}
                <MovieCarouselList
                    title="Crew"
                    moviesData={movieCredits?.crew}
                    isLoading={loading}
                />

                {/* Recommendations */}
                <MovieCarouselList
                    title="Recommendations"
                    moviesData={movieRecommendations?.results}
                    isLoading={loading}
                    movieId={movieDetails?.id}
                    mediaType="movie"
                    type="recommendations"
                />

                {/* Similar Movies */}
                <MovieCarouselList
                    title="Similar Movies"
                    moviesData={movieSimilar?.results}
                    isLoading={loading}
                    movieId={movieDetails?.id}
                    mediaType="movie"
                    type="similar"
                />

                {/* Reviews */}
                <MovieInfoReviews title="Reviews" />

            </div>
        </div>
    );
};

export default MovieInfoPage;