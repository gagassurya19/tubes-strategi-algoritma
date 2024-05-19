// params include: modal, harga_maksimum, harga_minimum, jumlah_per_barang, variasi
// barang include: harga, stok, nama

// goals: mencari kombinasi barang yang memaksimalkan jumlah barang yang dibeli dengan harga yang sesuai dengan budget
// constraints: jumlah barang yang dibeli tidak boleh melebihi stok, harga total barang yang dibeli tidak boleh melebihi harga maksimum
// objective function: jumlah barang yang dibeli
// decision variable: jumlah barang yang dibeli dari setiap barang

// algoritma greedy
// 1. sort barang berdasarkan harga per barang
// 2. iterasi setiap barang dari yang termurah ke termahal
// 3. cek variasi jenis barang, ambil barang sebanyak variasi
// 4. cek jumlah barang yang dibeli, ambil jumlah barang per barang sebanyak jumlah_per_barang atau sisa stok
// 5. cek harga total barang yang dibeli, jika masih dalam budget, tambahkan barang ke hasil
// 6. ulangi langkah 2-5 sampai barang habis atau budget/modal habis
// 7. tampilkan hasil: total harga, jumlah barang yang dibeli, barang yang dibeli, jumlah barang per barang, harga per barang, sisa modal atau budget yang tidak terpakai (jika ada)

// Greedy Algorithm
const greedy = (params, barang) => {
  const { modal, harga_minimum, harga_maksimum, jumlah_per_barang, variasi } =
    params;

  let result = {
    params: params,
    barang: [],
    total_harga_semua: 0,
    total_jumlah_semua: 0,
    modal: modal,
    sisa_modal: modal,
  };

  // sortir barang berdasarkan harga
  let barang_sorted = barang.sort((a, b) => a.harga - b.harga);

  let jenis_terbeli = 0;

  for (const item of barang_sorted) {
    if (
      jenis_terbeli >= variasi ||
      result.sisa_modal < item.harga ||
      item.harga > harga_maksimum
    ) {
      break;
    }

    if (item.harga >= harga_minimum) {
      const qty = Math.min(
        Math.floor(result.sisa_modal / item.harga),
        item.stok,
        jumlah_per_barang
      );
      if (qty > 0) {
        result.sisa_modal -= qty * item.harga;
        result.total_harga_semua += qty * item.harga;
        result.total_jumlah_semua += qty;
        result.barang.push({
          nama: item.nama,
          harga: item.harga,
          jumlah: qty,
          harga_total: qty * item.harga,
        });
        jenis_terbeli++;
      }
    }
  }

  return result;
};

// Brute Force Algorithm
const bruteforce = (params, barang) => {
  const { modal, harga_minimum, harga_maksimum, jumlah_per_barang, variasi } = params;

  let result = {
    params: params,
    barang: [],
    total_harga_semua: 0,
    total_jumlah_semua: 0,
    modal: modal,
    sisa_modal: modal,
  };
  
  // Sort items based on price
  let barang_sorted = barang.sort((a, b) => a.harga - b.harga);

  // Generate all combinations of items
  const combinations = (arr) => {
    if (arr.length === 0) return [[]];
    const firstElem = arr[0];
    const restCombinations = combinations(arr.slice(1));
    return restCombinations.concat(restCombinations.map((comb) => [firstElem, ...comb]));
  };

  const allCombinations = combinations(barang_sorted);

  // Filter combinations to respect the variasi constraint
  const validCombinations = allCombinations.filter(comb => comb.length <= variasi);

  // Iterate through each valid combination
  for (const combination of validCombinations) {
    let current_total_harga = 0;
    let current_total_jumlah = 0;
    let current_barang = [];
    let current_modal = modal;

    for (const item of combination) {
      if (item.harga < harga_minimum || item.harga > harga_maksimum) {
        continue;
      }
      const qty = Math.min(Math.floor(current_modal / item.harga), item.stok, jumlah_per_barang);
      if (qty > 0) {
        current_modal -= qty * item.harga;
        current_total_harga += qty * item.harga;
        current_total_jumlah += qty;
        current_barang.push({ nama: item.nama, harga: item.harga, jumlah: qty, harga_total: qty * item.harga });
      }
    }

    if (current_total_jumlah > result.total_jumlah_semua && current_total_harga <= modal) {
      result = {
        params: params,
        barang: current_barang,
        total_harga_semua: current_total_harga,
        total_jumlah_semua: current_total_jumlah,
        modal: modal,
        sisa_modal: current_modal,
      };
    }
  }

  return result;
}

// Function to measure time
function measureTime(func) {
  const start = performance.now();
  const result = func();
  const end = performance.now();
  return { result, time: end - start };
}

export const runAlgorithm = (params, barang) => {
  const greedyResult = measureTime(() => greedy(params, barang));
  const bruteforceResult = measureTime(() => bruteforce(params, barang));
  return {
    jumlah_barang: barang.length,
    greedy: greedyResult,
    bruteforce: bruteforceResult,
  };
};

// Parameters and items as provided before
// const params = {
//   modal: 30000,
//   harga_minimum: 5000,
//   harga_maksimum: 15000,
//   jumlah_per_barang: 3,
//   variasi: 2,
// };

// const barang = [
//   { nama: "Item1", harga: 10000, stok: 10 },
//   { nama: "Item2", harga: 5000, stok: 5 },
// ];

// // Measure time for Greedy Algorithm
// const greedyResult = measureTime(() => greedy(params, barang));
// console.log("Greedy Result:", greedyResult.result);
// console.log("Greedy Time:", greedyResult.time, "ms");

// // Measure time for Brute Force Algorithm
// const bruteforceResult = measureTime(() => bruteforce(params, barang));
// console.log("Brute Force Result:", bruteforceResult.result);
// console.log("Brute Force Time:", bruteforceResult.time, "ms");

// WITH LARGE DATASET GENERATOR
const createLargeDataset = (numItems) => {
  const items = [];
  for (let i = 1; i <= numItems; i++) {
    items.push({
      nama: `Item${i}`,
      harga: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
      stok: Math.floor(Math.random() * 10) + 1, // Random stock between 1 and 10
    });
  }
  return items;
};

const largeParams = {
  modal: 10000,
  harga_minimum: 10,
  harga_maksimum: 100,
  jumlah_per_barang: 5,
  variasi: 3,
};

export const runAlgorithmWithLargeDatasetDemo = (num_data) => {
  const greedyLargeResult = measureTime(() => greedy(largeParams, createLargeDataset(num_data)));
  const bruteforceLargeResult = measureTime(() => bruteforce(largeParams, createLargeDataset(num_data)));
  return {
    jumlah_barang: num_data,
    greedy: greedyLargeResult,
    bruteforce: bruteforceLargeResult,
  };
}
