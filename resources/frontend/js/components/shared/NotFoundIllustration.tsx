// resources/frontend/components/shared/Glitch404Illustration.tsx

import React from 'react';

// Palet Warna:
const green700 = '#0d542b'; // Warna dasar yang solid
const green600 = '#0d542b'; // Warna glitch yang lebih terang
const gray300 = '#d1d5db';   // Warna glitch sekunder / noise
const gray500 = '#6b7280';   // Warna untuk artefak/detail

export function NotFoundIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Definisi untuk filter (opsional, tapi bisa menambah efek) */}
      <defs>
        <filter id="displacementFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" result="turbulence" />
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Grup utama untuk menengahkan semua elemen */}
      <g fontFamily="monospace, sans-serif" fontWeight="bold" fontSize="160" textAnchor="middle">

        {/* --- Angka 4 Pertama --- */}
        <g>
          {/* Glitch Layer 1 (Abu-abu, sedikit bergeser ke kanan atas) */}
          <text x="80" y="140" fill={gray300} opacity="0.8" transform="translate(3, -3)">4</text>
          {/* Glitch Layer 2 (green Terang, bergeser ke kiri bawah) */}
          <text x="80" y="140" fill={green600} opacity="0.8" transform="translate(-3, 3)">4</text>
          {/* Base Layer (green Gelap, solid) */}
          <text x="80" y="140" fill={green700}>4</text>
        </g>

        {/* --- Angka 0 --- */}
        <g>
          {/* Lapisan 0 ini kita buat sedikit "terpotong" untuk efek glitch */}
          <g clipPath="url(#clip-path-1)">
            <text x="200" y="140" fill={gray300} opacity="0.8" transform="translate(4, -2)">0</text>
            <text x="200" y="140" fill={green600} opacity="0.8" transform="translate(-2, 4)">0</text>
            <text x="200" y="140" fill={green700}>0</text>
          </g>
          <g clipPath="url(#clip-path-2)">
            {/* Lapisan terpotong ini kita geser sedikit untuk efek 'robek' */}
            <g transform="translate(5, 0)">
              <text x="200" y="140" fill={gray300} opacity="0.8" transform="translate(4, -2)">0</text>
              <text x="200" y="140" fill={green600} opacity="0.8" transform="translate(-2, 4)">0</text>
              <text x="200" y="140" fill={green700}>0</text>
            </g>
          </g>
        </g>

        {/* --- Angka 4 Kedua --- */}
        <g>
          <text x="320" y="140" fill={gray300} opacity="0.8" transform="translate(2, 3)">4</text>
          <text x="320" y="140" fill={green600} opacity="0.8" transform="translate(-3, -2)">4</text>
          <text x="320" y="140" fill={green700}>4</text>
        </g>

      </g>
      
      {/* Artefak / Noise Glitch di sekitar angka */}
      <rect x="30" y="80" width="40" height="5" fill={gray500} filter="url(#displacementFilter)" />
      <rect x="340" y="150" width="30" height="3" fill={gray500} opacity="0.7" />
      <rect x="180" y="40" width="25" height="4" fill={green600} />

      {/* Definisi Clip Path untuk memotong angka 0 */}
      <defs>
        <clipPath id="clip-path-1">
          <rect x="0" y="0" width="400" height="95" />
        </clipPath>
        <clipPath id="clip-path-2">
          <rect x="0" y="95" width="400" height="105" />
        </clipPath>
      </defs>
    </svg>
  );
}