const BNPPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {/* Geometric BNP Pattern */}
      <svg className="absolute top-0 right-0 w-[600px] h-[600px] -mt-20 -mr-20" viewBox="0 0 600 600">
        <defs>
          <pattern id="bnp-stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50 10L60 40L90 50L60 60L50 90L40 60L10 50L40 40Z" 
                  fill="currentColor" 
                  className="text-secondary/10" 
                  opacity="0.5"/>
          </pattern>
          <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        <rect width="600" height="600" fill="url(#bnp-stars)"/>
        <rect width="600" height="600" fill="url(#fade-gradient)"/>
      </svg>
      
      {/* Diagonal lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-secondary/10 to-transparent"/>
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"/>
      </div>
    </div>
  );
};

export default BNPPattern;
