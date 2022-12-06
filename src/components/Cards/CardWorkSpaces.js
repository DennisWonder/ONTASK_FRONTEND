import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabaseClient } from "../../config/supabase-client";
import userContext from "../../context/UserContext";
import PlaceHolder from "../PlaceHolder";

// components

export default function CardWorkSpaces({ setShowModal, userId }) {
  const [workSpaces, setWorkSpaces] = useState();
  

  const addWorkSpace = () => {
    setShowModal(true);
  };
  useEffect(() => {
    getWorkSpaces();
  }, [setShowModal, workSpaces]);
  const getWorkSpaces = async () => {
    try {
      let { data: work_space, error } = await supabaseClient
        .from("work_space")
        .select("work_space, is_complete")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }
      if (work_space.length > 0) {
        setWorkSpaces(work_space);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-700">
                Work Spaces
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link to="/admin/work-spaces">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr className="sticky top-0">
                <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Work Space
                </th>
                <th className="px-6 bg-gray-50 text-gray-500 align-middle border border-solid border-gray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  % Completion
                </th>
              </tr>
            </thead>
            <tbody>
              {workSpaces ? (
                workSpaces.map((workSpace, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      {workSpace.work_space}
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">{workSpace.is_complete}%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div
                              style={{ width: `${workSpace.is_complete}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <PlaceHolder message="No Work Spaces" />
              )}
            </tbody>
          </table>
        </div>
        <button
          className=" bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 sticky bottom-0"

          onClick={addWorkSpace}
        >
          Add Work Space
        </button>
      </div>
    </>
  );
}
