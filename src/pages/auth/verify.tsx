/* eslint-disable @next/next/no-img-element */
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";
import IconInput from "../../components/IconInput";

function Reset() {
  const [send, setSend] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <main className="container min-vh-100 d-flex flex-wrap">
      <div className="pt-3 pb-1 w-100">
        <Link
          className="d-inline-flex justify-content-center align-items-center"
          href="/"
        >
          <img className="max-w-4" src="/logo-icon.png" alt="" />
          <span className="d-inline-block fw-bolder font-1-2">ShopWart</span>
        </Link>
      </div>
      <div className="w-100 text-center">
        {send ? (
          <div>
            <img src="/mail-sent.png" alt="" />
            <h2 className="h2 fw-bold text-center mb-4">Check your email</h2>
            <button className="btn btn-primary w-75 w-md-50 w-lg-25 rounded-pill">
              <span className="">Open email app</span>
            </button>
          </div>
        ) : (
          <div>
            <h2 className="h2 fw-bold text-center">Reset Password</h2>
            <p>
              Enter the email associated with your account and I’ll send a link
              to reset your password
            </p>
            <Form className="w-md-75 w-lg-50 mt-4 m-auto">
              <FormGroup>
                <IconInput
                  type="email"
                  placeholder="e.g you@mail.com"
                  icon={faEnvelope}
                />
              </FormGroup>
              <FormGroup>
                <button className="btn btn-primary w-75 w-lg-50 rounded-pill">
                  <span className="">Send Link</span>
                </button>
              </FormGroup>
            </Form>
          </div>
        )}
      </div>
    </main>
  );
}

export default Reset;
