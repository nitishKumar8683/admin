"use client";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

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
          setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
        } else {
          console.error("Error deleting feedback:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
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
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="text-gray-800 mb-6 text-center text-2xl font-bold">
        Submitted Feedback
      </h1>
      <table className="divide-gray-200 min-w-full divide-y">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Name
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Email
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Child Name
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Satisfaction
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Feedback
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-gray-200 divide-y bg-white">
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td className="text-gray-600 px-4 py-2 text-sm">
                {feedback.name}
              </td>
              <td className="text-gray-600 px-4 py-2 text-sm">
                {feedback.email}
              </td>
              <td className="text-gray-600 px-4 py-2 text-sm">
                {feedback.childName}
              </td>
              <td className="text-gray-600 px-4 py-2 text-sm">
                {feedback.satisfaction}
              </td>
              <td className="text-gray-600 px-4 py-2 text-sm">
                <button
                  onClick={() => handleView(feedback)}
                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  View
                </button>
              </td>
              <td className="text-gray-600 flex space-x-2 px-4 py-2 text-sm">
                <i
                  onClick={() => handleEdit(feedback)}
                  className="bi bi-pencil cursor-pointer text-blue-500 hover:text-blue-700"
                  style={{ fontSize: "1.2rem" }}
                ></i>
                <i
                  onClick={() => handleDelete(feedback._id)}
                  className="bi bi-trash cursor-pointer text-[#FF0000]"
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Box */}
      {isDialogOpen && selectedFeedback && (
        <div className="bg-gray-800 fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="relative w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-lg">
            <i
              onClick={closeDialog}
              className="bi bi-x-lg text-gray-600 hover:text-gray-800 absolute right-4 top-4 cursor-pointer"
              style={{ fontSize: "1.2rem" }}
            ></i>
            <h2 className="mb-4 text-xl font-semibold">
              {isEditMode ? "Update Feedback Details" : "Feedback Details"}
            </h2>

            <div className="mb-2">
              <strong>Name:</strong>{" "}
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={selectedFeedback.name}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
                />
              ) : (
                selectedFeedback.satisfaction
              )}
            </div>
            <div className="mb-4">
              <strong>Feedback:</strong>{" "}
              {isEditMode ? (
                <textarea
                  name="feedback"
                  value={selectedFeedback.feedback}
                  onChange={handleInputChange}
                  className="w-full rounded border p-2"
                />
              ) : (
                <pre className="whitespace-pre-wrap break-words">
                  {selectedFeedback.feedback}
                </pre>
              )}
            </div>
            {isEditMode ? (
              <button
                onClick={handleSaveChanges}
                className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={closeDialog}
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
