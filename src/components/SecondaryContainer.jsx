import { useSelector } from "react-redux";
import MovieCarouselList from "./MovieCarouselList";

const SecondaryContainer = () => {
   const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, loading, error } = useSelector((store) => store?.movies);
   const { airingTodayTv, onTheAirTv, popularTv, topRatedTv, tvLoading, tvError } = useSelector((store) => store?.tvList);

   return (
      <div className="py-8 w-[95%] mx-auto">
         <div className="relative -mt-44 w-[97%] mx-auto z-10">
            <MovieCarouselList
               title="Now Playing"
               moviesData={nowPlayingMovies}
               isLoading={loading}
               mediaType="movie"
            />
            <MovieCarouselList
               title="Top Rated"
               moviesData={topRatedMovies}
               isLoading={loading}
               mediaType="movie"
            />
            <MovieCarouselList
               title="Popular Movies"
               moviesData={popularMovies}
               isLoading={loading}
               mediaType="movie"
            />
            <MovieCarouselList
               title="Upcoming"
               moviesData={upcomingMovies}
               isLoading={loading}
               mediaType="movie"
            />
            <MovieCarouselList
               title="Airing Today TV"
               moviesData={airingTodayTv}
               isLoading={tvLoading}
               mediaType="tv"
            />
            <MovieCarouselList
               title="Popular TV"
               moviesData={popularTv}
               isLoading={tvLoading}
               mediaType="tv"
            />
            <MovieCarouselList
               title="Top Rated TV"
               moviesData={topRatedTv}
               isLoading={tvLoading}
               mediaType="tv"
            />
            <MovieCarouselList
               title="On The Air"
               moviesData={onTheAirTv}
               isLoading={tvLoading}
               mediaType="tv"
            />
         </div>
      </div>
   )
}

export default SecondaryContainer;
