import {useEffect, useState} from 'react'
import { DateRange } from 'react-date-range';
import { FaCalendarAlt } from "react-icons/fa";
import './date-picker.css'

export default function DatePicker() {
      const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const[displaycalender,setCalender]=useState(false)
      const[date,setDate]=useState()
      useEffect(() =>{
        state.map(e => {
            setDate({
                startDate:e.startDate.getDate(),
                endDate:e.endDate.getDate(),
                startMonth: e.startDate.toLocaleString('default', { month: 'short' }),
                endMonth:e.endDate.toLocaleString('default', { month: 'short' }),
                startYear:e.startDate.getFullYear(),
                endYear:e.endDate.getFullYear()

            }) ;
            (e.startDate!==e.endDate) &&  setCalender(false)
        }
        )
       

      }

      ,[state])
      
   
    return (
      <div className='calender-container'>
        <div>
            <button className='button-calender'  onMouseEnter={() => setCalender(true)}>
            <FaCalendarAlt style={{color:"blue",marginRight:"3px"}} />
            <span>{date && `${date.startMonth} ${date.startDate} - ${date.endMonth} ${date.endDate}, ${date.endYear}`}</span>
            </button>
        </div>
        { displaycalender && (
          <div className="calender" ><DateRange
            editableDateInputs={true}
            onChange={item => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}/> 
          </div> )
        }
      </div>
  )
}


  
