"use client";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Feedback {
  _id: string;
  name: string;
  email: string;
  childName: string;
  satisfaction: string;
  feedback: string;
}

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetch("/api/feedback/getFeedback")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setFeedbacks(data.data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  const handleEdit = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFeedback(null);
  };

  const handleDelete = (id: string) => {
    fetch(`/api/feedback/deleteFeedback/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Feedback deleted successfully");
          toast.success("Feedback deleted successfully!");
          setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } else {
          console.error("Error deleting feedback:", data.error);
          toast.error("Error deleting feedback: " + data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error deleting feedback: " + error.message);
      });
  };

  const handleView = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedFeedback) {
      fetch(`/api/feedback/updateFeedBack/${selectedFeedback._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedFeedback),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Feedback updated successfully");
            setFeedbacks(
              feedbacks.map((feedback) =>
                feedback._id === selectedFeedback._id
                  ? selectedFeedback
                  : feedback,
              ),
            );
            closeDialog();
          } else {
            console.error("Error updating feedback:", data.error);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (selectedFeedback) {
      setSelectedFeedback({
        ...selectedFeedback,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <DefaultLayout>
      {/* Apply blur and opacity reduction when dialog is open */}
      <div
        className={`mx-auto mt-10 max-w-4xl rounded-lg bg-white p-4 shadow-lg sm:p-6 md:p-8 lg:p-10 ${
          isDialogOpen ? "opacity-50 blur-sm" : ""
        } transition-all duration-300`}
      >
        <h1 className="text-gray-800 mb-6 text-center text-lg font-bold sm:text-xl md:text-2xl">
          Submitted Feedback
        </h1>
        <div className="overflow-x-auto">
          <table className="divide-gray-200 min-w-full divide-y">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-700 px-2 py-1 text-left text-xs font-medium sm:text-sm md:text-base">
                  Name
                </th>
                <th className="text-gray-700 px-2 py-1 text-left text-xs font-medium sm:text-sm md:text-base">
                  Email
                </th>
                <th className="text-gray-700 px-2 py-1 text-left text-xs font-medium sm:text-sm md:text-base">
                  Child Name
                </th>
                <th className="text-gray-700 px-2 py-1 text-left text-xs font-medium sm:text-sm md:text-base">
                  Satisfaction
                </th>
                <th className="text-gray-700 px-2 py-1 text-left text-xs font-medium sm:text-sm md:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-gray-200 divide-y bg-white">
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="text-gray-600 px-2 py-1 text-xs sm:text-sm md:text-base">
                    {feedback.name}
                  </td>
                  <td className="text-gray-600 px-2 py-1 text-xs sm:text-sm md:text-base">
                    {feedback.email}
                  </td>
                  <td className="text-gray-600 px-2 py-1 text-xs sm:text-sm md:text-base">
                    {feedback.childName}
                  </td>
                  <td className="text-gray-600 px-2 py-1 text-xs sm:text-sm md:text-base">
                    {feedback.satisfaction}
                  </td>
                  <td className="flex space-x-1 overflow-auto px-2 py-1 text-xs sm:text-sm md:text-base">
                    <i
                      onClick={() => handleView(feedback)}
                      className="bi bi-eye cursor-pointer text-blue-500 hover:text-blue-700"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      onClick={() => handleEdit(feedback)}
                      className="bi bi-pencil cursor-pointer text-blue-500 hover:text-blue-700"
                      style={{ fontSize: "1rem" }}
                    ></i>
                    <i
                      onClick={() => handleDelete(feedback._id)}
                      className="bi bi-trash cursor-pointer text-[#FF0000]"
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && selectedFeedback && (
        <div
          className="bg-gray-800 fixed inset-0 z-50 flex items-center justify-center overflow-scroll bg-opacity-50 backdrop-blur-sm"
          style={{ zIndex: 1000 }}
        >
          <div className="relative w-full max-w-lg rounded-lg bg-white p-4 shadow-lg sm:p-6 md:p-8 lg:p-10">
            <i
              onClick={closeDialog}
              className="bi bi-x-lg text-gray-600 hover:text-gray-800 absolute right-4 top-4 cursor-pointer"
              style={{ fontSize: "1.2rem" }}
            ></i>
            <h2 className="mb-4 text-lg font-semibold sm:text-xl md:text-2xl">
              {isEditMode ? "Update Feedback Details" : "Feedback Details"}
            </h2>

            <div
              className="modal-body"
              style={{
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto",
              }}
            >
              <div className="mb-2">
                <strong>Name:</strong>{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="name"
                    value={selectedFeedback.name}
                    onChange={handleInputChange}
                    className="w-full rounded border p-2 text-xs sm:text-sm md:text-base"
                  />
                ) : (
                  selectedFeedback.name
                )}
              </div>
              <div className="mb-2">
                <strong>Email:</strong>{" "}
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    value={selectedFeedback.email}
                    onChange={handleInputChange}
                    className="w-full rounded border p-2 text-xs sm:text-sm md:text-base"
                  />
                ) : (
                  selectedFeedback.email
                )}
              </div>
              <div className="mb-2">
                <strong>Child Name:</strong>{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="childName"
                    value={selectedFeedback.childName}
                    onChange={handleInputChange}
                    className="w-full rounded border p-2 text-xs sm:text-sm md:text-base"
                  />
                ) : (
                  selectedFeedback.childName
                )}
              </div>
              <div className="mb-2">
                <strong>Satisfaction:</strong>{" "}
                {isEditMode ? (
                  <input
                    type="text"
                    name="satisfaction"
                    value={selectedFeedback.satisfaction}
                    onChange={handleInputChange}
                    className="w-full rounded border p-2 text-xs sm:text-sm md:text-base"
                  />
                ) : (
                  selectedFeedback.satisfaction
                )}
              </div>
              <div className="mb-2">
                <strong>Feedback:</strong>{" "}
                {isEditMode ? (
                  <textarea
                    name="feedback"
                    value={selectedFeedback.feedback}
                    onChange={handleInputChange}
                    className="w-full rounded border p-2 text-xs sm:text-sm md:text-base"
                  />
                ) : (
                  selectedFeedback.feedback
                )}
              </div>
            </div>
            {isEditMode && (
              <div className="flex justify-end">
                <button
                  onClick={handleSaveChanges}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </DefaultLayout>
  );
};

export default FeedbackTable;
