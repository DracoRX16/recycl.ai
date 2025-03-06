"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

export default function Scanner() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [wasteData, setWasteData] = useState(null);
  const [sustainabilityRating, setSustainabilityRating] = useState(null);
  const [recyclabilityRating, setRecyclabilityyRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const API_KEY = "AIzaSyAs8IpJp2_7UGFvFDXyUODIAF5AmxTZUPE";

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const analyzeImage = async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }
    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Analyze this image of waste and provide:
                      1. Waste type details.
                      2. Sustainability details.
                      3. Recyclability details.
                      4. A sustainability rating out of 100. (just the number no explanations)
                      5. A recyclability rating out of 100. (just the number no explanations)
                      Do not refer to the image refer to it as waste.
                      Format:
                      Waste type details: {details}
                      Sustainability details: {details}
                      Recyclability details: {details}
                      {Sustainability Rating}
                      {Recyclability Rating}`,
                    },
                    {
                      inlineData: {
                        mimeType: imageFile.type,
                        data: base64Image,
                      },
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        console.log("Response:", data);

        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No nutritional data found.";
        const responseLines = responseText.split("\n");
        setSustainabilityRating(responseLines.pop());
        setRecyclabilityyRating(responseLines.pop());
        setWasteData(responseLines.join("\n"));
      } catch (error) {
        console.error("Error analyzing image:", error);
        setError("Failed to analyze image. Please try again.");
      }

      setLoading(false);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 text-center space-y-6 text-white">
      <h1 className="text-6xl font-extrabold text-green-400 drop-shadow-lg">
        AI Waste Scanner
      </h1>
      <p className="text-lg text-gray-300 max-w-md pt-3">
        Upload an image of waste and get AI-powered analysis on its recyclability and sustainability impact.
      </p>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className="w-96 h-52 flex items-center justify-center border-2 border-dashed border-emerald-500 rounded-xl cursor-pointer bg-gray-800 hover:bg-gray-700 transition p-6"
      >
        <input {...getInputProps()} />
        <p className="text-gray-300">Drag & Drop or Click to Upload an Image</p>
      </div>

      {/* Preview & Analyze Button */}
      {image && (
        <div className="mt-4 flex flex-col items-center">
          <img src={image} alt="Uploaded" className="w-56 h-56 object-cover rounded-xl shadow-lg border-2 border-emerald-500" />
          <button
            onClick={analyzeImage}
            className="mt-5 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Nutrition & Sustainability Results */}
      {wasteData && (
        <div className="mt-6 p-4 bg-gray-800 shadow-md rounded-lg text-left">
          <h2 className="text-lg font-bold text-emerald-400">Waste Facts:</h2>
          <div className="text-gray-300 mt-2 whitespace-pre-line">
            {wasteData.split("\n").map((line, index) => (
              <p key={index} className="mb-2">{line.replace(/\*\s/g, "• ")}</p>
            ))}
          </div>

          {/* Sustainability Rating */}
          {sustainabilityRating !== null && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <h3 className="text-md font-semibold text-emerald-300">Sustainability Rating:</h3>
              <p className={`text-xl font-bold mt-1 ${sustainabilityRating >= 70 ? "text-green-400" : "text-red-400"}`}>
                {sustainabilityRating} / 100
              </p>
            </div>
          )}
          {/* Recyclability Rating */}
          {recyclabilityRating !== null && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <h3 className="text-md font-semibold text-emerald-300">Recyclability Rating:</h3>
              <p className={`text-xl font-bold mt-1 ${recyclabilityRating >= 70 ? "text-green-400" : "text-red-400"}`}>
                {recyclabilityRating} / 100
              </p>
            </div>
          )}

          {/* Donate Button */}
          <button
            onClick={() => router.push("/donation")}
            className="mt-4 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition w-full"
          >
            Click to Donate Your Scrap
          </button>
        </div>
      )}
    </div>
  );
}
