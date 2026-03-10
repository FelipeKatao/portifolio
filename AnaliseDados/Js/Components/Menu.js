import { Oct8 } from "../Oct8/Oct.js"

class Menu extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props =  prop
        this.FactoryObj = `
            <div oct8-css='menu_fixed'>
                <ul>
                    <li> Bi plataform Online </li>
                    <li> <a href='http://127.0.0.1:5500/AnaliseDados/'>Perfil</a> </li>
                    <li> <a href='http://127.0.0.1:5500/AnaliseDados/#project'>DashBoard</a> </li>
                    <li> <a>Sobre</a> </li>
                </ul>
            </div>
        `
    }
}

export {Menu}