import logoImg from "@/assets/logo-boost.png";

export const Logo = ({ className = "h-16 w-auto" }: { className?: string }) => {
  return (
    <img 
      src={logoImg}
      alt="Boosti Logo"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};
