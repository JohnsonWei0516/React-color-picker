import React,{Component} from 'react';
import "./ColorBox.css";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import chroma from "chroma-js";

const styles = {
    copyText:{
        color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName:{
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore:{
    color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white",
    background:" rgba(255,255,255,0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign:" center",
    lineHeight: "30px",
    textTransform: "uppercase"
    },
};

class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state = {copied: false};
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied:true}, () => {
            setTimeout(() => this.setState({copied: false}),1500);
        });
    }
    render(){
        const { name, background, moreUrl,showLink,classes} = this.props;
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isLightColor = chroma(background).luminance() >= 0.7;
        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <div style = {{background}} className = "ColorBox">
            <div style = {{background}} className = {`copy-overlay ${copied && "show"}`} />
            <div className = {`copy-msg ${copied && "show"}`} >
                <h1>Copied!</h1>
                <p className={classes.copyText}>{this.props.background}</p>
            </div>
                <div className = "copy-container">
                    <div className="box-content">
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
                </div>
                {showLink && 
                <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                    <span className={classes.seeMore}>More</span> 
                </Link>
                
                }
            </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox); 