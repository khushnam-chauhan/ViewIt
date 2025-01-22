import { useEffect, useRef, useState } from "react";
import { Link, useParams } from 
"react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./style.css"; 
import ReactPlayer from "react-player";
import { formatReleaseDate } from "../utils/dateFunction";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";



const WatchPage = () => {
    const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [currentTrailerId, setCurrentTrailerId] = useState(0);
	const [setLoading] = useState(true);
	const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();
    const sliderRef = useRef(null);


    useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				setTrailers(res.data.trailers);
			} catch (error) {
				if (error.message.includes("404")) {
					setTrailers([]);
				}
			}
		};

		getTrailers();
	}, [contentType, id]);
console.log("trailers",trailers);
useEffect(() => {
    const getSimilarContent = async () => {
        try {
            const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
            setSimilarContent(res.data.similar);
        } catch (error) {
            if (error.message.includes("404")) {
                setSimilarContent([]);
            }
        }
    };

    getSimilarContent();
}, [contentType, id]);
console.log("similarContent",similarContent)

useEffect(() => {
    const getContentDetails = async () => {
        try {
            const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
            setContent(res.data.content);
        } catch (error) {
            if (error.message.includes("404")) {
                setContent(null);
            }
        } finally {
            setLoading(false);
        }
    };

    getContentDetails();
}, [contentType, id]);
console.log("content",content);

// Define handlePrev and handleNext functions
const handlePrev = () => {
    if (currentTrailerId > 0) {
      setCurrentTrailerId(currentTrailerId - 1);
    }
  };

  const handleNext = () => {
    if (currentTrailerId < trailers.length - 1) {
      setCurrentTrailerId(currentTrailerId + 1);
    }
  };
  
  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
};
const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
};

if (!content) {
    return (
        <div className='bg-black text-white h-screen'>
            <div className='max-w-6xl mx-auto'>
                <Navbar />
                <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                    <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Aww, where did it go? 🥺 The content must be off having fun! </h2>
                </div>
            </div>
        </div>
    );
}

  return (
    <div className= 'text-white min-h-screen w-screen mt-0 m-page'>
        <div className="mx-auto container   h-full">
    <Navbar />

    {trailers.length > 0 && (
          <div className="flex justify-between mt-3  items-center  mb-4">
            <button
              className={`
                bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded
                ${currentTrailerId === 0 ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={currentTrailerId === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`
                bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded
                ${currentTrailerId === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={currentTrailerId === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
    
    <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
					{trailers.length > 0 && (
						<ReactPlayer
							controls={true}
							width={"100%"}
							height={"70vh"}
							className='mx-auto overflow-hidden sm:w-1/2  rounded-lg'
							url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId].key}`}
						/>
					)}

					{trailers?.length === 0 && (
						<h2 className='text-xl text-center mt-5'>
							No trailers available for{" "}
							<span className='font-bold text-pink-700'>{content?.title || content?.name}</span> 😿🍿
						</h2>
					)}
				</div>
    
{/* movie details */}
<div
					className='flex flex-col -mt-5 md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto'
				>
					<div className='mb-4 md:mb-0'>
						<h2 className='text-5xl ml-3  font-bold text-balance'>{content?.title || content?.name}</h2>

						<p className='mt-2 ml-3 text-lg'>
							{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
							{content?.adult ? (
								<span className='text-red-600'>18+</span>
							) : (
								<span className='text-pink-700'>PG-13</span>
							)}{" "}
						</p>
						<p className='mt-4 ml-3 text-lg'>{content?.overview}</p>
					</div>
					<img
						src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
						alt='Poster image'
						className='max-h-[500px] sm:max-h-[300px]rounded-md'
					/>
				</div>
{/*Similar content */}
{similarContent.length > 0 && (
					<div className='mt-12 left-0 max-w-5xl mx-auto relative'>
						<h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>

						<div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
							{similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}

							<ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-10 h-10
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-pink-500 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-10 h-10 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-pink-500 
								text-white rounded-full'
								onClick={scrollLeft}
							/>
						</div>
					</div>
				)}

       <footer>
      <div className="footer">
      <span className="footer-text">© WATCHit™ | Developed by Ahh🐝</span>
      <span className="footer-icon"> <a href="https://telegram.me/AbhiGanvir"> <img src="/telegram.svg" alt="" srcset="" /></a></span>
       <span className='footer-icon'><a href="https://github.com/AbhishekGanvir"> <img src="github.svg" alt="" /> </a></span>
      </div>
      </footer>

  </div>
</div>
    
  );
};
<style>{` 
.w-page{
color:white;
width: 100vw;
min-height: 100vh;
margin-top: 0px;
}




`}</style>
export default WatchPage;
