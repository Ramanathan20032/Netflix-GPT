import { useDispatch, useSelector } from "react-redux";
import MovieCarouselCard from "./MovieCarouselCard";
import { clearFavoriteItem, removeFavoriteItem } from "../store/slices/favoriteSlice";
import { useEffect, useState } from "react";

const FavoritesList = () => {
    const dispatch = useDispatch()
    const favoritesItems = useSelector((store) => store.favorites?.favoritesItems || []);

    const removeFavorites = (item) => {
        dispatch(removeFavoriteItem(item))
    }

    const clearFavorites = () => {
        dispatch(clearFavoriteItem());
    }


    return (
        <div className="min-h-screen bg-black">
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8 pt-24 md:pt-28">

                <div className="flex flex-row items-center justify-between mb-5">
                    <h1 className="text-gray-100 text-lg sm:text-xl font-bold my-4 md:my-8 tracking-wider">
                        Favorites List
                    </h1>
                    <button className="text-gray-100 text-sm md:text-md font-medium tracking-wider border-2 py-1.5 px-2.5 rounded-md cursor-pointer"
                        onClick={clearFavorites}>
                        Clear All
                    </button>
                </div>


                {favoritesItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                        {favoritesItems.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="aspect-[2/3] w-full relative">
                                <span
                                    className="absolute right-0 top-0 z-100 text-white cursor-pointer bg-gray-600 hover:bg-gray-400 px-2.5 py-1 rounded-lg shadow-lg"
                                    title="Remove from Favorites"
                                    onClick={() => removeFavorites(item.id)}
                                >
                                    -
                                </span>
                                <MovieCarouselCard movie={item} mediaType={item.media_type || 'movie'} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 md:py-12 bg-white/15 text-white px-3 py-1 rounded-md">
                        <p className="text-white/400 text-md md:text-xl font-medium">No favorites added yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FavoritesList;