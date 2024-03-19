import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import { API_KEY } from "../../Constants/Constants";
import { FaPlay } from "react-icons/fa";
import StarRatings from 'react-star-ratings';
import { FaInfoCircle } from "react-icons/fa";


const baseImageUrl = "https://image.tmdb.org/t/p/original";


export const Banner = () => {

  const [banner,setBanner] = useState([])

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US`).then((res)=>{
      setBanner(res.data.results.sort(function (a, b) {
          return 0.5 - Math.random();
        })[0]
      );
    })
  }, [])
  
  return (
    <div className="banner" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),url(${baseImageUrl+banner.backdrop_path})`}} >

      <div className="content">
        <h1 className="title " style={{marginBottom:'-20px'}} > {banner.title} </h1>
        <div className="flex">
              <div className=" hidden sm:flex justify-center sm:justify-start ml-2">
                {banner.vote_average ? (
                  <h1 className="flex text-white text-xl drop-shadow-lg 2xl:text-lg">
                    <div className="-mt-1"  >
                      <StarRatings
                        rating={banner.vote_average / 2}
                        starRatedColor="red"
                        numberOfStars={5}
                        name="rating"
                        starDimension="1.1rem"
                        starSpacing="0.2rem"
                      />
                    </div>
                  </h1>
                ) : null}
              </div>
          </div>
        <div className="banner_buttons">
          <button className="button" style={{backgroundColor:'red'}} > <FaPlay /> Play</button>
          <button className="button1"> <FaInfoCircle/> More Info </button>
        </div>
        
        <p className="description">
        {banner.overview}
        </p>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
};
