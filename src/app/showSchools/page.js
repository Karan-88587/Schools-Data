"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

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

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Schools List</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="border rounded-lg p-4 shadow">
            <img src={school.image} alt={school.name} className="h-40 w-full object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{school.name}</h2>
            <p>{school.address}, {school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}