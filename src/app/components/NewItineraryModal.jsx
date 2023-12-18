import { Inter_Tight } from 'next/font/google';
import React from 'react';

const initialState = {
  showModal: false
}

const NewItineraryModal = (props) => {

  const showModal = initialState.showModal

return (
  <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h4> Where are you going? </h4>
      </div>
      <div className="modal-body">
        <form>
          <input className="bg-white text-black p-2 rounded-lg border border-black" name="query" placeholder="Country or city"/>
          <button type="submit"> Enter Location</button>
        </form>      
        <form>
          <input className="bg-white text-black p-2 rounded-lg border border-black" name="query" placeholder="Date Range"/>
          <button type="submit"> Enter Date Range</button>
        </form>    
      </div>
    </div>
    <button> 
      Close
    </button>
  </div>
)
}

export default NewItineraryModal