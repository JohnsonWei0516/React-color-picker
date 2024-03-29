import React,{Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import DraggableColorBox from "./DraggableColorBox";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {ChromePicker} from "react-color";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import { Button } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import {Link} from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = 400;
const styles = theme =>( {
    root:{
        display:"flex"
    },
    hide: {
      display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        height:"64px"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20,
      },
      navBtns:{
          marginRight:"1rem",
          "& a":{
            textDecoration:"none"
          }
      },
      button:{
        margin:"0 0.5rem",
      },
      // link:{
      //   textDecoration:"none"
      // }
});
class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPaletteName:"",
            formShowing:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });

    }
    showForm() {
      this.setState({formShowing: true});
    }
    hideForm(){
      this.setState({formShowing:false});
    }
    render(){
        const {classes,open,palettes,handleSubmit} = this.props;
        const{newPaletteName} = this.state;
        return(
            <div className={classes.root}>
                 <CssBaseline />
            <AppBar
              position="fixed"
              color='default'
              className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar disableGutters={!open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.props.handleDrawerOpen}
                  className={classNames(classes.menuButton, {[classes.hide]:open})}
                >
                  <AddToPhotosIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Create a Palette
                </Typography>
               
              </Toolbar>
               <div className={classes.navBtns}>
                
                
                <Link to='/' className={classes.link}>
                        <Button variant='contained' color='secondary' className={classes.button}>Go Back</Button>
                    </Link>
               <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
              SAVE
            </Button>
               </div>
            </AppBar>
            {this.state.formShowing && (<PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm}/>)}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);