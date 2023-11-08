import PrimaryBtn from "../Btn/Primary"

const Pagination = ({ tableStyles, pagination, handlePaginationEvent }) => {
  return (
    <div className={tableStyles.table__pagination}>
      <div className={StyleSheet.lhs}>Showing {pagination.pageSize} items</div>
      <div className={StyleSheet.mhs}>
        Page {pagination.currentPage} of {pagination.totalPages}
      </div>
      <div className={StyleSheet.rhs}>
        <PrimaryBtn
          text="Previous Page"
          type="secondary"
          disabled={pagination.first}
          onClick={() => handlePaginationEvent("-")}
        />
        <PrimaryBtn
          text="Next Page"
          type="secondary"
          disabled={pagination.last}
          onClick={() => handlePaginationEvent("+")}
        />
      </div>
    </div>
  )
}

export default Pagination
