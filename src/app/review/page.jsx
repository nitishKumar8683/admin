"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  product: Yup.string().required("Product or Service Name is required"),
  comments: Yup.string().required("Comments are required"),
});

const ReviewForm = () => {
 const formik = useFormik({
   initialValues: {
     name: "",
     email: "",
     product: "",
     rating: null,
     comments: "",
     recommend: false,
   },
   validationSchema,
   onSubmit: async (values) => {
     try {
       const response = await axios.post("/api/review/createReview", values);
       console.log("Response:", response.data); 
     } catch (error) {
       console.error("Error submitting form:", error); 
     }
   },
 });


  return (
    <div className="bg-gray-100 mx-auto max-w-3xl rounded-lg p-8 shadow-lg">
      <h2 className="text-gray-800 mb-6 text-3xl font-bold">
        Submit Your Review
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            className="text-gray-700 mb-2 block text-sm font-medium"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border-gray-300 w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.name && formik.errors.name ? "border-red-500" : ""}`}
            
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label
            className="text-gray-700 mb-2 block text-sm font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border-gray-300 w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? "border-red-500" : ""}`}
            
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label
            className="text-gray-700 mb-2 block text-sm font-medium"
            htmlFor="product"
          >
            Product or Service Name
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formik.values.product}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border-gray-300 w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.product && formik.errors.product ? "border-red-500" : ""}`}
            
          />
          {formik.touched.product && formik.errors.product ? (
            <div className="text-red text-sm">{formik.errors.product}</div>
          ) : null}
        </div>
        <div>
          <label
            className="text-gray-700 mb-2 block text-sm font-medium"
            htmlFor="comments"
          >
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formik.values.comments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border-gray-300 w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.comments && formik.errors.comments ? "border-red-500" : ""}`}
            rows="4"
            
          ></textarea>
          {formik.touched.comments && formik.errors.comments ? (
            <div className="text-red text-sm">{formik.errors.comments}</div>
          ) : null}
        </div>
        <div>
          <label
            className="text-gray-700 mb-2 block text-sm font-medium"
            htmlFor="rating"
          >
            Rating
          </label>
          <div id="rating" className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={formik.values.rating >= star ? solidStar : regularStar}
                className={`cursor-pointer text-3xl ${formik.values.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => formik.setFieldValue("rating", star)}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="recommend"
            name="recommend"
            checked={formik.values.recommend}
            onChange={formik.handleChange}
            className="border-gray-300 h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <label
            className="text-gray-700 text-sm font-medium"
            htmlFor="recommend"
          >
            Would you recommend this product?
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
