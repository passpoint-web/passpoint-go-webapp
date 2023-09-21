import React from "react";
import styles from '@/assets/styles/auth-screens.module.css'
import PasspointLogo from "./Passpoint/Logo";
import ProductStage from "./ProductStage";


const Logo = () => {
  return (
    <div className={styles.lhs}>
      <PasspointLogo />
      <ProductStage stage="beta" />
    </div>
  );
};

export default Logo;
