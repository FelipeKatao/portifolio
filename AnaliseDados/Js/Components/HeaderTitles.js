import { Oct8 } from "../Oct8/Oct.js"

class Headertitle extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props = prop
        this.Buttons = `<button id='${this.props.id}' class='standart_bt'> Share </button>`
        this.FactoryObj = `
        <div oct8-css='headertitle'>
            <h1>${this.props.Title}</h1>
            <section >
                ${this.Buttons}
            </section>
        </div>
        `
    }
}

export {Headertitle}