'use client';

import { useRef } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-300/30 border-t-sky-600/80 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-teal-300/80 font-sans text-lg">
          Chargement du globe 3D...
        </p>
      </div>
    </div>
  )
});

export default function ClimateGlobe() {
  const globeRef = useRef(null);
  const customTexture = "/august25.jpg"; 
  const backgroundTexture = "/night-sky.jpg";

  return (
    <div className="w-full h-screen relative bg-slate-950 flex flex-col">
      
      <div className="absolute top-14 left-8 z-40">
       <div className="text-center py-4 bg-slate-950/80 tracking-tighter backdrop-blur-lg border-1 rounded-xl px-6 border-sky-300/55 shadow-[0_0_25px_1px_#38bdf8]"> 
    
          <p className="text-sky-600 text-xl md:text-2xl font-semibold">
            August 2025<br />
            1.14°C above 1951-1980 mean
          </p>
        </div>
      </div>
      
      
      <div className="absolute inset-0 flex items-center justify-center">
        <Globe
          ref={globeRef}
          globeImageUrl={customTexture}
          backgroundImageUrl={backgroundTexture}
          showAtmosphere={true}
          atmosphereColor="rgb(255,100,255)"
          atmosphereAltitude={0.18}
          enablePointerInteraction={true}
          width={window.innerWidth}
          height={window.innerHeight}
          onGlobeReady={() => {
            if (globeRef.current) {
              requestAnimationFrame(() => {
                globeRef.current.pointOfView({
                  lat: 40,
                  lng: -25,
                  altitude: 3.5
                }, 0);
              });
            }
          }}
        />
      </div>
    </div>
  );
}