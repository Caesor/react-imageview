import React, { Component } from 'react'

export class CenterImage extends Component {
    state = {
        loading: true,
        error: false
    }

    render(){
        const { loading, error } = this.state;

        if(loading){ return <Loading /> }
        if(error){ return <Error /> }

        return <img onLoad={this.onImgLoad.bind(this)} onError={this.onImgErr.bind(this)} {...this.props} />
    }

    componentDidMount() {
        let img = new Image();

        img.src = this.props.src;
        img.onload = this.onImgLoad.bind(this);
        img.onerror = this.onImgErr.bind(this);
    }

    onImgLoad(e) {
        const target = e.target,
            h = target.naturalHeight,
            w = target.naturalWidth,
            r = h / w,
            height = document.body.clientHeight || window.innerHeight || window.screen.availHeight,
            width = document.body.clientWidth || window.innerWidth || window.screen.availWidth,
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

        this.setState({
            loading: false
        })

        target.setAttribute('style', `width:${imgStyle.width}; height:${imgStyle.height}; left:${imgStyle.left}; top:${imgStyle.top};`);
        target.setAttribute('rate', 1/r);
    }

    onImgErr(e) {
        this.setState({
            loading: false,
            error: true
        })
    }
}

const Loading = () => {
    return (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
    )
}

const Error = () => {
    return (
        <div className="errorpage">加载失败</div>
    )
}
