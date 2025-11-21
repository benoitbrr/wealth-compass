const BNPLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {/* BNP Stars Pattern */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5L16 2Z" 
                fill="url(#bnp-gradient)" 
                className="drop-shadow-lg"/>
          <defs>
            <linearGradient id="bnp-gradient" x1="2" y1="2" x2="30" y2="30">
              <stop offset="0%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--bnp-dark-green))" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold tracking-tight leading-none">BNP PARIBAS</span>
        <span className="text-[10px] font-medium text-secondary tracking-wide">WEALTH MANAGEMENT</span>
      </div>
    </div>
  );
};

export default BNPLogo;
