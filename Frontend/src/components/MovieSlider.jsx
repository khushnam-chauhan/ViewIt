import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  const formattedCategoryName = category
    ? category
        .replaceAll("_", " ")
        .replace(/^\w/, (c) => c.toUpperCase())
    : "Category";
    const formattedContentType = 
    contentType === "movie" ? "Movies" : 
    contentType === "tv" ? "TV Shows" : "";

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.content || []);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };
    getContent();
  }, [contentType, category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <div
      className="movie-slider"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="slider-title">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className="slider-container" ref={sliderRef}>
        {content.map((item) => (
          <Link to={`/watch/${item.id}`} className="slider-item" key={item.id}>
            <div className="image-wrapper">
              <img
                src={
                  item.backdrop_path
                    ? SMALL_IMG_BASE_URL + item.backdrop_path
                    : "fallback-image-url"
                }
                alt={item.title || item.name || "Content image"}
                className="slider-image"
                //onError={(e) => {
                  //alert("Failed to load content. Please refresh the page.");

               // }} 
              />
            </div>
            <p className="slider-item-title">{item.title || item.name || "Untitled"}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button className="slider-arrow left-arrow" onClick={scrollLeft}>
            <ChevronLeft size={24} />
          </button>

          <button className="slider-arrow right-arrow" onClick={scrollRight}>
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <style>{`
        .movie-slider {
          background-color: black;
          color: white;
          position: relative;
          padding: 1.25rem ;
          max-width: 95rem;
          margin-left: 7px;
          margin-top:-80px;
          flex:none;
        }
        .slider-title {
          margin-bottom: 2rem;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .slider-container {
          display: flex;
          gap: 2rem;
          overflow-x: hidden;
          max-width: 100%;
          min-height: 100%;
        }
        .slider-item {
          min-width: 18.75rem;
          position: relative;
          text-align: center;
        }
        .image-wrapper {
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .slider-image {
          transition: transform 0.3s ease-in-out;
        }
        .slider-item:hover .slider-image {
          transform: scale(1.25);
        }
        .slider-item-title {
          margin-top: 0.5rem;
          font-size:1rem;
        }
        .slider-arrow {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          z-index: 10;
          cursor: pointer;
        }
        .left-arrow {
          left: 3.25rem;
        }
        .right-arrow {
          right: 3.25rem;
        }
        .slider-arrow:hover {
          background-color: rgba(0, 0, 0, 0.75);
        }
          @media (max-width: 1280px) {
          .movie-slider {
            padding: 1rem;
            max-width: 80rem;
          }
          .slider-title {
            font-size: 1.4rem;
            left:20px;
          }
          .slider-item {
            min-width: 16rem;
          }
        }

@media screen  and (max-width: 1301px){

 .movie-slider {
            padding: 0.25rem;
            max-width:73rem;
             margin-top:-50px;
          }

}



@media screen and (min-width: 1221px) and (max-width: 1301px){

 .movie-slider {
            padding: 0.25rem;
            max-width:78rem;
             margin-top:-50px;
          }

}


@media screen and (min-width: 1050px) and (max-width: 1192px){

 .movie-slider {
            padding: 0.25rem;
            max-width:73rem;
             margin-top:-50px;
          }

}

     
@media screen and (min-width: 980px) and (max-width: 1040px){

 .movie-slider {
            padding: 0.25rem;
            max-width:63rem;
             margin-top:-50px;
          }

}


@media screen and (min-width: 865px) and (max-width: 980px){

 .movie-slider {
            padding: 0.25rem;
            max-width:60rem;
             margin-top:-50px;
          }

}



@media screen and (min-width: 702px) and (max-width: 860px){

 .movie-slider {
            padding: 0.25rem;
            max-width:52rem;
             margin-top:-50px;
          }

}


        @media screen and (min-width: 582px) and (max-width: 700px){

 .movie-slider {
            padding: 0.25rem;
            max-width:48rem;
             margin-top:-50px;
          }

}
@media screen and (min-width: 475px) and (max-width: 580px){

 .movie-slider {
            padding: 0.25rem;
            max-width:35rem;
             margin-top:-50px;
          }

}
        @media (max-width: 480px) {
          .movie-slider {
            padding: 0.25rem;
            max-width:25rem;
             margin-top:-50px;
          }
          .slider-title {
            font-size: 1rem;
            margin-bottom: 10px;
           
          }
          .slider-container {
            gap: 0.25rem;
          }
          .slider-item {
            min-width: 8rem;
          
          }
            .slider-item-title {
          margin-top: 0.5rem;
          font-size:12px;
        }
          .slider-arrow {
            width: 2rem;
            height: 2rem;
            top:45%;
            
          }
          .left-arrow {
            left: 20px;
          }
          .right-arrow {
            right: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default MovieSlider;
