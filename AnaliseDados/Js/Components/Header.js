import { Oct8 } from "../Oct8/Oct.js"

class Header extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop 
        this.FactoryObj = `
           <div oct8-css='header'>
           <div oct8-css='profile'></div>
           <div>
                <h1> ${this.prop.Nome} </h1>
                <h2> ${this.prop.Header} </h2>
                <h2> ${this.prop.Status} </h2>
           </div>
           <div oct8-css='shareLink'>
               <button>Share</button>
           </div>
           </div> 
        `
    }
}

export {Header}