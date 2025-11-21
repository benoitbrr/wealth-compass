import bnpLogo from "@/assets/bnp-logo.png";

const BNPLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={bnpLogo} 
        alt="BNP Paribas" 
        className="h-8 w-auto object-contain"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight leading-tight">BNP Paribas</span>
        <span className="text-[10px] font-medium text-muted-foreground tracking-wide">WEALTH MANAGEMENT</span>
      </div>
    </div>
  );
};

export default BNPLogo;
