"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "./logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    childName: "",
    feedback: "",
    satisfaction: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    childName: "",
    feedback: "",
    satisfaction: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      childName: "",
      feedback: "",
      satisfaction: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
      isValid = false;
    } else if (/^[\d\W]/.test(formData.name.trim())) {
      newErrors.name = "Name cannot start with a number or special character";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Child name validation
    if (!formData.childName.trim()) {
      newErrors.childName = "Child's name is required";
      isValid = false;
    } else if (formData.childName.trim().length < 3) {
      newErrors.childName = "Child's name must be at least 3 characters long";
      isValid = false;
    } else if (/^[\d\W]/.test(formData.childName.trim())) {
      newErrors.childName = "Child's name cannot start with a number or special character";
      isValid = false;
    }

    // Feedback validation
    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
      isValid = false;
    }

    // Satisfaction validation
    if (!formData.satisfaction.trim()) {
      newErrors.satisfaction = "Satisfaction rating is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("Please fix the errors above.");
      return;
    }

    try {
      const response = await fetch("/api/feedback/createFeedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Feedback submitted successfully!");
        setFormData({
          name: "",
          email: "",
          childName: "",
          feedback: "",
          satisfaction: "",
        });
        setErrors({
          name: "",
          email: "",
          childName: "",
          feedback: "",
          satisfaction: "",
        });
        setErrorMessage(""); // Clear error message on success
      } else {
        setErrorMessage("Failed to submit feedback.");
      }
    } catch (error) {
      setErrorMessage("An error occurred.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-8 shadow-md">
      <div className="mb-6 flex flex-col items-start">
        <div className="mb-2 flex items-center">
          <Image
            src={logo}
            alt="The Wigglyy Woo Logo"
            width={150}
            height={120}
            className="mr-4"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#f15982]">
              Guardian Feedback Form
            </h1>
            <h6 className="text-sm font-bold text-[#8c52ff]">
              Mobile no. 7840044466
            </h6>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="name"
              className="text-gray-700 block text-sm font-medium"
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border-gray-300 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.name && (
              <p className="text-[#FF0000] mt-1 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="email"
              className="text-gray-700 block text-sm font-medium"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border-gray-300 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.email && (
              <p className="text-[#FF0000] mt-1 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="my-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="childName"
              className="text-gray-700 block text-sm font-medium"
            >
              Your Childs Name
            </label>
            <input
              type="text"
              name="childName"
              id="childName"
              value={formData.childName}
              onChange={handleChange}
              className="border-gray-300 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {errors.childName && (
              <p className="text-[#FF0000] mt-1 text-sm">{errors.childName}</p>
            )}
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="satisfaction"
              className="text-gray-700 block text-sm font-medium"
            >
              Satisfaction Level
            </label>
            <select
              name="satisfaction"
              id="satisfaction"
              value={formData.satisfaction}
              onChange={handleChange}
              className="border-gray-300 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Level</option>
              <option value="1">1 - Very Unsatisfied</option>
              <option value="2">2 - Unsatisfied</option>
              <option value="3">3 - Neutral</option>
              <option value="4">4 - Satisfied</option>
              <option value="5">5 - Very Satisfied</option>
            </select>
            {errors.satisfaction && (
              <p className="text-[#FF0000] mt-1 text-sm">{errors.satisfaction}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="text-gray-700 block text-sm font-medium"
          >
            Feedback
          </label>
          <textarea
            name="feedback"
            id="feedback"
            rows={4}
            className="border-gray-300 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.feedback}
            onChange={handleChange}
            required
          ></textarea>
          {errors.feedback && (
            <p className="text-[#FF0000] mt-1 text-sm">{errors.feedback}</p>
          )}
        </div>

        {errorMessage && (
          <p className="text-[#FF0000] mb-4 text-sm">{errorMessage}</p>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#f15982] text-white py-2 px-4 rounded-md hover:bg-[#c0476c] focus:outline-none focus:ring-2 focus:ring-[#f15982] focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;
