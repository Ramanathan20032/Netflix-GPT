import { useSelector } from "react-redux";
import MovieCarouselList from "./MovieCarouselList";

const SecondaryContainer = () => {
   const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } = useSelector((store) => store?.movies);

   return (
      <div className="py-8 w-[95%] mx-auto">
         <div className="relative -mt-44 w-[97%] mx-auto z-10">
            <MovieCarouselList
               title="Now Playing"
               moviesData={nowPlayingMovies}
               isLoading={!nowPlayingMovies || nowPlayingMovies?.length === 0}
            />
            <MovieCarouselList
               title="Top Rated"
               moviesData={topRatedMovies}
               isLoading={!topRatedMovies || topRatedMovies?.length === 0}
            />
            <MovieCarouselList
               title="Popular Movies"
               moviesData={popularMovies}
               isLoading={!popularMovies || popularMovies?.length === 0}
            />
            <MovieCarouselList
               title="Upcoming"
               moviesData={upcomingMovies}
               isLoading={!upcomingMovies || upcomingMovies?.length === 0}
            />
         </div>
      </div>
   )
}

export default SecondaryContainer;
