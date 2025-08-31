import { useNavigate } from "react-router-dom";

const InvalidIdError = ({ mediaType, movieId }) => {
    const navigate = useNavigate();

    return (
        <div className="h-[calc(100vh-10rem)] bg-black flex items-center justify-center">
            <div className="text-center text-white px-6">
                <h1 className="text-4xl font-bold mb-4">Invalid {mediaType?.toUpperCase()} ID</h1>
                <p className="text-xl mb-6 text-gray-300">
                    The {mediaType} with ID "{movieId}" was not found.
                </p>
                <p className="text-lg mb-8 text-gray-400">
                    This ID doesn't exist in our current {mediaType} listings. Please check the URL or navigate to a valid {mediaType} page.
                </p>
                <button
                    onClick={() => navigate("/browse")}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                    Go to Browse
                </button>
            </div>
        </div>
    );
};

export default InvalidIdError;
