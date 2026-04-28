"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import * as d3 from "d3";

interface TreemapData {
  symbol: string;
  name: string;
  sector: string;
  marketCap: number;
  color: string;
  logo?: string;
}

interface TreemapProps {
  data: TreemapData[];
  width?: number;
  height?: number;
  onSelect: (company: TreemapData) => void;
  valueFormat?: "dollars" | "percent";
}

export default function Treemap({ data, width: propWidth, height: propHeight = 600, onSelect, valueFormat = "dollars" }: TreemapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: propWidth || 1200, height: propHeight });

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setDimensions({
          width: containerWidth,
          height: Math.max(400, Math.min(700, containerWidth * 0.5)),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const treemapData = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Create hierarchy structure
    const hierarchy = d3.hierarchy({
      name: "root",
      children: data.map(d => ({
        ...d,
        value: d.marketCap,
      })),
    })
      .sum(d => (d as any).value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    // Create treemap layout with squarified tiling
    const treemap = d3.treemap<any>()
      .size([width, height])
      .paddingInner(3)
      .paddingOuter(3)
      .round(true)
      .tile(d3.treemapSquarify.ratio(1.618)); // Golden ratio

    return treemap(hierarchy);
  }, [data, width, height]);

  if (!treemapData) return (
    <div ref={containerRef} className="w-full" style={{ height }} />
  );

  return (
    <div ref={containerRef} className="relative w-full" style={{ height }}>
      {treemapData.leaves().map((leaf, idx) => {
        const d = leaf.data as TreemapData & { value: number };
        const rectWidth = leaf.x1 - leaf.x0;
        const rectHeight = leaf.y1 - leaf.y0;

        // Determine text sizes based on rectangle size
        const area = rectWidth * rectHeight;
        const isLarge = area > 30000;
        const isMedium = area > 10000;
        const isSmall = area > 3000;
        const isTiny = area > 1000;

        return (
          <div
            key={d.symbol}
            className="absolute overflow-hidden cursor-pointer transition-all duration-200 hover:brightness-110 hover:z-10"
            style={{
              left: leaf.x0,
              top: leaf.y0,
              width: rectWidth,
              height: rectHeight,
              backgroundColor: d.color,
              borderRadius: '6px',
            }}
            onClick={() => onSelect(d)}
          >
            {d.logo ? (
              <div className="absolute inset-0 flex items-center justify-center p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.logo}
                  alt={d.name}
                  className="max-w-[80%] max-h-[60%] object-contain"
                />
              </div>
            ) : (
              <div className="p-2 h-full flex flex-col justify-end">
                {isTiny && (
                  <p
                    className={`text-white font-medium truncate ${
                      isLarge ? 'text-lg' : isMedium ? 'text-base' : isSmall ? 'text-sm' : 'text-xs'
                    }`}
                  >
                    {d.name}
                  </p>
                )}
                {isSmall && (
                  <span className={`text-white/80 ${isMedium ? 'text-sm' : 'text-xs'}`}>
                    {valueFormat === "percent"
                      ? d.marketCap >= 1
                        ? `${d.marketCap.toFixed(0)}%`
                        : `${d.marketCap.toFixed(1)}%`
                      : `$${d.marketCap >= 1 ? `${d.marketCap.toFixed(0)}B` : `${(d.marketCap * 1000).toFixed(0)}M`}`}
                  </span>
                )}
                {!isTiny && area > 400 && (
                  <p className="text-white/90 text-[10px] font-medium truncate">
                    {d.symbol}
                  </p>
                )}
              </div>
            )}
            {d.logo && isSmall && (
              <span className="absolute bottom-1 left-2 text-white/90 text-xs font-bold">
                {d.marketCap >= 1 ? `${d.marketCap.toFixed(0)}%` : `${(d.marketCap).toFixed(1)}%`}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
