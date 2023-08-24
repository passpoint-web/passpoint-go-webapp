import styles from './modal.module.css'
import Image from 'next/image'
const FullScreenLoader = ({loadingText}) => {
	return (
		<div className={styles.overlay_screen}>
			<div className={styles.content}>
				<div className={styles.loader_ctn}>
					<Image src={'/passpoint.png'} width={'35'} height={'50'} alt="full-screen-loader" />
				</div>
				{loadingText ? <p className={styles.sm_title}>{ loadingText }</p> : <></>}
			</div>
		</div>
	)
}

export default FullScreenLoader
