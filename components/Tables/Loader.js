
import functions from "@/utils/functions"
import tableStyles from '@/assets/styles/table.module.css'
const TableLoader = ({colLength = 5, rowLength = 5}) => {
  const Loader = () => (
    <div 
      className="skeleton"
      style={{ borderRadius: 5 , height: 20, boxShadow: "none", margin: '0 5px' }}
    />
  )
  const {makeNumArr} = functions
  return (
    <table>
      <thead>
        <tr className="table__header">
          {
            makeNumArr(rowLength).map((_r, id)=>(
              <th key={id}>
                <Loader />
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {makeNumArr(colLength).map((_c, id) => (
          <tr key={id}>
            {
              makeNumArr(rowLength).map((_r, id) => (
                <td key={id} className={tableStyles.td_3}>
                <Loader />
                </td>
              ))
            }
          </tr>
        ))}
      </tbody>
  </table>
  )
}

export default TableLoader
