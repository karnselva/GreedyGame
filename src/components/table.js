import { useState } from "react";
import {FiFilter} from "react-icons/fi";
import './table.css'

export default function Table(props) {
  const {heading,analyticsData,summationData}=props;

  return (
    <table>
      <thead>
       <tr>
        { heading && heading.map( (head,index) =>
        <TableHeading value={head.value} key={index} summationData={summationData}/>
        )}
       </tr>
      </thead>
      <tbody>
        {heading && analyticsData && analyticsData.map((data,index) =>
        <TableRow row={data} heading={heading} key={index} />
        )}
      </tbody>
    </table>
    
  )
}
//column
const TableHeading=({value,summationData}) => {
  const[appDisplay,setApp]=useState(false)
  const range=(e,value) =>{
    if (value==="App"){
      setApp(prev=> !prev)
      console.log(value)
    }
  }
  console.log(value)
  let key=value.toLowerCase().replaceAll(" ","")

  return (
      <th className="column-heading">
      <FiFilter onClick={(e)=> range(e,value)}/> <br/> {value}
      {key in summationData && <p>{summationData[key]}</p>}
      { appDisplay && (
        <div className="app-filter">
            <h5>select App</h5>
            <input type="search" placeholder="Search"/>
            <p>App A </p>
            <p>App B </p>
            <p>App C </p>
            <button onClick={() =>{setApp(prev=> !prev)}}>Apply</button>
        </div>)
      }
      </th>)


}
//row
const TableRow=({row,heading}) =>(
  <tr>
    { heading.map
     ( (head) =>
        {
          let keys=head.value.toLowerCase()
          keys=keys.replaceAll(" ","")

          if (keys in row){
            const content=row[keys]
            return <td>{content}</td>
          }
        }
      ) 
    }
  </tr>

)



