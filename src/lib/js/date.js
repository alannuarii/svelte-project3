export const arrayDate = () => {
	const tanggalHariIni = new Date();
	const hariIni = tanggalHariIni.getDay();

	if (hariIni === 0) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 2);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 4);

		return [date2(start), date2(end)];
	} else if (hariIni === 1) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 3);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 3);

		return [date2(start), date2(end)];
	} else if (hariIni === 2) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 4);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 2);

		return [date2(start), date2(end)];
	} else if (hariIni === 3) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 5);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 1);

		return [date2(start), date2(end)];
	} else if (hariIni === 4) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 6);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 0);

		return [date2(start), date2(end)];
	} else if (hariIni === 5) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 0);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 6);

		return [date2(start), date2(end)];
	} else if (hariIni === 6) {
		const start = new Date(tanggalHariIni);
		start.setDate(tanggalHariIni.getDate() - 1);
		const end = new Date(tanggalHariIni);
		end.setDate(tanggalHariIni.getDate() + 5);

		return [date2(start), date2(end)];
	}
};

export const formatTanggal = (tanggal) => {
	const dd = String(tanggal.getDate()).padStart(2, '0');
	const mm = String(tanggal.getMonth() + 1).padStart(2, '0');
	const yyyy = tanggal.getFullYear();
	return dd + '/' + mm + '/' + yyyy;
	// 27/10/2023
};

export const date2 = (tanggal) => {
	// membuat objek Date dengan parameter waktu Sat, 06 May 2023 00:00:00 GMT
	const date = new Date(tanggal);
	const months = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	];
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	const formattedDate = `${day} ${months[monthIndex]} ${year}`;
	return formattedDate;
	// 6 Mei 2023
};

export const getToday = () => {
	let tomorrow = new Date();
	tomorrow.setHours(tomorrow.getHours() + 8);
	tomorrow = tomorrow.toISOString().slice(0, 10);
	return tomorrow;
	// 2023-02-21 tanggal hari ini
};

export const getYesterday = () => {
	let tomorrow = new Date();
	tomorrow.setHours(tomorrow.getHours() - 16);
	tomorrow = tomorrow.toISOString().slice(0, 10);
	return tomorrow;
	// 2023-02-21 tanggal hari ini
};

export function date(tanggal) {
	const date = new Date(tanggal);
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const result = date.toLocaleDateString('id-ID', options);
	return result;
	// 'Senin, 20 Februari 2023'
}

export const date3 = (waktu) => {
	// Format input tanggal
	const inputDateString = waktu;
	const inputDate = new Date(inputDateString);

	// Mendapatkan jam dan menit
	const hours = inputDate.getUTCHours();
	const minutes = inputDate.getUTCMinutes();

	// Mengonversi ke format "HH:MM"
	const formattedTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes;

	return formattedTime;

	// convert  Fri, 27 Oct 2023 05:00:00 GMT menjadi 05:00
};

export const date4 = (tanggal) => {
	const parsedDate = new Date(tanggal);
	const formattedDate = `${parsedDate.getDate().toString().padStart(2, '0')}-${(
		parsedDate.getMonth() + 1
	)
		.toString()
		.padStart(2, '0')}-${parsedDate.getFullYear()}`;

	return formattedDate;

	// convert from Fri, 05 May 2023 00:00:00 GMT to 05-05-2023
};

export const date5 = (waktu) => {
	// Format input tanggal
	const inputDateString = waktu;
	const inputDate = new Date(inputDateString);

	// Mendapatkan jam, menit, dan detik
	const hours = inputDate.getUTCHours();
	const minutes = inputDate.getUTCMinutes();
	const seconds = inputDate.getUTCSeconds();

	// Mengonversi ke format "HH:MM:SS"
	const formattedTime =
		(hours < 10 ? '0' : '') +
		hours +
		':' +
		(minutes < 10 ? '0' : '') +
		minutes +
		':' +
		(seconds < 10 ? '0' : '') +
		seconds;

	return formattedTime;
};

export const getThreeDays = () => {
	const currentDate = new Date();

	// Buat array untuk menyimpan 3 tanggal terakhir, termasuk hari ini
	let threeDaysArray = [];

	// Loop untuk menghasilkan 3 tanggal terakhir, termasuk hari ini
	for (let i = 0; i < 3; i++) {
		// Dapatkan tahun, bulan, dan tanggal dalam bentuk YYYY-MM-DD
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');
		const formattedDate = year + '-' + month + '-' + day;

		// Tambahkan tanggal ke dalam array
		threeDaysArray.push(formattedDate);

		// Kurangkan 1 hari dari tanggal saat ini
		currentDate.setDate(currentDate.getDate() - 1);
	}

	return threeDaysArray;
	// [ '2023-11-04', '2023-11-03', '2023-11-02' ]
};

export const getTomorrow = () => {
	const months = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember'
	];

	// Buat objek tanggal untuk tanggal hari ini
	const today = new Date();

	// Tambahkan 1 hari ke tanggal hari ini untuk mendapatkan tanggal besok
	today.setDate(today.getDate() + 1);

	// Dapatkan tanggal besok dalam format "DD NamaBulan YYYY"
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = months[today.getMonth()];
	const yyyy = today.getFullYear();

	const tomorrow = dd + ' ' + mm + ' ' + yyyy;

	return tomorrow;
	// 05 November 2023
};

export const konversiTahunBulan = (angkaDesimal) => {
	// Menghitung jumlah bulan dari angka desimal
	const totalBulan = Math.floor(angkaDesimal * 12);

	// Menghitung tahun dan bulan
	const tahun = Math.floor(totalBulan / 12);
	const bulan = totalBulan % 12;

	return tahun + ' Tahun ' + bulan + ' Bulan';
	// Konversi 5.5 menjadi 5 Tahun 6 Bulan
};

export function convertDate(tanggal) {
	const date = new Date(tanggal);
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const result = date.toLocaleDateString('id-ID', options);
	return result;
	// 'Senin, 20 Februari 2023'
}

export const getBefore4Day = () => {
	var dateArray = [];

	for (let i = 0; i < 4; i++) {
		let date = new Date();
		date.setHours(date.getHours() + 8);
		date.setDate(date.getDate() - i);
		dateArray.push(date.toISOString().slice(0, 10));
	}
	return dateArray;
	// [ '2023-05-09', '2023-05-08', '2023-05-07', '2023-05-06' ]
};

export const date6 = (tanggal) => {
	var dateObj = new Date(tanggal);
	var day = dateObj.getUTCDate();
	var month = dateObj.getUTCMonth() + 1; // Menggunakan "+1" karena bulan dimulai dari 0 (Januari=0, Februari=1, dst.)
	var year = dateObj.getUTCFullYear();

	// Mengatur format tanggal
	var formattedDate = day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
	return formattedDate;

	// convert Thu, 23 Feb 2023 00:00:00 GMT to 23/02/2023
};