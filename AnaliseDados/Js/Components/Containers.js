import { Oct8 } from "../Oct8/Oct.js";

class Container extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props = prop
        this.FactoryObj = `
        <div oct8-css='${this.props.classId}'  >
            <div id='${this.props.id}'></div>
            <div oct8-css='pd1'>${this.props.text}</dvi>
         </div>
        `
    }

}

export {Container}