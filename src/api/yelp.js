import axios from 'axios'; 

export default axios.create({
    baseURL :'https://api.yelp.com/v3/businesses',
    headers :{ 
        Authorization : 'Bearer QndbtBEEF9n50JL5Z6BEou96Ev8vBhq3uJ-dBYqVFCSWf6MOPhXlS8SBDPImxB9C-3Gvu1c7U_YUxT73wZUr6sVSJH0A6C1mdIR5qD9ot1VL3ybwirYtpTxM-cNnXXYx'
    }
});