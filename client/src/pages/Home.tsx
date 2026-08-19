/**
 * Style reminder — "Underground Archive": critical regionalism meets archaeological field notes.
 * Keep volcanic stone, warm paper, survey lines, asymmetric composition, and evidence-first language.
 */
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
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

const assets = {
  logo: "/03-sambisari-arch-logo.png",
  archive: "/05-sambisari-strata-archive.png",
  stone: "/06-sambisari-stone-study.png",
  pattern: "/07-sambisari-field-pattern.png",
  hero: "/01-sambisari-main-temple-crisco1492.jpg",
  complex: "/02-sambisari-complex-teshteh.jpg",
};

const mapsUrl = "https://maps.app.goo.gl/YHZQSSJ9LiyG6KUq8";
const mapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7041.738818266808!2d110.44438017696571!3d-7.762559092256688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5a39b544a4ab%3A0xd8f5c2d79ac124f3!2sSambisari%20Temple!5e1!3m2!1sid!2sid!4v1787032896080!5m2!1sid!2sid";

const copy = {
  id: {
    siteName: "Sambisari Field Guide",
    eyebrow: "Kalasan · Kabupaten Sleman · DI Yogyakarta",
    nav: ["Latar", "Baca situs", "Kunjungan", "Rute", "Peta", "Tanya jawab"],
    menu: "Buka menu",
    close: "Tutup menu",
    independent: "Panduan independen · nonkomersial",
    heroTitle: "Candi yang\ndibaca dari\nbawah tanah.",
    heroText: "Sebuah panduan lapangan independen untuk memahami Candi Sambisari—situs Siwaistis di Kalasan yang ditemukan kembali dari lapisan tanah dan material vulkanik.",
    plan: "Rencanakan kunjungan",
    map: "Buka lokasi",
    photoCredit: "Foto: Crisco 1492 / Wikimedia Commons · CC BY-SA 3.0",
    facts: [
      ["Jejak masa", "sekitar abad ke-9"],
      ["Ditemukan", "1966"],
      ["Kedalaman", "± 6,5 meter"],
      ["Susunan", "1 candi induk · 3 perwara"],
    ],
    entry: "Masuk ke lapisan pertama",
    storyKicker: "01 · Konteks", storyTitle: "Bukan tersembunyi—melainkan tertimbun.",
    storyLead: "Candi Sambisari terletak di dalam cekungan yang kini dipotong rapi dari lanskap Kalasan. Ketinggiannya yang tidak biasa bukan keputusan estetis modern, melainkan jejak tanah, abu, dan batuan yang menutup situs ini selama berabad-abad.",
    storyBody: "Pada 1966, seorang petani menemukan batu berukir saat mengolah sawah. Ekskavasi kemudian memperlihatkan kompleks candi yang runtuh sekitar 6,5 meter di bawah permukaan tanah. Penelitian, penyusunan ulang batu, dan pemugaran berlangsung selama puluhan tahun sebelum situs ini selesai dipugar pada 1987.",
    evidence: "Catatan bukti", evidenceText: "Lempeng emas beraksara Jawa Kuna dengan frasa “Om Siwa Sthana” kerap digunakan untuk mendukung pembacaan Siwaistis dan penanggalan sekitar abad ke-9. Namun, penanggalan tepatnya tetap memiliki beberapa tafsir ilmiah.",
    readingKicker: "02 · Baca situs", readingTitle: "Amati urutan ruang, bukan hanya fasad.",
    readingIntro: "Susunan Sambisari membantu menjelaskan bagaimana sebuah bangunan ritual di Jawa Tengah bekerja sebagai ruang, bukan sekadar objek batu.",
    readCards: [
      ["A", "Candi induk", "Bangunan utama menghadap ke barat. Di dalam biliknya terdapat lingga dan yoni, unsur penting dalam tradisi Siwaistis."],
      ["B", "Relung dan arca", "Relung di dinding luar memuat Durga di utara, Ganesha di timur, dan Agastya di selatan. Perhatikan posisi sebelum mencari detail foto."],
      ["C", "Tiga perwara", "Tiga struktur pengiring berderet di depan candi induk. Kini yang terlihat terutama adalah bagian kaki dan pagar langkannya."],
    ],
    visitKicker: "03 · Kunjungan", visitTitle: "Datang dengan ekspektasi yang tepat.",
    visitIntro: "Nilai situs ini hadir lewat skala, permukaan batu, dan konteks pemugarannya. Kunjungan singkat akan lebih bermakna bila Anda memberi waktu untuk membaca cekungan dan orientasi kompleks.",
    visitCards: [
      ["Jam & status", "Cek di Google Maps", "Status buka dan jam tutup dapat berubah. Tautan peta adalah rujukan terbaik sebelum berangkat."],
      ["Biaya masuk", "Konfirmasi di lokasi", "Harga dan ketentuan kunjungan dapat berubah; panduan ini tidak membekukan tarif."],
      ["Waktu terbaik", "Pagi atau sore", "Cahaya lebih lembut dan paparan panas lebih rendah; bawa pelindung hujan saat musim basah."],
      ["Durasi", "± 45–90 menit", "Tambahkan waktu bila ingin membaca arsitektur dengan tenang atau melanjutkan ke klaster candi di Kalasan."],
    ],
    rating: "4,6 / 5", ratingNote: "8.142 ulasan publik di Google Maps saat panduan diperbarui; angka ini dapat berubah.",
    routeKicker: "04 · Rute", routeTitle: "Datang melalui kota, lalu lanjutkan secara lokal.",
    routeIntro: "Candi Sambisari berada di Purwomartani, Kapanewon Kalasan, sekitar 15 km di arah timur laut dari pusat Kota Yogyakarta. Pilihan terakhir yang paling praktis bergantung pada waktu, cuaca, dan mobilitas Anda.",
    routes: [
      ["Dari bandara", "Bandara Internasional Yogyakarta (YIA) berada di sisi barat wilayah Yogyakarta. Lanjutkan dahulu ke pusat kota atau koridor timur Yogyakarta dengan layanan bandara yang tersedia pada hari perjalanan, kemudian sambung dengan taksi atau transportasi berbasis aplikasi."],
      ["Bus / angkutan umum", "Gunakan layanan bus kota atau antarkawasan untuk mendekati koridor Kalasan bila jadwal sesuai. Rute, halte, dan pola layanan dapat berubah, sehingga perlu diperiksa pada hari keberangkatan; siapkan sambungan jalan kaki atau kendaraan lokal."],
      ["Taksi & aplikasi", "Untuk tujuan langsung, masukkan “Candi Sambisari” sebagai tujuan dan pilih titik turun yang aman. Periksa estimasi dan titik jemput di aplikasi sebelum berangkat."],
      ["Mobil / sepeda motor", "Ikuti petunjuk menuju Jl. Candi Sambisari. Gunakan area parkir resmi dan jangan berhenti di akses jalan atau gerbang. Perhatikan hujan, permukaan licin, serta penyeberang jalan."],
    ],
    facilityKicker: "05 · Kebutuhan", facilityTitle: "Hal praktis yang menentukan kenyamanan.",
    facilities: [
      ["WC", "Sebaiknya gunakan fasilitas yang tersedia di area kunjungan; jika diperlukan, rencanakan sebelum memasuki situs."],
      ["Parkir", "Ketersediaan dan pola akses dapat berubah pada akhir pekan atau kegiatan khusus. Ikuti arahan petugas di lokasi."],
      ["Makan & minum", "Di kawasan Kalasan tersedia jenis warung, rumah makan, kedai, dan toko kebutuhan harian. Kami tidak merekomendasikan operator tertentu."],
      ["Menginap & kebutuhan", "Pilihan penginapan, minimarket, SPBU, dan titik pengisian kendaraan tersedia di wilayah Yogyakarta–Sleman yang lebih luas; cek lokasi dan jam operasional sebelum berangkat."],
    ],
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
    faq: [
      ["Apakah Candi Sambisari candi Hindu?", "Ya. Arca, lingga-yoni, dan inskripsi yang ditemukan mendukung pembacaan Siwaistis. Informasi sejarah di situs ini diringkas dari sumber pemerintah dan warisan budaya."],
      ["Mengapa letaknya lebih rendah dari tanah di sekelilingnya?", "Situs ini ditemukan tertimbun sekitar 6,5 meter. Penggalian dan penataan kemudian membentuk cekungan kunjungan yang terlihat sekarang."],
      ["Berapa biaya masuknya?", "Ketentuan biaya dapat berubah. Periksa Google Maps atau konfirmasi kepada petugas di lokasi sebelum berangkat."],
      ["Apakah ada parkir dan toilet?", "Fasilitas dan akses dapat berubah mengikuti kondisi lapangan. Rencanakan kebutuhan dasar dan ikuti petunjuk saat tiba."],
      ["Apakah situs ini cocok untuk kunjungan keluarga?", "Kunjungan dapat dinikmati sebagai pembacaan sejarah dan arsitektur. Awasi anak di dekat tangga, permukaan batu, dan batas situs."],
      ["Kapan waktu terbaik untuk berkunjung?", "Pagi atau sore biasanya lebih nyaman untuk bergerak di ruang terbuka. Pantau cuaca dan status akses pada hari yang sama."],
    ],
    sourcesKicker: "Sumber publik", sourcesTitle: "Baca lebih jauh, lalu periksa lagi sebelum berangkat.",
    sources: [
      ["Kalurahan Purwomartani", "Latar sejarah, penemuan, dan arsitektur Candi Sambisari."],
      ["Jogja Cagar", "Catatan warisan budaya Pemerintah DI Yogyakarta."],
      ["Dinas Pariwisata Sleman", "Konteks lokasi dan pembacaan situs."],
      ["Indonesia.travel", "Konteks destinasi nasional."],
      ["Google Maps", "Lokasi, akses, status jam, dan pembaruan kunjungan."],
    ],
    footerLead: "Panduan lapangan independen untuk membaca Candi Sambisari secara lebih utuh.",
    nonProfit: "Situs ini adalah proyek panduan pengunjung independen dan non-profit. Situs ini tidak berafiliasi dengan instansi pemerintah, pengelola resmi, atau operator komersial mana pun.",
    verification: "Informasi dirangkum dari materi publik Kalurahan Purwomartani, Pemerintah DI Yogyakarta, Dinas Pariwisata Kabupaten Sleman, dan sumber pariwisata nasional. Tidak memuat rekomendasi komersial.",
    rights: "Hak cipta foto tetap pada fotografer masing-masing; atribusi dan lisensi dicantumkan di dekat gambar.",
    legal: ["Kebijakan Privasi", "Ketentuan Layanan", "Pengaturan Kuki"],
    copyright: "© 2026 Sambisari Field Guide. Hak cipta dilindungi.",
    cookieTitle: "Privasi, terlebih dahulu.",
    cookieText: "Kami hanya mengaktifkan analitik Google bila Anda menyetujuinya. Anda selalu dapat mengubah pilihan di halaman Pengaturan Kuki.",
    essential: "Hanya esensial", allow: "Izinkan analitik", settings: "Atur pilihan", save: "Simpan preferensi", reject: "Tolak semua opsional",
    legalContent: {
      privacy: {
        title: "Kebijakan Privasi", intro: "Terakhir diperbarui: Agustus 2026", sections: [["Informasi yang kami kumpulkan", "Kami hanya mengumpulkan data minimum yang diperlukan untuk menjalankan situs. Data ini dapat mencakup data penelusuran seperti alamat IP, jenis peramban, halaman yang dikunjungi; kuki dan teknologi serupa; serta informasi yang Anda berikan secara sukarela melalui kontak atau email."], ["Cara kami menggunakan informasi", "Data digunakan untuk meningkatkan isi dan pengalaman situs, memahami pola penggunaan secara agregat, menanggapi permintaan, serta memenuhi kewajiban hukum yang berlaku."], ["Layanan pihak ketiga", "Situs ini dapat memuat Google Maps untuk peta dan data lokasi serta Google Analytics—hanya setelah persetujuan—untuk analitik. Masing-masing layanan mempunyai kebijakan privasinya sendiri."], ["Hak Anda", "Berdasarkan GDPR dan aturan terkait, Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi, menyampaikan keberatan, serta mengajukan keluhan kepada otoritas yang berwenang."]]
      },
      terms: {
        title: "Ketentuan Layanan", intro: "Terakhir diperbarui: Agustus 2026", sections: [["Penerimaan", "Dengan mengakses atau menggunakan Sambisari Field Guide, Anda menyetujui ketentuan ini."], ["Penggunaan konten", "Seluruh isi hanya untuk referensi. Kami adalah situs informasi wisata independen dan tidak berafiliasi dengan objek wisata, instansi pemerintah, atau operator komersial mana pun."], ["Ketepatan informasi", "Kami berupaya menyajikan informasi yang akurat dan relevan, tetapi tidak menjamin kelengkapan atau ketepatannya. Rencana kunjungan, kondisi, dan layanan dapat berubah; verifikasi informasi penting melalui kanal resmi sebelum berangkat."], ["Hak kekayaan intelektual", "Desain dan konten orisinal situs dilindungi. Foto digunakan dengan kredit dan lisensi yang tercantum. Data Google Maps tunduk pada ketentuan Google."], ["Batas tanggung jawab", "Situs ini disediakan sebagaimana adanya tanpa jaminan. Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan informasi ini, termasuk keputusan perjalanan."]]
      },
      cookies: {
        title: "Pengaturan Kuki", intro: "Terakhir diperbarui: Agustus 2026", sections: [["Tentang kuki", "Kami menggunakan kuki dan penyimpanan lokal untuk pengalaman penelusuran yang lebih baik. Anda dapat mengelola preferensi di bawah."], ["Kuki esensial", "Kuki ini diperlukan agar situs berfungsi dan menyimpan pilihan dasar seperti bahasa. Kuki ini selalu aktif."], ["Kuki analitik", "Jika diizinkan, Google Analytics dapat membantu kami memahami penggunaan situs secara agregat dan anonim. Kuki ini tidak aktif secara bawaan."], ["Kuki preferensi", "Pilihan bahasa dan pengaturan tampilan dapat disimpan di perangkat Anda."], ["Kuki pemasaran", "Kami tidak menjalankan kuki pemasaran atau iklan yang dipersonalisasi pada situs ini."]]
      }
    }
  },
  en: {
    siteName: "Sambisari Field Guide",
    eyebrow: "Kalasan · Sleman Regency · Special Region of Yogyakarta",
    nav: ["Context", "Read the site", "Visit", "Route", "Map", "FAQ"],
    menu: "Open menu", close: "Close menu", independent: "Independent · non-commercial guide",
    heroTitle: "A temple\nread from\nbelow ground.",
    heroText: "An independent field guide to Sambisari Temple—a Shaivite site in Kalasan, rediscovered beneath layers of earth and volcanic material.",
    plan: "Plan a visit", map: "Open location", photoCredit: "Photo: Crisco 1492 / Wikimedia Commons · CC BY-SA 3.0",
    facts: [["Historical trace", "c. 9th century"], ["Discovered", "1966"], ["Depth", "± 6.5 metres"], ["Composition", "1 main temple · 3 shrines"]],
    entry: "Enter the first layer", storyKicker: "01 · Context", storyTitle: "Not hidden—buried.",
    storyLead: "Sambisari sits inside a carefully cut basin in the Kalasan landscape. Its unusual level is not a modern aesthetic decision, but a record of soil, ash, and stone that covered the site for centuries.",
    storyBody: "In 1966, a farmer struck a carved stone while working a field. Excavations subsequently revealed a collapsed temple complex around 6.5 metres below the surrounding ground. Research, stone sorting, reconstruction, and restoration continued for decades before the site was fully restored in 1987.",
    evidence: "Evidence note", evidenceText: "An Old Javanese gold inscription carrying the phrase “Om Siwa Sthana” is often used to support a Shaivite reading and a broadly 9th-century date. Its exact construction date, however, remains subject to more than one scholarly interpretation.",
    readingKicker: "02 · Read the site", readingTitle: "Follow the spatial sequence, not only the façade.",
    readingIntro: "Sambisari’s arrangement helps explain how a Central Javanese ritual building worked as space, not merely as a stone object.",
    readCards: [["A", "Main temple", "The principal structure faces west. Its inner chamber contains a lingga and yoni, important elements in Shaivite practice."], ["B", "Niches and images", "Outer-wall niches hold Durga to the north, Ganesha to the east, and Agastya to the south. Notice their placement before looking for photographic details."], ["C", "Three companion shrines", "Three attendant structures align before the main temple. What remains visible is principally their base and enclosing balustrade."]],
    visitKicker: "03 · Visit", visitTitle: "Arrive with the right expectations.",
    visitIntro: "The site’s value unfolds through scale, stone surface, and its restoration context. A short visit becomes more rewarding when there is time to read the basin and the complex’s orientation.",
    visitCards: [["Hours & status", "Check Google Maps", "Opening status and closing times can change. Use the map link as your final reference before departure."], ["Entry fees", "Confirm on site", "Prices and visit conditions can change; this guide does not freeze a tariff."], ["Best time", "Morning or late afternoon", "The light is softer and exposure is lower; carry rain protection in the wet season."], ["Suggested duration", "± 45–90 minutes", "Allow more time to study the architecture or continue into Kalasan’s temple landscape."]],
    rating: "4.6 / 5", ratingNote: "8,142 public Google Maps reviews when this guide was updated; this figure may change.",
    routeKicker: "04 · Route", routeTitle: "Reach the city first, then connect locally.",
    routeIntro: "Sambisari Temple is in Purwomartani, Kalasan, roughly 15 km north-east of central Yogyakarta. The practical final connection depends on time, weather, and your mobility needs.",
    routes: [["From the airport", "Yogyakarta International Airport (YIA) is on the western side of the Yogyakarta region. First reach the city centre or eastern Yogyakarta through airport services available on the day, then connect by taxi or app-based transport."], ["Bus / public transport", "Use city or inter-area services toward the Kalasan corridor when schedules fit. Routes, stops, and service patterns can change, so check on the day and allow for a walk or local vehicle connection."], ["Taxi & ride-hailing", "For a direct trip, enter “Candi Sambisari” as the destination and choose a safe drop-off point. Review the estimate and pickup pin in the app before leaving."], ["Car / motorbike", "Follow navigation toward Jl. Candi Sambisari. Use official parking areas; do not stop across access roads or at the gate. Watch for rain, slippery surfaces, and pedestrians."]],
    facilityKicker: "05 · Essentials", facilityTitle: "Small practical details matter.",
    facilities: [["Toilets", "Use facilities available within the visitor area; if needed, plan essential stops before entering the site."], ["Parking", "Availability and access patterns can change during weekends or special activity. Follow staff directions on arrival."], ["Food & water", "The Kalasan area offers categories of warung, restaurants, cafés, and daily-needs shops. We do not recommend individual operators."], ["Stays & supplies", "Accommodation, minimarkets, fuel stations, and EV charging points exist across the wider Yogyakarta–Sleman area; verify location and operating status before leaving."]],
    nearbyKicker: "06 · Nearby", nearbyTitle: "Read one cultural landscape, not one pin.",
    nearby: [["Kalasan", "A classical-temple landscape on Yogyakarta’s eastern corridor."], ["Prambanan", "A major temple complex best approached as a separate visit with more time."], ["Ratu Boko", "A hilltop site offering a different archaeological setting and wider landscape view."]],
    mapKicker: "07 · Map", mapTitle: "Locate the site in Purwomartani.",
    mapText: "A useful address for a driver: Jl. Candi Sambisari, Sambisari, Purwomartani, Kec. Kalasan, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55571.",
    galleryKicker: "08 · Documentation", galleryTitle: "Two ways to see the Sambisari basin.",
    galleryText: "These photographs are selected as records of the actual site. The graphic imagery on this page is only a visual language for the guide, never a reconstruction or substitute for field photography.",
    galleryCredit: "Photo: TeshTesh / Wikimedia Commons · CC BY-SA 3.0",
    faqKicker: "09 · FAQ", faqTitle: "Questions for a quieter visit.",
    faq: [["Is Sambisari Temple a Hindu temple?", "Yes. Its images, lingga-yoni, and inscription support a Shaivite reading. The historical information here is condensed from government and cultural-heritage sources."], ["Why does it sit below the surrounding ground?", "The site was found buried around 6.5 metres down. Excavation and landscaping then formed the visitor basin seen today."], ["How much is entry?", "Fees can change. Check Google Maps or confirm with staff on the day of your visit."], ["Are there parking and toilets?", "Facilities and access can vary with on-site conditions. Plan essential needs and follow instructions when you arrive."], ["Is the site suitable for families?", "It can be enjoyed as an architectural and historical visit. Supervise children around steps, stone surfaces, and site boundaries."], ["When is the best time to visit?", "Mornings and late afternoons are usually more comfortable outdoors. Check weather and access status on the same day."]],
    sourcesKicker: "Public sources", sourcesTitle: "Read further, then check again before leaving.",
    sources: [["Purwomartani Village", "Historical background, discovery, and architecture of Candi Sambisari."], ["Jogja Cagar", "Cultural-heritage record from the Special Region of Yogyakarta."], ["Sleman Tourism Office", "Location context and a site reading."], ["Indonesia.travel", "National tourism context."], ["Google Maps", "Location, access, hours status, and current visitor updates."]],
    footerLead: "An independent field guide for reading Sambisari Temple with more context.",
    nonProfit: "This site is an independent, non-profit visitor-information project. It is not affiliated with a government agency, official operator, or commercial business.",
    verification: "Information is synthesised from public materials from Purwomartani Village, the Special Region of Yogyakarta, Sleman Regency Tourism Office, and national tourism sources. It contains no commercial recommendations.",
    rights: "Photographic copyright remains with each photographer; attribution and licence appear near each image.",
    legal: ["Privacy Policy", "Terms of Service", "Cookie Settings"], copyright: "© 2026 Sambisari Field Guide. All rights reserved.",
    cookieTitle: "Privacy comes first.", cookieText: "We load Google Analytics only after your permission. You can change this choice at any time in Cookie Settings.", essential: "Essential only", allow: "Allow analytics", settings: "Set preferences", save: "Save preferences", reject: "Reject optional",
    legalContent: {
      privacy: { title: "Privacy Policy", intro: "Last updated: August 2026", sections: [["Information we collect", "We collect only the minimum information required to operate this site. This may include browsing data such as IP address, browser type, and pages visited; cookies and similar technologies; and information you voluntarily provide through contact or email."], ["How we use information", "Information is used to improve content and user experience, understand aggregate usage patterns, respond to requests, and meet applicable legal obligations."], ["Third-party services", "This site may embed Google Maps for maps and location data, and Google Analytics—only after consent—for analytics. Each service has its own privacy policy."], ["Your rights", "Under the GDPR and related rules, you may request access, correction, or deletion of personal data, object to processing, and lodge a complaint with a competent authority."]] },
      terms: { title: "Terms of Service", intro: "Last updated: August 2026", sections: [["Acceptance", "By accessing or using Sambisari Field Guide, you agree to these terms."], ["Content use", "All content is for reference only. We are an independent tourism-information site and are not affiliated with any attraction, government body, or commercial operator."], ["Information accuracy", "We work to provide accurate, relevant information but cannot guarantee completeness or accuracy. Visit plans, conditions, and services can change; confirm important information through official channels before you travel."], ["Intellectual property", "The original design and content of this site are protected. Images are used with the stated credit and licence. Google Maps data is subject to Google’s terms."], ["Limitation of liability", "This site is provided as is, without warranties. We are not liable for loss arising from use of this information, including travel decisions."]] },
      cookies: { title: "Cookie Settings", intro: "Last updated: August 2026", sections: [["About cookies", "We use cookies and local storage for a better browsing experience. You can manage preferences below."], ["Essential cookies", "These are necessary for the website to operate and for basic choices such as language. They are always active."], ["Analytics cookies", "If allowed, Google Analytics helps us understand aggregate, anonymous site usage. It is off by default."], ["Preference cookies", "Your language choice and display settings can be stored on your device."], ["Marketing cookies", "We do not run marketing cookies or personalised advertising on this website."]] }
    }
  }
} as const;

const sourceLinks = [
  "https://purwomartanisid.slemankab.go.id/home/data-kebudayaan/candi-sambisari/",
  "https://jogjacagar.jogjaprov.go.id/detail/430/displayrecords-i-nama-warisan",
  "https://pariwisata.slemankab.go.id/2017/04/22/candi-sambisari/",
  "https://www.indonesia.travel/gb/en/destination/java/yogyakarta/candi-sambisari",
  mapsUrl,
];

const photoLinks = [
  "https://commons.wikimedia.org/wiki/File:Candi_Sambisari_main_temple_2013-11-28_01.jpg",
  "https://commons.wikimedia.org/wiki/File:Candi_Sambisari,_Hindu_Temple_of_Java_Indonesia_2013_b.jpg",
];

function setAnalyticsConsent(value: Consent) {
  if (value) localStorage.setItem("sambisari-consent", value);
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

function Footer({ t }: { t: (typeof copy)[Lang] }) {
  return <footer className="site-footer" style={{ backgroundImage: `url(${assets.pattern})` }}>
    <div className="footer-grid">
      <div className="footer-brand"><img src={assets.logo} alt="" /><p>{t.footerLead}</p></div>
      <div className="footer-legal"><p>{t.nonProfit}</p><p>{t.verification}</p><p>{t.rights}</p></div>
      <nav className="footer-links" aria-label="Legal navigation"><a href="/privacy-policy">{t.legal[0]}</a><a href="/terms-of-service">{t.legal[1]}</a><a href="/cookie-settings">{t.legal[2]}</a></nav>
    </div>
    <div className="footer-bottom"><span>{t.copyright}</span><span>Kalasan · Sleman · Yogyakarta</span></div>
  </footer>;
}

function LegalPage({ page, lang, setLang }: { page: "privacy" | "terms" | "cookies"; lang: Lang; setLang: (language: Lang) => void }) {
  const t = copy[lang];
  const [analytics, setAnalytics] = useState(() => localStorage.getItem("sambisari-consent") === "analytics");
  const legal = t.legalContent[page];
  const save = () => setAnalyticsConsent(analytics ? "analytics" : "essential");
  return <div className="legal-page"><header className="legal-header"><a href="/" className="brand-lockup"><img src={assets.logo} alt="" /><span>Sambisari<br /><b>FIELD GUIDE</b></span></a><div className="language-control"><button className={lang === "id" ? "active" : ""} onClick={() => setLang("id")}>ID</button><span>/</span><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button></div></header>
    <main className="legal-main"><p className="section-kicker">SAMBISARI / FIELD NOTES</p><h1>{legal.title}</h1><p className="legal-intro">{legal.intro}</p><div className="legal-rule" />
      {legal.sections.map(([heading, body]) => <section className="legal-section" key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
      {page === "cookies" && <section className="cookie-panel"><div><span className="pill"><ShieldCheck size={14} /> {t.essential}</span><p>{lang === "id" ? "Selalu aktif—diperlukan untuk pilihan bahasa dan fungsi dasar." : "Always active—required for language choices and basic operation."}</p></div><label className="toggle-row"><span><b>Google Analytics</b><small>{lang === "id" ? "Analitik agregat, hanya dengan persetujuan." : "Aggregate analytics, only with consent."}</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /><i /></label><div className="cookie-actions"><button className="btn btn-outline" onClick={() => { setAnalytics(false); setAnalyticsConsent("essential"); }}>{t.reject}</button><button className="btn btn-dark" onClick={save}>{t.save}</button></div></section>}
      <a href="/" className="back-link">← {lang === "id" ? "Kembali ke panduan" : "Back to the guide"}</a>
    </main><Footer t={t} /></div>;
}

export default function Home() {
  const [location] = useLocation();
  const [lang, setLangState] = useState<Lang>(() => localStorage.getItem("sambisari-language") === "en" ? "en" : "id");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [consent, setConsent] = useState<Consent>(() => (localStorage.getItem("sambisari-consent") as Consent) || null);
  const t = copy[lang];

  const setLang = (language: Lang) => { localStorage.setItem("sambisari-language", language); setLangState(language); };
  useEffect(() => { document.documentElement.lang = lang; document.title = lang === "id" ? "Candi Sambisari — Panduan Lapangan" : "Sambisari Temple — Field Guide"; }, [lang]);
  useEffect(() => { if (consent === "analytics") setAnalyticsConsent("analytics"); }, [consent]);

  const jsonLd = useMemo(() => ({ "@context": "https://schema.org", "@type": "TouristAttraction", name: "Candi Sambisari", alternateName: "Sambisari Temple", description: lang === "id" ? "Candi Hindu beraliran Siwaistis di Kalasan, Sleman, Daerah Istimewa Yogyakarta." : "A Shaivite Hindu temple in Kalasan, Sleman Regency, Special Region of Yogyakarta.", address: { "@type": "PostalAddress", streetAddress: "Jl. Candi Sambisari, Sambisari, Purwomartani, Kec. Kalasan", addressLocality: "Sleman", addressRegion: "Daerah Istimewa Yogyakarta", postalCode: "55571", addressCountry: "ID" }, geo: { "@type": "GeoCoordinates", latitude: -7.7625591, longitude: 110.4469551 }, openingHours: "Mo-Su", aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", reviewCount: "8142", bestRating: "5" }, url: mapsUrl }), [lang]);
  const faqLd = useMemo(() => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }), [t.faq]);

  const page = location === "/privacy-policy" ? "privacy" : location === "/terms-of-service" ? "terms" : location === "/cookie-settings" ? "cookies" : null;
  if (page) return <LegalPage page={page} lang={lang} setLang={setLang} />;

  const navTargets = ["#context", "#reading", "#visit", "#route", "#map", "#faq"];
  const accept = (value: Consent) => { setConsent(value); setAnalyticsConsent(value); };
  return <div className="site-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    <header className="site-header">
      <a href="#top" className="brand-lockup" aria-label="Sambisari Field Guide"><img src={assets.logo} alt="" /><span>SAMBISARI<br /><b>FIELD GUIDE</b></span></a>
      <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Primary navigation">{t.nav.map((item, index) => <a key={item} href={navTargets[index]} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>
      <div className="header-actions"><div className="language-control"><button className={lang === "id" ? "active" : ""} onClick={() => setLang("id")}>ID</button><span>/</span><button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button></div><button className="menu-button" aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>
    <main id="top">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(22,26,23,.84) 0%, rgba(22,26,23,.68) 45%, rgba(22,26,23,.1) 100%), url(${assets.hero})` }}>
        <div className="hero-archive" style={{ backgroundImage: `url(${assets.archive})` }} />
        <div className="hero-copy"><p className="eyebrow light">{t.eyebrow}</p><p className="hero-independent">{t.independent}</p><h1>{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1><p className="hero-text">{t.heroText}</p><div className="hero-actions"><a className="btn btn-paper" href="#visit">{t.plan} <ArrowDownRight size={18} /></a><a className="text-link light-link" href={mapsUrl} target="_blank" rel="noreferrer">{t.map} <ArrowUpRight size={17} /></a></div><a className="photo-credit" href={photoLinks[0]} target="_blank" rel="noreferrer">{t.photoCredit}</a></div>
        <aside className="hero-facts">{t.facts.map(([label, value]) => <div className="hero-fact" key={label}><span>{label}</span><b>{value}</b></div>)}</aside>
        <a className="scroll-cue" href="#context"><span>{t.entry}</span><ArrowDownRight size={19} /></a>
      </section>
      <section id="context" className="context-section section"><div className="section-side"><p className="section-kicker">{t.storyKicker}</p><span className="large-index">01</span></div><div className="story-grid"><div><h2>{t.storyTitle}</h2><p className="lead">{t.storyLead}</p></div><div className="story-body"><p>{t.storyBody}</p><div className="evidence-note"><Sparkles size={18} /><div><b>{t.evidence}</b><p>{t.evidenceText}</p></div></div></div></div></section>
      <section id="reading" className="reading-section section"><div className="reading-visual"><img src={assets.stone} alt="Abstract stone and field-survey visual" /></div><div className="reading-content"><p className="section-kicker">{t.readingKicker}</p><h2>{t.readingTitle}</h2><p className="lead">{t.readingIntro}</p><div className="reading-list">{t.readCards.map(([letter, title, body]) => <article key={letter}><span>{letter}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div></section>
      <section id="visit" className="visit-section section"><div className="section-title-row"><div><p className="section-kicker">{t.visitKicker}</p><h2>{t.visitTitle}</h2></div><p className="section-intro">{t.visitIntro}</p></div><div className="visit-layout"><div className="visit-cards">{t.visitCards.map(([label, value, detail], index) => <article key={label}><span className="card-number">0{index + 1}</span><h3>{label}</h3><strong>{value}</strong><p>{detail}</p></article>)}</div><aside className="rating-card"><span>GOOGLE MAPS</span><b>{t.rating}</b><div className="rating-dots">● ● ● ● ●</div><p>{t.ratingNote}</p><a href={mapsUrl} target="_blank" rel="noreferrer">{t.map} <ArrowUpRight size={15} /></a></aside></div></section>
      <section id="route" className="route-section section"><div className="route-header"><p className="section-kicker">{t.routeKicker}</p><h2>{t.routeTitle}</h2><p className="lead">{t.routeIntro}</p></div><div className="route-list">{t.routes.map(([title, body], index) => <article key={title}><span className="route-icon">{index === 0 ? <Mountain /> : index === 1 ? <Route /> : index === 2 ? <Compass /> : <MapPin />}</span><span className="route-number">0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
      <section className="facilities-section section"><div className="facilities-title"><p className="section-kicker">{t.facilityKicker}</p><h2>{t.facilityTitle}</h2></div><div className="facilities-grid">{t.facilities.map(([title, body]) => <article key={title}><Check size={20} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="nearby-section section"><div className="nearby-title"><p className="section-kicker">{t.nearbyKicker}</p><h2>{t.nearbyTitle}</h2></div><div className="nearby-items">{t.nearby.map(([place, body], index) => <article key={place}><span>0{index + 1}</span><h3>{place}</h3><p>{body}</p></article>)}</div></section>
      <section id="map" className="map-section section"><div className="map-copy"><p className="section-kicker">{t.mapKicker}</p><h2>{t.mapTitle}</h2><p>{t.mapText}</p><a className="btn btn-dark" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> {t.map} <ArrowUpRight size={17} /></a></div><div className="map-frame"><iframe title="Sambisari Temple map" src={mapEmbed} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></section>
      <section className="gallery-section section"><div className="gallery-copy"><p className="section-kicker">{t.galleryKicker}</p><h2>{t.galleryTitle}</h2><p>{t.galleryText}</p></div><figure className="gallery-figure"><img src={assets.complex} alt={lang === "id" ? "Kompleks Candi Sambisari dan cekungan lanskapnya" : "Sambisari Temple complex and its sunken landscape"} /><figcaption><a href={photoLinks[1]} target="_blank" rel="noreferrer">{t.galleryCredit} <ExternalLink size={13} /></a></figcaption></figure></section>
      <section id="faq" className="faq-section section"><div className="faq-intro"><p className="section-kicker">{t.faqKicker}</p><h2>{t.faqTitle}</h2><p>{lang === "id" ? "Jawaban berikut mengutamakan konteks dan kehati-hatian; informasi operasional selalu perlu diperiksa kembali pada hari kunjungan." : "These answers favour context and caution; operational details should always be checked again on the day of a visit."}</p></div><div className="faq-list">{t.faq.map(([question, answer], index) => <article key={question} className={openFaq === index ? "faq-item open" : "faq-item"}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><b>{question}</b><ChevronDown /></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></section>
      <section className="sources-section section"><div><p className="section-kicker">{t.sourcesKicker}</p><h2>{t.sourcesTitle}</h2></div><div className="source-links">{t.sources.map(([name, note], index) => <a href={sourceLinks[index]} key={name} target="_blank" rel="noreferrer"><span>0{index + 1}</span><div><h3>{name}</h3><p>{note}</p></div><ArrowUpRight size={19} /></a>)}</div></section>
    </main><Footer t={t} />
    {consent === null && <aside className="cookie-banner"><div><p className="section-kicker">{t.cookieTitle}</p><p>{t.cookieText}</p></div><div className="cookie-banner-actions"><a href="/cookie-settings">{t.settings}</a><button className="btn btn-outline" onClick={() => accept("essential")}>{t.essential}</button><button className="btn btn-paper" onClick={() => accept("analytics")}>{t.allow}</button></div></aside>}
  </div>;
}
