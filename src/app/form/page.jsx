"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./form.css";
import { format } from "date-fns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";

// Validation Schema with Yup
const validationSchema = Yup.object().shape({
  childName: Yup.string().required("Child's name is required"),
  guardianName: Yup.string().required("Guardian's name is required"),
  dob: Yup.date().required("Date of birth is required").nullable(),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  timeIn: Yup.string().required("Time in is required"),
  timeOut: Yup.string().required("Time out is required"),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must agree to the terms and conditions",
  ),
});

const FormLayout = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      dob: values.dob ? format(values.dob, "yyyy-MM-dd") : "", // Format date
    };

    try {
      const response = await axios.post(
        "/api/child/signUpChild",
        formattedValues,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="header">Conscient Form</h2>
        <div className="form-container">
          <Formik
            initialValues={{
              childName: "",
              guardianName: "",
              phoneNumber: "",
              address: "",
              dob: null,
              timeIn: "",
              timeOut: "",
              agreeToTerms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="childName" className="label">
                    Child Name
                  </label>
                  <Field
                    type="text"
                    id="childName"
                    name="childName"
                    placeholder="Enter child's name"
                    className="input input-height"
                  />
                  <ErrorMessage
                    name="childName"
                    component="p"
                    className="error-text"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="dob" className="label">
                    Date of Birth (DOB)
                  </label>
                  <div className="date-picker-container">
                    <DatePicker
                      className="date-picker-input input-height"
                      id="dob"
                      name="dob"
                      selected={values.dob}
                      onChange={(date) => setFieldValue("dob", date)}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="mm/dd/yyyy"
                    />
                    <i className="calendar-icon fas fa-calendar-alt"></i>
                  </div>
                  <ErrorMessage
                    name="dob"
                    component="p"
                    className="error-text"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="guardianName" className="label">
                    Guardian Name
                  </label>
                  <Field
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    placeholder="Enter guardian's name"
                    className="input input-height"
                  />
                  <ErrorMessage
                    name="guardianName"
                    component="p"
                    className="error-text"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="label">
                    Phone Number
                  </label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    className="input input-height"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="p"
                    className="error-text"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="label">
                    Address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    className="input input-height"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="error-text"
                  />
                </div>

                <div className="flex-container">
                  <div className="half-width">
                    <label htmlFor="timeIn" className="label">
                      Time In
                    </label>
                    <Field
                      type="time"
                      id="timeIn"
                      name="timeIn"
                      className="input input-height"
                    />
                    <ErrorMessage
                      name="timeIn"
                      component="p"
                      className="error-text"
                    />
                  </div>
                  <div className="half-width">
                    <label htmlFor="timeOut" className="label">
                      Time Out
                    </label>
                    <Field
                      type="time"
                      id="timeOut"
                      name="timeOut"
                      className="input input-height"
                    />
                    <ErrorMessage
                      name="timeOut"
                      component="p"
                      className="error-text"
                    />
                  </div>
                </div>

                <div className="mb-4 mt-5 flex items-center space-x-3">
                  <Field
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    className="form-checkbox border-gray-300 h-4 w-4 rounded text-blue-600"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm">
                    I confirm that I have read and agree to the
                    <Link
                      href="/term"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 font-semibold text-blue-500 underline"
                    >
                      T&C
                    </Link>
                  </label>
                  <ErrorMessage
                    name="agreeToTerms"
                    component="p"
                    className="mt-1 text-xs text-red"
                  />
                </div>

                <div className="button-container">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader color="#ffffff" size={20} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
