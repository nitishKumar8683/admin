"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FormLayout = () => {
  const [formData, setFormData] = useState({
    childName: "",
    guardianName: "",
    phoneNumber: "",
    address: "",
    timeIn: "",
    dob: "",
    timeOut: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dob, setDob] = useState(null); // For react-datepicker
  const datePickerRef = useRef(null);
  const [date, setDate] = useState(new Date());

  const validateForm = () => {
    const newErrors = {};
    if (!formData.childName) newErrors.childName = "Child's name is required";
    if (!formData.guardianName)
      newErrors.guardianName = "Guardian's name is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.timeIn) newErrors.timeIn = "Time in is required";
    if (!formData.timeOut) newErrors.timeOut = "Time out is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formattedValues = {
      ...formData,
      dob: dob ? format(dob, "yyyy-MM-dd") : "", 
    };

    try {
      const response = await axios.post(
        "/api/child/signUpChild",
        formattedValues,
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          childName: "",
          guardianName: "",
          phoneNumber: "",
          address: "",
          timeIn: "",
          dob: "",
          timeOut: "",
        });
        setDob(null); 
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
      <div className="mx-auto mt-8 max-w-lg">
        <h2 className="text-gray-800 mb-4 text-center text-2xl font-bold">
          Consent Form
        </h2>
        <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <form onSubmit={handleSubmit}>
            {Object.keys(errors).map((key) => (
              <p key={key} className="text-xs italic text-red">
                {errors[key]}
              </p>
            ))}
            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Child Name
              </label>
              <input
                type="text"
                id="childName"
                name="childName"
                placeholder="Enter child's name"
                value={formData.childName}
                onChange={(e) =>
                  setFormData({ ...formData, childName: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4 w-full">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date of Birth (DOB)
              </label>
              <div className="relative w-full">
                <DatePicker
                  ref={datePickerRef}
                  selected={dob}
                  onChange={(date) => {
                    setDob(date);
                    setFormData({ ...formData, dob: date });
                  }}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select date"
                  customInput={
                    <input
                      type="text"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 pr-10 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      readOnly
                    />
                  }
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
                  onClick={() => datePickerRef.current?.setOpen(true)} 
                >
                  <CalendarIcon className="text-gray-400 dark:text-gray-500 h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Time In
                </label>
                <input
                  type="time"
                  id="timeIn"
                  name="timeIn"
                  placeholder="HH:MM"
                  value={formData.timeIn}
                  onChange={(e) =>
                    setFormData({ ...formData, timeIn: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Time Out
                </label>
                <input
                  type="time"
                  id="timeOut"
                  name="timeOut"
                  placeholder="HH:MM"
                  value={formData.timeOut}
                  onChange={(e) =>
                    setFormData({ ...formData, timeOut: e.target.value })
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Guardian Name
              </label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                placeholder="Enter guardian's name"
                value={formData.guardianName}
                onChange={(e) =>
                  setFormData({ ...formData, guardianName: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="hover:bg-primary-dark rounded bg-primary px-4 py-2 text-white transition"
              >
                {loading ? <ClipLoader size={24} color="#fff" /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
