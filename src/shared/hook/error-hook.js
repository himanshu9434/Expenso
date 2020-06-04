import {useState} from "react"

export const useError =()=>{
    const [error, seterror] = useState(null)
    
    function errorSet(message){
        seterror(message)
    }

    function errorUnset(){
        seterror(null)
    }

    return [error,errorSet,errorUnset]
}