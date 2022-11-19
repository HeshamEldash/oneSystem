import { formatTimeStr } from 'antd/lib/statistic/utils';
import React, {useRef, useEffect} from 'react'
import { formatMinutes, formatTime } from './utils/datetimeUtils';

function Slot({slotDetails}) {
    const ref = useRef(null);
     
      useEffect(() => {
        // 👇️ use document.getElementById()
        const el = document.getElementById('my-slot');
   
    
        // 👇️ (better) use a ref
        const el2 = ref.current;
 
        
        el2.addEventListener("contextmenu", (event) => {
            
            event.preventDefault();
          });

          
      }, []);

  return (
    <div ref={ref} id="slot" className='slot'>
      <div className='slot__date-timebox'>
      <span>start:{ formatTime(slotDetails.planned_start)}</span>
      <span>{formatMinutes(slotDetails.slot_duration)} mins</span>
    
      
      
      </div>
    </div>
  )
}

export default Slot
