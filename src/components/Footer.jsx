import React from "react";

const Footer = () => {
  return (
      <div className="flex w-full flex-wrap items-center justify-center p-5 dark:text-gray-50 text-black bg-transparent bg-sky-100 shadow-lg">
        &copy; {new Date().getFullYear()} Copyright by mryldrm{" "}
      </div>
  );
};

export default Footer;
