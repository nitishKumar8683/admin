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
      dob: format(new Date(formData.dob), "yyyy-MM-dd"), 
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
              <div className="relative">
                <input
                  type="date"
                  className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  data-class="flatpickr-right"
                  id="dob"
                  name="dob"
                  placeholder="mm/dd/yyyy"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
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
                      d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                      fill="#64748B"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* <div className="mb-4">
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
            </div> */}

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

            <div className="flex justify-end">
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
