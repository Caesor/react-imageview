import React, { Component } from 'react'
import AlloyFinger from './alloyfinger.js'

class ImageView extends Component {
    constructor(props) {
        super();
    }

    render() {
        const { imagelist } = this.props;

        return (
            <div className="imageview">
                <ul className="imagelist">
                {
                    imagelist.map((item, i) => {
                        return (
                            <li className="imagelist-item" key={"img"+i}>
                                <img className="imagelist-item-img" src={item} />
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}
