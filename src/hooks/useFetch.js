import { useState,useEffect } from 'react'

export const useFetch = ( url='', method='GET', body={} ) => {

    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchBody = JSON.stringify(body);

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    const paramsGet = {
        method,
        headers
    }

    const params = {
        method,
        body:fetchBody,
        headers
    }
    
    const fetchData = async () =>{
        try {
            const response = await fetch( url, method === 'GET' ? paramsGet : params );
            const fetchData = await response.json();
            setIsLoading(false)
            setData(fetchData)
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
        }
    }
    
    useEffect(() => {
      fetchData()
    }, [])
    


    return { isLoading, isError, data }
}
