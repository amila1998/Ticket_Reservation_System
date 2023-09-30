import React from "react";

const Footer = () => {
  return (
    <>
      <footer style={{width:"100%"}} class="bg-dark text-center text-white position-fixed bottom-0">
        <div
          class="text-center p-3"
          style={{ padding: "5", backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          © 2023 Copyright:
          <a class="text-white" href="https://www.sliit.lk/">
            SLIIT
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
