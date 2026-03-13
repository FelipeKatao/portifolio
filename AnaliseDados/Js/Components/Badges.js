import { Oct8 } from "../Oct8/Oct.js"
class Badge extends Oct8.FactoryClass {
    constructor(prop){
        super()
        this.props = prop
        this.FactoryObj = `
            <div oct8-css='badge ${this.props.Tipo}'> ${this.props.Name} </dvi>
        `
    }
}

export {Badge}