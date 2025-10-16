import React from "react";

// Simple and professional "Terms and Conditions" page component.

export default function TermsAndConditions() {
  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* --- Page Header --- */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: September 11, 2025
          </p>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Please read these terms and conditions carefully before using our
            website or purchasing our products. By accessing this website and
            making a purchase, you agree to be bound by the terms and conditions
            set forth below.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p className="mt-2 text-lg text-gray-700">
              This website is owned and operated by{" "}
              <strong className="font-semibold">Sumeet Santosh Umbalkar</strong>
              . We provide digital and physical products in the form of final
              year academic projects for reference and educational purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              2. Intellectual Property and Use License
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              The projects, including all source code and documentation, are the
              intellectual property of the owner. Upon purchase, you are granted
              a non-exclusive, non-transferable license to use the project for
              personal, non-commercial, and educational purposes only.
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>
                You <strong className="text-red-600">may not</strong> resell,
                redistribute, or republish any part of the project.
              </li>
              <li>
                The projects are to be used as a reference and learning tool.
                You are responsible for ensuring your work complies with your
                institution's academic integrity policies.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">3. Products and Services</h2>
            <p className="mt-2 text-lg text-gray-700">
              We offer both digital and physical products. Prices for all
              products are specified on the website in Indian Rupees (INR).
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>
                <strong className="font-semibold">Digital Products:</strong>{" "}
                Final year project source code and documentation, delivered
                electronically.
              </li>
              <li>
                <strong className="font-semibold">Physical Products:</strong>{" "}
                Assembled IoT-based projects and hardware components.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              4. Payments, Shipping, and Delivery
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              <strong className="font-semibold">Digital Products:</strong> Upon
              successful payment, the product will be made available for
              download in the customer's dashboard area on our website. Access
              to the dashboard requires user login.
            </p>
            <p className="mt-2 text-lg text-gray-700">
              <strong className="font-semibold">Physical Products:</strong>{" "}
              Shipping and delivery of physical products will be managed
              directly by us. We will communicate the estimated delivery
              timeline after the order is confirmed. Shipping is currently
              available only within Mumbai, India(only in Mumbai city).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              5. User Responsibility for Physical Products
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              For all physical IoT projects, a precaution and handling guide
              will be provided. You are responsible for handling all electronic
              components and hardware with care as per the guide. We are not
              liable for any damage caused by misuse, neglect, or failure to
              follow the provided instructions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            <p className="mt-2 text-lg text-gray-700">
              We are not liable for any direct, indirect, or consequential
              damages resulting from the use or inability to use our products.
              We do not guarantee any specific academic outcome or grade.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">7. Governing Law</h2>
            <p className="mt-2 text-lg text-gray-700">
              Any claim relating to this website shall be governed by the laws
              of India. Any legal action or proceeding shall be brought
              exclusively in the courts located in Mumbai, Maharashtra.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">8. Changes to Terms</h2>
            <p className="mt-2 text-lg text-gray-700">
              We reserve the right to modify these terms and conditions at any
              time. We recommend you review this page periodically for changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
