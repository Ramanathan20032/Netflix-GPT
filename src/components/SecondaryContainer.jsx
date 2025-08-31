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
            />
            <MovieCarouselList
               title="Top Rated"
               moviesData={topRatedMovies}
               isLoading={loading}
            />
            <MovieCarouselList
               title="Popular Movies"
               moviesData={popularMovies}
               isLoading={loading}
            />
            <MovieCarouselList
               title="Upcoming"
               moviesData={upcomingMovies}
               isLoading={loading}
            />
            <MovieCarouselList
               title="Airing Today TV"
               moviesData={airingTodayTv}
               isLoading={loading}
            />
            <MovieCarouselList
               title="Top Rated TV"
               moviesData={topRatedTv}
               isLoading={loading}
            />
            <MovieCarouselList
               title="Popular TV"
               moviesData={popularTv}
               isLoading={loading}
            />
            <MovieCarouselList
               title="On The Air"
               moviesData={onTheAirTv}
               isLoading={loading}
            />
         </div>
      </div>
   )
}

export default SecondaryContainer;
