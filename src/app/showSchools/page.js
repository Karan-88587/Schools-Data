"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { CiLocationOn } from "react-icons/ci";

export default function ShowSchools() {

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchools = async () => {
    try {
      const res = await axios.get("/api/schools");
      setSchools(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching schools:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader />
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-2xl md:text-4xl font-bold">No schools found</h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Schools List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schools.map((school) => (
          <div
            key={school.id}
            className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative h-44 w-full">
              <img
                src={school.image}
                alt={school.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <h2 className="absolute bottom-2 left-3 text-white text-lg font-bold drop-shadow-md">
                {school.name}
              </h2>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <CiLocationOn /> {school.city}, {school.state}
              </p>
              <p className="text-sm text-gray-700 mt-1 line-clamp-2">{school.address}</p>

              {/* Button */}
              <div className="mt-3 flex justify-end">
                <button className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}