import React, { Component } from 'react'

export default class CenterImg extends Component {
    render(){
        return (
            <img ref="c-img" onLoad={this.onImgLoad.bind(this)} {...this.props} />
        )
    }

    onImgLoad(e) {
        const target = e.target,
            h = target.naturalHeight,
            w = target.naturalWidth,
            r = h / w,
            height = window.innerHeight,
            width = window.innerWidth,
            rate = height / width,
            style = this.refs['c-img'].style;

        if(r > rate){
            style.height = height + "px";
            style.width = w * height / h + "px";
            style.left = width / 2 - (w * height / h) / 2 + "px";
        }else if( r < rate){
            style.width = width + "px";
            style.height = h * width / w + "px";
            style.top = height / 2 - (h * width / w) / 2 + "px"
        } else {
            style.width = width;
            style.height = height;
        }  
    }
}