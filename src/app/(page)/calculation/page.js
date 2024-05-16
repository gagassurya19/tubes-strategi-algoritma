"use client";
import { useEffect, useState } from "react";
import InputBarang from "./inputBarang";
import ParamFilter from "./paramFilter";

export default function Calculation() {
  const [barang, setBarang] = useState([]);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 w-full justify-between">
        <InputBarang inputBarang={(val) => setBarang(val)} />
        <ParamFilter barang={barang} />
      </div>
    </>
  );
}
