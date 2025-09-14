import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { peopleDetailThunk } from "../../store/thunks/peopleDetailThunk";
import { clearPeopleData } from "../../store/slices/peopleDetailSlice";
import { IMAGE_BASE_URL, formatDate } from "../../utils/constants";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../Error";
import noImage from "../assets/images/no-image.png";
import MovieCarouselCard from "../MovieCarouselCard";
import ProfileBanner from "./profileBanner";
import MovieCarouselList from "../MovieCarouselList";


const PeopleInfo = () => {
    const { personId } = useParams();
    const dispatch = useDispatch();
    const { peopleData, peopleDetailLoading, peopleDetailError } = useSelector((store) => store?.PeopleDetail);
    const { details, externalIds, combineCredits } = peopleData;
    console.log("People Data: ", peopleData);

    useEffect(() => {
        dispatch(peopleDetailThunk(personId));
    }, [dispatch, personId]);

    useEffect(() => {
        return () => {
            dispatch(clearPeopleData());
        }
    }, [dispatch]);

    console.log("Combine Credits: ", combineCredits);

    return (
        peopleDetailLoading ? (
            <LoadingSpinner />
        ) : peopleDetailError ? (
            <Error />
        ) : !peopleData?.details ? (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-2xl font-bold mb-4">Person Not Found</h1>
                    <p className="text-gray-400">The person you're looking for doesn't exist.</p>
                </div>
            </div>
        ) : (
            <div className="min-h-screen bg-black text-white">
                <ProfileBanner />

                {/* Filmography Section */}
                {(combineCredits?.cast || combineCredits?.crew) && (
                    <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">
                        <div className="w-full mx-auto">

                            {/* Biography */}
                            {details.biography && (
                                <div className="mb-8">
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Biography</h2>
                                    <p className="text-gray-300 leading-relaxed text-md md:text-lg">
                                        {details.biography}
                                    </p>
                                </div>
                            )}

                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Filmography</h2>

                            {/* Cast Credits */}
                            {combineCredits?.cast && combineCredits.cast.length > 0 && (
                                <div className="mb-12">
                                    {/* <h3 className="text-2xl font-semibold mb-6">As Actor</h3> */}
                                    <MovieCarouselList
                                        title="As Actor"
                                        moviesData={combineCredits.cast}
                                        isLoading={peopleDetailLoading}
                                        movieId={details.id}
                                        type="infoDetailCast"
                                    />
                                </div>
                            )}

                            {/* Crew Credits */}
                            {combineCredits?.crew && combineCredits.crew.length > 0 && (
                                <div>
                                    {/* <h3 className="text-2xl font-semibold mb-6">As Crew</h3> */}
                                    <MovieCarouselList
                                        title="As Crew"
                                        moviesData={combineCredits.crew}
                                        isLoading={peopleDetailLoading}
                                        movieId={details.id}
                                        type="infoDetailCrew"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    )
}

export default PeopleInfo;