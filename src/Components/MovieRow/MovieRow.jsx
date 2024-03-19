import React, { useEffect, useRef, useState } from "react";
import "./MovieRow.css";
import axios from "../../axios";
import { API_KEY } from "../../Constants/Constants";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import YouTube from "react-youtube";
import StarRatings from "react-star-ratings";
import { FaPlay } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const baseImageUrl = "https://image.tmdb.org/t/p/original";

export const MovieRow = () => {
  const [movies, setMovies] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [topRated, setToprated] = useState([]);
  const [action, setAction] = useState([]);
  const [animated, setAnimated] = useState([]);
  const [urlId, setUrlId] = useState("");
  const scrollRefs = {
    originals: useRef(null),
    trending: useRef(null),
    topRated: useRef(null),
    action: useRef(null),
    animated: useRef(null),
  };

  useEffect(() => {
    axios
      .get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`/discover/tv?api_key=${API_KEY}&with_networks=213`)
      .then((res) => {
        setOriginals(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => {
        setToprated(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28&page=1`
      )
      .then((res) => {
        setAction(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16`
      )
      .then((res) => {
        setAnimated(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const scroll = (ref, direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    if (ref.current) {
      ref.current.scroll({
        left: ref.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovieTrailer = (movieId) => {
    console.log(movieId);
    axios
      .get(`/movie/${movieId}/videos?api_key=${API_KEY}`)
      .then((res) => {
        console.log("movies", res.data.results[0]);
        if (res.data.results.length !== 0) {
          setUrlId(res.data.results[0]);
        } else {
          console.log("Array is empty");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="row">
      <h2>Netflix Originals</h2>
      <div className="posters" ref={scrollRefs.originals}>
        {originals.map((data) => {
          return (
            <div>
              <img
                onClick={() => handleMovieTrailer(data.id)}
                key={data.id}
                className="poster"
                alt="poster"
                src={baseImageUrl + data.poster_path}
              />
            </div>
          );
        })}
        {urlId && (
          <YouTube
            style={{
              position: "absolute",
              marginLeft: "500px",
              width: "800px",
              height: "600px",
            }}
            videoId={urlId.key}
            opts={opts}
          />
        )}
        <FaArrowLeft
          className="scroll-arrow left"
          onClick={() => scroll(scrollRefs.originals, "left")}
        />
        <FaArrowRight
          className="scroll-arrow right"
          onClick={() => scroll(scrollRefs.originals, "right")}
        />
      </div>

      <h2>Trending Now</h2>
      <div className="posters1" ref={scrollRefs.trending}>
        {movies.map((data) => {
          return (
            <div>
              <img
                key={data.id}
                className="poster"
                alt="poster"
                src={baseImageUrl + data.poster_path}
              />
            </div>
          );
        })}
        <FaArrowLeft
          className="scroll-arrow1 left"
          onClick={() => scroll(scrollRefs.trending, "left")}
        />
        <FaArrowRight
          className="scroll-arrow1 right"
          onClick={() => scroll(scrollRefs.trending, "right")}
        />
      </div>

      <h2>Animated</h2>
      <div className="posters2" ref={scrollRefs.animated}>
        {animated.map((data) => {
          return (
            <div className="poster-wrapper" key={data.id}>
              <img
                key={data.id}
                className="poster"
                alt="poster"
                src={baseImageUrl + data.backdrop_path}
              />
              <div className="overlay">
                <h3 style={{position:'absolute',left:'35px',marginBottom:'-80px'}} > {data.original_title} </h3>
                <div className="additional-buttons">
                  <div className="icon">
                    <FaPlay />
                  </div>
                  <div className="icon">
                    <FaPlus />
                  </div>
                  <div className="icon">
                    <FaThumbsUp />
                  </div>
                </div>
                <div className="star-ratings" style={{marginTop:'10px', marginLeft:'-72px'}} >
                  <StarRatings
                    rating={data.vote_average / 2}
                    starRatedColor="red"
                    numberOfStars={5}
                    name="rating"
                    starDimension="0.8rem"
                    starSpacing="0.2rem"
                  />
                </div>
              </div>
            </div>
          );
        })}
        <FaArrowLeft
          className="scroll-arrow2 left"
          onClick={() => scroll(scrollRefs.animated, "left")}
        />
        <FaArrowRight
          className="scroll-arrow2 right"
          onClick={() => scroll(scrollRefs.animated, "right")}
        />
      </div>

      <h2>Top Rated</h2>
      <div className="posters2" ref={scrollRefs.topRated}>
        {topRated.map((data) => {
          return (
            <div>
              <img
                key={data.id}
                className="poster"
                alt="poster"
                src={baseImageUrl + data.poster_path}
              />
            </div>
          );
        })}
        <FaArrowLeft
          className="scroll-arrow3 left"
          onClick={() => scroll(scrollRefs.topRated, "left")}
        />
        <FaArrowRight
          className="scroll-arrow3 right"
          onClick={() => scroll(scrollRefs.topRated, "right")}
        />
      </div>

      <h2>Action Movies</h2>
      <div className="posters2" ref={scrollRefs.action}>
        {action.map((data) => {
          return (
            <div>
              <img
                key={data.id}
                className="poster"
                alt="poster"
                src={baseImageUrl + data.poster_path}
              />
            </div>
          );
        })}
        <FaArrowLeft
          className="scroll-arrow4 left"
          onClick={() => scroll(scrollRefs.action, "left")}
        />
        <FaArrowRight
          className="scroll-arrow4 right"
          onClick={() => scroll(scrollRefs.action, "right")}
        />
      </div>
    </div>
  );
};
