import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import { getFeaturedPosts } from '../services';


export default function App() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="swiper-container"
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <SwiperSlide key={index} className="relative rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-full" >
            <div className="carousel-container" >
              <img className="carousel-img" src={post.featuredImage.url} />
              <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-full" />
              <div className="content">
                <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{post.title}</p>
                <div className="flex items-center absolute bottom-5 w-full justify-center mb-10">
                  <Image
                    unoptimized
                    alt={post.author.name}
                    height="30px"
                    width="30px"
                    className="align-middle drop-shadow-lg rounded-full"
                    src={post.author.photo.url}
                  />
                  <p className="inline align-middle text-white text-shadow ml-2 font-medium">{post.author.name}</p>
                </div>
                
              </div>
              <Link href={`/post/${post.slug}`}><span className="content" /></Link>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
  );
}
