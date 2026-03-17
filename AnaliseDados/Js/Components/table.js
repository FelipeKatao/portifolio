

import { Oct8 } from "../Oct8/Oct.js";

class Table extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props = prop
        let Header = ""
        this.props.Header_.forEach(element => {
            Header+= `<th>${element}</th>`
        });
        let Values= ""
        this.props.Values.forEach(el =>{
                Values+="<tr>"
                this.props.Header_.forEach(x =>{
                    Values+=`<td> ${el[x]} </td>`
                })
                Values+="</tr>"    
        }) 
        
        this.FactoryObj = `
        <div oct8-css='table_basic'  >
            <table> 
                <tr>
                    ${Header}
                <tr>
                ${Values}
            </table>
         </div>
        `
    }

}

export {Table}