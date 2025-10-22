import { useEffect, useState, useRef } from "react";
import hackerImage from "@assets/generated_images/White_hacker_silhouette_on_black_fb1b8161.png";

interface Pixel {
  x: number;
  y: number;
}

export function LandingOverlay({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load the image first
    const img = new Image();
    img.src = hackerImage;
    
    img.onload = () => {
      imageRef.current = img;
      
      const size = 400;
      canvas.width = size;
      canvas.height = size;

      // Draw the initial image
      ctx.drawImage(img, 0, 0, size, size);

      const pixelSize = 8; // Size of each "pixel" chunk
      const pixelsToRemove: Pixel[] = [];

      // Generate list of all pixel positions
      for (let y = 0; y < size; y += pixelSize) {
        for (let x = 0; x < size; x += pixelSize) {
          pixelsToRemove.push({ x, y });
        }
      }

      // Shuffle the array for random removal
      for (let i = pixelsToRemove.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pixelsToRemove[i], pixelsToRemove[j]] = [pixelsToRemove[j], pixelsToRemove[i]];
      }

      let currentIndex = 0;
      const duration = 5000; // 5 seconds
      const fps = 60;
      const totalFrames = (duration / 1000) * fps;
      const pixelsPerFrame = Math.ceil(pixelsToRemove.length / totalFrames);

      const intervalId = setInterval(() => {
        // Remove a batch of pixels by clearing them
        for (let i = 0; i < pixelsPerFrame && currentIndex < pixelsToRemove.length; i++) {
          const pixel = pixelsToRemove[currentIndex];
          ctx.clearRect(pixel.x, pixel.y, pixelSize, pixelSize);
          currentIndex++;
        }

        if (currentIndex >= pixelsToRemove.length) {
          clearInterval(intervalId);
        }
      }, 1000 / fps);

      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      const removeTimer = setTimeout(() => {
        setShouldRender(false);
        onComplete();
      }, 6200);

      return () => {
        clearInterval(intervalId);
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-1200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: "#000000",
      }}
      data-testid="landing-overlay"
    >
      {/* Canvas showing the dissolving hacker logo */}
      <div className="relative z-10 mb-8">
        <canvas
          ref={canvasRef}
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          style={{
            imageRendering: "pixelated",
          }}
          data-testid="img-hacker"
        />
      </div>

      {/* Welcome text */}
      <h1 
        className="relative z-10 animate-fade-in text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight text-center px-6 uppercase"
        style={{
          animationDelay: "2.5s",
          opacity: 0,
          animationFillMode: "forwards",
        }}
        data-testid="text-landing-title"
      >
        Welcome to My Projects
      </h1>
    </div>
  );
}
