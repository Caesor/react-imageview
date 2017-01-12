/**********************************************************************************************
 *  This component is designed for Tribe Project in QQ mobile as a Imageviewer
 *  You can use it as a independent component in your App
 *
 *  @ examples  you can find examples in folder examples or README.md
 *
 *  @ param(string)       imagelist: The list of images to view
 *  @ param(string/JSX)   content: The detail statement of purpose
 *  @ param(string)       confirmText: The text in CONFIRM button
 *  @ param(string)       cancelText: The text in CANCEL button
 *  @ param(bool)         confirmAtRight: The CONFIRM is at the right of CANCEL button or not
 *  @ param(bool)         useTap: Use Tap event as default, not Click
 *  @ param(function)     callback: Events called after CONFIRM button is clicked
 *  @ param(function)     cancelCallback: Events called after CANCEL button is clicked
 *  @ param(function)     close: Use container's method to close the Alert
 *
 *  Copyright by nemoliao( liaozksysu@gmail.com), nemo is a member of AlloyTeam in Tencent.
 *
 **********************************************************************************************/
import React, { Component } from 'react'
import AlloyFinger from './libs/alloyfinger.js'
import Transform from './libs/transform.js'
import CenterImg from './CenterImg.js'
import Singleton from 'react-singleton'

import './index.less'

const MARGIN = 40

class ImageView extends Component {
    static propTypes = {
        imagelist: React.PropTypes.array.isRequired,
        disablePinch: React.PropTypes.bool,
        disableRotate: React.PropTypes.bool,
        disableDoubleTap: React.PropTypes.bool,
        longTap: React.PropTypes.func
    }

    constructor(props) {
        super();
    }

    state = {
        current: 0
    }

    initScale = 1;
    arrLength = 0;
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    list = null;
    ob = null;
    focused = null;

    render() {
        const { imagelist } = this.props;

        return (
            <div className="imageview">
                <AlloyFinger
                    onPressMove={this.onPressMove.bind(this)}
                    onSwipe={this.onSwipe.bind(this)}>
                    <ul id="imagelist" ref="imagelist" className="imagelist">
                    {
                        imagelist.map((item, i) => {
                            return (
                                <li className="imagelist-item" key={"img"+i}>
                                    <AlloyFinger
                                        onPressMove={this.onPicPressMove.bind(this)}
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
        console.log(11);
        this.arrLength = this.props.imagelist.length;
        this.list = this.refs['imagelist'];
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
        const { current } = this.state;

        this.endAnimation();

        if( !this.focused ){
            if((current === 0 && evt.deltaX > 0) || (current === this.arrLength - 1 && evt.deltaX < 0)){
                this.list.translateX += evt.deltaX / 3;    
            }else{
                this.list.translateX += evt.deltaX;    
            }

        }
        
        evt.preventDefault();
    }

    onPicPressMove(evt) {
        this.endAnimation();

        const { deltaX, deltaY } = evt;

        if(this.checkInArea(deltaX, deltaY)){
            this.ob.translateX += deltaX;
            this.ob.translateY += deltaY;
            this.focused = true;
        }else {
            this.focused = false;
        }
    }

    onSwipe(evt){
        const { direction, distance } = evt;

        let { current } = this.state;
        if( this.focused ){
            return false;
        }

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
        } else {
            this.changeIndex(current)
        }
    }

    onMultipointStart(){
        this.endAnimation();
    }

    onPinch(evt){
        if( this.props.disablePinch ){
            return false;
        }
        this.ob.scaleX = this.ob.scaleY = this.initScale * evt.scale;
        this.ob.style.webkitTransition = 'cubic-bezier(.15,.01,.88,1)'
    }

    onRotate(evt){
        if( this.props.disableRotate ){
            return false;
        }
        this.ob.rotateZ += evt.angle;
        this.ob.style.webkitTransition = 'cubic-bezier(.15,.01,.88,1)'
    }
    
    onLongTap(){
        this.props.longTap && this.props.longTap();
    }

    onMultipointEnd(evt){
        // translate to normal
        this.changeIndex(this.state.current);

        // scale to normal
        if (this.ob.scaleX < 1) {
            this.setScale(1);
        }
        if (this.ob.scaleX > 2) {
            this.setScale(2);
        }

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
        if( this.props.disableDoubleTap ){
            return false;
        }
        
        const { origin } = evt,
            originX = origin[0] - this.screenWidth/2,
            originY = origin[1] - this.screenHeight/2;

        if(this.ob.scaleX === 1){

            this.ob.originX = originX
            this.ob.originY = originY;

            // origin fixed
            this.ob.translateX = originX;
            this.ob.translateY = originY;

            this.setScale(2);
        }else{
            this.ob.translateX = this.ob.originX;
            this.ob.translateY = this.ob.originY;
            this.setScale(1);
        }
        this.checkInArea();
    }

    changeIndex(current) {
        this.list.style.webkitTransition = '300ms ease';
        this.list.translateX = -current*(this.screenWidth + MARGIN);
    }

    setScale(size) {
        this.ob.style.webkitTransition = '300ms ease-in-out';
        this.ob.scaleX = this.ob.scaleY = size;
    }

    restore() {
        this.ob.translateX = this.ob.translateY = 0;
        this.ob.rotateZ = 0;
        this.setScale(1);
        this.ob.originX = this.ob.originY = 0;
    }

    endAnimation() {
        this.list.style.webkitTransition = '0';
        this.ob.style.webkitTransition = '0';
    }

    checkInArea(deltaX = 0, deltaY = 0) {
        let { scaleX, translateX, translateY, originX, originY } = this.ob;

        if(scaleX > 1){
            let rangeLeft = (scaleX - 1) * this.screenWidth / 2 + originX,
                rangeRight = -(scaleX - 1) * this.screenWidth / 2 + originX,
                rangeUp = (scaleX - 1) * this.screenHeight / 2 + originY,
                rangeDown = -(scaleX - 1) * this.screenHeight / 2 + originY;

            if(translateX - originX + deltaX <= rangeLeft 
                && translateX - originX + deltaX >= rangeRight 
                && translateY - originY + deltaY <= rangeUp 
                && translateY - originY + deltaY >= rangeDown ) {
                return true;
            }
        }
        return false;
    }
}

export const SingleImgView = new Singleton(ImageView)
 
export default ImageView