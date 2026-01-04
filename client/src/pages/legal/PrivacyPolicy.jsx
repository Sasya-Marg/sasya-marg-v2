import LegalLayout from "@/layouts/LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Sasya Marg respects your privacy and is committed to protecting the
        personal information of farmers, buyers, and administrators using our
        platform.
      </p>

      <h2 className="text-xl font-semibold">1. Information We Collect</h2>
      <p>
        We collect basic personal details such as name, phone number, email,
        farmland details, crop information, and usage activity to provide our
        services effectively.
      </p>

      <h2 className="text-xl font-semibold">2. How We Use Your Data</h2>
      <p>
        Your data is used solely to:
      </p>
      <ul className="list-disc pl-6">
        <li>Provide AI-based crop suggestions</li>
        <li>Enable farmer–buyer discovery and contact</li>
        <li>Improve platform performance and accuracy</li>
        <li>Ensure platform security and fraud prevention</li>
      </ul>

      <h2 className="text-xl font-semibold">3. Data Protection</h2>
      <p>
        All user data is securely stored and protected using industry-standard
        security practices. We do not sell, rent, or trade user data with any
        third party.
      </p>

      <h2 className="text-xl font-semibold">4. Third-Party APIs</h2>
      <p>
        Sasya Marg uses trusted third-party APIs (such as weather and soil data)
        only to enhance recommendations. These APIs do not receive personal
        farmer-identifiable data.
      </p>

      <h2 className="text-xl font-semibold">5. Your Consent</h2>
      <p>
        By using Sasya Marg, you consent to the collection and use of your data
        as described in this policy.
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
