import { useState } from 'react';
import TableData from './components/table-data';
import headingContext from './components/context';
import DatePicker from './components/date-picker'//date code snippet
import { GoSettings} from "react-icons/go";//setting icon
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DimensionsMetrics from './components/dimensions-metrics';
import './App.css'



function App() {
  const[displayDim,setDim]=useState(false)
  const[heading,setHeading]=useState()
  const onChangeHeading = (heading) =>{setHeading([...heading])}

  return (
    <div className='app'>
      <h1>Analytics</h1>
      {/*ReactContext*/}
      <headingContext.Provider value={{heading: heading,changeHeading : onChangeHeading}} >
      <div className='setting-calender'>
        <DatePicker/>
        <button onClick={()=>{setDim(prevState => !prevState)}}>
        <GoSettings style={{
            color:"blue",
            transform: 'rotate(270deg)',
            marginRight:"3px",
        }}/> <span>Settings</span> </button>
      </div>
      <DimensionsMetrics displayDim={displayDim} setDim={setDim}/>
      <TableData/>
      </headingContext.Provider>
    </div>

  )
}

export default App;
