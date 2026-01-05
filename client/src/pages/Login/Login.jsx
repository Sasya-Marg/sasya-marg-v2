import LoginForm from "./components/LoginForm";
import bgImg from "@/assets/authBackground1.webp";

const FarmerLogin = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#0f172a] bg-cover bg-center transition-opacity duration-500"
      style={{
        backgroundImage: `url(${bgImg}) `,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full md:w-96 bg-card text-card-foreground rounded-xl overflow-hidden shadow-xl">
        <div className="p-8 md:p-10 bg-linear-to-br from-primary/10 via-card to-accent/50">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default FarmerLogin;
