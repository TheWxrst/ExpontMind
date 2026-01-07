"use client";

import dynamic from "next/dynamic";

const InteractiveParticles = dynamic(
  () => import("@/components/InteractiveParticles"),
  {
    ssr: false,
  }
);

export default function TestPage() {
  return (
    <div className="min-h-screen bg-black">
      <InteractiveParticles className="w-full h-screen" />
    </div>
  );
}
