"use client"
import PreviewMain from '@/components/BusinessProfile/Business/Main'
import {  useContext } from "react";
import { BusinessInfo } from '@/components/BusinessProfile/Business/BusinessLayout';
const PreviewPage = () => {
	const {data, styles} = useContext(BusinessInfo);
	return (
		<>
			<PreviewMain styles={styles} data={data} />
		</>
	)
};

export default PreviewPage;
