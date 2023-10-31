"use client";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const virtualDetailsData = [
  {
    title: "Allocated funds",
    value: "₦ 200,000.00",
    cssType: "fund",
  },
  {
    title: "Account Name",
    value: "Temporary Account",
  },
  {
    title: "Account Number ",
    value: "0123456789",
  },
  {
    title: "Date Requested",
    value: "Oct 15, 2023,",
    time: "8:45 PM",
  },
  {
    title: "Date Issued",
    value: "Oct 15, 2023,",
    time: "8:45 PM",
  },
  {
    title: "Account Status",
    value: "Active",
    cssType: "status",
  },
];

const VirtualDetailsModal = ({
  setVirtualDetailsVisible,
  tabStyle,
  styles,
}) => {
  const router = useRouter();
  const path = usePathname();
  const tabs = ["General", "Transaction History"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const closeModal = () => {
    setVirtualDetailsVisible(null);
    router.push(path.substring(path.indexOf("?")));
  };
  return (
    <ModalWrapper
      loading={false}
      onClose={() => closeModal()}
      ctaBtnType="none"
      heading={"Virtual Account Details"}
      subHeading={"See all information about virtual account"}
      ctaBtnText="Modify"
      bottomCancelNeeded={false}
      containsTabLayout
      hasBottomActions={false}
    >
      <div className={tabStyle.modal__tab_group}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={tab === activeTab ? tabStyle.active : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab == tabs[0] && (
        <main className={styles.virtualDetail}>
          <section>
            {virtualDetailsData.map((item, i) => (
              <div key={i} className={styles.virtualDetail_general}>
                <label>{item.title}</label>
                <div>
                  <p className={`${styles[`${item.cssType}Css`]}`}>
                    {item.value} <span>{item.time}</span>
                  </p>
                </div>
              </div>
            ))}
          </section>
          <section></section>
        </main>
      )}

      {activeTab == tabs[1] && <main>History</main>}

      <div className={styles.virtualDetail_actions}>
        <button className="primary_btn">Deactivate</button>
        <button className="primary_btn">Fund Account</button>
      </div>
    </ModalWrapper>
  );
};

export default VirtualDetailsModal;
