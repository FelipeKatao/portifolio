import { Oct8 } from "../Oct8/Oct.js"

class ToolTip extends Oct8.FactoryClass {
    constructor(prop){
        super()
        this.props = prop
        this.FactoryObj = `
            <div id='tolltip_frame' oct8-css='tooltips'>
                <p> ${this.props.Conteudo} </p>
            </div>
        `
    }
}

export default ToolTip