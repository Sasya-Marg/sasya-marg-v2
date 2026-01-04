import LegalLayout from "@/layouts/LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        By accessing or using Sasya Marg, you agree to comply with and be bound
        by the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold">1. Nature of Service</h2>
      <p>
        Sasya Marg provides AI-assisted crop suggestions based on available data.
        These suggestions are advisory only and should not be considered
        guaranteed predictions.
      </p>

      <h2 className="text-xl font-semibold">2. No Crop Failure Liability</h2>
      <p>
        Sasya Marg is <strong>not responsible</strong> for crop loss, crop
        failure, reduced yield, financial loss, or farming outcomes. Final
        farming decisions are entirely the responsibility of the farmer.
      </p>

      <h2 className="text-xl font-semibold">3. Buyer–Farmer Interaction</h2>
      <p>
        Sasya Marg acts as a discovery platform only. We do not participate in
        price negotiation, payment, or contract enforcement between farmers and
        buyers.
      </p>

      <h2 className="text-xl font-semibold">4. User Responsibility</h2>
      <p>
        Users must provide accurate information and must not misuse the platform
        for fraudulent, misleading, or illegal activities.
      </p>

      <h2 className="text-xl font-semibold">5. Service Modifications</h2>
      <p>
        Sasya Marg reserves the right to modify or discontinue any part of the
        service at any time without prior notice.
      </p>
    </LegalLayout>
  );
};

export default TermsOfService;
