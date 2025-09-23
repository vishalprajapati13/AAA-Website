"use client";
import React from "react";
// import Image from "next/image";
// import { Container } from "react-bootstrap";
import Footer from "@/components/layout/Footer";
// import aboutleftImg from "../../../public/images/about-slider1-img.jpg";
// import aboutrightImg from "../../../public/images/about-slider2-img.jpg";

const Page = ({ pageDetail }) => {
  return (
    <>
      <div className="common_bg_page_banner">
        <div className="about_container">
          <div className="about_slider_div">
            <h1 className="page_title_text mb-3">{pageDetail?.page_name}</h1>
            <div className="">
              <div
                className="about_contains_div"
                dangerouslySetInnerHTML={{
                  __html: pageDetail?.page_content,
                }}
              />
            </div>
            {/* <div className="about_grid_div">
              <div className="about_grid_item">
                <Image
                  src={aboutleftImg}
                  width={700}
                  height={500}
                  alt="Logo"
                  className="img-fluid"
                  priority
                />
                <h5>Founder & Creative Director</h5>
                <h5>DHARAM PATEL</h5>
                <p>
                  AAA is a multi-disciplinary, award-winning design practice
                  founded in 2005 by Dharam Patel. With a team of 50 experts,
                  AAA delivers innovative solutions across architecture,
                  interiors, master planning, sustainable design, and more.
                  Operating in India, the United States, Australia, Fiji, Sri
                  Lanka, Oman, UAE, Kenya, Botswana, and Congo, the firm
                  collaborates with global consultants to create cutting-edge,
                  sustainable spaces. Recognized internationally, AAA's notable
                  accolades include the Alpha Healing Centre at WAF, Amsterdam,
                  and The Earth House at BLT Awards, Switzerland. Its work has
                  been featured in leading Indian and international
                  publications.
                </p>
              </div>
              <div className="about_grid_item">
                <Image
                  src={aboutrightImg}
                  width={700}
                  height={500}
                  alt="Logo"
                  className="img-fluid"
                  priority
                />
                <h5 style={{ visibility: "hidden" }}>Founder & Creative Director</h5>
                <h5 style={{ visibility: "hidden" }}>DHARAM PATEL</h5>
                <p>
                  AAA is a multi-disciplinary, award-winning design practice
                  founded in 2005 by Dharam Patel. With a team of 50 experts,
                  AAA delivers innovative solutions across architecture,
                  interiors, master planning, and sustainable design. Operating
                  in India and internationally across the United States,
                  Australia, Fiji, Sri Lanka, Oman, UAE, Kenya, Botswana, and
                  Congo, the firm collaborates with global engineers, artists,
                  and consultants. Recognized for projects like Alpha Healing
                  Centre and The Earth House, AAA has earned prestigious
                  international awards. Its work is widely published, reflecting
                  a commitment to flexible, sustainable, and value-driven
                  design.
                </p>
              </div>
            </div> */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Page;
