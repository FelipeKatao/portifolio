import { Oct8 } from "../Oct8/Oct.js"

class Header extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop 
        this.FactoryObj = `
           <div oct8-css='header'>
           <div oct8-css='profile'> <img src='./img/avatar.png' width='90vh'> </div>
           <div class='l_5'>
                <h1> ${this.prop.Nome} </h1>
                <h2> ${this.prop.Header} </h2>
                <h2> ${this.prop.Status} </h2>
           </div>
           <div class='mini_block'>
            <h><i>Conquistas</i></h2>
            <hr></hr>
            ${this.prop.Badge}
           </div>
           <div oct8-css='shareLink'>
               <button id='shareperfil' class='standart_bt r_5'><img src='./img/share.png' width='20vh'></button>
           </div>
           </div> 
        `
    }
}

export {Header}