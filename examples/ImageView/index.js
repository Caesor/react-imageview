import React, { Component } from 'react'
import AlloyFinger from './libs/alloyfinger.js'
import Transform from './libs/transform.js'
import To from './libs/to.js'

import './index.less'

const ease = x => {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export default class ImageView extends Component {
    constructor(props) {
        super();
    }

    state = {
        current: 0
    }

    initScale = 1;
    ob = null;

    render() {
        const { imagelist } = this.props;

        return (
            <div className="imageview">
                <ul className="imagelist">
                {
                    imagelist.map((item, i) => {
                        return (
                            <li className="imagelist-item" key={"img"+i}>
                                <AlloyFinger
                                    onTap={this.onTap.bind(this)}
                                    onMultipointStart={this.onMultipointStart.bind(this)}
                                    onLongTap={this.onLongTap.bind(this)}
                                    onSwipe={this.onSwipe.bind(this)}
                                    onPinch={this.onPinch.bind(this)}
                                    onRotate={this.onRotate.bind(this)}
                                    onPressMove={this.onPressMove.bind(this)}
                                    onMultipointEnd={this.onMultipointEnd.bind(this)}
                                    onDoubleTap={this.onDoubleTap.bind(this)}>
                                    <img id={`view${i}`} className="imagelist-item-img" src={item} />
                                </AlloyFinger>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.ob = document.getElementById('view' + this.state.current);
        Transform(this.ob);
        // console.log(this.ob);
    }

    componentDidUpdate() {
        this.ob = document.getElementById('view' + this.state.current);
        Transform(this.ob);
        // console.log(this.ob);
    }

    // pinch
    onMultipointStart(){
        this.initScale = this.ob.scaleX;

    }
    onPinch(evt){
        ob.scaleX = ob.scaleY = this.initState * evt.scale;
    }
    onPressMove(evt){
        this.ob.translateX += evt.deltaX;
        // console.log(this.ob.translateX);
        evt.preventDefault();
    }

    onTap(){}

    onLongTap(){}
    onSwipe(evt){
        // console.log(evt.direction);
    }

    onRotate(evt){
        this.ob.rotateZ += evt.angle;
    }
    onMultipointEnd(){}
    onDoubleTap(){
        if(this.ob.scaleX === 1){
            new To(this.ob, "scaleX", 2, 500, ease);
            new To(this.ob, "scaleY", 2, 500, ease);
        }else{
            new To(this.ob, "scaleX", 1, 500, ease);
            new To(this.ob, "scaleY", 1, 500, ease);
        }
    }

}
