"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendVerification() {
    if (!email.trim()) {
      setMessage("Masukkan email terlebih dahulu.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Magic Link berhasil dikirim ke email.");
      } else {
        setMessage(data?.error || "Gagal mengirim Magic Link.");
      }
    } catch (error) {
      setMessage("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home">
      <div className="home-card">
        <div className="logo">ALI</div>

        <h1>Ali Store</h1>

        <p className="subtitle">
          papipapipum aku akan mengejutkanmu dengan kehebatananku
        </p>

        <div className="badge">ALIGHT MOTION PREMIUM</div>

        <div className="section">
          <h2>Kirim Magic Link</h2>

          <input
            type="email"
            placeholder="Masukkan email Alight Motion"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={sendVerification} disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Magic Link"}
          </button>

          {message && <p className="message">{message}</p>}
        </div>

        <div className="menu">
          <Link href="/register">Daftar</Link>
          <Link href="/login">Login</Link>
          <Link href="/buy">Pembelian</Link>
          <Link href="/verify">Verifikasi AM</Link>
        </div>

        <p className="footer">© 2026 Ali Store</p>
      </div>
    </main>
  );
}
