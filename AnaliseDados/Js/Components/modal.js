import { Oct8 } from "../Oct8/Oct.js"

class Modal extends Oct8.FactoryClass{
    constructor(props){
        super()
        this.props = props
        this.FactoryObj = `

            <div oct8-css='bg-modal'>
                <div oct8-css='modal'>
                <div class='flex'>
                <p>${this.props.titulo}</P>
                <button id='close_modal'>x</button>
                </div>
                <hr></hr>
                ${this.props.Conteudo}
                </div>
            </div>
        `
    }
    CloseModal(){
        document.getElementById("close_modal").addEventListener("click",()=>{
            Oct8.Factory.destroy("modal")
        })
    }
}

export {Modal}