import * as yup from "yup";
import { REGEX } from "./regex";

export const contactUsSchema = yup.object().shape({
  full_name: yup
    .string()
    .required("Full name is required")
    .matches(REGEX.name, "Please enter a valid full name")
    .max(35, "Full name must be at most 35 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .matches(REGEX.email, "Please enter a valid email")
    .email("Please enter a valid email address"),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .matches(REGEX.mobileNumberRegex, "Please enter a valid phone number"),
  message: yup
    .string()
    .matches(REGEX.startingSpaceNotAllowed, "Please enter a valid message")
    .min(20, "Message must be at least 20 characters long")
    .max(500, "Message must be at most 500 characters long"),
});

export const applySchema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .test(
      "starts-with-valid-char",
      "Full name must start with a letter",
      (value) => {
        if (!value) return false;
        return REGEX.onlyletter.test(value);
      }
    )
    .matches(REGEX.name, "Full name must contain only letters and spaces")
    .min(3, "Full name must be at least 3 characters")
    .max(35, "Full name must be at most 35 characters long"),

  email: yup
    .string()
    .required("Email is required")
    .matches(REGEX.email, "Please enter a valid email"),
  // .email("Please enter a valid email address"),

  phone_number: yup
    .string()
    .required("Phone number is required")
    .test(
      "starts-with-valid-char",
      "Phone number must start with a number and symbol ( + )",
      (value) => {
        if (!value) return false;
        return REGEX.onlyNumber.test(value);
      }
    )
    .matches(REGEX.mobileNumberRegex, "Phone number must contain numbers, space & symbols ( + - () )"),

  job_position_id: yup
    .object()
    .shape({
      value: yup.string().required("Please select an area of interest"),
      label: yup.string().required("Please select an area of interest"),
    })
    .required("Please select an area of interest"),

  job_description: yup
    .string()
    .optional()
    .matches(REGEX.startingSpaceNotAllowed, "Please enter a valid description")
    .max(250, "Message must be at most 250 characters long"),

  resume: yup.string().required("Resume is required"),

  portfolio: yup.string().optional(),
});
