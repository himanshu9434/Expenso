import {useState} from "react"

export const useLoading =()=>{
    const [loading, setLoading] = useState(false)
    
    function setLoad(){
        setLoading(true)
    }

    function unsetLoad(){
        setLoading(false)
    }

    return [loading,setLoad,unsetLoad]
}