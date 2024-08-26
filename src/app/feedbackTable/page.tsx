"use client"
import React, { useEffect, useState } from "react";

interface Feedback {
  id: string;
  name: string;
  email: string;
  childName: string;
  satisfaction: string;
  feedback: string;
}

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Fetch feedback data from API (replace with actual API call)
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Submitted Feedback
      </h1>
      <table className="border-gray-200 min-w-full rounded-md border bg-white shadow-sm">
        <thead>
          <tr>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Name
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Email
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Childs Name
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Satisfaction
            </th>
            <th className="text-gray-700 px-4 py-2 text-left text-sm font-medium">
              Feedback
            </th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id} className="border-gray-200 border-t">
              <td className="text-gray-700 px-4 py-2 text-sm">
                {feedback.name}
              </td>
              <td className="text-gray-700 px-4 py-2 text-sm">
                {feedback.email}
              </td>
              <td className="text-gray-700 px-4 py-2 text-sm">
                {feedback.childName}
              </td>
              <td className="text-gray-700 px-4 py-2 text-sm">
                {feedback.satisfaction}
              </td>
              <td className="text-gray-700 px-4 py-2 text-sm">
                {feedback.feedback}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
