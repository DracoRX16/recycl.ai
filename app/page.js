"use client"
import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import { Camera, HandHeart, BarChart } from "lucide-react"; // Icons from lucide-react

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen text-center space-y-6 pt-24">
      <h1 className="text-7xl font-extrabold text-green-400 drop-shadow-lg">
        Recycl<span className="text-gray-200">.</span><span className="text-lime-400">AI</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-sm pt-5">
        AI-powered waste analysis and scrap donation to protect the environment.
      </p>

      <div className="flex gap-6 mt-4 pt-10">
        <CustomButton text="Go to AI Waste Analyzer" href="/scanner" />
        <CustomButton text="Go to Scrap Donation Platform" href="/donation" />
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-20">
        <Card 
          icon={<Camera size={40} />}
          title="AI Waste Analyzer"
          description="Snap a photo of an item to check if it's recyclable or not."
        />
        <Card 
          icon={<HandHeart size={40} />}
          title="Scrap Donations"
          description="Easily donate or request scrap materials for recycling and reuse."
        />
      </div>
    </div>
  );
}
