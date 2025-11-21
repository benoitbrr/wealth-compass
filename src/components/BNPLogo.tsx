import bnpLogo from "@/assets/bnp-logo.png";

const BNPLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={bnpLogo} 
        alt="BNP Paribas" 
        className="h-8 w-auto object-contain"
      />
      <span className="text-[10px] font-medium text-muted-foreground tracking-wide">WEALTH MANAGEMENT</span>
    </div>
  );
};

export default BNPLogo;
