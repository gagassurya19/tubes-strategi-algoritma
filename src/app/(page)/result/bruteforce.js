export default function BruteForce({ data, jumlah_barang }) {
  return (
    <div className="border dark:border-2 border-gray-400 dark:border-gray-700 w-full rounded-lg p-5">
      <h1 className="text-xl font-semibold border-b border-gray-400 dark:border-gray-700">
        Brute Force |{" "}
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
          <input type="radio" name="bruteforce-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            1. Kompleksitas Waktu
          </div>
          <div className="collapse-content px-10">
            <ul className="list-disc flex flex-col gap-y-3">
              <li>
                <span className="font-bold block">Kompleksitas:</span> 𝑂 ( !n ),
                karena algoritma ini menghasilkan dan mengevaluasi semua
                kemungkinan kombinasi barang. Ini menghasilkan waktu eksekusi
                yang eksponensial karena harus memeriksa semua subset dari set
                barang yang ada.
              </li>
              <li>
                <span className="font-bold block">Waktu Eksekusi:</span> Sangat
                lambat ({data.time.toFixed(2)}ms). Waktu eksekusi yang jauh
                lebih lama dibandingkan dengan algoritma Greedy mencerminkan
                kompleksitas eksponensialnya, terutama ketika jumlah barang
                meningkat.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-200 dark:bg-gray-700 rounded-md">
          <input type="radio" name="bruteforce-accordion-2" />
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
                Kombinasi barang yang optimal, karena algoritma ini mengevaluasi
                semua kemungkinan kombinasi untuk menemukan solusi terbaik.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-200 dark:bg-gray-700 rounded-md">
          <input type="radio" name="bruteforce-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            3. Kesimpulan
          </div>
          <div className="collapse-content px-10">
            <ul className="list-disc flex flex-col gap-y-3">
              <li>
                <span className="font-bold block">Keuntungan:</span> Menjamin
                solusi optimal karena mengevaluasi semua kemungkinan kombinasi.
              </li>
              <li>
                <span className="font-bold block">Kekurangan:</span> Waktu
                eksekusi yang sangat lama, tidak praktis untuk dataset yang
                besar atau ketika waktu eksekusi penting.
              </li>
            </ul>
          </div>
        </div>
        <blockquote className="relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 mt-10">
          <p className="text-gray-800 text-sm dark:text-white">
            <em>
              Gunakan algoritma Brute Force jika menemukan solusi optimal adalah
              yang paling penting dan Anda memiliki sumber daya komputasi yang
              cukup untuk menanganinya.
            </em>
          </p>
        </blockquote>
      </div>
    </div>
  );
}
