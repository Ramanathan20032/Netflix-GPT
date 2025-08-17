import { useSelector } from "react-redux";
import MovieCarouselList from "./MovieCarouselList";

const SecondaryContainer = () => {

   const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } = useSelector((store) => store.movies);

   return (
      <div className="pt-8 w-[95%] mx-auto">
         <div className="relative -mt-44 w-[97%] mx-auto z-10">
            <MovieCarouselList title="Now Playing" moviesData={nowPlayingMovies} />
            <MovieCarouselList title="Top Rated" moviesData={topRatedMovies} />
            <MovieCarouselList title="Popular Movies" moviesData={popularMovies} />
            <MovieCarouselList title="Upcoming" moviesData={upcomingMovies} />
         </div>
      </div>
   )
}

export default SecondaryContainer;



{/* 
                Component Structure:
                
                1. Movie Categories Container
                   - Multiple MovieList components
                   - Each MovieList represents a category (Now Playing, Popular, Top Rated, etc.)
                
                2. MovieList Component (Reusable) [Component]
                   - Horizontal scrollable container
                   - Category title (e.g., "Now Playing", "Popular Movies")
                   - Movie cards in a row
                
                3. Movie Card Component (Reusable) [Component]
                   - Movie poster image
                   - Movie title
                   - Rating/Genre info
                   - Hover effects
                
                4. Data Flow:
                   - Fetch different movie categories from API
                   - Map through categories to render MovieList components
                   - Each MovieList maps through movies to render MovieCard components
                
                5. Styling:
                   - Dark theme (bg-black)
                   - Horizontal scrolling for movie lists
                   - Responsive grid layout
                   - Hover animations on movie cards
            */}

{/* Example Structure:
            <div className="py-4 md:py-8">
                <MovieList title="Now Playing" movies={nowPlayingMovies} />
                <MovieList title="Popular Movies" movies={popularMovies} />
                <MovieList title="Top Rated" movies={topRatedMovies} />
                <MovieList title="Upcoming" movies={upcomingMovies} />
            </div>
            */}