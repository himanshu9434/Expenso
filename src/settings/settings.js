import React , {useState,useContext,useEffect} from "react"
import axios from "axios"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useSnackbar} from "../shared/hook/snackbar-hook"
import Snackbars from "../shared/UIElements/snackbar"
import {useLoading} from "../shared/hook/loading-hook"
import LinearProgress from '@material-ui/core/LinearProgress';
import {AuthContext} from  "../shared/context/auth-context"
import {red,pink,purple,deepPurple,indigo,lightBlue ,cyan ,blue, green , lightGreen,lime,yellow,amber,orange,brown , grey} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root : {
        position:"absolute",
        marginLeft: "70px",
        [theme.breakpoints.down('xs')]: {
            marginLeft : "0px"
    },
    },
  container: {
      padding : theme.spacing(1)

  },
  appBarSpacer: theme.mixins.toolbar,
  paper : {
      margin : theme.spacing(0,"auto"),
      padding : theme.spacing(2),
      width : "50%",
      [theme.breakpoints.down('sm')] :{
        width : "100%"
      }
  },
  gridContainer :{
    width : "100%"
  },
  gridItem : {
    width : "100%",
    padding : theme.spacing(1)
  },
  expansionPanel :{
      marginBottom : theme.spacing(3)
  },
  listContainer : {
    width : "100%"
  },
  listItem : {
    width : "100%"
  },
  formControl : {
    width : "100%",
    marginBottom : theme.spacing(3),
  },
  input : {
    width : "100%",
    marginBottom : theme.spacing(3)
  },
  button : {
      width :"49%",
      display : "inline-block",
      margin : theme.spacing(0.1)
  },
  colorContainer : {
    width : "100%"
  },
  color : {
    textAlign: "center",
    display:"inline-block",
    height : "2.5rem",
    width : "2.5rem",
    cursor : "pointer",
  },
  displayBox : {
    display : "flex",
  },
  secondaryHeading :{
    width : "100%",
    padding : theme.spacing(1)
  },
  tertiaryHeading :{
    width : "100%",
    paddingLeft : theme.spacing(1)
  },
  colorInput : {
    marginRight : "1rem",
    flexGrow : "1",
  },
  displayColor :{
    display:"inline-block",
    height : "3.5rem",
    width : "3.5rem",
    boxShadow : theme.shadows[3],
    transition : "all .5s",
    '&:hover' : {
        transform : "scale(3)"
    }
  },
  colorButton : {
      width : "100%",
      margin : theme.spacing(1)
  },
}));



const Settings = (props) => {
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [expanded, setExpanded] = useState(false);
    const [selectOption, setSelectOption] = useState('')
    const [input,setInput] = useState('')
    const {open,message,severity,handleSeverity,handleClose,handleMessage,handleOpen} = useSnackbar()
    const [loading,setLoad,unsetLoad] = useLoading()
    const [colors] = useState([red,pink,purple,deepPurple,indigo,lightBlue ,cyan ,blue, green,lightGreen,lime,yellow,amber,orange,brown,grey])
    const [selectedColorPrimary , setSelectedColorPrimary] = useState( "")
    const [selectedColorSecondary , setSelectedColorSecondary] = useState( "")
    const [selectedColorBackground , setSelectedColorBackground] = useState( "")
    const [selectedColorPaper , setSelectedColorPaper] = useState( "")
    const [selectedColorText , setSelectedColorText] = useState( "")

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setSelectOption(panel)
    };

    const handleSelect = (event) => {
        setSelectOption(event.target.value);
      };
    const setInputValue = (event) =>{
        setInput(event.target.value.toUpperCase())
    }

    const handleSubmitSave = async () => {
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/utilities/saveOptions/${auth.userId}`
        setLoad()
        await axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
            selectOption,
            value : input
        }
        })
        .then(result => {
            auth.setUtility(prev=>{
                switch (selectOption) {
                    case ('expense_categories') : {
                        return({
                            ...prev,
                            expense_categories : [
                                ...prev.expense_categories,
                                input
                            ]
                        })
                    }
                    case ('expense_modes') : {
                        return({
                            ...prev,
                            expense_modes : [
                                ...prev.expense_modes,
                                input
                            ]
                        })
                    }
                    case ('income_modes') : {
                        return({
                            ...prev,
                            income_modes : [
                                ...prev.income_modes,
                                input
                            ]
                        })
                    }
                    default : {}
                }
            })
            unsetLoad()
            unsetLoad()
            handleSeverity("success")
            handleMessage("Category Added Succesfully")
            handleOpen()
            setInput('')
            setSelectOption('')
            }).catch((error)=>{
                console.log(error)
                unsetLoad()
                handleSeverity("error")
                if(error.response){
                    handleMessage(error.response.data.message)}
                else
                    {handleMessage("Something went wrong")}
    
                handleOpen()
            })
    }

    const handleSubmitDelete = async () => {
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/utilities/deleteOptions/${auth.userId}`
        setLoad()
        await axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
            selectOption,
            value : input
        }
        })
        .then(result => {
            auth.setUtility(prev=>{
                switch (selectOption) {
                    case ('expense_categories') : {
                        return({
                            ...prev,
                            expense_categories : prev.expense_categories.filter(item => item!==input)
                        })
                    }
                    case ('expense_modes') : {
                        return({
                            ...prev,
                            expense_modes :prev.expense_modes.filter(item =>item!==input)
                        })
                    }
                    case ('income_modes') : {
                        return({
                            ...prev,
                            income_modes : prev.income_modes.filter(item =>item!==input)
                        })
                    }
                    default : {}
                }
            })
            unsetLoad()
            unsetLoad()
            handleSeverity("success")
            handleMessage("Category Deleted Succesfully")
            handleOpen()
            setInput('')
            setSelectOption('')
            }).catch((error)=>{
                unsetLoad()
                handleSeverity("error")
                if(error.response){
                    handleMessage(error.response.data.message)}
                else
                    {handleMessage("Something went wrong")}
    
                handleOpen()
            })
    }

    const handleColorChangePrimary = (item) =>{
        setSelectedColorPrimary(item[500])
    }
    const handleColorChangeSecondary = (item) =>{
        setSelectedColorSecondary(item[800])
    }
    const handleColorChangeBackground = (item) =>{
        setSelectedColorBackground(item[50])
    }
    const handleColorChangePaper = (item) =>{
        setSelectedColorPaper(item[50])
    }
    useEffect(() => {
    }, [auth.utilities])

    useEffect(() => {
        setSelectedColorPrimary(auth.primary)
        setSelectedColorSecondary(auth.secondary)
        setSelectedColorBackground(auth.background)
        setSelectedColorPaper(auth.paper)
        setSelectedColorText(auth.colorText)
    }, [auth])

      const handleColorSubmitPreview = () =>{
        auth.setprimary(selectedColorPrimary)
        auth.setsecondary(selectedColorSecondary)
        auth.setpaper(selectedColorPaper)
        auth.setbackground(selectedColorBackground)
        auth.setcolorText(selectedColorText)
      }

      const handleColorSubmitSave = async () => {
        handleColorSubmitPreview()
        const API_PATH = `${process.env.REACT_APP_BACKEND_URL}/utilities/saveTheme/${auth.userId}`
        setLoad()
        await axios({
        method: 'post',
        url: `${API_PATH}`,
        headers: { 'content-type': 'application/json' },
        data: {
            primary : selectedColorPrimary,
            secondary : selectedColorSecondary,
            background : selectedColorBackground,
            paper : selectedColorPaper,
            text : selectedColorText
        }
        })
        .then(result => {
            unsetLoad()
            unsetLoad()
            handleSeverity("success")
            handleMessage("Theme Changed Succesfully")
            handleOpen()
            setInput('')
            setSelectOption('')
            }).catch((error)=>{
                console.log(error)
                unsetLoad()
                handleSeverity("error")
                if(error.response){
                    handleMessage(error.response.data.message)}
                else
                    {handleMessage("Something went wrong")}
    
                handleOpen()
            })
    }
      
    const icon = React.forwardRef((props, ref) => <ExpandMoreIcon {...props} ref={ref} color = "primary"/>)
      const handleColorSubmitReset = () => {   
        setSelectedColorPrimary("#81c784")
        setSelectedColorSecondary("#2979ff")
        setSelectedColorBackground("#e8f5e9")
        setSelectedColorPaper("#fafafa")
        setSelectedColorText('#000000')
        handleColorSubmitPreview()
    }
  return (
        <div className={classes.root}>
        <Snackbars open={open} message = {message} handleClose={handleClose} severity= {severity} />
        <div className={classes.appBarSpacer} />
        <Container maxWidth={true} className={classes.container}>
        <Paper elevation={3} className = {classes.paper}>
            <Typography variant="h3" gutterBottom color = "primary"> 
                Customize
            </Typography>
            <Grid container className = {classes.gridContainer}> 
                <Grid item xs = {6} className = {classes.gridItem}>
                    <ExpansionPanel 
                        expanded={expanded === 'expense_categories'} 
                        onChange={handleChange('expense_categories')} 
                        className = {classes.expansionPanel} >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon color = "primary"/>}
                            aria-controls="panel1bh-content"
                            id="expense"
                        >
                            <Typography className={classes.heading}>Expense Categories</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List component="nav" aria-label="Category Item" className={classes.listContainer} >
                                {auth.utilities.expense_categories.map(item => {
                                    return(
                                        <ListItem button className={classes.listItem} onClick = {()=> setInput(item)}>
                                            <ListItemText primary={`${item}`} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel 
                        expanded={expanded === 'expense_modes'} 
                        onChange={handleChange('expense_modes')} 
                        className = {classes.expansionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon color = "primary"/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography className={classes.heading}>Expense Modes</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List component="nav" aria-label="Category Item" className={classes.listContainer}>
                                {auth.utilities.expense_modes.map(item => {
                                    return(
                                        <ListItem button className={classes.listItem} onClick = {()=> setInput(item)}>
                                            <ListItemText primary={`${item}`} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel 
                        expanded={expanded === 'income_modes'} 
                        onChange={handleChange('income_modes')} 
                        className = {classes.expansionPanel}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon color = "primary"/>}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <Typography className={classes.heading}>Income Modes</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List component="nav" aria-label="income modes" className={classes.listContainer}>
                                {auth.utilities.income_modes.map(item => {
                                    return(
                                        <ListItem button className={classes.listItem} onClick = {()=> setInput(item)}>
                                            <ListItemText primary={`${item}`} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item xs = {6} className = {classes.gridItem}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Select Option</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        label="Select Option"
                        IconComponent = {icon}
                        value={selectOption}
                        onChange={handleSelect}
                        >
                        <MenuItem value={"expense_categories"}>Expense Category</MenuItem>
                        <MenuItem value={"expense_modes"}>Expense Modes</MenuItem>
                        <MenuItem value={"income_modes"}>Income Modes</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        id="outlined-required"
                        label="Enter Value"
                        value = {input}
                        onChange = {setInputValue}
                        variant="outlined"
                        className = {classes.input}
                        
                    />
                    <div>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        size = "small" 
                        className = {classes.button} 
                        onClick = {handleSubmitDelete}
                        disabled = {!(selectOption && input)}
                        >
                        Delete
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size = "small" 
                        className = {classes.button} 
                        onClick = {handleSubmitSave}
                        disabled = {!(selectOption && input)}
                        >
                        Save
                    </Button>
                    </div>
                </Grid>
                
                <Typography variant="h3" gutterBottom color = "default" className = {classes.secondaryHeading}>  
                                Color Tool
                    </Typography> 
                    <Grid item container xs = {12}className = {classes.gridItem}>
                    <Typography variant="h5" color = "primaryText" className = {classes.secondaryHeading}>  
                                Text Color
                    </Typography> 
                    <Grid item xs = {12} sm = {6} className = {clsx(classes.gridItem,classes.displayBox)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Value"
                            value = {selectedColorText}
                            onChange = {(event) => setSelectedColorText(event.target.value)}
                            className = {classes.colorInput} 
                            />
                        <div
                            className = {classes.displayColor} 
                            style = {{backgroundColor : `${selectedColorText}`}} 
                            >
                        </div>
                    </Grid>
                    </Grid>
                <Grid item container xs = {12} sm = {6} className = {classes.gridItem}>
                    <Typography variant="h5" gutterBottom color = "primary" className = {classes.secondaryHeading}>  
                                Primary
                    </Typography> 
                    <Grid item xs = {12} className = {clsx(classes.gridItem,classes.displayBox)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Value"
                            value = {selectedColorPrimary}
                            onChange = {(event) => setSelectedColorPrimary(event.target.value)}
                            className = {classes.colorInput} 
                            />
                        <div
                            className = {classes.displayColor} 
                            style = {{backgroundColor : `${selectedColorPrimary}`}} 
                            >
                        </div>
                    </Grid>
                    <Grid item xs = {12} className = {classes.gridItem}>
                        {colors.map(item => {
                        return(
                            <div 
                                className = {classes.color} 
                                style = {{backgroundColor : `${item[500]}`}} 
                                onClick = {()=> handleColorChangePrimary(item)}
                                >
                            </div>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid item container xs = {12} sm = {6} className = {classes.gridItem}>
                    <Typography variant="h5" gutterBottom color = "secondary" className = {classes.secondaryHeading}>  
                                Secondary
                    </Typography> 
                    <Grid item xs = {12} className = {clsx(classes.gridItem,classes.displayBox)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Value"
                            value = {selectedColorSecondary}
                            onChange = {(event) => setSelectedColorSecondary(event.target.value)}
                            className = {classes.colorInput} 
                            />
                        <div
                            className = {classes.displayColor} 
                            style = {{backgroundColor : `${selectedColorSecondary}`}} 
                            >
                        </div>
                    </Grid>
                    <Grid item xs = {12} className = {classes.gridItem}>
                        {colors.map(item => {
                        return(
                            <div 
                                className = {classes.color} 
                                style = {{backgroundColor : `${item[800]}`}} 
                                onClick = {()=> handleColorChangeSecondary(item)}
                                >
                            </div>
                            )
                        })}
                    </Grid>
                </Grid>

                <Grid item container xs = {12} sm = {6} className = {classes.gridItem}>
                    <Typography variant="h5" color = "default" className = {classes.secondaryHeading}>  
                                Background
                    </Typography>
                    <Typography variant="caption" color = "default" className = {classes.tertiaryHeading}>  
                                Color will be light by default
                    </Typography>  
                    <Grid item xs = {12} className = {clsx(classes.gridItem,classes.displayBox)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Value"
                            value = {selectedColorBackground}
                            onChange = {(event) => setSelectedColorBackground(event.target.value)}
                            className = {classes.colorInput} 
                            />
                        <div
                            className = {classes.displayColor} 
                            style = {{backgroundColor : `${selectedColorBackground}`}} 
                            >
                        </div>
                    </Grid>
                    <Grid item xs = {12} className = {classes.gridItem}>
                        {colors.map(item => {
                        return(
                            <div 
                                className = {classes.color} 
                                style = {{backgroundColor : `${item[500]}`}} 
                                onClick = {()=> handleColorChangeBackground(item)}
                                >
                            </div>
                            )
                        })}
                    </Grid>
                </Grid>

                <Grid item container xs = {12} sm = {6} className = {classes.gridItem}>
                    <Typography variant="h5" gutterBottom color = "default" className = {classes.secondaryHeading}>  
                                Paper
                    </Typography>
                    <Typography variant="caption" gutterBottom color = "default" className = {classes.tertiaryHeading}>  
                                Color will be light by default
                    </Typography>  
                    <Grid item xs = {12} className = {clsx(classes.gridItem,classes.displayBox)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter Value"
                            value = {selectedColorPaper}
                            onChange = {(event) => setSelectedColorPaper(event.target.value)}
                            className = {classes.colorInput} 
                            />
                        <div
                            className = {classes.displayColor} 
                            style = {{backgroundColor : `${selectedColorPaper}`}} 
                            >
                        </div>
                    </Grid>
                    <Grid item xs = {12} className = {classes.gridItem}>
                        {colors.map(item => {
                        return(
                            <div 
                                className = {classes.color} 
                                style = {{backgroundColor : `${item[500]}`}} 
                                onClick = {()=> handleColorChangePaper(item)}
                                >
                            </div>
                            )
                        })}
                    </Grid>
                </Grid>
                <Grid container item xs = {12}>
                    <Grid item xs = {4} className = {classes.gridItem}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size = "small" 
                            className = {classes.colorButton} 
                            onClick = {handleColorSubmitReset}
                            >
                            Reset Default
                        </Button>
                    </Grid>
                    <Grid item xs = {4} className = {classes.gridItem}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size = "small" 
                            className = {classes.colorButton} 
                            onClick = {handleColorSubmitPreview}
                            >
                            Preview Color
                        </Button>
                    </Grid>
                    <Grid item xs = {4} className = {classes.gridItem}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size = "small" 
                            className = {classes.colorButton} 
                            onClick = {handleColorSubmitSave}
                            >
                            Save Color
                        </Button>
                    </Grid>
                </Grid>
                
            </Grid>
            { loading && <LinearProgress color = "secondary"/>}
        </Paper>
        </Container>
        </div>
  )
}
export default Settings