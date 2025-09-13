const ShimmerMovieCard = () => {
    return (
        <div className="relative w-full aspect-[2/3] rounded-md overflow-hidden bg-gray-800 animate-pulse">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

            {/* Shimmer content structure */}
            <div className="w-full h-full flex flex-col">
                {/* Image placeholder */}
                <div className="flex-1 bg-gray-700"></div>

                {/* Title placeholder */}
                <div className="p-3 bg-gray-800">
                    <div className="h-4 bg-gray-700 rounded mb-1 w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

export default ShimmerMovieCard; 