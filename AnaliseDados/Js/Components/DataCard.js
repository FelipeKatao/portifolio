import { Oct8 } from "../Oct8/Oct.js"

class DataCard extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop 
        if(this.prop.Type == "container"){
                this.FactoryObj = `
                <div oct8-css='containers_central' id='${this.prop.Id}'></div>
        `
        }
        else{
        this.FactoryObj = `
           <div oct8-css="cards"> 
           <h1> ${this.prop.Titulo} </h1>
           <h3> ${this.prop.Sobre} </h3>
           <button id='${this.prop.id}' class='standart_bt'> Ver mais </button>
           </div> 
        `
        }
    }
}

export {DataCard}