import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import PerformanceCard from "@/components/PerformanceCard";

interface Asset {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
}

interface PerformanceCarouselProps {
  assets: Asset[];
}

const PerformanceCarousel = ({ assets }: PerformanceCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of one card + gap
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Control Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-xl font-bold tracking-tight">Ma performance</h2>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter Buttons */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-full bg-muted/30 dark:bg-muted/10 hover:bg-muted/50 dark:hover:bg-muted/20 text-sm font-medium transition-all"
          >
            Trier par
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-full bg-muted/30 dark:bg-muted/10 hover:bg-muted/50 dark:hover:bg-muted/20 text-sm font-medium transition-all"
          >
            Toutes les catégories
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-4 rounded-full bg-muted/30 dark:bg-muted/10 hover:bg-muted/50 dark:hover:bg-muted/20 text-sm font-medium transition-all flex items-center gap-1"
          >
            Voir plus
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-9 w-9 rounded-full bg-muted/30 dark:bg-muted/10 hover:bg-muted/50 dark:hover:bg-muted/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-9 w-9 rounded-full bg-muted/30 dark:bg-muted/10 hover:bg-muted/50 dark:hover:bg-muted/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full">
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {assets.map((asset) => (
            <div key={asset.name} className="flex-shrink-0">
              <PerformanceCard
                name={asset.name}
                value={asset.value}
                change={asset.change}
                changePercent={asset.changePercent}
                sparklineData={asset.sparklineData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCarousel;
