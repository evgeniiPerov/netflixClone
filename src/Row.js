//rfce snipper
import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import Youtube from "react-youtube";


const base_url = 'https://image.tmdb.org/t/p/original/'


function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


    // Options for react-youtube
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };


    //snippest of cide which runs based on a specific variable
    //feed information in a single row!
    useEffect(() => {
        //if [], run once when the row loads, and dont run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213  
            //use array from request
            setMovies(request.data.results)
            return request
        }
        fetchData();
        //expected from fetchUrl
    }, [fetchUrl]);

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await axios.get(
                `/movie/${movie.id}/videos?api_key=e4f62766cea739e43ca44d833457ed9b`
            );
            setTrailerUrl(trailerurl.data.results[0]?.key);
        }
    };


    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* posters */}

                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                    />
                ))}
            </div>
            {/*container */}
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
