import React, { Component } from 'react'

export default class CenterImg extends Component {
    render(){
        return (
            <img onLoad={this.onImgLoad.bind(this)} {...this.props} />
        )
    }

    onImgLoad(e) {
        const target = e.target,
            h = target.naturalHeight,
            w = target.naturalWidth,
            r = h / w,
            height = window.innerHeight,
            width = window.innerWidth,
            rate = height / width;
            
        let imgStyle = {};

        if(r > rate){
            imgStyle.height = height + "px";
            imgStyle.width = w * height / h + "px";
            imgStyle.left = width / 2 - (w * height / h) / 2 + "px";
        }else if( r < rate){
            imgStyle.width = width + "px";
            imgStyle.height = h * width / w + "px";
            imgStyle.top = height / 2 - (h * width / w) / 2 + "px"
        } else {
            imgStyle.width = width;
            imgStyle.height = height;
        }

        target.setAttribute('style', `width:${imgStyle.width}; height:${imgStyle.height}; left:${imgStyle.left}; top:${imgStyle.top};`);
    }
}