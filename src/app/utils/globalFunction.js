export const formatRupiah = (angka, prefix, noPrefix) => {
  if (angka !== undefined) {
    var number_string = angka.toString().replace(/[^,\d]/g, "");
    var split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    if (!noPrefix) {
      let result =
        prefix === undefined ? "Rp" + rupiah : rupiah ? prefix + rupiah : "";
      return angka < 0 ? "-" + result : result;
    } else {
      let result = angka < 0 ? "-" + rupiah : rupiah;
      return result;
    }
  }
};

export const formatDollar = (angka) => {
  // console.log("default", angka);
  // console.log(
  //   "angkaa",
  //   angka?.toString()?.replace("$", "")?.replace(".00", "")
  // );
  let dollar = angka?.toString()?.replace("$", "")?.replace(".00", "");
  // console.log("dollar", dollar);
  let result = 0;
  if (angka !== undefined && angka !== 0) {
    result = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(dollar);
  }
  return result?.toString().replaceAll(".00", "");
};

export const formatHarga = (angka) => {
  if (angka !== undefined) {
    var number_string = angka.toString().replace(/[^,\d]/g, "");
    var split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      var separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    let result = angka < 0 ? "-" + rupiah : rupiah;
    return result;
  }
};

export const formatTanggal = (tanggal) => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const d = new Date(tanggal.replace(" ", "T"));
  const ye = d.getFullYear();
  const mo = d.getMonth();
  const da = d.getDate();
  return `${da} ${monthNames[mo]} ${ye} ${tanggal.substr(
    11,
    tanggal.length - 3
  )}`;
};

export const konversiRomawi = (nomor) => {
  var desimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var romawi = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  var hasil = "";

  for (var index = 0; index < desimal.length; index++) {
    while (desimal[index] <= nomor) {
      hasil += romawi[index];
      nomor -= desimal[index];
    }
  }
  return hasil;
};
