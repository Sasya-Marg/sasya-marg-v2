import LegalLayout from "@/layouts/LegalLayout";

const DataUsage = () => {
  return (
    <LegalLayout title="Data Usage & AI Transparency">
      <p>
        Sasya Marg believes in transparent and ethical use of data and
        artificial intelligence.
      </p>

      <h2 className="text-xl font-semibold">1. AI as Decision Support</h2>
      <p>
        Our AI systems analyze historical, environmental, and user-provided
        data to generate suggestions. These outputs are recommendations, not
        predictions or guarantees.
      </p>

      <h2 className="text-xl font-semibold">2. What Data Is Used</h2>
      <ul className="list-disc pl-6">
        <li>Farmland and crop-related inputs</li>
        <li>Weather and seasonal data via APIs</li>
        <li>Anonymous usage patterns for improvement</li>
      </ul>

      <h2 className="text-xl font-semibold">3. What We Do NOT Do</h2>
      <ul className="list-disc pl-6">
        <li>We do not sell farmer or buyer data</li>
        <li>We do not train external AI models using personal data</li>
        <li>We do not share identifiable data with advertisers</li>
      </ul>

      <h2 className="text-xl font-semibold">4. Data Ownership</h2>
      <p>
        Users retain full ownership of their data. Sasya Marg only processes
        data to deliver platform functionality.
      </p>

      <h2 className="text-xl font-semibold">5. Ethical Commitment</h2>
      <p>
        Our goal is to empower farmers with better insights while respecting
        privacy, autonomy, and trust.
      </p>
    </LegalLayout>
  );
};

export default DataUsage;
