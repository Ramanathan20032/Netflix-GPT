import MovieCarouselList from "./MovieCarouselList";
import { IMAGE_BASE_URL } from "../utils/constants";
import MovieInfoBanner from "./MovieInfoBanner";
import MovieInfoDetail from "./MovieInfoDetail";

const MovieInfoPage = ({ movieDetails,
    movieCredits,
    movieImages,
    movieLists,
    movieRecommendations,
    movieReleaseDates,
    movieReviews,
    movieSimilar,
    movieTranslations,
    movieWatchProviders,
    movieVideos }) => {
    if (!movieDetails || !movieCredits || !movieImages || !movieLists || !movieRecommendations || !movieReleaseDates || !movieReviews || !movieSimilar || !movieTranslations || !movieWatchProviders || !movieVideos) return null;

    const {
        title,
        original_title,
        overview,
        release_date,
        vote_average,
        vote_count,
        popularity,
        runtime,
        genres,
        tagline,
        poster_path,
        backdrop_path,
        status,
        adult
    } = movieDetails;

    return (
        <div className="min-h-screen bg-black">

            <MovieInfoBanner movieDetails={movieDetails} />


            {/* Content Sections */}
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">

                {/* Movie Details */}
                <MovieInfoDetail movieDetails={movieDetails} />





                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-12">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        ▶ Play Trailer
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        📋 Add to List
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        ⭐ Rate Movie
                    </button>
                </div>

                {/* Additional Info Sections */}
                {overview && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-8xl">
                            {overview}
                        </p>
                    </div>
                )}

                {/* Production Info */}
                {movieDetails.production_companies && movieDetails.production_companies.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Production Companies</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {movieDetails.production_companies.map((company) => (
                                <div key={company.id} className="text-center">
                                    {company.logo_path ? (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                            alt={company.name}
                                            className="w-20 h-20 object-contain mx-auto mb-2"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-2">
                                            <span className="text-gray-400 text-xs text-center">{company.name}</span>
                                        </div>
                                    )}
                                    <p className="text-white text-sm">{company.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Spoken Languages */}
                {movieDetails.spoken_languages && movieDetails.spoken_languages.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Languages</h2>
                        <div className="flex flex-wrap gap-2">
                            {movieDetails.spoken_languages.map((language, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {language.english_name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cast */}
                <MovieCarouselList
                    title="Cast"
                    moviesData={movieCredits?.cast}
                    isLoading={!movieCredits || movieCredits?.cast?.length === 0}
                />

                {/* Crew */}
                <MovieCarouselList
                    title="Crew"
                    moviesData={movieCredits?.crew}
                    isLoading={!movieCredits || movieCredits?.crew?.length === 0}
                />

                {/* Recommendations */}
                <MovieCarouselList
                    title="Recommendations"
                    moviesData={movieRecommendations?.results}
                    isLoading={!movieRecommendations || movieRecommendations?.results?.length === 0}
                />

                {/* Similar Movies */}
                <MovieCarouselList
                    title="Similar Movies"
                    moviesData={movieSimilar?.results}
                    isLoading={!movieSimilar || movieSimilar?.results?.length === 0}
                />
            </div>
        </div>
    );
};

export default MovieInfoPage;