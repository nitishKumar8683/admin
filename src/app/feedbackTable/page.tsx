"use client";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@/components/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `/api/feedback/getFeedback?page=${currentPage}&limit=10`,
        );
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setFeedbacks(data.data);
          setTotalPages(data.totalPages);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();
  }, [currentPage]);

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
          toast.success("Feedback deleted successfully!");
          setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } else {
          toast.error("Error deleting feedback: " + data.error);
        }
      })
      .catch((error) => {
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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  return (
    <DefaultLayout>
      <div
        className={`rounded-sm border border-stroke bg-white px-4 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6 xl:py-4 ${
          isDialogOpen ? "opacity-50 blur-sm" : ""
        } transition-all duration-300`}
      >
        
        <div className="overflow-x-auto">
          <table className="divide-gray-200 min-w-full divide-y">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white sm:text-sm md:text-base">
                  Guardians Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white sm:text-sm md:text-base">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white sm:text-sm md:text-base">
                  Child Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white sm:text-sm md:text-base">
                  Satisfaction
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-black dark:text-white sm:text-sm md:text-base">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-grey-200 divide-y bg-white">
              {feedbacks.map((feedback) => (
                <tr
                  className="border-t border-stroke dark:border-strokedark"
                  key={feedback._id}
                >
                  <td className="px-4 py-2 text-xs text-black dark:text-white sm:text-sm md:text-base">
                    {feedback.name}
                  </td>
                  <td className="px-4 py-2 text-xs text-black dark:text-white sm:text-sm md:text-base">
                    {feedback.email}
                  </td>
                  <td className="px-4 py-2 text-xs text-black dark:text-white sm:text-sm md:text-base">
                    {feedback.childName}
                  </td>
                  <td className="px-4 py-2 text-xs text-black dark:text-white sm:text-sm md:text-base">
                    {feedback.satisfaction}
                  </td>
                  <td className="flex space-x-1 overflow-auto px-2 py-1 text-xs sm:text-sm md:text-base">
                    <button
                      className="mr-2 text-blue-500 hover:text-blue-700"
                      onClick={() => handleView(feedback)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 576 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                      </svg>
                    </button>
                    <button
                      className="mr-2 text-yellow-500 hover:text-yellow-700"
                      onClick={() => handleEdit(feedback)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 576 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(feedback._id)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          
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
