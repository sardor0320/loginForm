import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteModal from "./deleteModal";
import Edituser from "./edituser";
import AddModal from "./add";
import { config } from "../config";

function Table() {
  const [data, setData] = useState(null);
  const [modalVissible, setModalVissible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [addModall, setAddModall] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deletVissible, setDeletVissible] = useState(false);
  const [deletedData, setDeletedData] = useState("");
  const [userId, setUserId] = useState("");
  function getData() {
    axios
      .get("http://64.226.108.80:8090/product/list", config)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  const VissibleModal = () => setModalVissible(!modalVissible);
  const VissibleAddModall = () => setAddModall(!addModall);
  const VissibleDelet = () => setDeletVissible(!deletVissible);

  return (
    <div className="bg-blue-950 py-[7%] mx-auto flex items-center justify-center flex-col">
      {/* <button className='px-5 py-3 bg-blue-500 m-5 rounded-lg text-white' onClick={() => setAddModal(!addModal)}>Add New</button> */}
      <div className="relative flex justify-center overflow-x-auto">
        <table className="w-[1000px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 w-full uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {addModal && (
              <AddModal
                userId={userId}
                selectedItem={selectedItem}
                VissibleAddModall={VissibleAddModall}
                setData={setData}
                getData={getData}
              />
            )}
            {data &&
              data.body.length > 0 &&
              data.body.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4 flex gap-[10px]">
                    {/* <button
                      onClick={() => (
                        VissibleAddModall(),
                        setSelectedItem(item.id),
                        setUserId(item.userId)
                      )}
                      type="button"
                      className="focus:outline-none text-white font-medium rounded text-sm px-5 py-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                    >
                      Add
                    </button> */}
                    <button
                      onClick={() => (VissibleDelet(), setDeletedData(item.id))}
                      type="button"
                      class="text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-7000"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        VissibleModal();
                      }}
                      type="button"
                      class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900"
                    >
                      info
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {modalVissible && (
        <div
          id="default-modal"
          tabindex="-1"
          aria-hidden="true"
          class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative p-4 w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white"></h3>
                <button
                  onClick={VissibleModal}
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close</span>
                </button>
              </div>

              <div class="p-4 md:p-5 space-y-4">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.id}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.description}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {selectedItem.price}
                </p>
              </div>

              <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  I accept
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {addModall && (
        <Edituser
          data={data}
          userId={userId}
          selectedItem={selectedItem}
          VissibleAddModall={VissibleAddModall}
          setData={setData}
          getData={getData}
        />
      )}
      {deletVissible && (
        <DeleteModal
          getData={getData}
          setData={setData}
          deletVissible={deletVissible}
          deletedData={deletedData}
          deleteFunc={VissibleDelet}
        />
      )}
    </div>
  );
}

export default Table;
