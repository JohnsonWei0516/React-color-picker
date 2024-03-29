import React, {Component} from "react";
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
import PaletteFormNav from "./PaletteFormNav"

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display:"flex",
    alignItems:"center"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width:"100%",
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height:"calc(100vh - 64px)",
    padding:0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container:{
    width:"90%",
    height:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"

  },
  buttons:{
      width:"100%"
  },
  button:{
      width:"50%"
  },
  picker:{
      width:"100% !important",
      marginTop:"2rem"
  },
  addColor:{
      width:"100%",
      padding:"1rem",
      marginTop:"1rem",
      fontSize:"2rem"
  },
  colorNameInput:{
    width:"100%",
    height:"70px"
  }
});


class NewPaletteForm extends Component{
    static defaultProps = {
        maxColors : 20
    };
    constructor(props){
        super(props);
        this.state = {
            open:true,
            currentColor:"teal",
            newColorName:"",
            colors:this.props.palettes[0].colors,
            
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule("isColorNameUnique",value => 
           this.state.colors.every(
               ({name}) => name.toLowerCase() !== value.toLowerCase()
           )
        );
        ValidatorForm.addValidationRule("isColorUnique",value => 
           this.state.colors.every(
               ({color}) => color !== this.state.currentColor
           )
        );
        
    }
     updateCurrentColor(newColor){
         
         this.setState({currentColor: newColor.hex});
     }

     handleSubmit(newPalette){
       newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g,"-");
        newPalette.colors = this.state.colors;
         this.props.savePalette(newPalette);
         this.props.history.push("/");
     }
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });

      };

      clearColors(){
          this.setState({colors: []});
      }

      addRandomColor(){
          const allColors = this.props.palettes.map(p => p.colors).flat()
          var rand = Math.floor(Math.random() * allColors.length);
          const randomColor = allColors[rand];
          this.setState({colors: [...this.state.colors, randomColor]});
      }
      addNewColor(){
          const newColor = {color:this.state.currentColor, 
            name:this.state.newColorName};
          this.setState({colors: [...this.state.colors,newColor], newColorName:""});
      }
      handleChange(evt){
          this.setState({
              [evt.target.name]: evt.target.value
          });
      }
      removeColor(colorName){
          this.setState({
              colors:this.state.colors.filter(color => color.name !== colorName)
          })
      }

      onSortEnd = ({oldIndex, newIndex}) => {
          this.setState(({colors}) => ({
                colors: arrayMove(colors, oldIndex, newIndex)
          }));
      };
    
      render() {
        const { classes, theme, maxColors,palettes } = this.props;
        const { open, colors} = this.state;
        const paletteIsFull = colors.length >= maxColors;
    
        return (
          <div className={classes.root}>
           <PaletteFormNav open={open} palettes={palettes}
           handleSubmit={this.handleSubmit}
           handleDrawerOpen={this.handleDrawerOpen}/>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <div className={classes.container}>
              <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
              <div className={classes.buttons}>

              <Button variant='contained' color='secondary' 
              onClick={this.clearColors}
              className={classes.buttons}>Clear Palette</Button>
              <Button variant='contained' color='primary'
              onClick={this.addRandomColor}
              disabled = {paletteIsFull}
              className={classes.buttons}>Random Color</Button>
              </div>
              
              <ChromePicker color={this.state.currentColor}
              onChangeComplete={this.updateCurrentColor}
              className = {classes.picker}
              />
              <ValidatorForm onSubmit={this.addNewColor}>
                  <TextValidator value={this.state.newColorName} 
                  variant="filled"
                  margin="normal"
                  placeholder="Color Name"
                  className={classes.colorNameInput}
                  name="newColorName"
                  onChange={this.handleChange}
                  validators={["required","isColorNameUnique","isColorUnique"]}
                  errorMessages={["Enter a color name","Color Name Must Be Unique","Color Already Used"]}/>
                  <Button variant='contained' color='primary' type='submit'
              style={{backgroundColor: paletteIsFull ? "gray" : this.state.currentColor}} disabled={paletteIsFull}
              className={classes.addColor}
              >{paletteIsFull ? "Palette Full" : "Add Color"}</Button>
              </ValidatorForm>
              
              </div>
            </Drawer>
            <main
              className={classNames(classes.content, {
                [classes.contentShift]: open
              })}
            >
               <div className={classes.drawerHeader} />
               <DraggableColorList
                colors={colors} 
                removeColor={this.removeColor}
                axis='xy'
                onSortEnd={this.onSortEnd}/>
            </main>
          </div>
        );
      }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);