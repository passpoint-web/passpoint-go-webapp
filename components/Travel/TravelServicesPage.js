"use client";

import { BriefcaseIcon } from "@/constants/icons";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
// import Search from "../Custom/Search"
// import PrimaryLink from "../Link/Primary"
import MetricCard from "./MetricCard";
// import CustomSelect from '@/components/Custom/Select'
import CustomTable from "../Custom/Table";
const TravelServicesPage = ({ styles }) => {
  const travelServices = [
    {
      name: "Flights",
      link: "flights",
      icon: "✈️",
      description: "Book your flights here",
      active:true
    },
    {
      name: "Hotels",
      link: "hotels",
      icon: "🏨",
      description: "Coming soon",
      active: false
    },
    {
      name: "Airport Taxis",
      link: "taxis",
      icon: "🚕",
      description: "Coming soon",
      active: false
    },
    {
      name: "Logistics",
      link: "logitics",
      icon: "🚚",
      description: "Coming soon",
      active: false
    },
  ];

  return (
    <div className={`${styles.inner} travel-services`}>
      <div className={styles.travel__dashboard_header}>
        <div className={styles.row_one}>
          <div>
            <h3>Travel Services</h3>
            <p>Kindly select your preferred service</p>
          </div>
          {/* <Link className="primary_btn" href="/dashboard/travel/manage">
            <BriefcaseIcon />
            Manage Services
          </Link> */}
        </div>
        <div className={styles.row_two}>
          {travelServices.map((t, id) => (
            <Link key={id} className={`${!t.active ? styles.in_active : ''}`} href={`/dashboard/travel/${t.active ? t.link : '#'}`}>
              <div>
                {t.icon}
                <h4>{t.name}</h4>
                <span>{t.description}</span>
              </div>
              {t.active ? <FaArrowRight /> : <></>}
            </Link>
          ))}
        </div>
      </div>
      <MetricCard />
      {/* <CustomTable action="/dashboard/travel/flights?id=AH12345678" /> */}
    </div>
  );
};

export default TravelServicesPage;
