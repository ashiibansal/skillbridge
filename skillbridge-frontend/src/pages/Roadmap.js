import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";

const Roadmap = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await fetch(`${API}/roadmap/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || "Failed to load roadmap");
        }
  
        setRoadmap(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    if (token) fetchRoadmap();
  }, [id, token]);

  if (!roadmap) return <Layout>Loading roadmap...</Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Personalized Roadmap</h1>

        {roadmap.items.map(item => (
          <div key={item.skill} className="bg-white p-6 mb-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{item.skill}</h2>
            <p className="text-sm text-red-500 mb-2">
              Gap: {item.gap}
            </p>
            <p>{item.plan}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Roadmap;