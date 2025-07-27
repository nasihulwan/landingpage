const csNumbers = [
  "6281234567890",
  "6289876543210",
  "6281122334455",
  "6285566778899"
];

function getNextCS() {
  let index = localStorage.getItem("csIndex") || 0;
  const csNumber = csNumbers[index];

  index = (parseInt(index) + 1) % csNumbers.length;
  localStorage.setItem("csIndex", index);

  return csNumber;
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const telepon = document.getElementById("telepon").value;
  const alamat = document.getElementById("alamat").value;
  const produk = document.getElementById("produk").value;

  const csNumber = getNextCS();

  // Tracking GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "formOrder",
    nama: nama,
    telepon: telepon,
    produk: produk
  });

  const message = `Halo, saya ingin pesan:\nNama: ${nama}\nWA: ${telepon}\nAlamat: ${alamat}\nProduk: ${produk}`;
  const encoded = encodeURIComponent(message);
  const waURL = `https://wa.me/${csNumber}?text=${encoded}`;
  window.open(waURL, "_blank");
});
