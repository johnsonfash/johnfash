/* eslint-disable @next/next/no-img-element */
import {
  faEnvelope,
  faLock,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React from "react";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import IconInput from "../../components/IconInput";

function Login() {
  return (
    <main className="d-flex flex-wrap align-items-stretched">
      <div className="col-12 col-md-5 bg-primary d-none d-md-flex align-items-center min-vh-100 text-white px-4">
        <div className="w-100 text-center">
          <h2 className="h2 fw-bold text-center">Welcome!</h2>
          <p className="my-4">
            Time for Business! Don’t keep your lovely customers waiting
          </p>
          <Link
            href="/auth/login"
            className="btn btn-outline-light rounded-pill w-75 w-lg-50"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-7 min-vh-100 px-3 d-flex flex-column justify-content-between">
        <div className="text-end pt-3 pb-1 w-md-80 m-auto">
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
            <h2 className="h2 fw-bold text-center d-none d-md-block">
              Create an account
            </h2>
            <h2 className="h2 fw-bold text-center d-block d-md-none">
              Take your business to the next level
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
            <p>Or Signup with email</p>
            <Form className="w-md-75 mt-4 m-auto">
              <div className="text-start">
                <FormGroup>
                  <Label>Full Name</Label>
                  <IconInput placeholder="Name" icon={faUserAlt} />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <IconInput
                    type="email"
                    placeholder="e.g you@email.com"
                    icon={faEnvelope}
                  />
                </FormGroup>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Password</Label>
                      <IconInput
                        placeholder="Not less than 6 characters"
                        icon={faLock}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Password Again</Label>
                      <IconInput
                        placeholder="Not less than 6 characters"
                        icon={faLock}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <FormGroup>
                <button className="btn btn-primary w-75 w-lg-50 mt-2 rounded-pill">
                  Sign Up
                </button>
              </FormGroup>
              <FormGroup className="d-block d-md-none">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary pointer-2">
                  Login
                </Link>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
