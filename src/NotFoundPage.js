import React, {useEffect } from 'react'
import {useHistory}  from "react-router-dom"

export default function NotFoundPage() {
    const history = useHistory()
        useEffect(()=>{
            setTimeout(()=>{
                history.push("/")
            },2000)
        },[])
        return (
            <div>
                <h2>Url NOT FOUND. Redirecting to Home Page</h2>
            </div>
        )
}
