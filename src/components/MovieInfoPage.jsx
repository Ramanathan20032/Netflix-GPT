const MovieInfoPage = ({ movieDetails }) => {
    return (
        <div>
            <h1>Movie Info Page</h1>
            <h1>{movieDetails?.title}</h1>
            <h1>{movieDetails?.overview}</h1>
            <h1>{movieDetails?.release_date}</h1>
            <h1>{movieDetails?.vote_average}</h1>
            <h1>{movieDetails?.vote_count}</h1>
            <h1>{movieDetails?.popularity}</h1>
        </div>
    )
}

export default MovieInfoPage;
