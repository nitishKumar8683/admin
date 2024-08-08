"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 

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

  useEffect(() => {
    flatpickr(".form-datepicker", {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M j, Y",
      prevArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });

    flatpickr(".time-picker", {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
      prevArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });
  }, []);

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
            {() => (
              <Form>
                {/* Child's Name */}
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

                {/* Guardian's Name */}
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

                {/* Date of Birth */}
                <div className="mb-4">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Date of Birth (DOB)
                  </label>
                  <div className="relative">
                    <input
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="mm/dd/yyyy"
                      id="dob"
                      name="dob"
                    />
                    <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.17495 5.00664 4.83745V4.24683H13.1416V4.83745C13.1416 5.17495 13.4229 5.48433 13.7885 5.48433C14.1541 5.48433 14.4354 5.17495 14.4354 4.83745V4.24683H15.7504C16.1296 4.24683 16.4354 4.56183 16.4354 4.75308V7.78583H1.77227V4.75308C1.77227 4.56183 2.07802 4.24683 2.25039 4.24683Z"
                          fill="#6B7280"
                        />
                      </svg>
                    </div>
                  </div>
                  <ErrorMessage
                    name="dob"
                    component="p"
                    className="text-xs italic text-red"
                  />
                </div>

                {/* Time In and Time Out */}
                <div className="mb-4 flex gap-4">
                  {/* Time In */}
                  <div className="w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Time In
                    </label>
                    <div className="relative">
                      <input
                        className="time-picker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="HH:MM"
                        id="timeIn"
                        name="timeIn"
                      />
                      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 1.5C4.029 1.5 0 5.529 0 10.5S4.029 19.5 9 19.5 18 15.471 18 10.5 13.971 1.5 9 1.5zM9 17.5c-3.947 0-7.164-3.217-7.164-7.164 0-3.947 3.217-7.164 7.164-7.164 3.947 0 7.164 3.217 7.164 7.164 0 3.947-3.217 7.164-7.164 7.164zm-0.498-11.498V9.9h4.448V8.002h-3.95z"
                            fill="#6B7280"
                          />
                        </svg>
                      </div>
                    </div>
                    <ErrorMessage
                      name="timeIn"
                      component="p"
                      className="text-xs italic text-red"
                    />
                  </div>

                  {/* Time Out */}
                  <div className="w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Time Out
                    </label>
                    <div className="relative">
                      <input
                        className="time-picker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        placeholder="HH:MM"
                        id="timeOut"
                        name="timeOut"
                      />
                      <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 1.5C4.029 1.5 0 5.529 0 10.5S4.029 19.5 9 19.5 18 15.471 18 10.5 13.971 1.5 9 1.5zM9 17.5c-3.947 0-7.164-3.217-7.164-7.164 0-3.947 3.217-7.164 7.164-7.164 3.947 0 7.164 3.217 7.164 7.164 0 3.947-3.217 7.164-7.164 7.164zm-0.498-11.498V9.9h4.448V8.002h-3.95z"
                            fill="#6B7280"
                          />
                        </svg>
                      </div>
                    </div>
                    <ErrorMessage
                      name="timeOut"
                      component="p"
                      className="text-xs italic text-red"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Phone Number
                  </label>
                  <Field
                    type="text"
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

                {/* Address */}
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="text-gray-700 mb-2 block text-sm font-bold"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter address"
                    className="form-input border-gray-300 mt-1 block w-full rounded-md px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-xs italic text-red"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="hover:bg-primary-dark inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <ClipLoader color="#ffffff" size={24} />
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
