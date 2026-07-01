import React from "react";

interface LayoutGridProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

export default function LayoutGrid({ left, center, right }: LayoutGridProps) {
  return (
    <div className="relative min-h-screen w-full px-4 py-6 md:p-8 flex justify-center items-start">
      {/* 
        3-Column Grid System:
        - Columns: 
          1. Left Sidebar (Fixed 250px on desktop)
          2. Center Canvas (Fills remaining space)
          3. Right Diagnostics HUD (Fixed 360px on desktop)
        - Mobile View: 
          Stacks into a single column (`grid-cols-1`) and arranges naturally.
      */}
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-[250px_1fr_360px] gap-6 items-start relative z-10">
        
        {/* Left Column: System Navigation */}
        <aside className="lg:sticky lg:top-8 w-full order-1 lg:order-none">
          {left}
        </aside>

        {/* Center Column: Primary Workstation Canvas */}
        <section className="w-full flex flex-col gap-6 order-2 lg:order-none min-w-0">
          {center}
        </section>

        {/* Right Column: Diagnostic HUD Monitors & AI Assistant */}
        <aside className="lg:sticky lg:top-8 w-full flex flex-col gap-6 order-3 lg:order-none">
          {right}
        </aside>

      </div>
    </div>
  );
}
