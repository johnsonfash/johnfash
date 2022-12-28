import { faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="pt-5 bg-primary">
      <div className="container text-white">
        <div className="d-flex flex-wrap">
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h5 className="h5">Links</h5>
            <Link href="/about" className="d-block py-2 text-white pointer-2">
              About ShopWart
            </Link>
            <Link
              href="/ecommerce-builder"
              className="d-block py-2 text-white pointer-2"
            >
              Ecommerce builder
            </Link>
            <Link
              href="/business-banking"
              className="d-block py-2 text-white pointer-2"
            >
              Business banking
            </Link>
            <Link
              href="/shipping-and-delivery"
              className="d-block py-2 text-white pointer-2"
            >
              Shipping & delivery
            </Link>
            <Link
              href="/business-analysis"
              className="d-block py-2 text-white pointer-2"
            >
              Business analysis
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h5 className="h5">Pricing</h5>
            <Link
              href="/freemium-model"
              className="d-block py-2 text-white pointer-2"
            >
              Freemium model
            </Link>
            <Link
              href="/premium-model"
              className="d-block py-2 text-white pointer-2"
            >
              Premium model
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h5 className="h5">Legal</h5>
            <Link
              href="/privacy-policy"
              className="d-block py-2 text-white pointer-2"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="d-block py-2 text-white pointer-2"
            >
              Terms & conditions
            </Link>
            <Link href="/faqs" className="d-block py-2 text-white pointer-2">
              FAQs
            </Link>
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <h5 className="h5">Socials</h5>
            <Link
              href="https://google.com"
              target="_blank"
              className="d-block py-2 text-white pointer-2"
            >
              Whatsapp
            </Link>
            <Link
              href="https://google.com"
              target="_blank"
              className="d-block py-2 text-white pointer-2"
            >
              Twitter
            </Link>
            <Link
              href="https://google.com"
              target="_blank"
              className="d-block py-2 text-white pointer-2"
            >
              Instagram
            </Link>
            <Link
              href="https://google.com"
              target="_blank"
              className="d-block py-2 text-white pointer-2"
            >
              Medium
            </Link>
          </div>
        </div>
        <hr className="" />
        <div className="py-3 d-flex flex-wrap justify-content-between">
          <h5 className="text-center w-100 w-md-auto">
            © Copyright, ShopWhart 2022 inc.
          </h5>
          <div className="text-center w-100 w-md-auto">
            <span className="d-inline-block">
              <FontAwesomeIcon icon={faPhone} />
              <Link
                href="tel:+2349036723177"
                className="text-white pointer-2 d-inline-block ms-2"
              >
                +2349036723177,
              </Link>
              <Link
                href="tel:+2349026503960"
                className="text-white pointer-2 d-inline-block ms-2"
              >
                +2349026503960
              </Link>
            </span>
            <span className="d-inline-block ms-4">
              <FontAwesomeIcon icon={faGlobe} />
              <span className="d-inline-block ms-2">Lagos, Nigeria</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
