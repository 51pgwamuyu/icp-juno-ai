"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../_auth/context";
import { useRouter } from "next/navigation";
import {
  deleteFilteredDocs,
  initSatellite,
  listDocs,
  setDoc,
  signOut,
} from "@junobuild/core";
import { nanoid } from "nanoid";

const DarLoveAIMain = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setLoding] = useState(false);
  const myId = nanoid();
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "py6fw-byaaa-aaaal-ar4oq-cai",
      }))();
  }, []);

  //get users history
  useEffect(() => {
    (async () => {
      const { items } = await listDocs({
        collection: "userdata",
        filter: {
          order: {
            desc: true,
            field: "updated_at",
          },
        },
      });

      setHistory(items);
    })();
  }, []);
  //handle search

  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
      },
      body: JSON.stringify({
        message: search,
      }),
    });
    const Data = await response.text();
    setResponse(Data);
    await setDoc({
      collection: "userdata",
      doc: {
        key: myId,
        data: {
          message: search,
          response: Data,
        },
      },
    });
    const { items } = await listDocs({
      collection: "userdata",
      filter: {
        order: {
          desc: true,
          field: "updated_at",
        },
      },
    });
    setHistory(items);
  };
  const handleClearHistory = async () => {
    await deleteFilteredDocs({
      collection: "userdata",
      filter: {
        // Same options as filter of listDocs
      },
    });
    const { items } = await listDocs({
      collection: "userdata",
      filter: {
        order: {
          desc: true,
          field: "updated_at",
        },
      },
    });
    setHistory(items);
    setResponse("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 shadow-lg">
        <div className="flex justify-between itesm-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">History</h2>
          <button className=" text-red-800 px-6 py-3" onClick={signOut}>
            logout
          </button>
        </div>

        <div className="">
          {history.length == 0 ? (
            <p className="py-5 text-sm font-bold">no history found</p>
          ) : (
            <div className="">
              <div className="">
                {history.map((val, _index) => (
                  <div className="" key={_index}>
                    <ul className="space-y-2 text-gray-600">
                      <li
                        className="p-2 bg-gray-200 text-black rounded-lg truncate  cursor-pointer"
                        onClick={() => setResponse(val.data.response)}
                      >
                        {" "}
                        {val.data.message}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
              <div className="my-2">
                <button onClick={handleClearHistory} className="text-red-700">
                  clear history
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1  bg-gradient-to-r from-pink-200 via-red-200 to-pink-200">
        <div className="p-6  bg-white shadow-2xl rounded-2xl text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome Back to Dr Love AI
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Find your connections and revisit past interactions.
          </p>
          <form action="" onSubmit={handleSearch}>
            <input
              className="w-full px-4 py-2 border rounded-xl mb-4 focus:ring-2 focus:ring-pink-400 focus:outline-none text-black"
              placeholder="Search for connections or moments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-pink-500 text-white hover:bg-pink-600 px-6 py-3 rounded-2xl text-lg shadow-md"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {/* Login Section */}
        <div className="p-6  text-black shadow-2xl rounded-2xl text-center">
          <p className="">{response}</p>
        </div>
      </div>
    </div>
  );
};

export default DarLoveAIMain;
