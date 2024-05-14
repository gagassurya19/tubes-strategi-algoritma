# Fungsi untuk mengurutkan barang berdasarkan harga
def sort_by_price(items):
    return sorted(items, key=lambda x: x['harga'])

# Fungsi greedy untuk memilih barang
def select_items_greedy(items, modal, harga_min, harga_max, variasi, max_qty_per_item):
    selected_items = []
    modal_sisa = modal
    total_jumlah = 0
    total_harga = 0
    
    for item in items:
        if total_jumlah >= variasi or modal_sisa < item['harga'] or item['harga'] > harga_max:
            break
            
        if harga_min <= item['harga']:
            qty = min(modal_sisa // item['harga'], item['stok'], max_qty_per_item)
            modal_sisa -= qty * item['harga']
            selected_items.append({'nama': item['nama'], 'jumlah': qty})
            total_jumlah += qty
            total_harga += qty * item['harga']
    
    return selected_items, total_jumlah, total_harga, modal_sisa


# Fungsi divide & conquer untuk memilih barang
def select_items_divide_conquer(items, modal, harga_min, harga_max, variasi, max_qty_per_item):
    if not items or harga_max < items[0]['harga'] or harga_min > items[-1]['harga'] or variasi <= 0:
        return [], 0, 0, modal
    
    selected_items = []
    total_jumlah = 0
    total_harga = 0
    modal_sisa = modal
    
    for item in items:
        if item['harga'] < harga_min or item['harga'] > harga_max:
            continue
        
        qty = min(modal_sisa // item['harga'], item['stok'], max_qty_per_item)
        modal_sisa -= qty * item['harga']
        selected_items.append({'nama': item['nama'], 'jumlah': qty})
        total_jumlah += qty
        total_harga += qty * item['harga']
        variasi -= 1
        if variasi == 0:
            break
    
    return selected_items, total_jumlah, total_harga, modal_sisa



# Contoh penggunaan
data_barang = [
    {'nama': 'Baju T-shirt', 'harga': 350000, 'stok': 20},
    {'nama': 'Celana Jeans', 'harga': 450000, 'stok': 15},
    {'nama': 'Sepatu Sneakers', 'harga': 750000, 'stok': 10},
    {'nama': 'Kacamata Hitam', 'harga': 200000, 'stok': 25},
    {'nama': 'Tas Ransel', 'harga': 550000, 'stok': 12},
    {'nama': 'Dompet Kulit', 'harga': 300000, 'stok': 18},
    {'nama': 'Topi Baseball', 'harga': 150000, 'stok': 30},
    {'nama': 'Jaket Parka', 'harga': 800000, 'stok': 8},
    {'nama': 'Jam Tangan', 'harga': 600000, 'stok': 14},
    {'nama': 'Sarung Tangan', 'harga': 100000, 'stok': 22},
]

# Urutkan barang berdasarkan harga
data_barang = sort_by_price(data_barang)

# Tentukan kriteria
modal = 1000000
harga_min = 100000
harga_max = 900000
variasi = 3
max_qty_per_item = 5  # Misalnya, maksimal 5 barang per item

# Pilih barang dengan algoritma divide & conquer
selected_items_divide_conquer, total_jumlah_dc, total_harga_dc, sisa_modal_dc = select_items_divide_conquer(data_barang, modal, harga_min, harga_max, variasi, max_qty_per_item)

# Pilih barang dengan algoritma greedy 
selected_items_greedy, total_jumlah_greedy, total_harga_greedy, sisa_modal_greedy = select_items_greedy(data_barang, modal, harga_min, harga_max, variasi, max_qty_per_item)

# Output hasil
print("Hasil Algoritma Divide & Conquer:")
for item in selected_items_divide_conquer:
    print(f"{item['nama']}: {item['jumlah']} buah")
print(f"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
print(f"Total Jumlah: {total_jumlah_dc} buah")
print(f"Total Harga: Rp{total_harga_dc}")
print(f"Sisa Modal: Rp{sisa_modal_dc}")

print("\nHasil Algoritma Greedy:")
for item in selected_items_greedy:
    print(f"{item['nama']}: {item['jumlah']} buah")
print(f"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
print(f"Total Jumlah: {total_jumlah_greedy} buah")
print(f"Total Harga: Rp{total_harga_greedy}")
print(f"Sisa Modal: Rp{sisa_modal_greedy}")
