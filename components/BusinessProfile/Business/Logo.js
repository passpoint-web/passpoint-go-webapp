
'use client'
import Image from "next/image";
const PreviewLogo = ({ logo, styles }) => {
	return (
		<div className={`${styles?.preview__logo}`} >
			{logo ? <Image src={logo} alt="" width={100} height={100} /> : <></>}
		</div>
	)
};

export default PreviewLogo;
