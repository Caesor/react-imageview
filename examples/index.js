import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageView from './ImageView'

// import '../dist/react-imageview.css'

import Mlogger from '@tencent/mlogger'

class Main extends Component {
    constructor(){
        super();
        Mlogger.init({});
    }

    render() {
        const imagelist = [];
        for(let i = 0; i < 10; i++){
            imagelist.push(`//8.url.cn/now/operation/img/${i+1}.jpg`);
        }

        return (
            <div>
                <ImageView imagelist={imagelist} />
            </div>
        )
    }
}

render(
    <Main />,
    document.getElementById('app')
)
