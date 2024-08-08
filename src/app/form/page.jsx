"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { format } from "date-fns";

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.childName) newErrors.childName = "Child's name is required";
    if (!formData.guardianName)
      newErrors.guardianName = "Guardian's name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
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
      dob: format(new Date(formData.dob), "yyyy-MM-dd"), // Format for date
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

            <div className="mb-4">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Date of Birth (DOB)
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                placeholder="mm/dd/yyyy"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
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
                  value={formData.timeIn}
                  onChange={(e) =>
                    setFormData({ ...formData, timeIn: e.target.value })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  value={formData.timeOut}
                  onChange={(e) =>
                    setFormData({ ...formData, timeOut: e.target.value })
                  }
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
