"use client";
import Modal from "../../components/modal";
import { useEffect, useState } from "react";
import { createLargeDataset } from "../../utility/Algorithm";
import { create } from "domain";
import { formatToCurrency } from "../../utility/currencyFormater";
import { event } from "../../utility/GoogleAnalytics";

export default function InputBarang({ inputBarang }) {
  const [isOpen, setOpen] = useState(false);
  const [isTambah, setTambah] = useState(false);
  const [barang, setBarang] = useState([]);
  const [withGenerator, setWithGenerator] = useState(false);
  const [openTable, setOpenTable] = useState(false);

  const tambahBarang = (item) => {
    item.preventDefault();
    const newBarang = {
      nama: item.target[0].value,
      foto: item.target[1].value,
      harga: item.target[2].value,
      stok: item.target[3].value,
    };
    barang.push(newBarang);
    setTambah(!isTambah);
    localStorage.setItem("barang", JSON.stringify(barang));
    inputBarang(barang);

    event({
      action: 'tambah_barang',
      category: 'inputBarang',
      label: 'add',
      value: 'active: true',
    })
  };

  const hapusBarang = (index) => {
    barang.splice(index, 1);
    setBarang([...barang]);
    localStorage.setItem("barang", JSON.stringify(barang));
    inputBarang([...barang]);
  };

  const restoreData = () => {
    localStorage.removeItem("barang");
    const defaultBarang = [
      {
        nama: "Gelas",
        harga: 10000,
        stok: 10,
        foto: "https://image1ws.indotrading.com/s3/productimages/webp/co205354/p923533/w600-h600/5e50fba5-3882-4d5c-8ff0-a367df004d46.png",
      },
      {
        nama: "Piring",
        harga: 5000,
        stok: 5,
        foto: "https://img.ws.mms.shopee.co.id/95981887682d474500a850bcb4bd01d4",
      },
    ];
    setBarang(defaultBarang);
    localStorage.setItem("barang", JSON.stringify(defaultBarang));
    inputBarang(defaultBarang);
  };

  const withDataGenerator = () => {
    setWithGenerator(!withGenerator);
    event({
      action: 'pake_generator',
      category: 'inputBarang',
      label: 'generator',
      value: 'active: true',
    })
  };

  const genereateData = (e) => {
    e.preventDefault();
    const data = createLargeDataset(e.target[0].value);
    setBarang(data);
    localStorage.setItem("barang", JSON.stringify(data));
    inputBarang(data);

    setOpenTable(true);
  };

  useEffect(() => {
    const localBarang = localStorage.getItem("barang");
    if (localBarang) {
      setBarang(JSON.parse(localBarang));
      inputBarang(JSON.parse(localBarang));
    } else {
      const defaultBarang = [
        {
          nama: "Gelas",
          harga: 10000,
          stok: 10,
          foto: "https://image1ws.indotrading.com/s3/productimages/webp/co205354/p923533/w600-h600/5e50fba5-3882-4d5c-8ff0-a367df004d46.png",
        },
        {
          nama: "Piring",
          harga: 5000,
          stok: 5,
          foto: "https://img.ws.mms.shopee.co.id/95981887682d474500a850bcb4bd01d4",
        },
      ];
      setBarang(defaultBarang);
      localStorage.setItem("barang", JSON.stringify(defaultBarang));
      inputBarang(defaultBarang);
    }
  }, []);
  return (
    <>
      {/* <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          onClick={() => setOpen(!isOpen)}
        >
          Tambah Barang
        </button>
        <Modal
          title="Tambah barang"
          isOpen={isOpen}
          onClose={() => setOpen(false)}
        >
          <h1>Halo</h1>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
          >
            Tambah Barang
          </button>
        </Modal> */}
      <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
        <div className="flex flex-row justify-between">
          <p className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700 w-full">
            {withGenerator ? "GENERATOR" : "LIST BARANG "}
          </p>
          <button
            type="button"
            className="inline-flex max-w-10 max-h-10 justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 ml-2"
            onClick={() => withDataGenerator()}
          >
            🤖
          </button>
          <button
            type="button"
            className="inline-flex max-w-10 max-h-10 justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-3 py-2 ml-2"
            onClick={() => restoreData()}
          >
            🔥
          </button>
        </div>

        {withGenerator && (
          <>
            <div className="flex flex-row">
              <div className="w-full">
                <label
                  htmlFor="stok"
                  className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Jumlah Barang (max 20 or{" "}
                  <div
                    className="tooltip underline hover:cursor-pointer"
                    data-tip="Tergantung pada ketersediaan memory dan spesifikasi pada komputer anda."
                  >
                    CRASH!
                  </div>
                  )
                </label>
                <form
                  className="flex flex-row gap-2"
                  onSubmit={(v) => genereateData(v)}
                >
                  <input
                    type="number"
                    id="stok"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="20"
                    defaultValue={20}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {openTable && (
              <div className="overflow-x-auto h-56 border dark:border-2 border-gray-400 dark:border-gray-700 rounded mt-5">
                <table className="table table-xs">
                  <thead>
                    <tr className="text-black dark:text-white">
                      <th>No</th>
                      <th>Nama</th>
                      <th>Stok</th>
                      <th>Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barang.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nama}</td>
                        <td>{item.stok}</td>
                        <td>{item.harga}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {!withGenerator && (
          <>
            <div className="overflow-x-auto h-80 my-3">
              <div className="grid grid-cols-1 gap-4 my-3">
                {barang.map((item, index) => (
                  <div
                    key={index}
                    className="group/item bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 p-3 rounded-lg dark:hover:bg-gray-600 hover:cursor-pointer"
                  >
                    <div className="flex-shrink-0 group block">
                      <div className="flex items-center">
                        <img
                          className="filter saturate-0 group-hover/item:saturate-100 inline-block flex-shrink-0 size-[62px] rounded-lg"
                          src={item.foto || "https://via.placeholder.com/150"}
                          alt="Image Description"
                        />
                        <div className="ms-3">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
                            {item.nama}
                          </h3>
                          <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">
                            Harga: Rp{formatToCurrency(item.harga)}
                          </p>
                          <p className="text-sm font-medium text-red-800 dark:text-red-300">
                            Stok: {item.stok}
                          </p>
                        </div>
                        <div className="grow flex flex-row justify-end gap-3 px-5">
                          {/* <button
                      type="button"
                      className="inline-flex max-w-10 justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button> */}
                          <button
                            type="button"
                            className="inline-flex max-w-10 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={() => hapusBarang(index)}
                          >
                            {/* icon delete/trashbin */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {barang.length === 0 && (
                  <div className="flex items-center justify-center h-56 text-center text-gray-500 dark:text-gray-400">
                    <p>
                      Barang kosong!
                      <br />
                      Tolong isi dulu yaa ^_^
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* button add */}
            {!isTambah && (
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 p-3 rounded-lg dark:hover:bg-gray-600 hover:cursor-pointer font-semibold text-center w-full"
                onClick={() => setTambah(!isTambah)}
              >
                Tambah barang
              </button>
            )}
          </>
        )}

        {isTambah && (
          <form onSubmit={(item) => tambahBarang(item)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-400 dark:border-gray-700 pt-5">
              <div>
                <label
                  htmlFor="nama_barang"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  id="nama_barang"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Piring Kaca"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="foto"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Foto
                </label>
                <input
                  type="url"
                  id="foto"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="http://example.com/image.png"
                />
              </div>
              <div>
                <label
                  htmlFor="harga"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Harga/pcs
                </label>
                <input
                  type="number"
                  id="harga"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1000"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="stok"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stok
                </label>
                <input
                  type="number"
                  id="stok"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="50"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-gray-600 hover:bg-gray-500 dark:bg-sky-700 p-3 rounded-lg dark:hover:bg-sky-600 hover:cursor-pointer font-semibold text-center w-full"
              >
                Tambah
              </button>
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 p-3 rounded-lg dark:hover:bg-gray-600 hover:cursor-pointer font-semibold text-center w-full"
                onClick={() => setTambah(!isTambah)}
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
