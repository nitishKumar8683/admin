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
  createdAt : any
  dob : any
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
        console.log(response);
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
        <div className="bg-gray-500 fixed inset-0 mt-25 flex items-center justify-center bg-opacity-50 backdrop-blur-lg backdrop-filter">
          <div className="relative mx-auto w-full max-w-md">
            <div className="translate-x-20 transform rounded-lg bg-white shadow-lg">
              <div className="bg-gray-800 absolute inset-0 rounded-lg opacity-75"></div>
              <div className="relative px-6 py-4">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
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
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Child Name:
                    </label>
                    <p className="text-gray-800">{userDetails.childName}</p>
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Date of birth(DOB):
                    </label>
                    <p className="text-gray-800">
                      {formatDate(userDetails.dob)}
                    </p>
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Guardians Name:
                    </label>
                    <p className="text-gray-800">{userDetails.guardianName}</p>
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Phone Number:
                    </label>
                    <p className="text-gray-800">{userDetails.phoneNumber}</p>
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Time In:
                    </label>
                    <p className="text-gray-800">{userDetails.timeIn}</p>
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Time Out:
                    </label>
                    <p className="text-gray-800">{userDetails.timeOut}</p>
                  </div>
                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Address:
                    </label>
                    <p className="text-gray-800">{userDetails.address}</p>
                  </div>

                  <div className="mb-2">
                    <label className="block font-semibold text-black-2">
                      Date :
                    </label>
                    <p className="text-gray-800">
                      {formatDate(userDetails.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
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
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Child Name
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Parent/Guardian&apos;s Name
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Date of birth (mm/dd/yy)
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((data) => (
                  <tr key={data._id}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {data.childName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {data.guardianName}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium">
                        {formatDate(data.dob)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="relative flex items-center space-x-3.5">
                        <button
                          onClick={() => getUserDetailsById(data._id)}
                          className="relative hover:text-primary"
                          disabled={actionLoading[`view-${data._id}`]}
                        >
                          <FaEye />
                          {actionLoading[`view-${data._id}`] && (
                            <div className="bg-gray-100 absolute inset-0 flex items-center justify-center opacity-75"></div>
                          )}
                        </button>
                        <button
                          onClick={() => getUserById(data._id)}
                          className="relative hover:text-primary"
                          disabled={actionLoading[`edit-${data._id}`]}
                        >
                          <FaEdit />
                          {actionLoading[`edit-${data._id}`] && (
                            <div className="bg-gray-100 absolute inset-0 flex items-center justify-center opacity-75"></div>
                          )}
                        </button>
                        <button
                          onClick={() => deleteUser(data._id)}
                          className="relative hover:text-primary"
                          disabled={actionLoading[`delete-${data._id}`]}
                        >
                          <MdDeleteOutline />
                          {actionLoading[`delete-${data._id}`] && (
                            <div className="bg-gray-100 absolute inset-0 flex items-center justify-center opacity-75"></div>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpenEdit && (
        <div className="bg-gray-500 fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg backdrop-filter">
          <div className="relative mx-auto w-full max-w-2xl translate-x-25 translate-y-12 transform rounded-lg bg-white shadow-lg">
            <button
              className="text-gray-600 absolute right-2 top-2 cursor-pointer text-lg hover:text-black"
              onClick={() => setIsModalOpenEdit(false)}
            >
              &times;
            </button>
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold">Edit User</h2>
              {editUser && (
                <form
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  onSubmit={updateUser}
                >
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="mb-1 font-semibold">
                      Child Name:
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className="border-gray-300 rounded border p-2"
                      value={editUser.childName}
                      onChange={(e) =>
                        setEditUser({ ...editUser, childName: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dob" className="mb-1 font-semibold">
                      Date of birth (DOB):
                    </label>
                    <input
                      id="dob"
                      type="date"
                      className="border-gray-300 rounded border p-2"
                      value={toDateInputValue(editUser.dob)}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          dob: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="guardianName"
                      className="mb-1 font-semibold"
                    >
                      Guardians Name:
                    </label>
                    <input
                      id="guardianName"
                      type="text"
                      className="border-gray-300 rounded border p-2"
                      value={editUser.guardianName}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          guardianName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phoneNumber" className="mb-1 font-semibold">
                      Phone Number:
                    </label>
                    <input
                      id="phoneNumber"
                      type="text"
                      className="border-gray-300 rounded border p-2"
                      value={editUser.phoneNumber}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="timeIn" className="mb-1 font-semibold">
                      Time In:
                    </label>
                    <input
                      id="timeIn"
                      type="time"
                      className="border-gray-300 rounded border p-2"
                      value={editUser.timeIn}
                      onChange={(e) =>
                        setEditUser({ ...editUser, timeIn: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="timeOut" className="mb-1 font-semibold">
                      Time Out:
                    </label>
                    <input
                      id="timeOut"
                      type="time"
                      className="border-gray-300 rounded border p-2"
                      value={editUser.timeOut}
                      onChange={(e) =>
                        setEditUser({ ...editUser, timeOut: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 flex flex-col">
                    <label htmlFor="address" className="mb-1 font-semibold">
                      Address:
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="border-gray-300 w-full rounded border p-2"
                      value={editUser.address || ""}
                      onChange={(e) =>
                        setEditUser({ ...editUser, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
                    >
                      Update Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableThree;
