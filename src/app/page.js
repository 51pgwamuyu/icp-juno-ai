"use client"
import { NFIDProvider, initSatellite, signIn } from "@junobuild/core";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "./_auth/context";
import { useRouter } from "next/navigation";

const DarLoveAIIntro = () => {
  const { user } = useAuthContext();
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "tcalk-7iaaa-aaaal-arsaq-cai",
      }))();
  }, []);

  const handleLogin = async () => {
    if (!user) {
      await signIn({
        provider: new NFIDProvider({
          appName: "DRLOVE",
          logoUrl: "",
        }),
      });
      router.push("/home");
    }
    router.push("/home");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-200 via-red-200 to-pink-100">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-pink-600 mb-4">Welcome to Dar Love AI</h1>
        <p className="text-lg text-gray-700 mb-4">
          Discover a community-driven platform powered by AI to unite people in their daily pursuits. Dar Love AI is not just about connections—it’s about empowering everyone to achieve their goals together.
        </p>
        <p className="text-md text-gray-600 mb-8">
          Whether you're searching for knowledge, collaboration, or a helping hand, Dar Love AI brings together individuals from all walks of life to create a supportive and dynamic community.
        </p>
        <p className="text-md text-gray-600 mb-8">
          Join us in building a space where technology enhances human connection and collaboration, making every moment purposeful and impactful.
        </p>
        <button onClick={handleLogin} className="px-6 py-3 bg-pink-500 text-white text-lg rounded-xl shadow-lg hover:bg-pink-600 transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default DarLoveAIIntro;
