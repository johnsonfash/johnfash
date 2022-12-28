/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useAccount from "../store/hooks/account";
import { logOut } from "../services/token";
import { useAppSelector } from "../store";

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const { loading, data } = useAccount({ auto: false });
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <header className="sticky-top w-100 border-bottom box-shadow bg-white">
      <div className="container w-100 pt-2 py-md-2 d-flex align-items-center flex-wrap">
        <div className="w-100 w-md-20 d-flex align-items-center justify-content-between">
          <Link
            className="d-inline-flex justify-content-center align-items-center"
            href="/"
          >
            <img className="max-w-4" src="/logo-icon.png" alt="" />
            <span className="d-inline-block fw-bolder font-1-2">ShopWart</span>
          </Link>
          <label
            htmlFor="hambugger-checkbox"
            className="hambugger pointer d-md-none"
          >
            <span className="top-line"></span>
            <span className="middle-line"></span>
            <span className="bottom-line"></span>
          </label>
        </div>
        <input type="checkbox" className="d-none" id="hambugger-checkbox" />
        <div className="ps-md-5 ps-lg-0 w-100 mt-2 mt-md-0 drop-list w-md-80 d-md-flex align-items-center justify-content-between">
          <div className="w-100 text-center-md">
            <NavLink
              className="d-block d-md-inline-block py-2 pe-3 mx-md-1"
              href="/"
            >
              Home
            </NavLink>
            <NavLink
              href="/about"
              className="d-block d-md-inline-block py-2 ps-md-3 pe-3 mx-md-1"
            >
              About Us
            </NavLink>
            <NavLink
              href="/features"
              className="d-block d-md-inline-block py-2 ps-md-3 pe-3 mx-md-1"
            >
              Features
            </NavLink>
            <NavLink
              href="/features"
              className="d-block d-md-inline-block py-2 ps-md-3 pe-3 mx-md-1"
            >
              FAQs
            </NavLink>
          </div>
          {auth ? (
            <div className="d-inline-block w-md-35 text-end no-break mt-0 pt-1 pt-md-0 pb-5 pb-md-0">
              <span className="d-inline-flex drop align-items-center justify-content-center min-w-3 h-2">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  direction="down"
                  className="position-md-absolute z-index-1"
                >
                  <DropdownToggle
                    caret
                    outline
                    style={{ background: "transparent" }}
                    className="max-w-3 p-0 border-0 position-relative"
                    color="light"
                  >
                    <span
                      className={`d-inline-flex align-items-center ${
                        loading === "done" ? "border " : " "
                      } position-relative  z-index-0 justify-content-center rounded-circle overflow-hidden`}
                    >
                      <img
                        src={data?.picture ? data?.picture : "/avatar.png"}
                        alt=""
                        className="position-relative"
                      />
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="bg-white min-w-15 box-shadow">
                    <div className="bg-white px-4 position-relative text-center">
                      <Link
                        onClick={toggle}
                        href="/profile"
                        className="d-flex align-items-center justify-content-between py-2"
                      >
                        <span>My Profile</span>
                        <span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                      <Link
                        onClick={toggle}
                        href="/profile/edit"
                        className="d-flex align-items-center justify-content-between py-2"
                      >
                        <span>Account Settings</span>
                        <span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                      <div
                        onClick={logOut}
                        className="d-flex pointer text-danger align-items-center justify-content-between py-2"
                      >
                        <span>Sign Out</span>
                        <span>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </div>
                    </div>
                  </DropdownMenu>
                </Dropdown>
              </span>
            </div>
          ) : (
            <span className="d-inline-block w-md-35 text-end">
              <Link
                href="/auth/login"
                className="d-inline-block no-break btn btn-outline-primary mt-1 mb-2 mb-md-0 mt-md-0 px-lg-5"
              >
                Start Free Trial
              </Link>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
