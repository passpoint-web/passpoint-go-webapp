
const Pagination = ({tableStyles, pagination}) => {
  return (
    <div className={tableStyles.table__pagination}>
      <div className={StyleSheet.lhs}></div>
      <div className={StyleSheet.mhs}>
      Showing {pagination.pageSize} items out of {pagination.totalCount} results found
      </div>
      <div className={StyleSheet.rhs}></div>
    </div>
  )
}

export default Pagination
