"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DonationPage() {
  const [donations, setDonations] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      location: "New York, NY", 
      type: "Old Newspapers and Magazines", 
      image: "/scrap1.jpg",
      description: "Large bundles of old newspapers and magazines, neatly stacked and tied, ready for recycling or reuse." 
    },
    { 
      id: 2, 
      name: "David Thompson", 
      location: "Boston, MA", 
      type: "Scrap Metal and Rusted Machinery Parts", 
      image: "/scrap2.jpg", 
      description: "A large pile of rusted metal parts, including machinery components, gears, and scrap iron, ideal for recycling or repurposing." 
    },
    { 
      id: 3, 
      name: "ScrapMax", 
      location: "Chicago, IL", 
      type: "Used Car Alternators and Starters", 
      image: "/scrap3.jpg", 
      description: "A collection of old and used car alternators and starter motors, ideal for recycling or refurbishing." 
    },
    { 
      id: 4, 
      name: "GreenEarth Recycling", 
      location: "Miami, FL", 
      type: "Cardboard Waste", 
      image: "/scrap4.jpg", 
      description: "A heap of used cardboard boxes, ideal for recycling into new packaging materials or paper products." 
    },    
    { 
      id: 5, 
      name: "EcoPlastics", 
      location: "Seattle, WA", 
      type: "Mixed Plastic Waste", 
      image: "/scrap5.jpg", 
      description: "A pile of discarded plastic materials, including bottles, containers, and packaging waste, ready for recycling." 
    },
    { 
      id: 6, 
      name: "SteelReclaimers", 
      location: "Houston, TX", 
      type: "Scrap Steel Wire", 
      image: "/scrap6.jpg", 
      description: "Large coils of scrap steel wire, suitable for recycling or repurposing in construction and manufacturing industries." 
    }
  ]);
  
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [newDonation, setNewDonation] = useState({ name: "", location: "", description: "", image: "", type: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "AIzaSyAs8IpJp2_7UGFvFDXyUODIAF5AmxTZUPE";

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDonation((prev) => ({ ...prev, image: reader.result }));
      analyzeImage(file);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const analyzeImage = async (file) => {
    if (!file) return;
    setLoading(true);
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
                    { text: `Analyze this food image and provide:
                      1. Waste type details.
                      2. Sustainability details.
                      3. Recyclability details.
                      
                      It should all be in the following format. Do not use Bold text of Italics. Do not refer to the image refer to it as food
                      One short sentence on each of the following

                      1. Type details: {details}
                      2. Sustainability details: {details}
                      3. Recyclability details: {details}
                      ` },
                    { inlineData: { mimeType: file.type, data: base64Image } },
                  ],
                },
              ],
            }),
          }
        );
        const data = await response.json();
        setNewDonation((prev) => ({
          ...prev,
          type: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No type data found.",
        }));
      } catch (error) {
        console.error("Error analyzing image:", error);
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const addDonation = () => {
    if (!newDonation.name || !newDonation.location || !newDonation.image) return;
    setDonations((prev) => [{ id: prev.length + 1, ...newDonation }, ...prev]);
    setNewDonation({ name: "", location: "", description: "", image: "", type: "" });
    setImageFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-green-400 drop-shadow-lg">Scrap Donations</h1>

      {/*Donation Form */}
      <div className="bg-gray-800/80 backdrop-blur-lg p-8 rounded-xl shadow-xl mb-10 w-full max-w-lg border border-gray-700">
        <h2 className="text-3xl font-semibold mb-6 text-emerald-400">Post Your Donation</h2>

        <input 
          type="text" placeholder="Your Name" value={newDonation.name} 
          onChange={(e) => setNewDonation((prev) => ({ ...prev, name: e.target.value }))} 
          className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input 
          type="text" placeholder="Location" value={newDonation.location} 
          onChange={(e) => setNewDonation((prev) => ({ ...prev, location: e.target.value }))} 
          className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <textarea 
          placeholder="Description" value={newDonation.description} 
          onChange={(e) => setNewDonation((prev) => ({ ...prev, description: e.target.value }))} 
          className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div 
          {...getRootProps()} 
          className="w-full p-4 border-dashed border-2 border-gray-500 rounded-lg cursor-pointer text-center bg-gray-700/60 hover:bg-gray-700 transition"
        >
          <input {...getInputProps()} />
          <p className="text-gray-300">Select or Drag & Drop an image</p>
        </div>

        {newDonation.image && <img src={newDonation.image} className="mt-4 w-full h-40 object-cover rounded-lg shadow-md" alt="Uploaded" />}

        <button 
          onClick={addDonation} 
          className="mt-5 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition w-full text-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Add Donation"}
        </button>
      </div>

      {/*Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {donations.map((donation) => (
          <div 
            key={donation.id} 
            className="p-4 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 cursor-pointer transition transform hover:scale-105 hover:shadow-2xl hover:border-green-500"
            onClick={() => setSelectedDonation(donation)}
          >
            <img src={donation.image} className="w-full h-44 object-cover rounded-lg mb-3 transition duration-300 hover:opacity-90" alt="Donation" />
            <p className="text-xl font-semibold text-green-400">{donation.name}</p>
            <p className="text-gray-300">{donation.location}</p>
          </div>
        ))}
      </div>

      {/*Modal for Selected Donation */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-2xl w-full text-center border border-green-400">
            <img src={selectedDonation.image} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" alt="Selected" />
            <h2 className="text-3xl font-bold text-green-400 mb-3">{selectedDonation.name}</h2>
            <p className="text-gray-400 text-lg">📍 {selectedDonation.location}</p>
            <p className="text-gray-300 text-md mt-3">{selectedDonation.description}</p>
            <p className="text-gray-300 font-semibold mt-2 text-md">{selectedDonation.type}</p>

            <button 
              className="mt-6 px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => setSelectedDonation(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
