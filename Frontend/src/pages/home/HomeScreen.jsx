
import React from 'react';
import Navbar from '../../components/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import "./style.css"; 
import useGetTrendingContent from "../../hooks/useGetTrendingContent"
import {MOVIE_CATEGORIES, TV_CATEGORIES} from "../../utils/constants";
import MovieSlider from "../../components/MovieSlider";
import { useContentStore } from "../../store/content";


const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent(); // Corrected function name
  const { contentType } = useContentStore();
  console.log("trendingContent", trendingContent);
  
  const ORIGINAL_IMG_BASE_URL = 'https://image.tmdb.org/t/p/original/';
  const imageUrl = trendingContent ? ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path : '';

  return (
    <>
      <div className='relative w-screen text-white'>
        <Navbar />
        
        <div className='swiper-container mx-auto px-5 py-8 overflow-hidden'>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView='auto'
            spaceBetween={3}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2000,
              disableOnInteraction:false,
            }}
            navigation={true}
            className='swiper'
            onInit={(swiper) => {
              swiper.autoplay.start();
              swiper.update(); // Force Swiper to reinitialize dimensions
            }}
          >
            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src={imageUrl}
                  alt='db movie'
                  className='w-full h-full object-cover'
                  onError={(e) => e.target.src = '/rf.jpeg'}
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>{trendingContent?.title || trendingContent?.name || 'Requiem for a Dream'} </div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>{trendingContent?.release_date?.split("-")[0] ||
            trendingContent?.first_air_date?.split("-")[0] || 
             "Horror / Drama"}</span>
                     <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>{trendingContent?.adult === undefined 
             ? "Disgust" 
             : trendingContent.adult 
              ? "18+" 
                 : "PG-13"}</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
             <button
              className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
           onClick={() => window.location.href = `/watch/${trendingContent?.id ?? 641}`}
            >
                Watch Now
               </button>
               <button
                 className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent?.id ?? 641}`}
                >
                  Details
                   </button>
              </div>

                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/from.jpeg'
                  alt='From'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl black font-bold mb-2'>From</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Mystery & Drama</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Sci-Fi & Fantasy</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 124364}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 124364}`}
              >
               Details
                </button>
                </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/flipped.jpg'
                  alt='flipped'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>Flipped</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                  <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'> Romance & Comedy</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'> Drama </span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 43949}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 43949}`}
              >
               Details
                </button>
                </div>
                  </div>
              </div>
            </SwiperSlide>


            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/swades.jpeg'
                  alt='Swades'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>Swades</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Musical</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Drama</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 15774}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 15774}`}
              >
               Details
                </button>
                </div>
                </div>
              </div>
            </SwiperSlide>


            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/at.jpeg'
                  alt='About Time'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>About Time</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Romance & Fantasy</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Drama</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id =122906}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 122906}`}
              >
               Details
                </button>
                </div>
                </div>
              </div>
            </SwiperSlide>


            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/mf.jpeg'
                  alt='Modern Family'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>Modern Family</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>American-Sitcom</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Drama&Comedy</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 1421}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 1421}`}
              >
               Details
                </button>
                </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/b s.jpeg'
                  alt='Before Sunrise'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>Before Sunrise</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Romance</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Drama</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 76}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 76}`}
              >
               Details
                </button>
                </div>
                </div>
              </div>
            </SwiperSlide>
          

            <SwiperSlide className='swiper-slide relative overflow-hidden'>
              <div className='slide-content rounded-lg overflow-hidden'>
                <img
                  src='/you.jpeg'
                  alt='YOU'
                  className='w-full h-full object-cover'
                />
                <div className='slide-overlay absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                  <div className='slide-title text-2xl font-bold mb-2'>YOU</div>
                  <div className='slide-tags flex gap-2 mb-2'>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Thriller</span>
                    <span className='tag bg-white/20 py-1 px-3 rounded-lg text-sm'>Drama</span>
                  </div>
                  <div className='slide-buttons flex gap-3 mt-3'>
                <button
             className='btn btn-primary bg-white text-black py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 78191}`}
               >
                  Watch Now
                 </button>
             <button
               className='btn btn-secondary bg-white/20 text-white py-2 px-4 rounded flex items-center'
                onClick={() => window.location.href = `/watch/${trendingContent.id = 78191}`}
              >
               Details
                </button>
                </div>
                </div>
              </div>
            </SwiperSlide>

            


          </Swiper>
          
        </div>
      </div>


      <div className='m-slider' >
        
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
			</div>



      <footer>
          <div className="footer">
      <span className="footer-text">© WATCHit™ | Developed by Ahh🐝</span>
      <span className="footer-icon"> <a href="https://telegram.me/AbhiGanvir"><img src="telegram.svg" alt="Telegram" /> </a></span>
      <span className='footer-icon'><a href="https://github.com/AbhishekGanvir"><img src="github.svg" alt="Github" /></a></span>
    </div>
          </footer>

    </>
  );
};

export default HomeScreen;
