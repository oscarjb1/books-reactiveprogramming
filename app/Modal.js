import React from 'react'
import { createPortal } from 'react-dom'

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.dialog = document.getElementById('dialog');
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.dialog.appendChild(this.el);
    }

    componentWillUnmount() {
        this.dialog.removeChild(this.el);
    }

    render() {
        return createPortal(
            <div name="portal" className="fullscreen">
                {this.props.children}
            </div>,
            this.el
        )
    }
}
export default Modal