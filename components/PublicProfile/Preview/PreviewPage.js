"use client";
import { usePathname, useRouter } from "next/navigation";
import { days } from "@/utils/CONSTANTS";
import { useState, useEffect } from "react";
import functions from "@/utils/functions";
import PreviewNav from "./PreviewNav";
import PreviewMain from "./PreviewMain";
import PreviewFooter from "./PreviewFooter";
import { publicProfile } from "@/services/restService";
import { getCredentials } from "@/services/localService";

const PreviewPage = ({ styles }) => {

	const [dataLoading, setDataLoading] = useState({})
	const [savedCredentials, setSavedCredentials] = useState();
	const [pubProfile, setPubProfile] = useState({})

	const getPubProfile = async () => {
		try {
			const response = await publicProfile.getPublicProfile()
			console.log(response.data.data)
			setPubProfile(response.data.data)
		} catch (_err) {
			console.log(_err)
		} finally {
			setDataLoading(false)
		}
	}

	useEffect(() => {
		getPubProfile()
		setSavedCredentials(getCredentials());
	}, [])

	return (
		<div className="p-relative">
			<PreviewNav data={{ ...pubProfile, dataLoading, businessName: savedCredentials.businessName }} />
			<PreviewMain data={{ ...pubProfile, dataLoading, businessName: savedCredentials.businessName }} />
			<PreviewFooter data={{ ...pubProfile, dataLoading, businessName: savedCredentials.businessName }} />
		</div>
	)
};

export default PreviewPage;
