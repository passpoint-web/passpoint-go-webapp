import Select from "@/components/Dashboard/Select"
import functions from "@/utils/functions"
import { useEffect, useState } from "react"
const Pagination = ({tableStyles, pagination, handleEntry, setPage}) => {
	const {makeNumArr} = functions
	// :current-page-total="pagination.pageDataLength
	// totalData
	// pagination.pageDataLength
	// limit
	// totalPages
	// currentPage
	const limits = [
		5, 10, 20, 30
	]
	// current page start previous page * limit + 1
	function currentPageStart() {
		return (pagination.currentPage - 1) * pagination.limit + 1
	}
	// current page start + current page total
	function currentPageStop() {
		return currentPageStart() + pagination.pageDataLength - 1
	}

	const doubleDigits = (val) => val.toString().padStart(2, '0')

	const [prevPage, setPrevPage] = useState(null)
	const [nextPage, setNextPage] = useState(null)

	useEffect(()=>{
		setPrevPage(pagination.currentPage > 1 ? pagination.currentPage - 1 : null)
		setNextPage(pagination.currentPage < pagination.totalPages ? pagination.currentPage + 1 : null)
	},[pagination.currentPage, pagination.totalPages])

	useEffect(()=>{
		// console.log('current', pagination.currentPage)
		// console.log('total', pagination.totalPages)
		// console.log('---------')
	}, [prevPage, nextPage, pagination.currentPage, pagination.totalPages])
	const Break = ({breakPage}) => (
		breakPage ? <p>..</p> : <></>
	)
	const Entries = () => (
		<div className={tableStyles.lhs}>
			<Select
				selectPlaceHolder='Entries'
				styleProps={{
					option: {
						height: 35
					},
					dropdown: {
						height: 120
					}
				}}
				dropDownTop
				selectOptions={limits}
				selectedOption={pagination.limit}
				emitSelect={(val)=>handleEntry(val)}
			/>
		</div>
	)

	const OtherPages = () => (
		<div className={tableStyles.page_btns}>
			<button
				onClick={()=>setPage(1)}
				disabled={pagination.currentPage === 1}
				className={`${pagination.currentPage === 1 ? tableStyles.current_page : ''}`}
			>
          01
			</button>

			<Break breakPage={pagination.currentPage !== 2 && pagination.currentPage !== 1 && prevPage !== 2}/>

			{
				prevPage && prevPage !== 1 ?
					<button onClick={()=>setPage(prevPage)}>
						{ doubleDigits(prevPage) }
					</button> : <></>
			}
			{pagination.currentPage !== 1 ?
				<button disabled={pagination.currentPage}
					className={`${pagination.currentPage ? tableStyles.current_page : ''}`}
					onClick={()=>setPage(pagination.currentPage)}>
					{ doubleDigits(pagination.currentPage) }
				</button> : <></>}
			{nextPage && nextPage !== pagination.totalPages ?
				<button onClick={()=>setPage(nextPage)}>
					{ doubleDigits(nextPage) }
				</button> : <></>}

			<Break breakPage={	nextPage !== pagination.totalPages - 1 &&
      nextPage !== pagination.totalPages &&
      prevPage !== pagination.totalPages - 1 &&
      pagination.currentPage !== pagination.totalPages}/>
			{pagination.totalPages !== 1 && nextPage !== 0 && pagination.currentPage !== pagination.totalPages ?
				<button disabled={pagination.currentPage === pagination.totalPages}
					onClick={()=>setPage(pagination.totalPages)}
					className={`${pagination.currentPage === pagination.totalPages ? tableStyles.current_page : ''}`}
				>
					{doubleDigits(pagination.totalPages)}
				</button> : <></>}
		</div>
	)

	const Analytics = () => (
		<div className={tableStyles.mhs}>Showing { pagination.pageDataLength ? currentPageStart() : 0 } to { pagination.pageDataLength ? currentPageStop() : 0 } {pagination.pageSize} items of {pagination.totalData} results found
		</div>
	)


	const Pagination = () => (
		<div className={tableStyles.rhs}>
			{/* <button className={tableStyles.nav}>
				{'<<'}
			</button> */}
			<button disabled={pagination.currentPage === 1}
				className={tableStyles.nav}
				onClick={()=>setPage(pagination.currentPage - 1)}>Prev
			</button>
			{pagination.totalPages <= 5 ?
				<div className={tableStyles.page_btns}>
					{
						makeNumArr(pagination.totalPages).map((page)=>(
							<button key={page}
								onClick={()=>setPage(page)}
								disabled={pagination.currentPage === page}
								className={`${pagination.currentPage === page ? tableStyles.current_page : ''}`}
							>
								{doubleDigits(page)}
							</button>
						)
						)}
				</div> :
				<>
					{OtherPages()}
				</>
			}
			<button className={tableStyles.nav}
				disabled={pagination.currentPage === pagination.totalPages}
				onClick={()=>setPage(pagination.currentPage + 1)}>Next
			</button>

			{/* <button className={tableStyles.nav}>
				{'>>'}
			</button> */}
		</div>
	)
	return (
		<div className={`${tableStyles.table__pagination} ${tableStyles.wallet}`}>
			{Entries()}
			{Analytics()}
			{Pagination()}
		</div>
	)
}

export default Pagination
