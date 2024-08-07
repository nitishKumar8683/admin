"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bars } from "react-loader-spinner";
import ClipLoader from "react-spinners/ClipLoader";

interface User {
  _id: string;
  childName: string;
  guardianName: string;
  timeIn: string;
  timeOut: string;
  phoneNumber: string;
  address: string;
  createdAt: any;
  dob: any;
}

const TableThree = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    userDetail();
  }, []);

  const userDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/child/childData");
      setUserData(response.data.childsData);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (_id: string) => {
    setActionLoading((prev) => ({ ...prev, [`delete-${_id}`]: true }));
    try {
      const response = await axios.delete(`/api/child/deleteChild/${_id}`);
      toast.success(response.data.message);
      userDetail();
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`delete-${_id}`]: false }));
    }
  };

  const getUserDetailsById = async (_id: string) => {
    setActionLoading((prev) => ({ ...prev, [`view-${_id}`]: true }));
    try {
      const response = await axios.get(`/api/child/childDataById/${_id}`);
      setUserDetails(response.data.userDataById);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to fetch user details");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`view-${_id}`]: false }));
    }
  };

  const getUserById = async (_id: string) => {
    setActionLoading((prev) => ({ ...prev, [`edit-${_id}`]: true }));
    try {
      const response = await axios.get(`/api/child/childDataById/${_id}`);
      setEditUser(response.data.userDataById);
      setIsModalOpenEdit(true);
    } catch (error) {
      toast.error("Failed to fetch user details");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`edit-${_id}`]: false }));
    }
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser && editUser._id) {
      try {
        const response = await axios.put(
          `/api/child/updateChild/${editUser._id}`,
          editUser,
        );
        toast.success("User updated successfully");
        setIsModalOpenEdit(false);
        userDetail();
      } catch (error) {
        toast.error("Failed to update user");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US");
  };

  const toDateInputValue = (date: any) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <ToastContainer />

      {Object.values(actionLoading).some((loading) => loading) && (
        <div className="bg-gray-500 fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg backdrop-filter">
          <ClipLoader color="#4fa94d" loading={true} size={80} />
        </div>
      )}

      {isModalOpen && userDetails && (
        <div className="bg-gray-500 mt-20 fixed inset-0 flex items-center justify-center bg-opacity-50 p-4 backdrop-blur-lg backdrop-filter">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-600 hover:text-gray-800 absolute right-2 top-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="mb-4 text-xl font-bold">User Details</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block font-semibold text-black">
                  Child Name:
                </label>
                <p className="text-gray-800">{userDetails.childName}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">
                  Date of Birth (DOB):
                </label>
                <p className="text-gray-800">{formatDate(userDetails.dob)}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">
                  Guardian&apos;s Name:
                </label>
                <p className="text-gray-800">{userDetails.guardianName}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">
                  Phone Number:
                </label>
                <p className="text-gray-800">{userDetails.phoneNumber}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">
                  Time In:
                </label>
                <p className="text-gray-800">{userDetails.timeIn}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">
                  Time Out:
                </label>
                <p className="text-gray-800">{userDetails.timeOut}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">
                  Address:
                </label>
                <p className="text-gray-800">{userDetails.address}</p>
              </div>
              <div>
                <label className="block font-semibold text-black">Date:</label>
                <p className="text-gray-800">
                  {formatDate(userDetails.createdAt)}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-stroke bg-white px-4 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6 xl:py-4">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                visible={true}
              />
            </div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left dark:bg-meta-4">
                  <th className="px-4 py-2 font-medium text-black dark:text-white">
                    Child Name
                  </th>
                  <th className="px-4 py-2 font-medium text-black dark:text-white">
                    Parent/Guardian&apos;s Name
                  </th>
                  <th className="px-4 py-2 font-medium text-black dark:text-white">
                    Date of Birth (mm/dd/yy)
                  </th>
                  <th className="px-4 py-2 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data) => (
                  <tr key={data._id}>
                    <td className="border-gray-200 border-b px-4 py-2">
                      {data.childName}
                    </td>
                    <td className="border-gray-200 border-b px-4 py-2">
                      {data.guardianName}
                    </td>
                    <td className="border-gray-200 border-b px-4 py-2">
                      {formatDate(data.dob)}
                    </td>
                    <td className="border-gray-200 border-b px-4 py-2">
                      <button
                        onClick={() => getUserDetailsById(data._id)}
                        className="mr-2 text-blue-500 hover:underline"
                        disabled={actionLoading[`view-${data._id}`]}
                      >
                        <FaEye className="inline" />
                      </button>
                      <button
                        onClick={() => getUserById(data._id)}
                        className="mr-2 text-green-500 hover:underline"
                        disabled={actionLoading[`edit-${data._id}`]}
                      >
                        <FaEdit className="inline" />
                      </button>
                      <button
                        onClick={() => deleteUser(data._id)}
                        className="text-red-500 hover:underline"
                        disabled={actionLoading[`delete-${data._id}`]}
                      >
                        <MdDeleteOutline className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpenEdit && editUser && (
        <div className="bg-gray-500 mt-20 fixed inset-0 flex items-center justify-center bg-opacity-50 p-4 backdrop-blur-lg backdrop-filter">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
            <button
              onClick={() => setIsModalOpenEdit(false)}
              className="text-gray-600 hover:text-gray-800 absolute right-2 top-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <h2 className="mb-4 text-xl font-bold">Edit User</h2>
            <form onSubmit={updateUser}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block font-semibold text-black">
                    Child Name:
                  </label>
                  <input
                    type="text"
                    value={editUser.childName || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, childName: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black">
                    Date of Birth (DOB):
                  </label>
                  <input
                    type="date"
                    value={toDateInputValue(editUser.dob)}
                    onChange={(e) =>
                      setEditUser({ ...editUser, dob: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black">
                    Guardian&apos;s Name:
                  </label>
                  <input
                    type="text"
                    value={editUser.guardianName || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, guardianName: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={editUser.phoneNumber || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, phoneNumber: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black">
                    Time In:
                  </label>
                  <input
                    type="text"
                    value={editUser.timeIn || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, timeIn: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black">
                    Time Out:
                  </label>
                  <input
                    type="text"
                    value={editUser.timeOut || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, timeOut: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-black">
                    Address:
                  </label>
                  <input
                    type="text"
                    value={editUser.address || ""}
                    onChange={(e) =>
                      setEditUser({ ...editUser, address: e.target.value })
                    }
                    className="border-gray-300 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsModalOpenEdit(false)}
                  className="bg-gray-500 hover:bg-gray-700 ml-2 rounded-md px-4 py-2 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TableThree;
