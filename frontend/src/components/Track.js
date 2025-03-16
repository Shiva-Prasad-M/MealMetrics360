import React from 'react'
import Piechart from './Piechart'
import PredictSalesForm from './PredictSalesForm'
import FrequentUsersSales from './FrequentUsersSales'
import MenuComponent from './MenuComponent'
import RecommendItems from './RecommendItems';
const Track = () => {
  return (
    <>
    

         <div style={{marginTop:'100px'}}>
         <img src="https://tse2.mm.bing.net/th?id=OIP.nAJZME18Hgt2Kv2H5ZeK_gHaCv&pid=Api&P=0&h=180" alt="Description" />

    
         </div>
    <div>
    <RecommendItems/>
    </div>
    <div>
        <MenuComponent/>
    </div>
    <div>
    <PredictSalesForm/>
    </div>
    <div><Piechart/></div>
      <FrequentUsersSales/>
      
     
    <div>
      <h1>

       
      <div style={{ color: 'green', marginTop: '100px',marginBottom:'30px'}}>
  Tracking is going on
         
</div>
</h1>
        <img src="https://tse4.mm.bing.net/th?id=OIP.BS-ypnd6urhhdgbtavtK-gHaD_&pid=Api&P=0&h=180" alt="Description" />

      
    </div>
    
    

    </>
  )
}

export default Track
