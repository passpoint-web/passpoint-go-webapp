"use client";
import { useSearchParams } from "next/navigation";
import VirtualHome from "./VirtualHome";
import VirtualTable from "./VirtualTable";
import styles from "./virtual-account.module.css";
import tabStyle from "../../../assets/styles/flight.module.css";
import { useEffect } from "react";
import VirtualDetailsModal from "./VirtualDetailsModal";
import { useState } from "react";

const VirtualAccount = () => {
  const searchParams = useSearchParams();
  const [virtualDetailsVisible, setVirtualDetailsVisible] = useState(null);

  useEffect(() => {
    if (searchParams.get("vat")) {
      setVirtualDetailsVisible(searchParams.get("vat"));
    }
  }, [searchParams]);

  return (
    <div>
      <VirtualHome styles={styles} />
      <VirtualTable
        title="virtual account"
        action="/wallet/virtual-account?vat=1"
      />
      {virtualDetailsVisible && (
        <VirtualDetailsModal
          tabStyle={tabStyle}
          styles={styles}
          setVirtualDetailsVisible={setVirtualDetailsVisible}
        />
      )}
    </div>
  );
};

export default VirtualAccount;
