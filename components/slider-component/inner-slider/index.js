"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../../slider-component/Slider/slider.module.scss";
import { Autoplay, Pagination, Parallax } from "swiper/modules";
import backgroundImageSlider from "../../../public/images/backgroundImage.jpg";
import MediaViewer from "@/components/MediaViewer";
import { v4 as uuidv4 } from "uuid";
import youtubeLogo from "../../../public/images/youtube-icon.png";
import { getFileTypeFromExtension } from "@/utils/helperFunctions";
import { OptimizedImage } from "@/components/UI/OptimizedImage";

const InnerSlider = ({ projectDetail }) => {
  const [sliderImg, setSliderImg] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const openModal = (index) => {
    setActiveIndex(index);
  };

  const closeModal = () => {
    setActiveIndex(null);
  };

  const isAward = !!projectDetail?.award_feature_image;
  const isPublication = !!projectDetail?.publication_feature_image;

  const featureImage = isAward
    ? projectDetail?.award_feature_image
    : isPublication
    ? projectDetail?.publication_feature_image
    : projectDetail?.project_feature_image;

  const backgroundImage = isAward
    ? projectDetail?.award_background_image || backgroundImageSlider.src
    : isPublication
    ? projectDetail?.publication_background_image || backgroundImageSlider.src
    : projectDetail?.project_background_image || backgroundImageSlider.src;

  const otherImages =
    projectDetail?.sections?.map((section) => ({
      image: section.data_type === "image" ? section.section_data : null,
      video: section.data_type === "video" ? section.section_data : null,
      text: section.data_type === "text" ? section.section_data : null,
      link: section.link,
    })) || [];

  useEffect(() => {
    sliderImgWithDetail();
  }, [projectDetail]);

  const sliderImgWithDetail = () => {
    const type = getFileTypeFromExtension(featureImage);
    const sliderArr = [{ [type]: featureImage }];

    if (otherImages?.length > 0) {
      sliderArr.push(...otherImages);
    }

    const dataWithId = [...sliderArr].map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    setSliderImg(dataWithId);
  };

  return (
    <>
      <Header showBackArrow={true} />
      <div
        className={styles.sliderWrapper}
        style={{ backgroundImage: `url(${backgroundImage || ""})` }}
      >
        <div className={styles.slideStyle}>
          <div
            className={`inner_slider_main_div modal_slider_main_div fixed inset-0 flex items-center justify-center bg-opacity-50 transition-all duration-300 ease-out opacity-100 scale-100`}
          >
            <h1 className={styles.sliderDetailTitle}>
              {isAward
                ? projectDetail.award_name
                : isPublication
                ? projectDetail.publication_title
                : projectDetail.project_name}
            </h1>

            <Swiper
              modules={[Pagination, Parallax, Autoplay]}
              // loop={true}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              slidesPerView={2}
              centeredSlides={true}
              speed={800}
              grabCursor={true}
              parallax={true}
              className={styles.swiperParallax}
              spaceBetween={40}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1440: { slidesPerView: 2 },
              }}
            >
              {sliderImg?.map((detail, index) => (
                <SwiperSlide key={detail?.id} className={styles.SwiperSlide}>
                  {detail?.text && (
                    <div className={`${styles.innerSlider_para_div} mt-0`}>
                      <div
                        className={`${styles.inner_slider_contains_main_div}`}
                      >
                        <div
                          className={`${styles.innerSlider_para_text}`}
                          dangerouslySetInnerHTML={{ __html: detail?.text }}
                        />
                      </div>
                    </div>
                  )}

                  {detail?.image && (
                    <>
                      <div
                        className={`${styles.galleryInfoWrapper} galleryInfoWrapper_global`}
                      ></div>
                      <div
                        className={`${
                          detail?.text ? "" : styles.galleryImgWrapper
                        } gallery-img__wrapper`}
                      >
                        <OptimizedImage
                          style={{ cursor: "pointer" }}
                          onClick={() => openModal(detail?.id)}
                          src={detail.image}
                          alt={`slide ${detail?.id}`}
                          width={1920}
                          height={1080}
                          className={`${styles.galleryImg} img-fluid`}
                        />
                      </div>
                    </>
                  )}

                  {detail.video && (
                    <>
                      <div
                        className={`${styles.galleryInfoWrapper} galleryInfoWrapper_global`}
                      ></div>
                      <div
                        className={`${
                          detail?.text ? "" : styles.galleryImgWrapper
                        } gallery-img__wrapper`}
                      >
                        <div className="video_sec_main_div">
                          <video
                            className={`${styles.galleryImg} img-fluid`}
                            width={1920}
                            height={1080}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ cursor: "pointer" }}
                            onClick={() => openModal(detail?.id)}
                          >
                            <source src={detail.video} type="video/mp4" />
                          </video>
                          {detail?.link && (
                            <Link
                              href={detail?.link}
                              target="_blank"
                              className="youtube_icon"
                            >
                              View Full Video
                              <Image
                                src={youtubeLogo}
                                width={38}
                                height={28}
                                alt="Logo"
                                className="img-fluid"
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {activeIndex !== null && (
          <MediaViewer
            mediaList={sliderImg?.filter((item) => item?.image || item?.video)}
            currentMediaId={activeIndex}
            onClose={closeModal}
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default InnerSlider;
