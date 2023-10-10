"use client";
import { usePathname, useRouter } from "next/navigation";
import { days } from "@/utils/CONSTANTS";
import { useState, useEffect } from "react";
import functions from "@/utils/functions";
import PreviewNav from "./PreviewNav";
import PreviewMain from "./PreviewMain";
import PreviewFooter from "./PreviewFooter";

const PreviewPage = ({ styles }) => {
	return (
		<>
		<PreviewNav />
		<PreviewMain />
		<PreviewFooter />
		</>
	)
};

export default PreviewPage;
