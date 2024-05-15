import Modal from "../../components/modal";
import { useEffect, useState } from "react";

export default function InputBarang() {
  const [isOpen, setOpen] = useState(false);
  return (
    <> 
        <div className="border border-grey-600 w-full rounded-lg px-5 py-10">
        <button
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
      </Modal>
            </div>
    </>
  );
}
