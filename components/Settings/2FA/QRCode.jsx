// import { useQRCode } from 'next-qrcode';
import CopyInputValue from '@/components/Copy/CopyInputValue';
import Image from 'next/image';

const QRCode = ({styles, qr}) => {
	// const { Canvas } = useQRCode();

	return (

		<div className={styles.scan_sec}>
			<div className={styles.qr_code}>
				<p>Scan QR code</p>
				<div className={styles.qr_code_ctn}>
					<div className={`${styles.sm_boxes} ${styles.tl}`} />
					<div className={`${styles.sm_boxes} ${styles.tr}`} />
					<div className={`${styles.sm_boxes} ${styles.bl}`} />
					<div className={`${styles.sm_boxes} ${styles.br}`} />
					{qr['2FaQrCodeLink'] ?
						<Image src={qr['2FaQrCodeLink']}
							width={180}
							height={180}
							alt={'QR-code'}
						/> : <div className='skeleton'
							style={{width: 180, height: 180}} />
					}
				</div>
			</div>
			<div className={styles.copy_code}>
				<p>Or copy the code below</p>
				<CopyInputValue value={qr.secret}
				/>
			</div>
		</div>
	)
}

export default QRCode
