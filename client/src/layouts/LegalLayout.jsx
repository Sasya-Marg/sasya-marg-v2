import { Link } from "react-router-dom";
import { Undo2, } from "lucide-react";

const LegalLayout = ({ title, children }) => {
  return (
    <section className="w-full bg-[#F6F8F2]">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="flex  items-center gap-2 text-accent my-5">
            <Undo2 /> Back to home
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-[#364219]">
          {title}
        </h1>
        <div className="mt-8 space-y-6 text-[#364219] leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
};

export default LegalLayout;
