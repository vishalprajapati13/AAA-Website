"use client";

import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./contactForm.module.scss";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { contactUsSchema } from "@/utils/validationSchema";
import Footer from "@/components/layout/Footer";
import callIcon from "../../../public/images/phone-icon.svg";
import emailIcon from "../../../public/images/email-icon.svg";
import locationIcon from "../../../public/images/location-icon.svg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addContactUs } from "@/redux/slices/contactSlice";
import { getSettings } from "@/redux/slices/settingSlice";
import { useEffect } from "react";

const defaultValues = {
  full_name: "",
  email: "",
  phone_number: "",
  message: "",
};

export default function ContactForm() {
  const { formLoader } = useSelector(({ contactUs }) => contactUs);
  const { settings } = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getSettings());
  // },[])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(contactUsSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    if (data) {
      dispatch(addContactUs(data))
        .then((res) => {
          toast.success(res?.payload?.message);
          reset(defaultValues);
        })
        .catch((err) => toast.error(err?.message));
    }
  };

  return (
    <>
      <div className="common_bg_page_banner contact_us_page_bg auth_page_bg_banner_div">
        <Container>
          <Row className="align-items-center">
            <Col md={4}>
              <div className={`${styles.contains_info_div} mt-0`}>
                <h3 className="page_title_text show_mob desk_hide">
                  Contact Us
                </h3>
                <div className={styles.icon_div}>
                  <Image
                    src={callIcon}
                    width={24}
                    height={24}
                    alt="Icon"
                    className="img-fluid"
                  />
                  <Link href={`tel:${settings?.[0]?.setting_contact_number}`}>
                    {settings?.[0]?.setting_contact_number}
                  </Link>
                </div>
                <div className={styles.icon_div}>
                  <Image
                    src={emailIcon}
                    width={24}
                    height={24}
                    alt="Icon"
                    className="img-fluid"
                  />
                  <Link href={`mailto:${settings?.[0]?.setting_email}`}>
                    {settings?.[0]?.setting_email}
                  </Link>
                </div>
                <div className={styles.icon_div}>
                  <Image
                    src={locationIcon}
                    width={24}
                    height={24}
                    alt="Icon"
                    className="img-fluid"
                  />
                  <Link
                    href={`https://www.google.com/maps/search/${encodeURIComponent(
                      settings?.[0]?.setting_address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {settings?.[0]?.setting_address}
                  </Link>
                </div>
              </div>
            </Col>

            <Col md={2}>
              <div className="divider_line_contact"></div>
            </Col>

            <Col md={6}>
              <div className={`${styles.contactUsSection}`}>
                <h1 className="page_title_text">Inquire Now</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={11}>
                      <Form.Group
                        className={`${styles.contactField} contact_filed_div`}
                      >
                        <Form.Label>Full Name*</Form.Label>
                        <Controller
                          name="full_name"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              autoComplete="off"
                              placeholder="Enter Your Full Name"
                            />
                          )}
                        />
                        <p className={styles.errorText}>
                          {errors.full_name?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={11}>
                      <Form.Group
                        className={`${styles.contactField} contact_filed_div`}
                      >
                        <Form.Label>Email*</Form.Label>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="text"
                              autoComplete="off"
                              placeholder="Enter Your Email Address"
                            />
                          )}
                        />
                        <p className={styles.errorText}>
                          {errors.email?.message}
                        </p>
                      </Form.Group>
                    </Col>
                    <Col md={11}>
                      <Form.Group
                        className={`${styles.contactField} contact_filed_div`}
                      >
                        <Form.Label>Phone Number*</Form.Label>
                        <Controller
                          name="phone_number"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="tel"
                              autoComplete="off"
                              placeholder="Enter Your Phone Number"
                            />
                          )}
                        />
                        <p className={styles.errorText}>
                          {errors.phone_number?.message}
                        </p>
                      </Form.Group>
                    </Col>
                    {/* <Col md={11}>
                      <Form.Group
                        className={`${styles.contactField} contact_filed_div`}
                      >
                        <Form.Label>Message*</Form.Label>
                        <Controller
                          name="message"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <Form.Control
                              {...field}
                              type="textarea"
                              autoComplete="off"
                              placeholder="Write your message.."
                            />
                          )}
                        />
                        <p className={`${styles.errorText} error_message_text`}>
                          {errors.message?.message}
                        </p>
                      </Form.Group>
                    </Col> */}

                    <Col md={11}>
                      <Form.Group
                        className={`${styles.contactField} contact_filed_div`}
                      >
                        <Form.Label>Message*</Form.Label>
                        <div className={styles.contactform_textarea}>
                          <Controller
                            name="message"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                as="textarea"
                                rows={5}
                                autoComplete="off"
                                placeholder="Write your message.."
                              />
                            )}
                          />
                        </div>
                        <p className={styles.errorText}>
                          {errors.message?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={11}>
                      <div className={styles.contactSection_bottom_btn}>
                        <div className={`${styles.submitButton} mt-0`}>
                          <Button
                            onClick={() => handleSubmit(onsubmit)}
                            type="submit"
                            disabled={formLoader}
                          >
                            {formLoader ? "Loading..." : "Inquire"}
                          </Button>
                        </div>
                        <div className="buttonWrapper">
                          <div className={`${styles.resetButton}`}>
                            <Button
                              variant="secondary"
                              type="button"
                              onClick={() => reset(defaultValues)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}
