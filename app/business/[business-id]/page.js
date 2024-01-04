"use client"
import PreviewMain from '@/components/BusinessProfile/Business/Main'
// import { days } from "@/utils/CONSTANTS";
import { useState, useEffect } from "react";
// import functions from "@/utils/functions";
import { publicProfile } from "@/services/restService";
import styles from '@/components/BusinessProfile/Business/public-profile-preview.module.css'
import { getCredentials } from "@/services/localService";
const PreviewPage = () => {
	const [dataLoading, setDataLoading] = useState(true)
	const [savedCredentials, setSavedCredentials] = useState();
	const [pubProfile, setPubProfile] = useState({})
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
useEffect(()=>{
  setSavedCredentials(getCredentials())
  getPubProfile()
},[])

	return (
		<>
			<PreviewMain styles={styles} data={{ ...pubProfile, dataLoading, businessName: savedCredentials?.businessName }} />
		</>
	)
};

export default PreviewPage;
