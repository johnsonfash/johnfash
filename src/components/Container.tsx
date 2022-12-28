import React, { ReactElement } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

function Container({ children }: { children: ReactElement }) {
  return (
    <main className="w-100">
      <NavBar />
      <section className="container py-4">{children}</section>
      <Footer />
    </main>
  );
}

export default Container;
