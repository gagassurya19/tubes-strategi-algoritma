"use client";
import { useState } from "react";

export default function Code() {
  const [hide, setHide] = useState(false);
  return (
    <>
      <div className="flex flex-row justify-center mt-10 mb-5">
        {/* <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700 w-full">
          Kode Algoritma
        </p> */}
        <button
          type="button"
          className="inline-flex max-w-10 max-h-10 justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 ml-2"
          onClick={() => setHide(!hide)}
        >
          {hide ? "🎃" : "🤖"}
        </button>
      </div>
      {hide && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <p className="text-xl font-semibold mb-3 text-center">Greedy</p>
            <iframe
              class="w-full h-[1111px] border-0 overflow-hidden"
              allow="clipboard-write"
              src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fgagassurya19%2Ftubes-strategi-algoritma%2Fblob%2F8578b3e1ff8d45684a744232cb64cb12a17aac15%2Fsrc%2Fapp%2Futility%2FAlgorithm.js%23L18-L68&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFullPath=on&showCopy=on"
            ></iframe>
          </div>
          <div className="w-full">
            <p className="text-xl font-semibold mb-3 text-center">
              Brute Force
            </p>
            <iframe
              class="w-full h-[1363px] border-0 overflow-hidden"
              allow="clipboard-write"
              src="https://emgithub.com/iframe.html?target=https%3A%2F%2Fgithub.com%2Fgagassurya19%2Ftubes-strategi-algoritma%2Fblob%2F8578b3e1ff8d45684a744232cb64cb12a17aac15%2Fsrc%2Fapp%2Futility%2FAlgorithm.js%23L70-L132&style=github-dark-dimmed&type=code&showBorder=on&showLineNumbers=on&showFullPath=on&showCopy=on"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
