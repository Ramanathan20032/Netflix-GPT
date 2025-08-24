import MovieInfoBanner from "./MovieInfoBanner";
import MovieInfoDetail from "./MovieInfoDetail";
import MovieInfoCtaButtons from "./MovieInfoCtaButtons";
import MovieInfoOverView from "./MovieInfoOverView";
import MovieCarouselList from "./MovieCarouselList";

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

    return (
        <div className="min-h-screen bg-black">
            <MovieInfoBanner movieDetails={movieDetails} />

            {/* Content Sections */}
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">

                {/* Movie Details */}
                <MovieInfoDetail
                    movieDetails={movieDetails}
                    title="Movie Details"
                />

                {/* CTA Buttons */}
                <MovieInfoCtaButtons />

                {/* Overview Section */}
                <MovieInfoOverView
                    movieDetails={movieDetails}
                    title="Synopsis"
                />


                {/* Production Info */}
                {movieDetails?.production_companies && movieDetails?.production_companies?.length > 0 && (
                    <div className="mb-11">
                        <h2 className="text-2xl font-bold text-white mb-4">Production Companies</h2>
                        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 bg-gray-800 p-4 py-6 rounded-lg">
                            {movieDetails?.production_companies
                                ?.filter((company) => company?.logo_path)
                                ?.map((company) => (
                                    <div key={company?.id} className="text-center">
                                        {company?.logo_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200${company?.logo_path}`}
                                                alt={company?.name}
                                                className="w-20 h-20 object-contain mx-auto mb-3"
                                            />
                                        )}
                                        <p className="text-white text-sm">{company?.name}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Spoken Languages */}
                {movieDetails?.spoken_languages && movieDetails?.spoken_languages?.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Languages</h2>
                        <div className="flex flex-wrap gap-2">
                            {movieDetails?.spoken_languages?.map((language, index) => (
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