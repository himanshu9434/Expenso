import { createMuiTheme,responsiveFontSizes } from '@material-ui/core/styles';
import React , {useState} from "react"
import { green , blue , grey} from '@material-ui/core/colors';

export const useTheme = () => {
    const [primary, setprimary] = useState("#81c784")
    const [secondary, setsecondary] = useState("#2979ff")
    const [background, setbackground] = useState("#e8f5e9")
    const [paper, setpaper] = useState("#fafafa")
    const [colorText, setcolorText] = useState("#000000")
    let theme = createMuiTheme({
        palette : {
            background : {
                default : background,
                paper : paper,
            },
            primary: {
                main : primary,
            },
            secondary : {
                main : secondary,
            },
            text : {
                primary : colorText
            }

        },
    })
    
    theme = responsiveFontSizes(theme);
    theme.typography.h6 = {
        fontSize: '1.5rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1rem',
        },
      };
      return [theme,primary,setprimary,secondary,setsecondary,paper,setpaper,background,setbackground,colorText,setcolorText]
}