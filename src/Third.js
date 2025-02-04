
import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import successImg from './Tick.png'
import failureImg from './error.png'
function LastPage() {
  const navigate=useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const message = queryParams.message || '';
  return (
<div>
    <div className='Heading'>
     <h1>cybersource</h1>
     <div class="vl"></div>
     <h5>Payment gateway</h5>
     <div className='res'>
     <h4>Response Page</h4>
     </div>
     </div>
    <div className='box4' >
   {message&&<>{message =='Payment failed !'?<img src={failureImg} className='failimage'  />:<img src={successImg}  className='successimage' />}</>}
      {message && <>{message =='Payment failed !'?<h6  className='failed' style={{color:'white'}}>{message }    </h6>:<h6 className='Success'  id='green' style={{color:'white' }}>{message  }
      </h6>}</>}


      < button className='Back' onClick={() => { navigate("/") }}  >Back To Home</button>
    </div>
    </div>
  );
}

export default LastPage;