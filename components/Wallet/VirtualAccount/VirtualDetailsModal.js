"use client";
import ModalWrapper from "@/components/Modal/ModalWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const virtualDetailsData = [
  {
    title: "Allocated funds",
    result: "2,000,000.00",
    cssType: "fund",
  },
  {
    title: "Account Name",
    result: "2,000,000.00",
    cssType: "fund",
  },
  {
    title: "Account Number ",
    result: "2,000,000.00",
    cssType: "fund",
  },
  {
    title: "Date Requested",
    result: "2,000,000.00",
    cssType: "fund",
  },
  {
    title: "Date Issued",
    result: "2,000,000.00",
    cssType: "fund",
  },
  {
    title: "Account Status",
    result: "2,000,000.00",
    cssType: "fund",
  },
];

const VirtualDetailsModal = ({
  setVirtualDetailsVisible,
  tabStyle,
  styles,
}) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("vat");
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
              <div className={`${styles.virtualDetail_general}`}>
                <label>{item.title}</label>
                <div>
                  <p>{item.result}</p>
                </div>
              </div>
            ))}
          </section>
          <section></section>
        </main>
      )}

      {activeTab == tabs[1] && <main>History</main>}
    </ModalWrapper>
  );
};

export default VirtualDetailsModal;
