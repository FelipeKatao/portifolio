import { Oct8 } from "../Oct8/Oct.js"

class Banner extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop 
        this.FactoryObj = `
           <div oct8-css='banner'>Banner</div> 
        `
    }
}

export {Banner}