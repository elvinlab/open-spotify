import React from "react";

export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font py-4">
      <div className="container flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 px-1 ">
          <a
            href="https://elvinlab.com/"
            className="text-gray-600"
            rel="noopener noreferrer"
            target="_blank"
          >
            Designed and built by @elvinlab
          </a>
        </p>
        <p className="text-sm text-gray-500">
          <a
            href="https://github.com/elvinlab/open-spotify"
            className="text-gray-600"
            rel="noopener noreferrer"
            target="_blank"
          >
            | Source
          </a>
        </p>
      </div>
    </footer>
  );
};
