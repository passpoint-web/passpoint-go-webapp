import styles from "./Auth/SignupLayoutLHS/signup-layout-lhs.module.css";

const FormLevel = ({ auth }) => {
  return (
    // <div
    // 	className={
    // 		`${styles.auth_level}
    // 		${mobileWidth === '1000' ? 'mobile_width_1000' : 'mobile_width_700'}
    // 		${auth?.active ? styles.active : ''}
    // 		${auth?.completed ? styles.completed : ''}`}
    // >
    <div
      className={`${styles.auth_level} 
				${auth?.active ? styles.active : ""} 
				${auth?.completed ? styles.completed : ""}`}
    >
      <div className={styles.lhs}>
        <div className={styles.round_ctn}>
          <div className={styles.round}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M1.75 7L5.25 10.5L12.25 3.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{auth?.level}</span>
          </div>
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.content}>
        <h3>{auth?.title}</h3>
        <p>{auth?.sub_title}</p>
      </div>
    </div>
  );
};

export default FormLevel;
