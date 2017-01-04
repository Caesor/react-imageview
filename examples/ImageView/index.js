import React, { Component } from 'react'
import AlloyFinger from './libs/alloyfinger.js'
import Transform from './libs/transform.js'
import CenterImg from './CenterImg.js'

import './index.less'

const MARGIN = 40

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
    arrLength = 0;
    screenWidth = window.innerWidth + MARGIN;
    list = null;
    ob = null;

    sliding = false;
    isFocus = false;

    render() {
        const { imagelist } = this.props;

        return (
            <div className="imageview">
                <AlloyFinger
                    onPressMove={this.onPressMove.bind(this)}
                    onSwipe={this.onSwipe.bind(this)}>
                    <ul id="imagelist" className="imagelist">
                    {
                        imagelist.map((item, i) => {
                            return (
                                <li className="imagelist-item" key={"img"+i}>
                                    <AlloyFinger
                                        onPressMove={this.onPressMove.bind(this)}
                                        onMultipointStart={this.onMultipointStart.bind(this)}
                                        onLongTap={this.onLongTap.bind(this)}
                                        onPinch={this.onPinch.bind(this)}
                                        onRotate={this.onRotate.bind(this)}
                                        onMultipointEnd={this.onMultipointEnd.bind(this)}
                                        onDoubleTap={this.onDoubleTap.bind(this)}>
                                        <CenterImg id={`view${i}`} className="imagelist-item-img" src={item} />
                                    </AlloyFinger>
                                </li>
                            )
                        })
                    }
                    </ul>
                </AlloyFinger>
            </div>
        )
    }

    componentDidMount() {
        this.arrLength = this.props.imagelist.length;
        this.list = document.getElementById('imagelist');
        this.ob = document.getElementById('view'+this.state.current);

        Transform(this.list);
        
        for(let i = 0; i < this.arrLength; i++){
            let pic = document.getElementById('view'+i);
            Transform(pic);    
        }

        mqq.ui.setWebViewBehavior({
            swipeBack: 0
        });

        mqq.invoke('ui', 'webviewCanScroll', {
            enable: false
        });

    }

    onPressMove(evt){
        // fix fastest swipe ease bug
        this.endAnimation();
        this.list.translateX += evt.deltaX;

        evt.preventDefault();
    }

    onSwipe(evt){
        const { direction, distance } = evt;

        let current = this.state.current;

        if(direction === 'Left'){
            if(current < this.arrLength-1) {
                current++;

                this.changeIndex(current);
                this.setState({ current }, () => {
                    this.restore();
                    this.ob = document.getElementById('view'+current);
                })
                

            }else {
                this.changeIndex(current);

            }
        } else if( direction === 'Right') {
            if( current > 0) {
                current--;

                this.changeIndex(current);
                this.setState({ current }, () => {
                    this.restore();
                    this.ob = document.getElementById('view'+current);
                })
            }else {
                this.changeIndex(current);
            }
        }
    }

    onMultipointStart(){

        this.endAnimation();

        this.sliding = true;

    }

    onPinch(evt){
        this.ob.scaleX = this.ob.scaleY = this.initScale * evt.scale;
    }

    onRotate(evt){
        this.ob.rotateZ += evt.angle;
    }
    
    onLongTap(){}

    onMultipointEnd(evt){
        console.log('multiponintEnd');
        // scale to normal
        if (this.ob.scaleX < 1) {
            this.setScale();
        }
        if (this.ob.scaleX > 2) {
            this.setScale(2);
        }

        this.sliding = false;
        // rotate to normal
        let rotation = this.ob.rotateZ % 360;

        if(rotation < 0){
            rotation = 360 + rotation;
        }
        this.ob.rotateZ = rotation;

        if (rotation > 0 && rotation < 45) {
            this.ob.rotateZ = 0;
        } else if (rotation >= 315) {
            this.ob.rotateZ = 360;
        } else if (rotation >= 45 && rotation < 135) {
            this.ob.rotateZ = 90;
        } else if (rotation >= 135 && rotation < 225) {
            this.ob.rotateZ = 180;
        } else if (rotation >= 225 && rotation < 315) {
            this.ob.rotateZ = 270;
        }
    }

    onDoubleTap(evt){
        
        const { point } = evt;

        if (point.length) {
            point[0] = ~~point[0] + "px";
            point[1] = ~~(point[1] - this.ob.offsetTop) + "px";
        }

        if(this.ob.scaleX === 1){
            this.ob.style.webkitTransformOrigin = `${point[0]} ${point[1]}`;

            this.setScale(2);
        }else{
            this.setScale();
        }
    }

    changeIndex(current) {
        this.list.style.webkitTransition = '300ms ease';
        this.list.translateX = -current*this.screenWidth;
    }

    setScale(size) {
        this.ob.style.webkitTransition = '300ms ease-in-out';
        this.ob.scaleX = this.ob.scaleY = size || 1;
    }

    restore() {
        this.setScale();
        this.ob.translateX = this.ob.translateY = 0;
        this.ob.rotateZ = 0;
    }

    endAnimation() {
        this.list.style.webkitTransition = '0';
        this.ob.style.webkitTransition = '0';
        this.ob.style.webkitTransformOrigin = 'center center';
    }
}
