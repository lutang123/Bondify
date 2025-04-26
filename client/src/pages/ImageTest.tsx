import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ImageTest() {
  const [_, navigate] = useLocation();
  
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">Image Path Test</h1>
      
      <div className="mb-4">
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Mirror Meadow Image</h2>
          <img 
            src="/assets/mirror_meadow.jpg" 
            alt="Mirror Meadow" 
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="mt-2 text-gray-500">Path: /assets/mirror_meadow.jpg</p>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Twilight Tides Image</h2>
          <img 
            src="/assets/twilight_tide.png" 
            alt="Twilight Tides" 
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="mt-2 text-gray-500">Path: /assets/twilight_tide.png</p>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Lovers Lantern Image</h2>
          <img 
            src="/assets/lover_lantern.png" 
            alt="Lovers Lantern" 
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="mt-2 text-gray-500">Path: /assets/lover_lantern.png</p>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Woodland Wonder Image</h2>
          <img 
            src="/assets/woodland_wonder.png" 
            alt="Woodland Wonder" 
            className="w-full h-48 object-cover rounded-md"
          />
          <p className="mt-2 text-gray-500">Path: /assets/woodland_wonder.png</p>
        </div>
      </div>
    </div>
  );
}