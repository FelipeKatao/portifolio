import { Oct8 } from "../Oct8/Oct.js"

class ProjetoFrame extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop 
        this.FactoryObj = `
           <div oct8-css='projeto_frame'>
           <div oct8-css='container_top'>
            <h1>${this.prop.Titulo} </h1>
            <button> Filter </button>

            </div>
            <div id='Projeto_cards'></div>
           </div> 
        `
    }
}

export {ProjetoFrame}