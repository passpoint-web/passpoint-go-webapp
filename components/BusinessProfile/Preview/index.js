"use client";
// import { days } from "@/utils/CONSTANTS";
import { useState, useEffect, useRef } from "react";
// import functions from "@/utils/functions";
import PreviewNav from "./PreviewNav";
import PreviewMain from "./PreviewMain";
import PreviewFooter from "./PreviewFooter";
import { publicProfile } from "@/services/restService";
import { getCredentials } from "@/services/localService";
import FullScreenLoader from "@/components/Modal/FullScreenLoader";

const PreviewPage = () => {

	const previewRef = useRef()

	const [dataLoading, setDataLoading] = useState(true)
	const [savedCredentials, setSavedCredentials] = useState();
	const [pubProfile, setPubProfile] = useState({})
	const [fullScreen, setFullScreen] = useState(false)

	const getPubProfile = async () => {
		try {
			const response = await publicProfile.getPublicProfile()
			// console.log(response.data.data)
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
				<PreviewNav togglePreview={togglePreview} data={{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }} />
				<PreviewMain data={{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }} />
				<PreviewFooter data={{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }} />
			</div>
		</>
	)
};

export default PreviewPage;
