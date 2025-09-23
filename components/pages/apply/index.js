"use client";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./applyForm.module.scss";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { applySchema } from "@/utils/validationSchema";
import Footer from "@/components/layout/Footer";
import { toast } from "react-toastify";
import { addContactUs } from "@/redux/slices/contactSlice";
import { useSelector } from "react-redux";
import MediaDropzone from "@/components/UI/MediaDropzone";
import { jobPositionData, postJobApply } from "@/services/globalServices";
import { useS3Uploader } from "@/hooks/useS3Uploader";
import { acceptedDocsExtensions } from "@/utils/constant";
import Select from "react-select";

const defaultValues = {
  fullname: "",
  email: "",
  phone_number: "",
  job_position_id: null,
  job_description: "",
  resume: "",
  portfolio: "",
  message: "",
};

export default function ApplyForm({ positions }) {
  const { formLoader } = useSelector(({ contactUs }) => contactUs);
  const { removeUploadedFileFromS3 } = useS3Uploader();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(applySchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const details = {
      ...data,
      job_position_id: data.job_position_id?.value,
      portfolio: data.portfolio || "",
    };
    try {
      await postJobApply(details).then((res) => {
        toast.success(res?.message);
        reset(defaultValues);
      });
      reset({ ...defaultValues, resume: "", portfolio: "" });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleReset = () => {
    const resumeFile = control._formValues.resume;
    const portfolioFile = control._formValues.portfolio;

    if (resumeFile) {
      removeUploadedFileFromS3(resumeFile);
    }

    if (portfolioFile) {
      removeUploadedFileFromS3(portfolioFile);
    }

    reset(defaultValues);
  };

  return (
    <>
      <div className="common_bg_page_banner contact_us_page_bg auth_page_bg_banner_div">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={11} xl={8}>
              <div className={styles.applySection}>
                <h1 className="page_title_text text-center">Apply Now</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className={styles.applyField}>
                        <Form.Label>Full Name*</Form.Label>
                        <Controller
                          name="fullname"
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
                          {errors.fullname?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className={styles.applyField}>
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

                    {/* Phone and Interest Area Side by Side */}

                    <Col md={6}>
                      <Form.Group className={styles.applyField}>
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

                    <Col md={6} className="select_option_field">
                      <Form.Group className={styles.applyField}>
                        <Form.Label>
                          What position are you applying for?*
                        </Form.Label>
                        <Controller
                          name="job_position_id"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={positions.map((option) => ({
                                value: option.job_position_job_position_id,
                                label: option.job_position_position,
                              }))}
                              placeholder="Select an option"
                              isClearable
                            />
                          )}
                        />
                        <p className={styles.errorText}>
                          {errors?.job_position_id?.message ||
                            errors?.job_position_id?.value?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className={styles.applyField}>
                        <Form.Label>Upload Resume*</Form.Label>
                        <div className="upload_file_main_div">
                          <Controller
                            name="resume"
                            control={control}
                            render={({ field }) => (
                              <MediaDropzone
                                value={field.value}
                                onChange={field.onChange}
                                uploadType="resume"
                                acceptExtensions={acceptedDocsExtensions}
                                maxSize={{ size: 2, type: "MB" }}
                                noteMsg="Document uploads must be in PDF or DOC/DOCX format."
                              />
                            )}
                          />
                        </div>
                        <p className={styles.errorText}>
                          {errors?.resume?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className={styles.applyField}>
                        <Form.Label>Upload Portfolio</Form.Label>
                        <div className="upload_file_main_div">
                          <Controller
                            name="portfolio"
                            control={control}
                            render={({ field }) => (
                              <MediaDropzone
                                name="portfolio"
                                value={field.value}
                                uploadType="portfolio"
                                onChange={(val) => field.onChange(val)}
                                acceptExtensions={acceptedDocsExtensions}
                                maxSize={{ size: 5, type: "MB" }}
                                noteMsg="Document uploads must be in PDF or DOC/DOCX format."
                              />
                            )}
                          />
                        </div>
                        <p className={styles.errorText}>
                          {errors?.portfolio?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className={styles.applyField}>
                        <Form.Label>
                          What makes you a great fit for Art & Architecture
                          Associates?
                        </Form.Label>
                        <div className={styles.applyform_textarea}>
                          <Controller
                            name="job_description"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <Form.Control
                                {...field}
                                as="textarea"
                                rows={5}
                                autoComplete="off"
                                placeholder="Describe in at least 100 words .."
                              />
                            )}
                          />
                        </div>
                        <p className={styles.errorText}>
                          {errors.job_description?.message}
                        </p>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <div className={styles.applySection_bottom_btn}>
                        <div className={`${styles.submitButton}`}>
                          <Button
                            onClick={() => handleSubmit(onSubmit)}
                            type="submit"
                            disabled={formLoader}
                          >
                            {formLoader ? "Loading..." : "Apply"}
                          </Button>
                        </div>
                        <div className="buttonWrapper">
                          <div className={`${styles.resetButton}`}>
                            <Button
                              variant="secondary"
                              type="button"
                              onClick={handleReset}
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
