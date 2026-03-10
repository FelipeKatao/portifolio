import { Oct8 } from "../Oct8/Oct.js"
class Widgets extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.prop = prop
        this.FactoryObj = `
        <div oct8-css='widget ${this.prop.Width}'>
             <svg oct8-css='center' id='element_widget${this.prop.id}'></div>
        </div>
        `
    }
}

export {Widgets}