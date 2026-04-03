import * as React from "react"
import { cn } from "@mahalisunil1/utils"
import { createTimeline } from "@mahalisunil1/animation"
import { useBentoData } from "./use-bento-data"
import { useCarousel } from "./use-carousel"

// --- INTERNAL ENCAPSULATED MECHANICS ---

function CarouselCard({ items }: { items: ReturnType<typeof useBentoData>["data"] }) {
  const { currentIndex, containerRef } = useCarousel(items.length, 4000);

  if (items.length === 0) return null;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
      <div 
        ref={containerRef}
        className="flex h-full w-full"
        style={{ width: `${items.length * 100}%` }}
      >
        {items.map((item) => (
          <div key={item.id} className="relative h-full w-full flex-shrink-0" style={{ width: `${100 / items.length}%` }}>
            <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 md:p-8 flex flex-col justify-end">
              <h3 className="mb-1 md:mb-2 text-2xl md:text-4xl font-bold text-white tracking-tight leading-none">{item.title}</h3>
              <p className="text-xs md:text-sm text-white/80 max-w-[90%] md:max-w-[70%]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {items.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
            )} 
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, className }: { title: string; value: string; className?: string }) {
  return (
    <div className={cn("flex flex-col justify-between rounded-[2rem] bg-white/5 p-5 md:p-6 border border-white/10", className)}>
      <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/50">{title}</span>
      <span className="text-2xl lg:text-4xl font-light tracking-tight text-white">{value}</span>
    </div>
  )
}

// --- PUBLIC API ---

export type BentoGridProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Enables the internal GSAP physics carousel and data fetching */
  enableMechanics?: boolean;
}

export function BentoGrid({
  className,
  enableMechanics = true,
  ...props
}: BentoGridProps) {
  // All fetching and complex timeline mechanics safely isolated from user
  const { data, loading } = useBentoData(enableMechanics);
  const gridRef = React.useRef<HTMLDivElement>(null);

  // GSAP Aggressive Mechanical Stagger on Mount
  React.useEffect(() => {
    if (loading || !gridRef.current) return;

    // Use our abstracted library timeline for staggered hardware-accelerated mounting!
    const tl = createTimeline();
    tl.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { 
         opacity: 1, 
         y: 0, 
         filter: "blur(0px)",
         duration: 0.8, 
         stagger: 0.15, 
         ease: "power3.out" 
      }
    );
  }, [loading]);

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid w-full max-w-6xl gap-4 grid-cols-1 md:grid-cols-3 auto-rows-[20rem] md:auto-rows-[22rem] lg:auto-rows-[25rem]",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="col-span-1 md:col-span-3 h-full w-full rounded-[2rem] animate-pulse bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-4 min-h-[300px]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <span className="text-white/40 text-xs tracking-[0.2em]">INITIALIZING STATE TIMELINES</span>
        </div>
      ) : (
        <>
          {/* Main Feature Cell: Encapsulating complex logic */}
          <div className="col-span-1 md:col-span-2 relative">
            <CarouselCard items={data} />
          </div>

          {/* Side Cells */}
          <div className="flex flex-col gap-4">
            <BentoGrid.StatCard title="Active Sessions" value="24,901" className="h-[40%]" />
            
            <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-5 md:p-6 flex flex-col justify-end relative overflow-hidden group">
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <h3 className="text-xl lg:text-2xl font-semibold text-white mb-1 lg:mb-2 tracking-tight">Seamless DX</h3>
               <p className="text-white/90 text-xs lg:text-sm leading-relaxed">
                 Complex internal timelines flawlessly encapsulated.
               </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Expose sub-components as namespace properties 
BentoGrid.StatCard = StatCard;
