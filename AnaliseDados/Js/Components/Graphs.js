import { Oct8 } from "../Oct8/Oct.js";


class Graphs extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props = prop
        this.FactoryObj = `
            <div oct8-css='dashboard' id='dash'></div>
        `
    }
}

export {Graphs}