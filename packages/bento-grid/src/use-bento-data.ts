import { useState, useEffect } from "react";

export type BentoItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export function useBentoData(simulateDelay: boolean = false) {
  const [data, setData] = useState<BentoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultData = [
      {
        id: "1",
        title: "Tokyo Neon",
        description: "Vibrant city lights and midnight adventures in Shibuya.",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1280&auto=format&fit=crop"
      },
      {
        id: "2",
        title: "Kyoto Zen",
        description: "Peaceful temples and autumn leaves.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1280&auto=format&fit=crop"
      },
      {
        id: "3",
        title: "Fuji Dawn",
        description: "Majestic views of the iconic peak at sunrise.",
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1280&auto=format&fit=crop"
      }
    ];

    // Instantly hydrate data without artificial latency
    setData(defaultData);
    
    // Tiny micro-ticket delay so React has time to mount refs for GSAP before clearing loading state
    requestAnimationFrame(() => setLoading(false));

  }, [simulateDelay]);

  return { data, loading };
}
