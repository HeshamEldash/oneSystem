import React from 'react'
import Slot from './Slot'
import { formatDate } from './utils/datetimeUtils'

function Session({sessionDetails}) {

formatDate(sessionDetails.start)
    
  return (
    <div>
    <div className='session_header'>

        <span>{formatDate(sessionDetails.start).dateStr}  </span>
        <span>  {formatDate(sessionDetails.start).timeStr}</span>

    </div>
        {sessionDetails?.slot_set?.map((slot)=>{
            return <Slot
                key = {slot.id}
                slotDetails ={ slot}
            />
        })}
    </div>
  )
}

export default Session
