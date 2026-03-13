import { Oct8 } from "../Oct8/Oct.js"

class Modal extends Oct8.FactoryClass{
    constructor(props){
        super()
        this.props = props
        this.FactoryObj = `

            <div oct8-css='bg-modal'>
                <div oct8-css='modal'>
                <div class='flex'>
                <p>Titulo</P>
                <button>x</button>
                </div>
                <hr></hr>
                ${this.props.Conteudo}
                </div>
            </div>
        `
    }
}

export {Modal}