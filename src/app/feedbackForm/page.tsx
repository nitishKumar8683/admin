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

    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (/^[\d\W]/.test(value.trim())) {
          newErrors.name =
            "Name cannot start with a number or special character";
        } else if (value.trim().length < 3) {
          newErrors.name = "Name must be at least 3 characters long";
        } else {
          newErrors.name = "";
        }
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          newErrors.email = "Email is invalid";
        } else {
          newErrors.email = "";
        }
        break;
      case "childName":
        if (!value.trim()) {
          newErrors.childName = "Child's name is required";
        } else if (/^[\d\W]/.test(value.trim())) {
          newErrors.childName =
            "Child's name cannot start with a number or special character";
        } else if (value.trim().length < 3) {
          newErrors.childName =
            "Child's name must be at least 3 characters long";
        } else {
          newErrors.childName = "";
        }
        break;
      case "feedback":
        if (!value.trim()) {
          newErrors.feedback = "Feedback is required";
        } else {
          newErrors.feedback = "";
        }
        break;
      case "satisfaction":
        if (!value.trim()) {
          newErrors.satisfaction = "Satisfaction rating is required";
        } else {
          newErrors.satisfaction = "";
        }
        break;
    }
    setErrors(newErrors);
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

    // Check all fields for validation
    for (const [name, value] of Object.entries(formData)) {
      if (name === "satisfaction" && !value.trim()) {
        newErrors[name as keyof typeof newErrors] =
          "Satisfaction rating is required";
        isValid = false;
      } else if (name === "feedback" && !value.trim()) {
        newErrors[name as keyof typeof newErrors] = "Feedback is required";
        isValid = false;
      } else if (!value.trim()) {
        newErrors[name as keyof typeof newErrors] =
          `${name.replace(/([A-Z])/g, " $1")} is required`;
        isValid = false;
      }
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
              <p className="mt-1 text-sm text-[#FF0000]">{errors.name}</p>
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
              <p className="mt-1 text-sm text-[#FF0000]">{errors.email}</p>
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
              <p className="mt-1 text-sm text-[#FF0000]">{errors.childName}</p>
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
              <option value="1">1 - Very Dissatisfied</option>
              <option value="2">2 - Dissatisfied</option>
              <option value="3">3 - Neutral</option>
              <option value="4">4 - Satisfied</option>
              <option value="5">5 - Very Satisfied</option>
            </select>
            {errors.satisfaction && (
              <p className="mt-1 text-sm text-[#FF0000]">
                {errors.satisfaction}
              </p>
            )}
          </div>
        </div>

        <div className="my-4">
          <label
            htmlFor="feedback"
            className="text-gray-700 block text-sm font-medium"
          >
            Feedback
          </label>
          <textarea
            name="feedback"
            id="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="border-gray-300 mt-1 block w-full rounded-md border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            required
          />
          {errors.feedback && (
            <p className="mt-1 text-sm text-[#FF0000]">{errors.feedback}</p>
          )}
        </div>

        <div className="my-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#f15982] px-4 py-2 text-white hover:bg-[#d45271] focus:outline-none"
          >
            Submit Feedback
          </button>
        </div>
      </form>
      {errorMessage && (
        <div className="mt-4 text-sm text-[#FF0000]">{errorMessage}</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;
