
# ⚡ Weather Dashboard — The Ultimate Preact + Supabase + WeatherAPI Project

> 🚀 **Realtime Weather Monitor + Motivasi Harian + Jam Sekarang**  
> 💻 Dibangun dengan Preact, Supabase, WeatherAPI, Tailwind aura, dan gaya bocil Sabi  
> 🧠 Cocok buat developer yang butuh cuaca... dan motivasi hidup

## 🌩️ Fitur Ajaib

- ✅ **Tambah Kota** ke database Supabase
- ✅ **Lihat Daftar Kota** dengan data realtime
- ✅ **Ambil Cuaca Tiap Kota** via WeatherAPI
- ✅ **Edit / Hapus Kota** langsung dari UI
- ✅ **Quote Harian Random** biar gak stres
- ✅ **Jam Sekarang** karena hidup terus berjalan

## 🧠 Tech Stack Gila

| Tool        | Fungsi                                |
|-------------|----------------------------------------|
| Preact      | Frontend super ringan & cepat           |
| Supabase    | Database dan backend realtime           |
| WeatherAPI  | Data cuaca lengkap dan akurat           |
| SweetAlert2 | Alert manis tapi sadis (error/sukses)  |

## 🔧 Cara Install

```bash
git clone https://github.com/IzziVanSatoru/Weather-Dashboard-v1.1.git

cd Weather-Dashboard-v1.1
npm install
npm run dev
```

> ⚠️ Pastikan `.env` udah diisi:  

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co //input you sUPABASE URL
VITE_SUPABASE_KEY=your_anon_key
```

## 🗂️ Struktur Folder

```
.
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── CityForm.jsx
│   │   ├── CityList.jsx
│   │   ├── WeatherCard.jsx
│   │   ├── QuoteOfTheDay.jsx
│   │   └── TimeNow.jsx
├── .env
├── vite.config.js
└── README.md
```

## 🔥 Contoh  (Demo)

```jsx
<CityForm />         // Buat nambah kota
<CityList />         // Fetch semua kota dari Supabase
<WeatherCard />      // Render kondisi cuaca per kota
<QuoteOfTheDay />    // Random quote tiap hari
<TimeNow />          // Waktu lokal live
```

## 📦 Supabase Setup

1. Buat project di Supabase
2. Buat tabel `cities`

```sql
create table cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null,
  created_at timestamp default now()
);
```

3. Ambil anon key & project URL, masukin ke `.env`



## 🧪 Roadmap

- [ ] Filter kota berdasarkan negara
- [ ] Forecast 3 hari ke depan
- [ ] Notifikasi jika hujan mendekat
- [ ] Dark mode dengan waifu background


## 🧙‍♂️ Credits

- Izzi Van satoru 

## 🧨 License

MIT. Bebas fork, remix, ngedit, asal jangan pake key api supabse gw ya anjing soalnya privasi.
