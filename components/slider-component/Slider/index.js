"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./slider.module.scss";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/layout/Footer";
import backgroundImageSlider from "../../../public/images/backgroundImage.jpg";
import dayjs from "dayjs";
import { getFileTypeFromExtension } from "@/utils/helperFunctions";
import { ROUTE } from "@/utils/routeConstant";

const Slider = ({ projectDetail = [], baseRoute }) => {
  const router = useRouter();
  const pathname = usePathname();
  const videoRefs = useRef({});
  const swiperRef = useRef(null);

  const getImageDetails = (item) => ({
    foreground:
      item?.project_feature_image ||
      item?.award_feature_image ||
      item?.publication_feature_image,
    background:
      item?.project_background_image ||
      item?.award_background_image ||
      item?.publication_background_image ||
      backgroundImageSlider.src,
  });

  const stopAllVideos = (exceptIndex = null) => {
    Object.entries(videoRefs.current).forEach(([key, ref]) => {
      const idx = parseInt(key);
      if (ref && idx !== exceptIndex) {
        ref.pause();
        ref.currentTime = 1;
      }
    });
  };

  const initialFileTypes = {};
  projectDetail.forEach((item) => {
    const imageUrl = getImageDetails(item).foreground;
    if (imageUrl) {
      initialFileTypes[imageUrl] = getFileTypeFromExtension(imageUrl);
    }
  });
  const [fileTypes] = useState(initialFileTypes);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(
    getImageDetails(projectDetail?.[0] || {})
  );

  useEffect(() => {
    if (!projectDetail?.length) return;

    const videoRef = videoRefs.current[activeSlideIndex];

    stopAllVideos(activeSlideIndex);

    if (videoRef) {
      const playVideo = () => {
        videoRef.currentTime = 0;
        videoRef.play().catch((e) => {
          console.warn("Autoplay failed:", e);
        });
      };

      if (videoRef.readyState >= 1) {
        playVideo();
      } else {
        videoRef.addEventListener("loadedmetadata", playVideo, { once: true });
      }
    }
  }, [activeSlideIndex, projectDetail, fileTypes]);

  const getDisplayFields = (item) => {
    const type = item.project_feature_image
      ? "project"
      : item.award_feature_image
      ? "award"
      : item.publication_feature_image
      ? "publication"
      : null;

    if (type === "project") {
      return {
        title: item.project_name,
        description: item.project_summary,
        location: null,
        date: null,
      };
    }

    if (type === "award") {
      const fields = item.award_other_fields || [];
      return {
        title: item.award_name,
        description: fields.find((f) => f.label === "Receiver")?.value || null,
        location: fields.find((f) => f.label === "Location")?.value || null,
        date: fields.find((f) => f.label === "Date")?.value || null,
      };
    }

    if (type === "publication") {
      const fields = item.publication_other_fields || [];
      return {
        title: item.publication_title,
        description: fields.find((f) => f.label === "Author")?.value || null,
        location: null,
        date: fields.find((f) => f.label === "Date")?.value || null,
      };
    }

    return { title: "", description: "", location: "", date: null };
  };

  const handleImageClick = (item, index) => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const currentIndex = swiper.realIndex;

    if (index === currentIndex) {
      navigateToItem(item);
      return;
    }

    stopAllVideos();

    swiper.slideToLoop(index, 1200);
  };

  const navigateToItem = (image) => {
    if (image?.award_slug) {
      router.push(`${ROUTE.AWARD}/${image.award_slug}`);
    } else if (image?.publication_slug) {
      router.push(`${ROUTE.PUBLICATIONS}/${image.publication_slug}`);
    } else if (pathname === "/") {
      router.push(
        `${ROUTE.PROJECT_CATEGORIES}/${ROUTE.PROJECT}/${image?.project_slug}`
      );
    } else {
      router.push(`${baseRoute}/${ROUTE.PROJECT}/${image?.project_slug}`);
    }
  };

  return (
    <div
      className={styles.sliderWrapper}
      style={{ backgroundImage: `url(${activeImage.background})` }}
    >
      <div className={`${styles.slideStyle} home_main_slider_div`}>
        <Swiper
          modules={[Pagination, Parallax, Autoplay]}
          loop={true}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          slidesPerView={2}
          centeredSlides={true}
          speed={1500}
          grabCursor={true}
          parallax={true}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1440: { slidesPerView: 2 },
          }}
          ref={swiperRef}
          onSwiper={(swiper) => {
            const realIndex = swiper.realIndex;
            setActiveSlideIndex(realIndex);
            setActiveImage(getImageDetails(projectDetail?.[realIndex]));
          }}
          onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex;
            setActiveSlideIndex(realIndex);
            setActiveImage(getImageDetails(projectDetail?.[realIndex]));
          }}
          className={styles.swiperParallax}
        >
          {projectDetail.length > 0 ? (
            projectDetail.map((item, index) => {
              const { foreground } = getImageDetails(item);
              const { title, description, location, date } =
                getDisplayFields(item);

              return (
                <SwiperSlide key={index} className={styles.SwiperSlide}>
                  <div
                    className={`${styles.galleryInfoWrapper} galleryInfoWrapper_global`}
                  >
                    <div className={styles.heading_section_div}>
                      <h1 className={styles.headingMedium}>{title}</h1>
                      {location && (
                        <p className={styles.location_text}>{location}</p>
                      )}
                    </div>
                  </div>

                  <div
                    className={`${styles.galleryImgWrapper} gallery-img__wrapper`}
                  >
                    {fileTypes[foreground] === "image" ? (
                      <Image
                        key={foreground}
                        onClick={() => handleImageClick(item, index)}
                        data-swiper-parallax-x="0"
                        loading="lazy"
                        alt={title}
                        src={foreground}
                        width={1920}
                        height={1080}
                        className={`${styles.galleryImg} img-fluid`}
                      />
                    ) : fileTypes[foreground] === "video" ? (
                      <video
                        key={foreground}
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el;
                        }}
                        onLoadedMetadata={(e) => {
                          const video = e.currentTarget;
                          if (index !== activeSlideIndex) {
                            video.currentTime = 1;
                          }
                        }}
                        onClick={() => handleImageClick(item, index)}
                        data-swiper-parallax-x="0"
                        className={`${styles.galleryImg} img-fluid`}
                        width={1920}
                        height={1080}
                        poster={foreground}
                        preload="metadata"
                        playsInline
                        loop
                        muted
                      >
                        <source src={foreground} type="video/mp4" />
                      </video>
                    ) : (
                      <p>Media is missing or broken</p>
                    )}
                  </div>

                  {description && (
                    <div className={styles.slider_para_div}>
                      <p
                        className={
                          activeImage.foreground === item.award_feature_image ||
                          activeImage.foreground ===
                            item.publication_feature_image
                            ? styles.bold_para_text
                            : styles.para_text
                        }
                      >
                        {description}
                      </p>
                    </div>
                  )}

                  {date && (
                    <div>
                      <p className={styles.year_text}>
                        {dayjs.unix(date).format("YYYY")}
                      </p>
                    </div>
                  )}
                </SwiperSlide>
              );
            })
          ) : (
            <div className={styles.noDataFound}>
              <p>No data found</p>
            </div>
          )}
        </Swiper>
      </div>
      <Footer />
    </div>
  );
};

export default Slider;
