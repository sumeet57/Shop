import React from "react";

// Simple and professional "Refund and Cancellation Policy" page component.

export default function RefundPolicy() {
  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: September 11, 2025
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-bold">Policy for Digital Products</h2>
            <p className="mt-2 text-lg text-gray-700">
              Due to the instant, non-returnable nature of our digital products
              (source code, documentation), we maintain a strict{" "}
              <strong className="font-semibold">no-refund policy</strong>. Once
              a project is purchased and the download link is delivered, we
              cannot offer a refund or exchange.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              An exception may be made for accidental duplicate purchases.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-2xl font-bold">
              Policy for Physical Products (IoT Projects)
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              For physical products, our policy is as follows:
            </p>
            <ul className="mt-3 list-disc list-inside space-y-2 text-lg text-gray-700">
              <li>
                <strong className="font-semibold">
                  No Refund for User-Induced Damage:
                </strong>{" "}
                We do not provide refunds or replacements for products or
                components that are damaged by the customer due to misuse,
                neglect, or failure to follow the provided precaution guide.
              </li>
              <li>
                <strong className="font-semibold">Damage on Arrival:</strong> If
                your project arrives in a damaged condition, you must contact us
                within{" "}
                <strong className="font-semibold">24 hours of delivery</strong>{" "}
                with clear photos and a video of the unboxing showing the
                damage. We will assess the situation and, if the claim is
                verified, we will arrange for a replacement or repair.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Cancellation</h2>
            <p className="mt-2 text-lg text-gray-700">
              A digital product order cannot be cancelled once payment is
              complete. A physical product order can only be cancelled if it has
              not yet been shipped. Please contact us immediately if you wish to
              cancel a physical order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="mt-2 text-lg text-gray-700">
              For any questions related to refunds, please contact us through
              the details provided on our Contact Us page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
