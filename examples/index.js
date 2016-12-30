import React, { Component } from 'react'
import { render } from 'react-dom'
import ImageView from './ImageView'

class Main extends Component {
    render() {
        const imagelist = [];
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
