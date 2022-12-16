import { useState,useRef, useEffect } from 'react'
import { useContext } from 'react'
import headingContext from './context'
import './dimensions-metrics.css'

const headings = [{ heading:"Date",value:"Date"},{heading:"App",value:"App"},{heading:"Ad Requests" , value:"Requests"},{heading:"Ad Response" ,value:"Responses"},{heading:"Impression"  ,value:"Impressions" },{heading:"Clicks"  ,value:"Clicks"},{heading:"Revenue" ,value:"Revenue"},{heading:"Fill Rate"  ,value:"Fill rate"},{heading: "CTR", value:"CTR"}]


export default function DimensionsMetrics(props) {
  
  const{displayDim,setDim}=props//COLUMN FILTER TAB VISIBILITY
  const[dimHeadings,setDimheading]=useState(headings)// SETTING COLUMN TOPICS
  const context=useContext(headingContext)
  const[hiddenHeadings,setHidden]=useState([])//FILTERED HIDDEN COLUMN TOPICS
  const displayDimensionMetrics= displayDim ? "dimensions-metrics show" : "dimensions-metrics"
  
  useEffect(()=>{
    const filteredHeading=dimHeadings.filter(h => !hiddenHeadings.includes(h.heading))
    context.changeHeading(filteredHeading)

  },[hiddenHeadings,dimHeadings])
  

  
  
  //save reference for dragItem and dragOverItem
	const dragItem = useRef(null)
	const dragOverItem =useRef(null)
  const dragStart=(e,index)=>{
     
      dragItem.current=index
  }
  const dragEnter=(e,index)=>{
  
    dragOverItem.current=index
  }

  const dragEnd=() =>{

    const dimMetrics=[...dimHeadings]
    const draggedItem=(dimMetrics.splice(dragItem.current,1))
    dimMetrics.splice(dragOverItem.current,0,draggedItem[0])
    setDimheading(dimMetrics)
    
    dragItem.current=null;
    dragOverItem.current=null;
  }
  const applyChange=()=>{setDim(false)}

  const filterData=(e) =>{
    const element=e.target.innerHTML
    const status=e.target.classList.toggle("border-blue")
    if (status===true){
        const filtered=hiddenHeadings.filter(h => h!==element)
        setHidden([...filtered])
        
    }
    else if (status===false){
      setHidden(prevState => [...prevState,element])

    }
  }


  return (
    <div className={displayDimensionMetrics}>
         <h3>Dimensions and Metrics</h3>
         <div>
          {
            dimHeadings.map((heading,index) => { 
            const style= hiddenHeadings.includes(heading.heading) ?  "card" : "card border-blue"
            return(<div className={style} key={index} draggable onDragStart={(e) => dragStart(e,index)} onDragEnter={(e) => dragEnter(e,index)}  onDragEnd={ dragEnd} onClick={filterData}>
            {heading.heading}</div>)}
            )
          }
          
         </div>
         <div>
            <button className='close-button' onClick={()=>setDim(false)}>
                Close
            </button>
            <button className='apply-changes' onClick={applyChange}>
                Apply Changes
            </button>
         </div>
      </div>
  )
}
