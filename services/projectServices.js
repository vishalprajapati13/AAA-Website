import { axiosInstance } from "./axiosInstance";

export const getAllProductService = (params) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .post("/project/get_projects_with_filter", params)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );  

export const getAllDesignation = (params) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .post("/designation/designationList", params)
      .then((response) => {
        resolve(response?.data.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const getAllEmployee = () =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get("/employee/with-designations")
      .then((response) => {
        resolve(response?.data?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const postContactUsService = (params) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .post("/contact-us", params)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

export const getProductDetail = (project_slug) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get(`/project/slug/${project_slug}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error?.message || "Something went wrong");
      })
  );

export const getAwardDetail = (award_slug) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get(`/award/slug/${award_slug}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );

  export const getAllAwardService = () =>
    new Promise((resolve, reject) =>
      axiosInstance
        .get("/award")
        .then((response) => {
          resolve(response?.data);
        })
        .catch((error) => {
          reject(error?.message || "Something went wrong");
        })
    );
    
export const getPublicationDetail = (publication_slug) =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get(`/publication/slug/${publication_slug}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );


export const getAllPublicationService = () =>
  new Promise((resolve, reject) =>
    axiosInstance
      .get("/publication")
      .then((response) => {
        resolve(response?.data);
      })
      .catch((error) => {
        reject(error?.message || "Something went wrong");
      })
  );
