/**
 * Style reminder — "Underground Archive": critical regionalism meets archaeological field notes.
 * Keep volcanic stone, warm paper, survey lines, asymmetric composition, and evidence-first language.
 */
import React, { useEffect, useMemo, useState } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  ExternalLink,
  MapPin,
  Menu,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";

type Lang = "id" | "en";
type Consent = "essential" | "analytics" | null;
function readStorage(key: string) {try{return typeof window === "undefined" ? null : localStorage.getItem(key)}catch{return null}}
function saveStorage(key:string,value:string){try{localStorage.setItem(key,value)}catch{}}
function localeHref(lang:Lang,path:string){const clean=path.replace(/^\/en(?=\/|$)/, "") || "/";return `${lang==="en"?"/en":""}${clean.endsWith("/")?clean:clean+"/"}`}
function LanguageSwitch({lang,path}:{lang:Lang;path:string}){return <div className="language-control"><a className={lang==="id"?"active":""} href={localeHref("id",path)} lang="id">ID</a><span>/</span><a className={lang==="en"?"active":""} href={localeHref("en",path)} lang="en">EN</a></div>}


const assets = {
  logo: "/03-sambisari-arch-logo.png",
  archive: "/05-sambisari-strata-archive.webp",
  stone: "/06-sambisari-stone-study.webp",
  pattern: "/07-sambisari-field-pattern.webp",
  hero: "/01-sambisari-main-temple-crisco1492.jpg",
  complex: "/02-sambisari-complex-teshteh.jpg",
};

const mapsUrl = "https://maps.app.goo.gl/YHZQSSJ9LiyG6KUq8";
const mapEmbed = "https://maps.google.com/maps?q=-7.7625591,110.4469551&z=16&output=embed";

const copy = {
  id: {
    siteName: "Sambisari Field Guide",
    eyebrow: "Kalasan · Kabupaten Sleman · DI Yogyakarta",
    nav: ["Latar", "Baca situs", "Kunjungan", "Rute", "Peta", "Tanya jawab"],
    menu: "Buka menu",
    close: "Tutup menu",
    independent: "Panduan independen · nonkomersial",
    heroTitle: "Candi Sambisari\ndi Kalasan.",
    heroText: "Panduan independen Candi Sambisari di Purwomartani, Kalasan, Sleman: konteks pemugaran, lokasi, serta informasi kunjungan bersumber. Situs ini berupa kompleks terbuka yang lebih rendah dari tanah sekeliling, bukan jaringan terowongan.",
    plan: "Rencanakan kunjungan",
    map: "Buka lokasi",
    photoCredit: "Foto: Crisco 1492 / Wikimedia Commons · CC BY-SA 3.0",
    facts: [["Penanggalan", "belum pasti"], ["Ditemukan kembali", "1966"], ["Purnapugar", "1987"], ["Susunan", "1 induk · 3 perwara"]],
    entry: "Masuk ke lapisan pertama",
    storyKicker: "01 · Konteks", storyTitle: "Situs terbuka di bawah permukaan tanah sekeliling.",
    storyLead: "Candi Sambisari kini berada sekitar 6,5 meter lebih rendah dari permukaan tanah sekitarnya. Ini adalah kompleks terbuka yang digali dan dipugar, bukan terowongan bawah tanah atau janji akses ke ruang tertutup.",
    storyBody: "Jogja Cagar mencatat penemuan oleh seorang petani pada 1966. Pekerjaan penyusunan dan pemugaran berlangsung bertahap hingga purnapugar pada 1987. Kompleksnya terdiri dari satu candi induk dan tiga candi perwara.",
    evidence: "Penanggalan belum pasti", evidenceText: "Registri budaya nasional menyatakan waktu pembangunan belum diketahui pasti. Jogja Cagar merangkum penafsiran ilmiah yang berbeda, dari abad ke-8 hingga ke-9–10. Jangan menganggap satu tahun atau atribusi raja sebagai kepastian. Penyebab tertimbunnya situs juga tidak dipastikan di panduan ini.",
    readingKicker: "02 · Baca situs", readingTitle: "Amati urutan ruang, bukan hanya fasad.",
    readingIntro: "Gunakan susunan kompleks untuk orientasi, sambil mengikuti jalur yang diizinkan dan pembatas pengunjung.",
    readCards: [["A", "Candi induk", "Kenali bangunan utama sebagai bagian dari susunan kompleks. Ikuti batas pengunjung dan instruksi petugas; jangan menganggap semua ruang boleh dimasuki."], ["B", "Lanskap terbuka", "Bandingkan lantai kompleks dengan tanah sekeliling untuk memahami posisinya yang lebih rendah. Amati dari jalur pengunjung yang diizinkan."], ["C", "Tiga perwara", "Jogja Cagar mencatat tiga candi perwara bersama satu candi induk. Gunakan susunan ini sebagai orientasi, tanpa menyentuh atau memanjat struktur yang dibatasi."]],
    visitKicker: "03 · Kunjungan", visitTitle: "Datang dengan ekspektasi yang tepat.",
    visitIntro: "Nilai situs ini hadir lewat skala, permukaan batu, dan konteks pemugarannya. Kunjungan singkat akan lebih bermakna bila Anda memberi waktu untuk membaca cekungan dan orientasi kompleks.",
    visitCards: [["Jam Maps", "Sen–Jum 08.00–16.00", "Sab–Min 07.00–17.00. Catatan pihak ketiga diperiksa 19 Oktober 2026, bukan jaminan jam hari libur, masuk terakhir atau akses setiap bagian situs."], ["Biaya masuk", "Belum terverifikasi", "Tanyakan tarif dan kategori yang berlaku kepada petugas/loket. Jangan mengandalkan komentar pengunjung atau tarif lama."], ["Waktu kunjungan", "Dalam jam yang dikonfirmasi", "Pilih waktu sesuai cuaca, pengumuman dan arahan petugas. Siapkan perlindungan panas atau hujan; jangan menganggap akses malam tersedia."], ["Durasi", "Rencana 45–90 menit", "Ini saran perencanaan, bukan durasi wajib. Sesuaikan dengan area yang dibuka, cuaca, mobilitas dan waktu tutup yang sudah dikonfirmasi."]],
    rating: "4,6 / 5", ratingNote: "Catatan Google Maps diperiksa 19 Oktober 2026: 8.186 ulasan, 4,6/5. Ini penilaian pihak ketiga, bukan peringkat dari panduan ini.",
    routeKicker: "04 · Rute", routeTitle: "Datang melalui kota, lalu lanjutkan secara lokal.",
    routeIntro: "Candi Sambisari berada di Purwomartani, Kalasan, Kabupaten Sleman, DI Yogyakarta. Pilihan sambungan terakhir bergantung pada layanan yang benar-benar tersedia, cuaca dan kebutuhan mobilitas Anda.",
    routes: [
      ["Dari bandara", "Bandara Internasional Yogyakarta (YIA) berada di sisi barat wilayah Yogyakarta. Lanjutkan dahulu ke pusat kota atau koridor timur Yogyakarta dengan layanan bandara yang tersedia pada hari perjalanan, kemudian sambung dengan taksi atau transportasi berbasis aplikasi."],
      ["Bus / angkutan umum", "Gunakan layanan bus kota atau antarkawasan untuk mendekati koridor Kalasan bila jadwal sesuai. Rute, halte, dan pola layanan dapat berubah, sehingga perlu diperiksa pada hari keberangkatan; siapkan sambungan jalan kaki atau kendaraan lokal."],
      ["Taksi & aplikasi", "Untuk tujuan langsung, masukkan “Candi Sambisari” sebagai tujuan dan pilih titik turun yang aman. Periksa estimasi dan titik jemput di aplikasi sebelum berangkat."],
      ["Mobil / sepeda motor", "Ikuti petunjuk menuju Jl. Candi Sambisari. Gunakan area parkir resmi dan jangan berhenti di akses jalan atau gerbang. Perhatikan hujan, permukaan licin, serta penyeberang jalan."],
    ],
    facilityKicker: "05 · Kebutuhan", facilityTitle: "Hal praktis yang menentukan kenyamanan.",
    facilities: [["WC", "Tanyakan lokasi, jam dan kondisi toilet kepada petugas sebelum mengandalkannya. Ketersediaannya belum diverifikasi di panduan ini."], ["Parkir", "Periksa lokasi dan tarif parkir yang berlaku pada hari kunjungan. Ikuti petunjuk petugas dan jangan menutup akses jalan."], ["Makan & minum", "Jika membutuhkan makanan atau perlengkapan harian, periksa lokasi dan jam operator di sepanjang rute. Tidak ada usaha tertentu yang direkomendasikan."], ["Menginap & kebutuhan", "Jika memerlukan penginapan, ATM, bahan bakar atau pengisian kendaraan, periksa operator, lokasi dan jamnya terlebih dahulu; tidak ada fasilitas tertentu yang dijamin."]],
    nearbyKicker: "06 · Sekitar", nearbyTitle: "Baca satu lanskap budaya, bukan satu titik saja.",
    nearby: [
      ["Kalasan", "Kawasan candi abad klasik di koridor timur Yogyakarta."],
      ["Prambanan", "Kompleks candi besar yang dapat dipahami sebagai kunjungan terpisah dengan waktu lebih panjang."],
      ["Ratu Boko", "Situs bukit dengan konteks arkeologi dan pandangan lanskap yang berbeda."],
    ],
    mapKicker: "07 · Lokasi", mapTitle: "Temukan posisi di Purwomartani.",
    mapText: "Alamat yang dapat disampaikan kepada pengemudi: Jl. Candi Sambisari, Sambisari, Purwomartani, Kec. Kalasan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55571.",
    galleryKicker: "08 · Dokumentasi", galleryTitle: "Dua cara melihat cekungan Sambisari.",
    galleryText: "Foto ini dipilih sebagai dokumentasi situs yang nyata. Gambar grafis di halaman ini hanya berfungsi sebagai bahasa visual panduan, bukan rekonstruksi atau foto pengganti.",
    galleryCredit: "Foto: TeshTesh / Wikimedia Commons · CC BY-SA 3.0",
    faqKicker: "09 · Tanya jawab", faqTitle: "Pertanyaan untuk kunjungan yang lebih tenang.",
    faq: [["Apakah Candi Sambisari berada di terowongan bawah tanah?", "Tidak. Ini kompleks terbuka sekitar 6,5 meter lebih rendah dari tanah sekitarnya. Ikuti jalur dan pembatas pengunjung; posisi ini tidak berarti ada terowongan wisata atau akses bebas ke semua ruang."], ["Kapan ditemukan dan selesai dipugar?", "Jogja Cagar mencatat penemuan oleh petani pada 1966 dan purnapugar pada 1987. Tahun pembangunan awal belum pasti; sumber budaya memuat perbedaan tafsir sekitar abad ke-8 hingga ke-9–10."], ["Berapa biaya masuknya?", "Tarif masuk saat ini belum terverifikasi. Konfirmasikan kategori dan biaya yang berlaku kepada petugas atau loket sebelum kunjungan; jangan menganggap tarif lama atau komentar pengunjung sebagai harga resmi."], ["Kapan jam buka Candi Sambisari?", "Maps saat diperiksa 19 Oktober 2026 mencantumkan Senin–Jumat 08.00–16.00 dan Sabtu–Minggu 07.00–17.00 (WIB). Ini catatan pihak ketiga bertanggal, bukan jaminan jam hari libur, masuk terakhir atau akses ke seluruh kompleks. Konfirmasikan sebelum berangkat."], ["Apakah parkir, toilet dan akses tanpa tangga tersedia?", "Ketersediaan, biaya dan kondisi fasilitas belum diverifikasi. Tanyakan kepada petugas atau operator terkait sebelum mengandalkannya dan ikuti batas akses yang berlaku."], ["Kapan waktu yang nyaman untuk berkunjung?", "Pilih waktu dalam jam buka yang telah dikonfirmasi dan sesuaikan dengan cuaca serta kebutuhan mobilitas. Sisakan waktu sebelum tutup; panduan ini tidak menjamin akses malam atau bagian situs tertentu."]],
    sourcesKicker: "Sumber publik", sourcesTitle: "Baca lebih jauh, lalu periksa lagi sebelum berangkat.",
    sources: [["Jogja Cagar", "Penemuan 1966, purnapugar 1987, susunan kompleks dan penafsiran penanggalan."], ["Registri budaya nasional", "Waktu pembangunan awal belum diketahui pasti."], ["Visiting Jogja · 2020", "Konteks wisata provinsi; bukan konfirmasi tarif atau operasi hari ini."], ["Google Maps · 19 Oktober 2026", "Lokasi, catatan jam dan penilaian pihak ketiga bertanggal."]],
    footerLead: "Panduan lapangan independen untuk membaca Candi Sambisari secara lebih utuh.",
    nonProfit: "Situs ini adalah proyek panduan pengunjung independen dan non-profit. Situs ini tidak berafiliasi dengan instansi pemerintah, pengelola resmi, atau operator komersial mana pun.",
    verification: "Sumber publik diperiksa 19 Oktober 2026: Jogja Cagar, registri budaya nasional, Visiting Jogja dan catatan Maps. Informasi operasional perlu dikonfirmasi kepada petugas. Tidak ada rekomendasi komersial.",
    rights: "Hak cipta foto tetap pada fotografer masing-masing; atribusi dan lisensi dicantumkan di dekat gambar.",
    legal: ["Kebijakan Privasi", "Ketentuan Layanan", "Pengaturan Kuki"],
    copyright: "© 2026 Sambisari Field Guide. Hak cipta dilindungi.",
    cookieTitle: "Privasi, terlebih dahulu.",
    cookieText: "Kami hanya mengaktifkan analitik Google bila Anda menyetujuinya. Anda selalu dapat mengubah pilihan di halaman Pengaturan Kuki.",
    essential: "Hanya esensial", allow: "Izinkan analitik", settings: "Atur pilihan", save: "Simpan preferensi", reject: "Tolak semua opsional",
    legalContent: {
      privacy: {
        title: "Kebijakan Privasi", intro: "Terakhir diperbarui: 19 Oktober 2026", sections: [["Informasi yang kami kumpulkan", "Panduan ini tidak menyediakan akun, pemesanan, formulir kontak atau alamat email untuk mengirim informasi pribadi. Layanan hosting dapat memproses data teknis seperti alamat IP dan jenis peramban; preferensi persetujuan disimpan di perangkat, dan analitik hanya dimuat setelah persetujuan."], ["Cara kami menggunakan informasi", "Data digunakan untuk meningkatkan isi dan pengalaman situs, memahami pola penggunaan secara agregat bila analitik disetujui, serta memenuhi kewajiban hukum yang berlaku."], ["Layanan pihak ketiga", "Situs ini dapat memuat Google Maps untuk peta dan data lokasi serta Google Analytics—hanya setelah persetujuan—untuk analitik. Masing-masing layanan mempunyai kebijakan privasinya sendiri."], ["Hak Anda", "Berdasarkan GDPR dan aturan terkait, Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi, menyampaikan keberatan, serta mengajukan keluhan kepada otoritas yang berwenang."]]
      },
      terms: {
        title: "Ketentuan Layanan", intro: "Terakhir diperbarui: 19 Oktober 2026", sections: [["Penerimaan", "Dengan mengakses atau menggunakan Sambisari Field Guide, Anda menyetujui ketentuan ini."], ["Penggunaan konten", "Seluruh isi hanya untuk referensi. Kami adalah situs informasi wisata independen dan tidak berafiliasi dengan objek wisata, instansi pemerintah, atau operator komersial mana pun."], ["Ketepatan informasi", "Kami berupaya menyajikan informasi yang akurat dan relevan, tetapi tidak menjamin kelengkapan atau ketepatannya. Rencana kunjungan, kondisi, dan layanan dapat berubah; verifikasi informasi penting melalui kanal resmi sebelum berangkat."], ["Hak kekayaan intelektual", "Desain dan konten orisinal situs dilindungi. Foto digunakan dengan kredit dan lisensi yang tercantum. Data Google Maps tunduk pada ketentuan Google."], ["Batas tanggung jawab", "Situs ini disediakan sebagaimana adanya tanpa jaminan. Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan informasi ini, termasuk keputusan perjalanan."]]
      },
      cookies: {
        title: "Pengaturan Kuki", intro: "Terakhir diperbarui: 19 Oktober 2026", sections: [["Tentang kuki", "Kami menggunakan kuki dan penyimpanan lokal untuk pengalaman penelusuran yang lebih baik. Anda dapat mengelola preferensi di bawah."], ["Kuki esensial", "Kuki ini diperlukan agar situs berfungsi dan menyimpan pilihan dasar seperti persetujuan analitik. Kuki ini selalu aktif."], ["Kuki analitik", "Jika diizinkan, Google Analytics dapat membantu kami memahami penggunaan situs secara agregat dan anonim. Kuki ini tidak aktif secara bawaan."], ["Kuki preferensi", "Pilihan bahasa dan pengaturan tampilan dapat disimpan di perangkat Anda."], ["Kuki pemasaran", "Kami tidak menjalankan kuki pemasaran atau iklan yang dipersonalisasi pada situs ini."]]
      }
    }
  },
  en: {
    siteName: "Sambisari Field Guide",
    eyebrow: "Kalasan · Sleman Regency · Special Region of Yogyakarta",
    nav: ["Context", "Read the site", "Visit", "Route", "Map", "FAQ"],
    menu: "Open menu", close: "Close menu", independent: "Independent · non-commercial guide",
    heroTitle: "Sambisari Temple\nin Kalasan.",
    heroText: "An independent guide to Candi Sambisari in Purwomartani, Kalasan, Sleman: restoration context, location and sourced visitor information. This is an open-air complex below surrounding ground level, not a tunnel network.",
    plan: "Plan a visit", map: "Open location", photoCredit: "Photo: Crisco 1492 / Wikimedia Commons · CC BY-SA 3.0",
    facts: [["Construction date", "uncertain"], ["Rediscovered", "1966"], ["Restoration completed", "1987"], ["Layout", "1 main · 3 subsidiary temples"]],
    entry: "Enter the first layer", storyKicker: "01 · Context", storyTitle: "An open-air site below the surrounding ground.",
    storyLead: "Sambisari is now roughly 6.5 metres lower than the surrounding ground. It is an excavated and restored open-air complex, not an underground tunnel attraction or a promise of entry to enclosed rooms.",
    storyBody: "Jogja Cagar records discovery by a farmer in 1966. Reconstruction and restoration proceeded in stages until completion in 1987. The complex comprises one main temple and three subsidiary temples (perwara).",
    evidence: "Construction date remains uncertain", evidenceText: "The national cultural registry says the original construction date is not known with certainty. Jogja Cagar summarizes differing scholarly interpretations, from the 8th to the 9th–10th centuries. A specific year or royal attribution should not be treated as settled. This guide does not establish a definite cause for the site’s burial.",
    readingKicker: "02 · Read the site", readingTitle: "Follow the spatial sequence, not only the façade.",
    readingIntro: "Use the complex layout for orientation while following permitted routes and visitor boundaries.",
    readCards: [["A", "The main temple", "Read the main building as one part of the complex. Follow visitor boundaries and staff instructions; do not assume every room is open."], ["B", "The open-air setting", "Compare the complex floor with surrounding ground to understand its lower position. Observe from permitted visitor routes."], ["C", "Three subsidiary temples", "Jogja Cagar records three perwara beside one main temple. Use the layout for orientation without touching or climbing restricted structures."]],
    visitKicker: "03 · Visit", visitTitle: "Arrive with the right expectations.",
    visitIntro: "The site’s value unfolds through scale, stone surface, and its restoration context. A short visit becomes more rewarding when there is time to read the basin and the complex’s orientation.",
    visitCards: [["Maps hours", "Mon–Fri 08:00–16:00", "Sat–Sun 07:00–17:00. Third-party snapshot checked 19 October 2026, not a guarantee of holiday hours, last admission or access to every part of the site."], ["Entrance fees", "Not currently verified", "Ask staff or the ticket counter about applicable prices and visitor categories. Do not rely on old tariffs or visitor comments."], ["Visit timing", "Within confirmed hours", "Choose according to weather, notices and staff guidance. Prepare for sun or rain; do not assume night-time access."], ["Duration", "Plan 45–90 minutes", "A planning suggestion, not a required duration. Adapt to open areas, weather, mobility needs and the confirmed closing time."]],
    rating: "4.6 / 5", ratingNote: "Google Maps snapshot checked 19 October 2026: 8,186 reviews, 4.6/5. This is a third-party rating, not a rating awarded by this guide.",
    routeKicker: "04 · Route", routeTitle: "Reach the city first, then connect locally.",
    routeIntro: "Candi Sambisari is in Purwomartani, Kalasan, Sleman Regency, DI Yogyakarta. The final connection depends on services actually available, the weather and your mobility needs.",
    routes: [["From the airport", "Yogyakarta International Airport (YIA) is on the western side of the Yogyakarta region. First reach the city centre or eastern Yogyakarta through airport services available on the day, then connect by taxi or app-based transport."], ["Bus / public transport", "Use city or inter-area services toward the Kalasan corridor when schedules fit. Routes, stops, and service patterns can change, so check on the day and allow for a walk or local vehicle connection."], ["Taxi & ride-hailing", "For a direct trip, enter “Candi Sambisari” as the destination and choose a safe drop-off point. Review the estimate and pickup pin in the app before leaving."], ["Car / motorbike", "Follow navigation toward Jl. Candi Sambisari. Use official parking areas; do not stop across access roads or at the gate. Watch for rain, slippery surfaces, and pedestrians."]],
    facilityKicker: "05 · Essentials", facilityTitle: "Small practical details matter.",
    facilities: [["Toilets", "Ask staff about toilet location, hours and condition before relying on them. Availability is not verified by this guide."], ["Parking", "Check the parking location and current charges on your travel date. Follow staff directions and keep road access clear."], ["Food & drink", "If you need food or everyday supplies, check operator locations and hours along your route. No specific business is recommended."], ["Stays & essentials", "If you need accommodation, an ATM, fuel or vehicle charging, check the operator, location and hours first; no particular facility is guaranteed."]],
    nearbyKicker: "06 · Nearby", nearbyTitle: "Read one cultural landscape, not one pin.",
    nearby: [["Kalasan", "A classical-temple landscape on Yogyakarta’s eastern corridor."], ["Prambanan", "A major temple complex best approached as a separate visit with more time."], ["Ratu Boko", "A hilltop site offering a different archaeological setting and wider landscape view."]],
    mapKicker: "07 · Map", mapTitle: "Locate the site in Purwomartani.",
    mapText: "A useful address for a driver: Jl. Candi Sambisari, Sambisari, Purwomartani, Kec. Kalasan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55571.",
    galleryKicker: "08 · Documentation", galleryTitle: "Two ways to see the Sambisari basin.",
    galleryText: "These photographs are selected as records of the actual site. The graphic imagery on this page is only a visual language for the guide, never a reconstruction or substitute for field photography.",
    galleryCredit: "Photo: TeshTesh / Wikimedia Commons · CC BY-SA 3.0",
    faqKicker: "09 · FAQ", faqTitle: "Questions for a quieter visit.",
    faq: [["Is Sambisari an underground tunnel attraction?", "No. It is an open-air complex roughly 6.5 metres below surrounding ground level. Follow visitor routes and barriers; its position does not imply tourist tunnels or unrestricted access to every room."], ["When was it discovered and restored?", "Jogja Cagar records discovery by a farmer in 1966 and completed restoration in 1987. Original construction dating remains uncertain; cultural sources discuss differing interpretations around the 8th to 9th–10th centuries."], ["How much is entry?", "Current admission prices are unverified. Ask staff or the ticket counter about applicable prices and categories before visiting; old tariffs and visitor comments should not be treated as official current prices."], ["What are Sambisari Temple’s opening hours?", "Maps checked on 19 October 2026 lists Monday–Friday 08:00–16:00 and Saturday–Sunday 07:00–17:00 (WIB, UTC+7). This is a dated third-party listing, not a guarantee of holiday hours, last entry or access to the entire complex. Confirm before travelling."], ["Are parking, toilets and step-free access available?", "Facility availability, charges and conditions are unverified. Ask staff or the relevant operator before relying on them and follow the access restrictions in force."], ["When is a comfortable time to visit?", "Choose a time within confirmed opening hours and adapt to weather and mobility needs. Allow time before closing; this guide does not guarantee night access or access to any particular part of the site."]],
    sourcesKicker: "Public sources", sourcesTitle: "Read further, then check again before leaving.",
    sources: [["Jogja Cagar", "Discovery in 1966, restoration completed in 1987, site layout and dating interpretations."], ["National cultural registry", "Original construction dating remains uncertain."], ["Visiting Jogja · 2020", "Provincial visitor context, not confirmation of current fees or operations."], ["Google Maps · 19 October 2026", "Location, dated hours and third-party rating snapshot."]],
    footerLead: "An independent field guide for reading Sambisari Temple with more context.",
    nonProfit: "This site is an independent, non-profit visitor-information project. It is not affiliated with a government agency, official operator, or commercial business.",
    verification: "Public sources checked 19 October 2026: Jogja Cagar, the national cultural registry, Visiting Jogja and Maps listings. Confirm operational details with staff. No commercial recommendations.",
    rights: "Photographic copyright remains with each photographer; attribution and licence appear near each image.",
    legal: ["Privacy Policy", "Terms of Service", "Cookie Settings"], copyright: "© 2026 Sambisari Field Guide. All rights reserved.",
    cookieTitle: "Privacy comes first.", cookieText: "We load Google Analytics only after your permission. You can change this choice at any time in Cookie Settings.", essential: "Essential only", allow: "Allow analytics", settings: "Set preferences", save: "Save preferences", reject: "Reject optional",
    legalContent: {
      privacy: { title: "Privacy Policy", intro: "Last updated: 19 October 2026", sections: [["Information we collect", "This guide provides no accounts, bookings, contact form or email address for submitting personal information. Hosting services may process technical data such as IP address and browser type; consent preferences are stored on your device, and analytics loads only after consent."], ["How we use information", "Information is used to improve content and user experience, understand aggregate usage patterns when analytics is permitted, and meet applicable legal obligations."], ["Third-party services", "This site may embed Google Maps for maps and location data, and Google Analytics—only after consent—for analytics. Each service has its own privacy policy."], ["Your rights", "Under the GDPR and related rules, you may request access, correction, or deletion of personal data, object to processing, and lodge a complaint with a competent authority."]] },
      terms: { title: "Terms of Service", intro: "Last updated: 19 October 2026", sections: [["Acceptance", "By accessing or using Sambisari Field Guide, you agree to these terms."], ["Content use", "All content is for reference only. We are an independent tourism-information site and are not affiliated with any attraction, government body, or commercial operator."], ["Information accuracy", "We work to provide accurate, relevant information but cannot guarantee completeness or accuracy. Visit plans, conditions, and services can change; confirm important information through official channels before you travel."], ["Intellectual property", "The original design and content of this site are protected. Images are used with the stated credit and licence. Google Maps data is subject to Google’s terms."], ["Limitation of liability", "This site is provided as is, without warranties. We are not liable for loss arising from use of this information, including travel decisions."]] },
      cookies: { title: "Cookie Settings", intro: "Last updated: 19 October 2026", sections: [["About cookies", "We use cookies and local storage for a better browsing experience. You can manage preferences below."], ["Essential cookies", "These are necessary for the website to operate and for basic choices such as analytics consent. They are always active."], ["Analytics cookies", "If allowed, Google Analytics helps us understand aggregate, anonymous site usage. It is off by default."], ["Preference cookies", "Your language choice and display settings can be stored on your device."], ["Marketing cookies", "We do not run marketing cookies or personalised advertising on this website."]] }
    }
  }
} as const;

const sourceLinks = [
 "https://jogjacagar.jogjaprov.go.id/detail/430/candi-sambisari",
 "https://budaya.data.kemdikbud.go.id/cagarbudaya/objek/KB000070",
 "https://visitingjogja.jogjaprov.go.id/en/17327/the-underground-temple-of-yogyakarta-sambisari-temple/",
 mapsUrl,
];

const photoLinks = [
  "https://commons.wikimedia.org/wiki/File:Candi_Sambisari_main_temple_2013-11-28_01.jpg",
  "https://commons.wikimedia.org/wiki/File:Candi_Sambisari,_Hindu_Temple_of_Java_Indonesia_2013_b.jpg",
];

function setAnalyticsConsent(value: Consent) {
  if (value) saveStorage("sambisari-consent", value);
  const scriptId = "sambisari-ga4";
  if (value === "analytics" && !document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP";
    document.head.appendChild(script);
    const inline = document.createElement("script");
    inline.id = `${scriptId}-config`;
    inline.text = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-HXM22WWPKP');";
    document.head.appendChild(inline);
  }
}

function Footer({ t, lang }: { t: (typeof copy)[Lang]; lang:Lang }) {
  return <footer className="site-footer" style={{ backgroundImage: `url(${assets.pattern})` }}>
    <div className="footer-grid">
      <div className="footer-brand"><img src={assets.logo} alt="" /><p>{t.footerLead}</p></div>
      <div className="footer-legal"><p>{t.nonProfit}</p><p>{t.verification}</p><p>{t.rights} <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a></p></div>
      <nav className="footer-links" aria-label={lang === "id" ? "Dokumen informasi" : "Legal navigation"}><a href={localeHref(lang,"/privacy-policy/")}>{t.legal[0]}</a><a href={localeHref(lang,"/terms-of-service/")}>{t.legal[1]}</a><a href={localeHref(lang,"/cookie-settings/")}>{t.legal[2]}</a></nav>
    </div>
    <div className="footer-bottom"><span>{t.copyright}</span><span>Kalasan · Sleman · Yogyakarta</span></div>
  </footer>;
}

function LegalPage({ page, lang, path }: { page: "privacy" | "terms" | "cookies"; lang: Lang; path: string }) {
  const t = copy[lang];
  const [analytics, setAnalytics] = useState(false);
  useEffect(()=>{setAnalytics(readStorage("sambisari-consent")==="analytics")},[]);
  const legal = t.legalContent[page];
  const save = () => setAnalyticsConsent(analytics ? "analytics" : "essential");
  return <div className="legal-page"><header className="legal-header"><a href={localeHref(lang,"/")} className="brand-lockup"><img src={assets.logo} alt="" /><span>Sambisari<br /><b>FIELD GUIDE</b></span></a><LanguageSwitch lang={lang} path={path} /></header>
    <main className="legal-main"><p className="section-kicker">SAMBISARI / FIELD NOTES</p><h1>{legal.title}</h1><p className="legal-intro">{legal.intro}</p><div className="legal-rule" />
      {legal.sections.map(([heading, body]) => <section className="legal-section" key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      {page === "cookies" && <section className="cookie-panel"><div><span className="pill"><ShieldCheck size={14} /> {t.essential}</span><p>{lang === "id" ? "Selalu aktif—diperlukan untuk pilihan persetujuan dan fungsi dasar." : "Always active—required for consent choices and basic operation."}</p></div><label className="toggle-row"><span><b>Google Analytics</b><small>{lang === "id" ? "Analitik agregat, hanya dengan persetujuan." : "Aggregate analytics, only with consent."}</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /><i /></label><div className="cookie-actions"><button className="btn btn-outline" onClick={() => { setAnalytics(false); setAnalyticsConsent("essential"); }}>{t.reject}</button><button className="btn btn-dark" onClick={save}>{t.save}</button></div></section>}
      <a href={localeHref(lang,"/")} className="back-link">← {lang === "id" ? "Kembali ke panduan" : "Back to the guide"}</a>
    </main><Footer t={t} lang={lang} /></div>;
}

export default function Home({initialLang="id",initialPath="/"}:{initialLang?:Lang;initialPath?:string}={}) {
  const location=initialPath;
  const path=initialPath;
  const lang=initialLang;
  const [menuOpen, setMenuOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);
  useEffect(()=>{setConsent(readStorage("sambisari-consent") as Consent)},[]);
  const t = copy[lang];

  useEffect(() => { if (consent === "analytics") setAnalyticsConsent("analytics"); }, [consent]);

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Candi Sambisari",
    alternateName: "Sambisari Temple",
    description: lang === "id"
      ? "Kompleks candi terbuka di Kalasan, Sleman, DI Yogyakarta, sekitar 6,5 meter lebih rendah dari tanah sekeliling."
      : "An open-air temple complex in Kalasan, Sleman, DI Yogyakarta, roughly 6.5 metres below surrounding ground level.",
    url: `https://sambisari.com${localeHref(lang,"/")}`,
    hasMap: mapsUrl,
    address: { "@type": "PostalAddress", streetAddress: "Jl. Candi Sambisari, Sambisari, Purwomartani, Kec. Kalasan", addressLocality: "Sleman", addressRegion: "Daerah Istimewa Yogyakarta", postalCode: "55571", addressCountry: "ID" },
    geo: { "@type": "GeoCoordinates", latitude: -7.7625591, longitude: 110.4469551 },
  }), [lang]);
  const faqLd = useMemo(() => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }), [t.faq]);

  const page = /\/privacy-policy\/?$/.test(location) ? "privacy" : /\/terms-of-service\/?$/.test(location) ? "terms" : /\/cookie-settings\/?$/.test(location) ? "cookies" : null;
  if (page) return <LegalPage page={page} lang={lang} path={path} />;

  const navTargets = ["#context", "#reading", "#visit", "#route", "#map", "#faq"];
  const accept = (value: Consent) => { setConsent(value); setAnalyticsConsent(value); };
  return <div className="site-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    <header className="site-header">
      <a href="#top" className="brand-lockup" aria-label="Sambisari Field Guide"><img src={assets.logo} alt="" /><span>SAMBISARI<br /><b>FIELD GUIDE</b></span></a>
      <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label={lang === "id" ? "Navigasi utama" : "Primary navigation"}>{t.nav.map((item, index) => <a key={item} href={navTargets[index]} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="header-actions"><LanguageSwitch lang={lang} path={path} /><button className="menu-button" aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <main id="top">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(22,26,23,.84) 0%, rgba(22,26,23,.68) 45%, rgba(22,26,23,.1) 100%), url(${assets.hero})` }}>
        <div className="hero-archive" style={{ backgroundImage: `url(${assets.archive})` }} />
        <div className="hero-copy"><p className="eyebrow light">{t.eyebrow}</p><p className="hero-independent">{t.independent}</p><h1>{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p className="hero-text">{t.heroText}</p><div className="hero-actions"><a className="btn btn-paper" href="#visit">{t.plan} <ArrowDownRight size={18} /></a><a className="text-link light-link" href={mapsUrl} target="_blank" rel="noreferrer">{t.map} <ArrowUpRight size={17} /></a></div><a className="photo-credit" href={photoLinks[0]} target="_blank" rel="noreferrer">{t.photoCredit}</a></div>
        <aside className="hero-facts">{t.facts.map(([label, value]) => <div className="hero-fact" key={label}><span>{label}</span><b>{value}</b></div>)}</aside>
        <a className="scroll-cue" href="#context"><span>{t.entry}</span><ArrowDownRight size={19} /></a>
      </section>
      <section id="context" className="context-section section"><div className="section-side"><p className="section-kicker">{t.storyKicker}</p><span className="large-index">01</span></div><div className="story-grid"><div><h2>{t.storyTitle}</h2><p className="lead">{t.storyLead}</p></div><div className="story-body"><p>{t.storyBody}</p><div className="evidence-note"><Sparkles size={18} /><div><b>{t.evidence}</b><p>{t.evidenceText}</p></div></div></div></div></section>
      <section id="reading" className="reading-section section"><div className="reading-visual"><img src={assets.stone} loading="lazy" alt={lang === "id" ? "Ilustrasi abstrak batu dan survei lapangan" : "Abstract stone and field-survey illustration"} /></div><div className="reading-content"><p className="section-kicker">{t.readingKicker}</p><h2>{t.readingTitle}</h2><p className="lead">{t.readingIntro}</p><div className="reading-list">{t.readCards.map(([letter, title, body]) => <article key={letter}><span>{letter}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>
      <section id="visit" className="visit-section section"><div className="section-title-row"><div><p className="section-kicker">{t.visitKicker}</p><h2>{t.visitTitle}</h2></div><p className="section-intro">{t.visitIntro}</p></div><div className="visit-layout"><div className="visit-cards">{t.visitCards.map(([label, value, detail], index) => <article key={label}><span className="card-number">0{index + 1}</span><h3>{label}</h3><strong>{value}</strong><p>{detail}</p></article>)}</div><aside className="rating-card"><span>GOOGLE MAPS</span><b>{t.rating}</b><div className="rating-dots">● ● ● ● ●</div><p>{t.ratingNote}</p><a href={mapsUrl} target="_blank" rel="noreferrer">{t.map} <ArrowUpRight size={15} /></a></aside></div></section>
      <section id="route" className="route-section section"><div className="route-header"><p className="section-kicker">{t.routeKicker}</p><h2>{t.routeTitle}</h2><p className="lead">{t.routeIntro}</p></div><div className="route-list">{t.routes.map(([title, body], index) => <article key={title}><span className="route-icon">{index === 0 ? <Mountain /> : index === 1 ? <Route /> : index === 2 ? <Compass /> : <MapPin />}</span><span className="route-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
      <section className="facilities-section section"><div className="facilities-title"><p className="section-kicker">{t.facilityKicker}</p><h2>{t.facilityTitle}</h2></div><div className="facilities-grid">{t.facilities.map(([title, body]) => <article key={title}><Check size={20} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="nearby-section section"><div className="nearby-title"><p className="section-kicker">{t.nearbyKicker}</p><h2>{t.nearbyTitle}</h2></div><div className="nearby-items">{t.nearby.map(([place, body], index) => <article key={place}><span>0{index + 1}</span><h3>{place}</h3><p className="nearby-body">{body}</p></article>)}</div></section>
      <section id="map" className="map-section section"><div className="map-copy"><p className="section-kicker">{t.mapKicker}</p><h2>{t.mapTitle}</h2><p>{t.mapText}</p><a className="btn btn-dark" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> {t.map} <ArrowUpRight size={17} /></a></div><div className="map-frame"><iframe title={lang === "id" ? "Peta Candi Sambisari" : "Sambisari Temple map"} src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section>
      <section className="gallery-section section"><div className="gallery-copy"><p className="section-kicker">{t.galleryKicker}</p><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div><figure className="gallery-figure"><img src={assets.complex} loading="lazy" alt={lang === "id" ? "Kompleks Candi Sambisari dan cekungan lanskapnya" : "Sambisari Temple complex and its sunken landscape"} /><figcaption><a href={photoLinks[1]} target="_blank" rel="noreferrer">{t.galleryCredit} <ExternalLink size={13} /></a></figcaption></figure></section>
      <section id="faq" className="faq-section section"><div className="faq-intro"><p className="section-kicker">{t.faqKicker}</p><h2>{t.faqTitle}</h2><p>{lang === "id" ? "Jawaban berikut mengutamakan konteks dan kehati-hatian; informasi operasional selalu perlu diperiksa kembali pada hari kunjungan." : "These answers favour context and caution; operational details should always be checked again on the day of a visit."}</p></div><div className="faq-list">{t.faq.map(([question, answer], index) => <details key={question} className="faq-item"><summary><span>0{index + 1}</span><b>{question}</b><ChevronDown /></summary><p className="faq-static-answer">{answer}</p></details>)}</div></section>
      <section className="sources-section section"><div><p className="section-kicker">{t.sourcesKicker}</p><h2>{t.sourcesTitle}</h2></div><div className="source-links">{t.sources.map(([name, note], index) => <a href={sourceLinks[index]} key={name} target="_blank" rel="noreferrer"><span>0{index + 1}</span><div><h3>{name}</h3><p>{note}</p></div><ArrowUpRight size={19} /></a>)}</div></section>
    </main><Footer t={t} lang={lang} />
    {consent === null && <aside className="cookie-banner"><div><p className="section-kicker">{t.cookieTitle}</p><p>{t.cookieText}</p></div><div className="cookie-banner-actions"><a href={localeHref(lang,"/cookie-settings/")}>{t.settings}</a><button className="btn btn-outline" onClick={() => accept("essential")}>{t.essential}</button><button className="btn btn-paper" onClick={() => accept("analytics")}>{t.allow}</button></div></aside>}
  </div>;
}
