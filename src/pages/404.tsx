import React from "react";
import Link from "next/link";
import { Button } from "reactstrap";

function Page404() {
  return (
    <div className="text-center min-vh-75 d-flex justify-content-center align-items-center">
      <div>
        <h1 className="font-4">404</h1>
        <h4>Oops! Page not found</h4>
        <p>The page you are looking for does not exist.</p>
        <div className="text-center">
          <Link href="/">
            <Button color="dark" className="me-3 px-5">
              Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button color="primary" className="px-4">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
