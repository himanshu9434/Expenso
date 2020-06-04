import { useState , useEffect, useCallback } from "react"
import {useTheme} from "../../theme"

export const useAuth = () => {
    const [userId, setuserId] = useState()
    const [userName, setuserName] = useState()
    // const [token, settoken] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [theme,primary,setprimary,secondary,setsecondary,paper,setpaper,background,setbackground,colorText,setcolorText] = useTheme()

    const [utilities , setUtilities] = useState({
        expense_categories : [],
        expense_modes : [],
        income_modes : []
    })

    const setUtility = (utility)=>{
        setUtilities(utility)
    }
    const login = useCallback((userId,userName,theme) => {
        // settoken(token)
        setuserId(userId)
        setuserName(userName)
        setIsLoggedIn(true)
        setprimary(theme.primary)
        setsecondary(theme.secondary)
        setpaper(theme.paper)
        setbackground(theme.background)
        setcolorText(theme.text)
        localStorage.setItem(
            'userData',JSON.stringify({
            userId,
            userName,
            theme
            // token
            })
        )

    },[])

    const logout = useCallback(()=>{
        // settoken(null)
        setuserId(null)
        setuserName(null)
        setIsLoggedIn(false)
        setprimary("#81c784")
        setsecondary("#2979ff")
        setpaper("#fafafa")
        setbackground("#e8f5e9")
        setcolorText("#000000")
        localStorage.removeItem('userData')
    },[])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (storedData && storedData.userId){
            const {userId,userName,theme} = storedData
            login(userId,userName,theme)
        }
    }, [login])

    return [isLoggedIn,userName,userId,login,logout,toggle,setToggle,utilities,setUtility,theme,primary,setprimary,secondary,setsecondary,paper,setpaper,background,setbackground,colorText,setcolorText]
}