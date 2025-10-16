import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <div>
        <h1 className="text-5xl bg-primary-bg">404 - Page Not Found</h1>
        <p className="text-lg mt-4">
          The page you are looking for does not exist.
        </p>
        <p className="text-lg mt-2">
          Please check the URL or return to the homepage.
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
