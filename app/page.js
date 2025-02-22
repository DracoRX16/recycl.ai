"use client"
import CustomButton from "../components/CustomButton";
import Card from "../components/Card";
import { Camera, HandHeart, BarChart } from "lucide-react"; // Icons from lucide-react

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen text-center space-y-6 pt-24">
      <h1 className="text-7xl font-extrabold text-emerald-400 drop-shadow-lg">
        FoodBridge<span className="text-gray-200">.</span><span className="text-blue-400">AI</span>
      </h1>
      <p className="text-xl text-gray-300 max-w-sm pt-5">
        Bridging the gap between surplus food and those in need
      </p>

      <div className="flex gap-6 mt-4 pt-10">
        <CustomButton text="Go to AI Nutrition Scanner" href="/scanner" />
        <CustomButton text="Go to Food Donation Platform" href="/donation" />
      </div>

      {/* Feature Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-20">
        <Card 
          icon={<Camera size={40} />}
          title="AI Nutrition Scanner"
          description="Snap a photo of your meal to get instant nutrition insights powered by AI."
        />
        <Card 
          icon={<HandHeart size={40} />}
          title="Food Donations"
          description="Easily donate or request surplus food to reduce waste and help those in need."
        />
      </div>
    </div>
  );
}
