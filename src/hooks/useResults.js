import { useEffect,useState } from 'react'
import yelp from '../api/yelp'

export default  () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    
    const searchAPI = async searchTerm => {
        try {
            const res = await yelp.get('/search', {
                params: {
                    term: searchTerm,
                    limit: 50,
                    location: 'san jose'
                }
            })
            setResults(res.data.businesses)
        
        } catch (e) {
            setErrorMessage('Something went wrongng')      
        }
    }
    
    useEffect(() => {
        searchAPI('pasta')
    }, [])

    return [ results, errorMessage, searchAPI ];
}