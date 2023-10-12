import styles from "../Preview/public-profile-preview.module.css";

const PreviewLogo = ({ logo }) => {
  return (
    <div className={`${styles.preview__logo}`} >
      <img src={logo} alt="" />
    </div>
  )
};

export default PreviewLogo;
