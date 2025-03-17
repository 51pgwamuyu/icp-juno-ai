"use client";
import { NFIDProvider, initSatellite, signIn } from "@junobuild/core";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "./_auth/context";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const DarLoveAIIntro = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "py6fw-byaaa-aaaal-ar4oq-cai",
      }))();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!user) {
        await signIn({
          provider: new NFIDProvider({
            appName: "DRLOVE",
            logoUrl: "",
          }),
        });
        router.push("/home");
      } else {
        router.push("/home");
      }
    } catch (error) {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
      {/* Hero Section */}
      <div className="text-center py-10">
        <h1 className="text-6xl font-bold text-purple-900 mb-4">
          Welcome to <span className="text-pink-600">Dr. Love</span>
        </h1>
        <p className="text-xl text-purple-700 mb-8">
          Your Emotional AI Companion - Always here to listen, understand, and
          guide you.
        </p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-700 transition duration-300"
        >
          {
            loading?<Loader className="size-4 animate-spin"/>:"Sign Up To Start Talking to Dr. Love"
          }
        </button>
      </div>
      <div className="py-2 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-purple-900 text-center mb-12">
            How Dr. Love Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Share Your Feelings
              </h3>
              <p className="text-purple-600">
                Tell Dr. Love about your day, your emotions, or anything on your
                mind.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-purple-600">
                Dr. Love analyzes your emotions and provides thoughtful,
                empathetic responses.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                Feel Heard and Supported
              </h3>
              <p className="text-purple-600">
                Receive guidance, comfort, and actionable advice tailored just
                for you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-purple-900 text-white py-9">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">
            &copy; {new Date().getFullYear()} Dr. Love. All rights reserved.ICP
            AI DEVELOPMENT
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DarLoveAIIntro;
