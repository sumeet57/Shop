import React from "react";

const Contact = () => {
  return (
    <div className="bg-white font-sans text-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Have a question about a project or need support? Please feel free to
            reach out. We aim to respond to all inquiries within 24-48 hours.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-500 uppercase">
                  Email Us
                </h3>
                <a
                  href="mailto:sumeet.live@proton.me"
                  className="text-xl text-blue-600 hover:underline"
                >
                  sumeet.live@proton.me
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-500 uppercase">
                  Call Us
                </h3>
                <p className="text-xl text-gray-900">+91 93216 35813</p>
                <p className="text-sm text-gray-500">
                  Mon - Fri, 11:00 AM - 8:00 PM (IST)
                </p>
              </div>
            </div>

            {/* Legal & Business Information */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-500 uppercase">
                Business Information
              </h3>
              <div className="mt-4 space-y-2 text-lg text-gray-900">
                <p>
                  <strong className="font-semibold">Legal Entity Name:</strong>
                  <br />
                  Sumeet Santosh Umbalkar
                </p>
                <p className="mt-4">
                  <strong className="font-semibold">Operating Address:</strong>
                  <br />
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
