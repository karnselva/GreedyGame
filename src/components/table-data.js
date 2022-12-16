import React, { useEffect, useState,useContext } from 'react'
import Table from './table'
import headingContext from './context'



export default function TableData() {
  const[analyticsData,setAnalyticsData]=useState()
  const[summationData,setSummation]=useState({})
  //setstate of summation of total request,responses,clicks,impressions respectively..
  const context=useContext(headingContext)
  const setSum=(key,sumOfData)=>{
        setSummation((prevState) => ({...prevState,[key]:sumOfData}))
  }
  //summation of total request,responses,clicks,impressions respectively..
  const reducedData =(data,key)=>{
     let sumOfData=data.reduce((n,d) => d[key]+n,0)
     setSum(key,sumOfData)
  }
  
  
  useEffect( () =>{
        async function fetchData(){
            const response= await fetch("http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03")
            const parseData= await response.json();
            const data=parseData.data;
            const appNameResponse= await fetch("http://go-dev.greedygame.com/v3/dummy/apps")
            const parseAppResponse=await appNameResponse.json();
            const appData=parseAppResponse.data;
            //round off of summation of total request,responses,clicks,impressions respectively..
            (Object.keys (data[0]).slice(2,7)).map(k => reducedData(data,k))
             setSummation((prevState) => ({...prevState,date:data.length,app:data.length,fillrate:"100%",ctr:"99.99%",
             revenue:`${Math.round(prevState.revenue/1000)}k`,
             clicks:`${Math.round(prevState.clicks/1000000)}M`,responses:`${Math.round(prevState.responses/1000000)}M`,
             requests:`${Math.round(prevState.requests/1000000)}M`,
             impressions:`${Math.round(prevState.impressions/1000000)}M`
            
            
            }))
            // changing date format,roundoff,finding appname from api response
            const finalData=data.map(d =>{
            let date=new Date(d.date)
            date=`${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
            //find appname using app id
            const appNameArray= appData.filter(appdata => appdata.app_id===d.app_id)
            let rate= (d.requests / d.responses) * 100
            let ctr=(d.clicks/d.impressions)*100
            let revenue=Math.round(d.revenue)
            rate=`${Math.round(rate*100)/100}%`
            ctr=`${Math.round(ctr*100)/100}%`
            const appName=appNameArray[0].app_name
                
            return{
                date:date,
                app:appName,
                requests:d.requests.toLocaleString(),
                responses:d.responses.toLocaleString(),
                impressions:d.impressions.toLocaleString(),
                clicks:d.clicks,
                revenue:`$${revenue}`,
                fillrate:rate,
                ctr:ctr
              }
            })
            setAnalyticsData([...finalData])
        }
       fetchData() 
       
    }
  
    ,[])
  return (
    <div>
       <Table analyticsData={analyticsData} heading={context.heading} summationData={summationData}/>
      
    </div>
  )
}
