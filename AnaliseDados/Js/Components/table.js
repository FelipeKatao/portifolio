

import { Oct8 } from "../Oct8/Oct.js";

class Table extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props = prop
        let Header = ""
        let index = 0
        let Type_cells = ["color","no_color"]
        this.props.Header_.forEach(element => {
            Header+= `<th class='${Type_cells[index]}' >${element}</th>`
        });
        let Values= ""
        this.props.Values.forEach(el =>{
                Values+=`<tr class='${Type_cells[index]}'>`
                this.props.Header_.forEach(x =>{
                    Values+=`<td class='${Type_cells[index]}'> ${el[x]} </td>`
                    
                })
                index+=1
                if(index > 1){
                    index =0
                }
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