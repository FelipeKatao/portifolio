import { Oct8 } from "../Oct8/Oct.js"

class ProjectCard extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop 
        this.FactoryObj = `
           <div oct8-css='card-ex'>
           <div class='top-01'>
                <h1> ${this.prop.Titulo} </h1>
                <h3> ${this.prop.Subtitulo} </h3>
           </div>

           <p>
            ${this.prop.Sobre}
           </p>

           <button> Acessar projeto </button>
           </div> 
        `
    }
}

export {ProjectCard}