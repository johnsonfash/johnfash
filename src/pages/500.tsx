import React from "react";
import Link from "next/link";
import { Button } from "reactstrap";

function Page500() {
  return (
    <div className="text-center min-vh-75 d-flex justify-content-center align-items-center">
      <div>
        <h1>500</h1>
        <h4>Internal Sever Error!</h4>
        <p>
          Sorry ,there is an error on this page. Our tech team has been informed
          about this and we will try to resolve this problem as soon as
          possible.
        </p>
        <div className="text-center">
          <Link href="/">
            <Button className="background-dark me-3 px-5">Home</Button>
          </Link>
          <Link href="/contact">
            <Button className="background-orange px-4">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page500;
