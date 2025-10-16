import React from "react";

const PrivacyStatement = () => {
  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: September 11, 2025
          </p>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Your privacy is important to us. This policy explains what
            information we collect from you and how we use it. This policy
            applies to all products and services offered by{" "}
            <strong className="font-semibold">Sumeet Santosh Umbalkar</strong>.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            <p className="mt-2 text-lg text-gray-700">
              We collect information that you provide to us directly when you
              make a purchase, such as:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>Your Name</li>
              <li>Your Email Address</li>
              <li>Your Phone Number</li>
              <li>Your Shipping Address (for physical products)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              2. How We Use Your Information
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              The information we collect is used solely for the following
              purposes:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>
                To process your transactions and deliver the purchased product.
              </li>
              <li>To ship and deliver physical products to your address.</li>
              <li>
                To communicate with you regarding your order or for customer
                support purposes.
              </li>
              <li>To improve our website and service offerings.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">3. Payment Information</h2>
            <p className="mt-2 text-lg text-gray-700">
              <strong className="font-semibold">
                We do not collect or store any of your financial information.
              </strong>{" "}
              All payments are processed through a secure third-party payment
              gateway. We do not have access to your credit card number, bank
              account details, or any other sensitive financial data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">4. Data Sharing</h2>
            <p className="mt-2 text-lg text-gray-700">
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties. This does not include
              trusted third parties such as our payment gateway provider and
              shipping partners who assist us in operating our website and
              conducting our business, so long as those parties agree to keep
              this information confidential.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">5. Data Security</h2>
            <p className="mt-2 text-lg text-gray-700">
              We implement a variety of security measures to maintain the safety
              of your personal information when you place an order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">6. Contact Us</h2>
            <p className="mt-2 text-lg text-gray-700">
              If you have any questions regarding this privacy policy, you may
              contact us using the information on our Contact Us page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyStatement;
