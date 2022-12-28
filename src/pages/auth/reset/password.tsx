/* eslint-disable @next/next/no-img-element */
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useState } from "react";
import { Form, FormGroup, Label } from "reactstrap";
import IconInput from "../../../components/IconInput";

function Password() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
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
        {error ? (
          <div>
            <img src="/mail-sent.png" alt="" />
            <h2 className="h2 fw-bold text-center mb-4">Invalid reset link!</h2>
            <Link
              href="/auth/login"
              className="btn btn-primary w-75 w-md-50 w-lg-25 rounded-pill"
            >
              <span className="">Login</span>
            </Link>
          </div>
        ) : sent ? (
          <div>
            <img src="/mail-sent.png" alt="" />
            <h2 className="h2 fw-bold text-center mb-4">
              Password reset successful
            </h2>
            <Link
              href="/auth/login"
              className="btn btn-primary w-75 w-md-50 w-lg-25 rounded-pill"
            >
              <span className="">Login</span>
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="h2 fw-bold text-center">Create new password</h2>
            <Form className="w-md-75 w-lg-35 mt-4 m-auto">
              <div className="text-start">
                <FormGroup>
                  <Label>Password</Label>
                  <IconInput
                    placeholder="Not less than 6 characters"
                    icon={faLock}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password Again</Label>
                  <IconInput
                    placeholder="Not less than 6 characters"
                    icon={faLock}
                  />
                </FormGroup>
              </div>
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

export default Password;
