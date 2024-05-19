export default function Greedy({ data, jumlah_barang }) {
  return (
    <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
      <h1 className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700">
        Greedy |{" "}
        <div className="badge badge-accent mb-2">
          {jumlah_barang} | {data.time.toFixed(2)}ms
        </div>
      </h1>
      <div className="overflow-x-auto border dark:border-2 border-gray-400 dark:border-gray-700 rounded mt-5">
        <table className="table table-xs">
          <thead>
            <tr className="text-black dark:text-white">
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {data.result.barang.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.harga}</td>
                <td>{item.jumlah}</td>
                <td>{item.harga_total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-black dark:text-white">
              <td colSpan="3" className="text-right">
                Total
              </td>
              <td>{data.result.total_jumlah_semua}</td>
              <td>{data.result.total_harga_semua}</td>
            </tr>
            <tr className="text-black dark:text-white">
              <td colSpan="3" className="text-right">
                Modal Sisa
              </td>
              <td>{data.result.sisa_modal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex flex-col gap-y-2 text-black dark:text-white mt-10">
        <div className="collapse collapse-arrow bg-gray-200 dark:bg-gray-700 rounded-md">
          <input type="radio" name="greedy-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            1. Kompleksitas Waktu
          </div>
          <div className="collapse-content px-10">
            <ul className="list-disc flex flex-col gap-y-3">
              <li>
                <span className="font-bold block">Kompleksitas:</span> 𝑂 ( 𝑛 log
                ⁡ 𝑛 ) O(nlogn), di mana 𝑛 n adalah jumlah barang. Kompleksitas
                ini berasal dari langkah pengurutan barang berdasarkan harga.
              </li>
              <li>
                <span className="font-bold block">Waktu Eksekusi:</span> Sangat
                cepat ({data.time.toFixed(2)}ms). Hal ini menunjukkan efisiensi
                algoritma Greedy dalam memproses data dan menemukan solusi yang
                mendekati optimal.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-200 dark:bg-gray-700 rounded-md">
          <input type="radio" name="greedy-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            2. Analisis Hasil
          </div>
          <div className="collapse-content px-10">
            <ul className="list-disc flex flex-col gap-y-3">
              <li>
                <span className="font-bold">Total Harga:</span>{" "}
                {data.result.total_harga_semua}
              </li>
              <li>
                <span className="font-bold">Total Jumlah Barang:</span>{" "}
                {data.result.total_jumlah_semua}
              </li>
              <li>
                <span className="font-bold">Sisa Modal:</span> Rp
                {data.result.sisa_modal}
              </li>
              <li>
                <span className="font-bold block">Barang yang Dibeli:</span>{" "}
                Kombinasi barang yang cukup baik, namun tidak optimal. Algoritma
                Greedy cenderung memilih solusi yang cepat ditemukan tetapi
                tidak selalu solusi terbaik.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-200 dark:bg-gray-700 rounded-md">
          <input type="radio" name="greedy-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            3. Kesimpulan
          </div>
          <div className="collapse-content px-10">
            <ul className="list-disc flex flex-col gap-y-3">
              <li>
                <span className="font-bold block">Keuntungan:</span> Sangat
                cepat dan efisien, terutama cocok untuk dataset yang besar atau
                saat waktu eksekusi sangat kritis.
              </li>
              <li>
                <span className="font-bold block">Kekurangan:</span> Tidak
                selalu menghasilkan solusi optimal, terutama jika terdapat
                banyak kombinasi yang mungkin memberikan hasil yang lebih baik.
              </li>
            </ul>
          </div>
        </div>
        <blockquote className="relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 mt-10">
          <p className="text-gray-800 text-sm dark:text-white">
            <em>
              Gunakan algoritma Greedy jika kecepatan eksekusi adalah prioritas
              utama dan Anda dapat menerima hasil yang mendekati optimal.
            </em>
          </p>
        </blockquote>
      </div>
    </div>
  );
}
