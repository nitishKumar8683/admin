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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      toast.error("An error occurred");
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
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Feedback
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FeedbackForm;
