import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import errorImg from "../../../public/images/error-img.jpg";

const ErrorPage = () => {
  return (
    <>
      <Container>
        <div className="error_page_div">
          <div className="text-center">
            <Image
              src={errorImg}
              width={499}
              height={350}
              alt="Image"
              className="img-fluid"
            />
            <h1 className="error_title">Page Not Found</h1>
            <p className="error_para">
              Oops! The requested URL was not found on this server.
            </p>
            <Link className="btn error_btn" href="/">
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ErrorPage;
