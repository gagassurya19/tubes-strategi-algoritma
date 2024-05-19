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
    </div>
  );
}
