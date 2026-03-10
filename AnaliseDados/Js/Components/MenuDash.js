import { Oct8 } from "../Oct8/Oct.js"

class MenuDash extends Oct8.FactoryClass{
    constructor(props){
        super()
        this.props = props
        this.FactoryObj = `
        <div oct8-css='menuList'>
            <ul>
                ${this.ConstruirLista()}
            </ul>
        </div>
        `
    }
    ConstruirLista(){
        if(this.props.Lista){
        let Elemets = ''
        
        this.props.Lista.forEach(element => {
            Elemets+= '<li>'+element+'</li>'
        });
        return Elemets
        }
        return '<li>none</li>'
    }
}

export {MenuDash}