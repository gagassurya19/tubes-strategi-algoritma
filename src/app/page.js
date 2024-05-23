"use client";

import { useEffect, useState } from "react";
import { DataProvider } from "./utility/DataContext";
import Calculation from "./(page)/calculation/page";
import Result from "./(page)/result/page";
import Code from "./(page)/code/page";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    setIsLoaded(true);
  });
  if (!isLoaded) return "Loading...";
  return (
    <DataProvider>
      <Header />
      <Calculation />
      <Result />
      <Code />
      <Footer />
    </DataProvider>
  );
}
