"use client";

import { useState } from "react";

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

        <div style={styles.badge
