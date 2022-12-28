/* eslint-disable @next/next/no-img-element */
import {
  faEnvelope,
  faLock,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";
import { Form, FormGroup, Label } from "reactstrap";
import IconInput from "../../components/IconInput";

function Login() {
  return (
    <main className="d-flex flex-wrap align-items-stretched">
      <div className="col-12 col-md-7 min-vh-100 px-3 d-flex flex-column justify-content-between">
        <div className="text-start pt-3 pb-1 w-md-80 m-auto">
          <Link
            className="d-inline-flex justify-content-center align-items-center"
            href="/"
          >
            <img className="max-w-4" src="/logo-icon.png" alt="" />
            <span className="d-inline-block fw-bolder font-1-2">ShopWart</span>
          </Link>
        </div>
        <div className="text-center d-flex align-items-center h-100">
          <div className="w-100">
            <h2 className="h2 fw-bold text-center d-none d-md-block">Login</h2>
            <h2 className="h2 fw-bold text-center d-block d-md-none">
              Welcome Back
            </h2>
            <div className="my-4">
              <span className="d-inline-block max-w-2 max-h-2 pointer-2 border rounded-circle">
                <img src="/facebook.png" alt="" />
              </span>
              <span className="d-inline-block max-w-2 max-h-2 mx-4 pointer-2 border rounded-circle">
                <img src="/google.png" alt="" />
              </span>
              <span className="d-inline-block max-w-2 max-h-2 pointer-2 border rounded-circle">
                <img src="/twitter.png" alt="" />
              </span>
            </div>
            <p>Or Login with email</p>
            <Form className="w-md-75 mt-4 m-auto">
              <div className="text-start">
                <FormGroup>
                  <Label>Email</Label>
                  <IconInput
                    type="email"
                    placeholder="e.g you@mail.com"
                    icon={faEnvelope}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <IconInput
                    placeholder="Not less than 6 characters"
                    icon={faLock}
                  />
                </FormGroup>
              </div>
              <FormGroup className="mt-4 d-block">
                <Link href="/auth/reset" className="text-primary pointer-2">
                  Forgot Password?
                </Link>
              </FormGroup>
              <FormGroup>
                <button className="btn btn-primary w-75 w-lg-50 rounded-pill">
                  <span className="d-inline-block d-md-none">Login</span>
                  <span className="d-none d-md-inline-block">Sign In</span>
                </button>
              </FormGroup>
              <FormGroup className="d-block d-md-none">
                Don’t have an account yet?{" "}
                <Link href="/auth/register" className="text-primary pointer-2">
                  Signup
                </Link>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-5 bg-primary d-none d-md-flex align-items-center min-vh-100 text-white px-4">
        <div className="w-100 text-center">
          <h2 className="h2 fw-bold text-center">
            Take your business to the next level
          </h2>
          <p className="my-4">
            Try ShopWhart free for 1month, no credit card required.
          </p>
          <Link
            href="/auth/register"
            className="btn btn-outline-light rounded-pill w-75 w-lg-50"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
