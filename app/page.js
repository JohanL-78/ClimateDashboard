'use client';

import dynamic from "next/dynamic";

const ClimateGlobe = dynamic(() => import("@/components/ClimateGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-300/30 border-t-sky-600/80 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-teal-300/80 font-sans text-lg">
          Initialisation...
        </p>
      </div>
    </div>
  )
});

export default function HomePage() {
  return <ClimateGlobe />;
}