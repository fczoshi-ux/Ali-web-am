"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendVerification() {
    if (!email) {
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
    } catch {
      setMessage("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>ALI</div>

        <h1 style={styles.title}>Ali Store</h1>

        <p style={styles.subtitle}>
          papipapipum aku akan mengejutkanmu dengan kehebatananku
        </p>

        <div style={styles.badge}>ALIGHT MOTION PREMIUM</div>

        <div style={styles.section}>
          <h2 style={styles.heading}>Kirim Magic Link</h2>

          <input
            style={styles.input}
            type="email"
            placeholder="Masukkan email Alight Motion"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            style={styles.button}
            onClick={sendVerification}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Magic Link"}
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </div>

        <div style={styles.buttons}>
          <Link href="/register" style={styles.linkButton}>
            Daftar
          </Link>

          <Link href="/login" style={styles.linkButton}>
            Login
          </Link>

          <Link href="/buy" style={styles.linkButton}>
            Pembelian
          </Link>

          <Link href="/verify" style={styles.linkButton}>
            Verifikasi AM
          </Link>
        </div>

        <p style={styles.footer}>© 2026 Ali Store</p>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background:
      "radial-gradient(circle at top, #063b7a 0%, #050914 45%, #02040a
