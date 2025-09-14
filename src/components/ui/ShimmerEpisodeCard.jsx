const ShimmerEpisodeCard = () => {
    return (
        <div className="w-64 min-h-20 flex-shrink-0 group cursor-pointer">
            {/* Image Container with Shimmer Effect */}
            <div className="relative w-full h-34 overflow-hidden rounded-md mb-2">
                {/* Shimmer Image Placeholder */}
                <div className="w-full h-full bg-gray-700 animate-pulse rounded-md"></div>
                {/* Shimmer Episode Number Placeholder */}
                <div className="absolute bottom-2 left-2 h-3 w-24 bg-gray-600 animate-pulse rounded"></div>
            </div>

            {/* Episode Name Shimmer */}
            <div className="space-y-1">
                <div className="h-3 bg-gray-700 animate-pulse rounded w-5/6 mb-2"></div>
            </div>

            {/* Runtime Shimmer */}
            <div className="h-2 bg-gray-700 animate-pulse rounded w-1/4 mt-1"></div>
        </div>
    )
}

export default ShimmerEpisodeCard;