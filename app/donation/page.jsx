"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function DonationPage() {
  const [donations, setDonations] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      location: "New York, NY", 
      nutrition: "High Protein", 
      image: "/food1.jpg",
      description: "A generous donation of protein-rich meals, perfect for maintaining muscle health and energy levels." 
    },
    { 
      id: 8, 
      name: "Healthy Living Co.", 
      location: "Boston, MA", 
      nutrition: "Low Fat, High Energy", 
      image: "/food2.jpg", 
      description: "Low-fat, high-energy meals designed to keep you active and healthy." 
    },
    { 
      id: 3, 
      name: "Community Kitchen", 
      location: "Chicago, IL", 
      nutrition: "Balanced Diet", 
      image: "/food3.jpg", 
      description: "A well-balanced meal donation containing essential nutrients for a healthy diet." 
    },
    { 
      id: 4, 
      name: "Food Bank", 
      location: "Houston, TX", 
      nutrition: "Vitamin Rich", 
      image: "/food4.jpg", 
      description: "A selection of vitamin-rich foods to support immune function and overall well-being." 
    },
    { 
      id: 5, 
      name: "Local Farmer", 
      location: "Seattle, WA", 
      nutrition: "Organic and Fresh", 
      image: "/food5.jpg", 
      description: "Fresh, organic produce straight from local farms to support sustainable eating." 
    },
    { 
      id: 6, 
      name: "Grocery Store", 
      location: "Miami, FL", 
      nutrition: "Mixed Nutrients", 
      image: "/food6.jpg", 
      description: "A diverse mix of nutritious foods, ensuring a variety of vitamins and minerals." 
    },
    { 
      id: 7, 
      name: "Non-Profit Org", 
      location: "San Francisco, CA", 
      nutrition: "Nutritionally Balanced", 
      image: "/food7.jpg", 
      description: "A nutritionally complete donation designed to provide balanced meals." 
    }
  ]);
  
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [newDonation, setNewDonation] = useState({ name: "", location: "", description: "", image: "", nutrition: "" });
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
                      1. Nutritional details.
                      2. Sustainability details.
                      3. Scarcity level.
                      
                      It should all be in the following format. Do not use Bold text of Italics. Do not refer to the image refer to it as food
                      One short sentence on each of the following

                      1. Nutritional details: {details}
                      2. Sustainability details: {details}
                      3. Scarcity level: {details}
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
          nutrition: data?.candidates?.[0]?.content?.parts?.[0]?.text || "No nutritional data found.",
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
    setNewDonation({ name: "", location: "", description: "", image: "", nutrition: "" });
    setImageFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-emerald-500">Food Donations</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-emerald-500">Post Your Donation</h2>
        <input type="text" placeholder="Your Name" value={newDonation.name} 
          onChange={(e) => setNewDonation((prev) => ({ ...prev, name: e.target.value }))} 
          className="w-full p-2 mb-2 bg-gray-700 text-white border rounded" />
        <input type="text" placeholder="Location" value={newDonation.location} 
          onChange={(e) => setNewDonation((prev) => ({ ...prev, location: e.target.value }))} 
          className="w-full p-2 mb-2 bg-gray-700 text-white border rounded" />
        <textarea placeholder="Description" value={newDonation.description} 
          onChange={(e) => setNewDonation((prev) => ({ ...prev, description: e.target.value }))} 
          className="w-full p-2 mb-2 bg-gray-700 text-white border rounded" />
        <div {...getRootProps()} className="w-full p-4 border-dashed border-2 border-gray-500 rounded cursor-pointer text-center">
          <input {...getInputProps()} />
          <p className="text-gray-300">Select or Drag & Drop an image</p>
        </div>
        {newDonation.image && <img src={newDonation.image} className="mt-4 w-full h-40 object-cover rounded" alt="Uploaded food" />}
        <button onClick={addDonation} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          {loading ? "Analyzing..." : "Add Donation"}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
  {donations.map((donation) => (
    <div 
      key={donation.id} 
      className="p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105 hover:shadow-2xl hover:border hover:border-emerald-500"
      onClick={() => setSelectedDonation(donation)}
    >
      <img src={donation.image} className="w-full h-40 object-cover rounded mb-2 transition duration-300 hover:opacity-90" alt="Donation" />
      <p className="text-xl font-semibold">{donation.name}</p>
      <p className="text-gray-400">{donation.location}</p>
    </div>
  ))}
</div>

      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full text-center">
            <img src={selectedDonation.image} className="w-full h-60 object-cover rounded mb-4" alt="Selected food" />
            <h2 className="text-lg font-bold mb-2">{selectedDonation.name}</h2>
            <p className="text-gray-400 text-sm">Location: {selectedDonation.location}</p>
            <p className="text-gray-300 text-sm">Description: {selectedDonation.description}</p>
            <p className="text-gray-300 font-semibold mt-2 text-sm">{selectedDonation.nutrition}</p>
            <button className="mt-6 px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={() => setSelectedDonation(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
