"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

const FormLayout = () => {
  const initialValues = {
    childName: "",
    guardianName: "",
    phoneNumber: "",
    address: "",
    timeIn: "",
    dob: "",
    timeOut: "",
  };
  const [loading, setLoading] = useState(false);

  //  const [timeInType, setTimeInType] = useState("text");
  //  const handleTimeInFocus = () => {
  //    setTimeInType("time");
  //  };
  //  const handleTimeInBlur = () => {
  //    setTimeInType("text");
  //  };

  const validationSchema = Yup.object().shape({
    childName: Yup.string().required("Child's name is required"),
    guardianName: Yup.string().required("Guardian's name is required"),
    dob: Yup.date().required("Date of birth is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    timeIn: Yup.string().required("Time in is required"),
    timeOut: Yup.string().required("Time out is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/child/signUpChild", values);
      if (response.data.success === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again later.");
    }
    setLoading(false);
    resetForm();
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto mt-8 max-w-lg">
        <h2 className="text-gray-800 mb-4 text-center text-2xl font-bold">
          Consent Form
        </h2>
        <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="childName"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Child&apos;s Name
                  </label>
                  <Field
                    type="text"
                    id="childName"
                    name="childName"
                    placeholder="Enter child's name"
                    className="form-input border-gray-300 mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="childName"
                    component="p"
                    className="text-xs italic text-red"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="guardianName"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Parent/Guardian&apos;s Name
                  </label>
                  <Field
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    placeholder="Enter parent/guardian's name"
                    className="form-input border-gray-300 mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="guardianName"
                    component="p"
                    className="text-xs italic text-red"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Date of Birth (DOB)
                  </label>
                  <Field
                    type="date"
                    id="dob"
                    name="dob"
                    className="border-gray-300 w-full rounded-md border px-3 py-3 text-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="dob"
                    component="p"
                    className="mt-1 text-xs italic text-red"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="timeIn"
                      className="text-gray-700 mb-2 block text-sm font-bold"
                    >
                      Time In
                    </label>
                    <div className="p-4">
                      <Field
                        type="time"
                        id="timeIn"
                        name="timeIn"
                        title="Enter time in HH:MM format"
                        className="border-gray-300 w-full rounded-md border px-3 py-3 text-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:w-1/2 md:w-1/3"
                      />
                    </div>
                    <ErrorMessage
                      name="timeIn"
                      component="p"
                      className="text-xs italic text-red"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="timeOut"
                      className="text-gray-700 mb-2 block text-sm font-bold"
                    >
                      Time Out
                    </label>
                    <Field
                      type="time"
                      id="timeOut"
                      name="timeOut"
                      placeholder="Select Time Out"
                      className="border-gray-300 w-full rounded-md border px-3 py-3 text-lg shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                    />
                    <ErrorMessage
                      name="timeOut"
                      component="p"
                      className="text-xs italic text-red"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    className="form-input border-gray-300 mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="p"
                    className="text-xs italic text-red"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Address
                  </label>
                  <Field
                    as="textarea"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    rows={3}
                    className="form-textarea border-gray-300 mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-xs italic text-red"
                  />
                </div>

                <div className="flex justify-center">
                  {loading ? (
                    <ClipLoader color="#4a90e2" loading={loading} size={35} />
                  ) : (
                    <button
                      type="submit"
                      className="rounded-md bg-primary px-4 py-2 text-white shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Submit
                    </button>
                  )}
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
