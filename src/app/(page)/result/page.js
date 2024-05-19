"use client";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../utility/DataContext";
import {
  runAlgorithm,
  runAlgorithmWithLargeDatasetDemo,
} from "../../utility/Algorithm";

import BruteForce from "./bruteforce";
import Greedy from "./greedy";

export default function Result() {
  // const { data } = useContext(DataContext);
  // if (data.length === 0) return null;
  // const params = data[0];
  // const barang = data[1];
  // let result;
  // result = runAlgorithm(params, barang);
  // // result = runAlgorithmWithLargeDatasetDemo(20); // max 20 otherwise CRASHH!

  const { data } = useContext(DataContext);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const params = data[0];
      const barang = data[1];
      const resultData = runAlgorithm(params, barang);
      setResult(resultData);
    }
  }, [data]);

  if (!result) return null;

  return (
    <div className="w-full justify-between mt-10">
      <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700 mb-5">
        ANALASIS ALGORITMA
      </p>
      <div className="flex flex-col lg:flex-row w-full justify-between">
        <Greedy data={result.greedy} jumlah_barang={result.jumlah_barang} />
        <div className="divider lg:divider-horizontal text-xl font-semibold">
          VS
        </div>
        <BruteForce
          data={result.bruteforce}
          jumlah_barang={result.jumlah_barang}
        />
      </div>
    </div>
  );
}
