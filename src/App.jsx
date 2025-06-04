import React, { useState } from "react";
import JacobiSolver from "./components/JacobiSolver";

const anggota = [
  { nama: "Muhammad Khayri Faadhil", nim: "2304130062" },
  { nama: "Hanif Khaylila Fajri", nim: "2304130067" },
  { nama: "Akbar Nugroho Wisnu Murti", nim: "2304130070" },
  { nama: "Alan Aditya", nim: "2304130087" },
];

function ArtikelJacobi() {
  return (
    <div className="w-100% h-screen mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Penjelasan Metode Jacobi</h2>
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="border-1 border-gray-500 p-4 rounded-lg bg-gray-50 mb-4">
          <p className="mb-2">
            <b>Metode Jacobi</b> adalah salah satu metode iteratif untuk
            menyelesaikan sistem persamaan linear. Metode ini bekerja dengan
            menebak solusi awal, lalu memperbaikinya secara bertahap hingga
            mendekati solusi sebenarnya.
          </p>
          <ul className="list-disc ml-6 mb-2">
            <li>
              Setiap variabel dihitung berdasarkan nilai variabel lain pada
              iterasi sebelumnya.
            </li>
            <li>
              Proses diulang hingga perubahan antar iterasi lebih kecil dari
              toleransi yang ditentukan.
            </li>
            <li>Metode ini cocok untuk matriks yang dominan diagonal.</li>
          </ul>
        </div>
        <div className="border-1 border-gray-500 p-4 rounded-lg bg-gray-50 mb-4">
          <p>
            <b>Langkah-langkah:</b>
            <ol className="list-decimal ml-6">
              <li>Tentukan tebakan awal untuk setiap variabel.</li>
              <li>Hitung nilai variabel baru menggunakan persamaan Jacobi.</li>
              <li>Ulangi hingga konvergen atau mencapai iterasi maksimum.</li>
            </ol>
          </p>
        </div>
      </div>
      <p className="mt-2 text-gray-600">
        Kelebihan Jacobi: sederhana, mudah diimplementasikan.
        <br />
        Kekurangan: konvergensi lambat, sensitif terhadap bentuk matriks.
      </p>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("kalkulator");
  const [showCard, setShowCard] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-200">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-center px-8 py-3 bg-white border-b z-10 sticky sm:top-4 sm:rounded-full border-none shadow-lg sm:w-fit">
        {/* Desktop Navbar */}
        <div className="hidden sm:flex w-fit items-center justify-center gap-60 rounded-full">
          {/* Nama Kelompok & Hover Card */}
          <div
            className="relative group"
            onMouseEnter={() => setShowCard(true)}
            onMouseLeave={() => setShowCard(false)}
          >
            <span className="font-bold text-lg text-gray-700 cursor-pointer tracking-wide">
              Metode Jacobi
            </span>
            {/* Hover Card */}
            <div
              className={`absolute left-0 mt-2 w-85 bg-white rounded-lg shadow-lg border border-gray-200 p-4 transition-all duration-200 ${
                showCard ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="font-semibold text-gray-700 mb-2">
                Anggota Kelompok:
              </div>
              <ul>
                {anggota.map((m) => (
                  <li key={m.nim} className="mb-1 flex justify-between">
                    <span className="font-medium">{m.nama}</span>
                    <span className="text-gray-500 ml-2">{m.nim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Tab Navigation */}
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${
                tab === "kalkulator"
                  ? "bg-gray-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setTab("kalkulator")}
            >
              Kalkulator Jacobi
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold transition ${
                tab === "artikel"
                  ? "bg-gray-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setTab("artikel")}
            >
              Artikel
            </button>
          </div>
        </div>
        {/* Mobile Navbar */}
        <div className="flex sm:hidden w-full items-center justify-between">
          <span className="font-bold text-lg text-gray-700 tracking-wide">
            Metode Jacobi
          </span>
          <button
            className="p-2 rounded hover:bg-gray-200"
            onClick={() => setShowMobileMenu((v) => !v)}
            aria-label="Buka menu"
          >
            {/* Hamburger Icon */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <rect y="5" width="24" height="2" rx="1" fill="#374151" />
              <rect y="11" width="24" height="2" rx="1" fill="#374151" />
              <rect y="17" width="24" height="2" rx="1" fill="#374151" />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {showMobileMenu && (
            <div className="absolute top-16 left-2 right-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-20 animate-fade-in">
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-2">
                  Anggota Kelompok:
                </div>
                <ul>
                  {anggota.map((m) => (
                    <li key={m.nim} className="mb-1">
                      <span className="font-medium">{m.nama}</span>
                      <span className="text-gray-500 ml-2">{m.nim}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    tab === "kalkulator"
                      ? "bg-gray-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setTab("kalkulator");
                    setShowMobileMenu(false);
                  }}
                >
                  Kalkulator Jacobi
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    tab === "artikel"
                      ? "bg-gray-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setTab("artikel");
                    setShowMobileMenu(false);
                  }}
                >
                  Artikel
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Konten */}
      <div className="max-w-5xl mx-auto sm:mt-8 w-screen">
        {tab === "kalkulator" && (
          <div className="bg-gray-50 sm:rounded-3xl shadow-lg p-4 mb-16 w-100%">
            <h1 className="pt-6 text-2xl font-bold mb-4 flex justify-center text-gray-700">
              Kalkulator Metode Jacobi
            </h1>
            <p className="mb-4 text-center text-gray-700">
              Solusi Persamaan Linear dengan Metode Jacobi
            </p>
            <JacobiSolver />
          </div>
        )}
        {tab === "artikel" && <ArtikelJacobi />}
      </div>
    </div>
  );
}
