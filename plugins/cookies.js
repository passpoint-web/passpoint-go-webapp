import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default () => {
	const inOneDay = 1
	const encKey = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_ENC_KEY : process.env.ENC_KEY;
	const cookiesFunc = Cookies.withAttributes({
		secure: true,
		sameSite: 'Strict',
		expires: inOneDay
	}).withConverter({
		read: function (value) {
			const decryptedValue = CryptoJS.AES.decrypt(
				value,
				encKey
			).toString(CryptoJS.enc.Utf8);
			return decryptedValue;
		},
		write: function (value) {
			const encryptedValue = CryptoJS.AES.encrypt(
				value,
				encKey
			).toString();
			return encryptedValue;
		},
	});
	return cookiesFunc;
};
