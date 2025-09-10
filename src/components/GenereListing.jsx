import { useSelector } from "react-redux";
import pattern from "../assets/images/pattern-bg.jpg";
import { useNavigate } from "react-router-dom";

const GenreListing = ({ title, mediaType, type }) => {

    const navigate = useNavigate();
    const { movieGenereList } = useSelector((store) => store.genereList.movie);
    const { tvGenereList } = useSelector((store) => store.genereList.tv);
    const mediaGenereData = mediaType === "movie" ? movieGenereList : tvGenereList;
    console.log(mediaGenereData);

    const handleNavigate = (genereId) => {
        navigate(`/${mediaType}/genere/${genereId}`)      
    }

    return (
        <div>
            <div
                className="text-white hover:text-gray-400 flex items-center gap-2 px-1 mb-0 cursor-pointer w-fit group">
                <h1 className="text-2xl font-bold px-1">{title}</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-6 px-1 rounded-lg bg-black bg-opacity-0 text-white">
                {mediaGenereData?.map((genere) => {
                    return (
                        <div key={genere.id}
                            className="text-center flex flex-col items-center justify-center border-1 border-white/30 bg-white/10 bg-opacity-0 hover:bg-white/20 hover:bg-opacity-50 rounded-lg p-4 transition-all duration-300 cursor-pointer group transform hover:scale-103 h-[85px] sm:h-[100px] md:h-[110px] lg:h-[120px] relative overflow-hidden"
                            onClick={() => handleNavigate(genere.id)}
                        >
                            <img src={pattern} alt="genere" className="absolute top-0 left-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/80 group-hover:bg-black/70 transition-all duration-300"></div>
                            <p className="text-white text-center text-sm md:text-md uppercase group-hover:text-white-400 transition-all duration-300 z-10 relative tracking-wider px-1">{genere.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GenreListing;   
