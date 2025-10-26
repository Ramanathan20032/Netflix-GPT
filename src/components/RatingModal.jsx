// import { useEffect, useState } from "react";

// const RatingModal = ({ isOpen, onClose, onSubmit, loading }) => {
//     const [rating, setRating] = useState(5);

//     if (!isOpen) return null;

//     const handleSubmit = () => {
//         onSubmit(rating);
//     };

//     const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//     const isHighlighted = (num) => num % 2 === 0; // 2, 4, 6, 8, 10
//     const isMiddle = (num) => num % 2 === 1; // 1, 3, 5, 7, 9

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer">
//             {/* Black Overlay */}
//             <div
//                 className="absolute inset-0 bg-black/80 backdrop-blur-sm"
//                 onClick={onClose}
//             />

//             {/* Modal Card */}
//             <div className="relative bg-white/15 rounded-lg shadow-2xl p-8 w-full max-w-md mx-4">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//                 >
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 </button>

//                 {/* Title */}
//                 <h2 className="text-2xl font-bold text-white mb-6 text-center">
//                     Rate This Movie
//                 </h2>

//                 {/* Current Rating Display */}
//                 <div className="text-center mb-8">
//                     <div className="text-5xl font-bold text-red-400">{rating}</div>
//                     <div className="text-gray-400 text-sm mt-2">out of 10</div>
//                 </div>

//                 {/* Rating Dragger */}
//                 <div className="mb-8">
//                     <input
//                         type="range"
//                         min="1"
//                         max="10"
//                         step="1"
//                         value={rating}
//                         onChange={(e) => setRating(Number(e.target.value))}
//                         className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
//                         style={{
//                             background: `linear-gradient(to right,rgb(242, 55, 55) 0%,rgb(247, 58, 58) ${((rating - 1) / 9) * 100}%, #374151 ${((rating - 1) / 9) * 100}%, #374151 100%)`
//                         }}
//                     />

//                     {/* Number Labels Below Slider */}
//                     <div className="flex justify-between mt-4 px-1">
//                         {numbers.map((num) => (
//                             <div
//                                 key={num}
//                                 className={`flex flex-col items-center cursor-pointer transition-all ${num === rating ? 'scale-110' : ''
//                                     }`}
//                                 onClick={() => setRating(num)}
//                             >
//                                 <span
//                                     className={`text-sm font-semibold ${num === rating
//                                         ? 'text-red-400'
//                                         : isHighlighted(num)
//                                             ? 'text-white'
//                                             : 'text-gray-500'
//                                         }`}
//                                 >
//                                     {num}
//                                 </span>
//                                 {num === rating && (
//                                     <div className="w-1 h-1 bg-red-400 rounded-full mt-1" />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                     onClick={handleSubmit}
//                     disabled={loading}
//                     className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
//                 >
//                     {loading ? "Submitting..." : "Submit Rating"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default RatingModal;


import { useEffect, useState } from "react";

const RatingModal = ({ isOpen, onClose, onSubmit, loading, success, error }) => {
    const [rating, setRating] = useState(5);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(rating);
    };

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const isHighlighted = (num) => num % 2 === 0; // 2, 4, 6, 8, 10
    const isMiddle = (num) => num % 2 === 1; // 1, 3, 5, 7, 9

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer">
            {/* Black Overlay */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white/15 rounded-lg shadow-2xl p-8 w-full max-w-md mx-4">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Rate This Movie
                </h2>

                {/* Current Rating Display */}
                <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-red-400">{rating}</div>
                    <div className="text-gray-400 text-sm mt-2">out of 10</div>
                </div>

                {/* Rating Dragger */}
                <div className="mb-8">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                            background: `linear-gradient(to right,rgb(242, 55, 55) 0%,rgb(247, 58, 58) ${((rating - 1) / 9) * 100}%, #374151 ${((rating - 1) / 9) * 100}%, #374151 100%)`
                        }}
                    />

                    {/* Number Labels Below Slider */}
                    <div className="flex justify-between mt-4 px-1">
                        {numbers.map((num) => (
                            <div
                                key={num}
                                className={`flex flex-col items-center cursor-pointer transition-all ${num === rating ? 'scale-110' : ''
                                    }`}
                                onClick={() => setRating(num)}
                            >
                                <span
                                    className={`text-sm font-semibold ${num === rating
                                        ? 'text-red-400'
                                        : isHighlighted(num)
                                            ? 'text-white'
                                            : 'text-gray-500'
                                        }`}
                                >
                                    {num}
                                </span>
                                {num === rating && (
                                    <div className="w-1 h-1 bg-red-400 rounded-full mt-1" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                    {loading ? "Submitting..." : "Submit Rating"}
                </button>

                {/* Success/Error Message Below Submit Button */}
                {success && (
                    <p className="text-green-500 text-center mt-3 text-sm font-medium">
                        {success}
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center mt-3 text-sm font-medium">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default RatingModal;