"use client"
import PreviewFooter from '@/components/BusinessProfile/Business/Footer'
import PreviewNav from '@/components/BusinessProfile/Business/Nav'
// import { days } from "@/utils/CONSTANTS";
import { useState, useEffect, useRef, createContext } from "react";
// import functions from "@/utils/functions";
import { publicProfile } from "@/services/restService";
import styles from '@/components/BusinessProfile/Business/public-profile-preview.module.css'
import { getCredentials } from "@/services/localService";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";
export const BusinessInfo = createContext(null);
const BusinessProfileLayout = ({children}) => {
	const previewRef = useRef()

	const [dataLoading, setDataLoading] = useState(true)
	const [savedCredentials, setSavedCredentials] = useState();
	const [pubProfile, setPubProfile] = useState({})
	const [fullScreen, setFullScreen] = useState(false)

	const getPubProfile = async () => {
		try {
			const response = await publicProfile.getPublicProfile()
			console.log(response)
			setPubProfile(response.data.data)
		} catch (_err) {
			console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}

	const togglePreview = () => {
		const element = previewRef.current
		setFullScreen(!fullScreen)
		if (!fullScreen) {
			openFullScreen(element)
		} else {
			closeFullScreen()
		}
	}

	const openFullScreen = (element) => {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		}else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		}else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		}else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	}
	const closeFullScreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}

	useEffect(() => {
		getPubProfile()
		setSavedCredentials(getCredentials());
	}, [])

	return (
		<>
			{dataLoading ? <FullScreenLoader /> : <></>}
			<div className="p-relative" ref={previewRef}>
				<PreviewNav preview={false} styles={styles} togglePreview={togglePreview} data={{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }} />
				<BusinessInfo.Provider value={{styles, data:{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }}}>
          {children}
        </BusinessInfo.Provider>
				<PreviewFooter styles={styles} data={{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }} />
			</div>
		</>
	)
};

export default BusinessProfileLayout;
