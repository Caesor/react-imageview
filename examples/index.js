import React, { Component } from 'react'
import { render } from 'react-dom'

import ImageView from './src/index.js'

import 'react-imageview/dist/react-imageview.css'

class Main extends Component {
    constructor(){
        super();
    }

    render() {
        let imagelist = [];
        imagelist.push('http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484307802678&di=11365c46ba9c287769fe4071e38c7b93&imgtype=0&src=http%3A%2F%2Ffile28.mafengwo.net%2FM00%2F5F%2F71%2FwKgB6lQH-NOAGAPGABaQOIFArE029.jpeg');
        imagelist.push('http://gpic.qpic.cn/gbar_pic/jsuZwJqzIHl1RNhezuibdxzOOnUDYZ5MO58nC3fO4Hh2AWvdnCo2IJg/1000');

        for(let i = 0; i < 10; i++){
            imagelist.push(`./img/${i+1}.jpg`);
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
