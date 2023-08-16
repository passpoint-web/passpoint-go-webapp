import styles from '@/assets/styles/auth-header.module.css'
const ProductStage = ({stage}) => {
  return (
    <span className={styles.product_stage}>
      {stage}
    </span>
  )
}

export default ProductStage
