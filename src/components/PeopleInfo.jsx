import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { peopleDetailThunk } from "../store/thunks/peopleDetailThunk";
import { clearPeopleData } from "../store/slices/peopleDetailSlice";


const PeopleInfo = () => {
    const { personId } = useParams();
    const dispatch = useDispatch();
    const { peopleData, peopleDetailLoading, peopleDetailError } = useSelector((store) => store?.PeopleDetail);
    console.log(`PeopleInfo: ${personId}`);
    console.log("peopleData", peopleData);

    useEffect(() => {
        dispatch(peopleDetailThunk(personId));
    }, [dispatch, personId]);

    useEffect(() => {
        return () => {
            dispatch(clearPeopleData());
        }
    }, [dispatch]);

    return(
        <>
            <h1 className="text-white">People Info : {peopleData?.details?.name}</h1>
        </>
    )
}

export default PeopleInfo;