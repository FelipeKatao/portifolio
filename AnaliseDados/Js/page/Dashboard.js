import { DashboardController } from "../Controller/DashboardController.js"
import { DrawGraphs } from "../DataSCJs/DrawGraphs.js"
import { Oct8 } from "../Oct8/Oct.js"
class Space extends Oct8.FactoryClass{
    constructor(prop){
        super()
        this.props = prop 
        let element  = ""
        for (let index = 0; index < this.props.espace; index++) {
            element+="</br>"
            
        }
        console.log(element)
        this.FactoryObj = `
            <div id='espace_top'>
            ${element}
            </div>
        `
    }
}

class DashBoardPage{
    constructor(nameProject=""){
        console.log(nameProject)
        this.nameProject = window.location.hash.replace("#","")
        Oct8.Factory.register("espace",Space)
        Oct8.Factory.render("espace","#page",{espace:3})
        Oct8.Factory.render("HeaderTitle","#page",{Title:this.nameProject})
        Oct8.Factory.render("div","#page",{id:"about",elements:"sobre o projeto",classId:"container_full bege",text:"Sobre o projeto"})
        Oct8.Factory.render("HeaderTitle","#about",{})
        
        Oct8.Factory.render("Graphs","#page",{})
        let QuerySql = "SQL QUERY"
        Oct8.Factory.render("div","#page",{id:"query",elements:"sobre o projeto",classId:"container_full bege",text:`
         <div class='box_editor'> ${QuerySql} </div>   
            `})
        Oct8.Factory.render("HeaderTitle","#query",{})

        let pages_dashboard = `
        <label>Pagina:</label>
        <select name="cars" id="cars">
        <option value="page1">Page 1</option>
        </select>
        `
        let Filtro_dash = `
         <label>Filtro:</label>
        <select name="cars" id="cars">
        <option value="todos">Todos</option>
        </select>
        `
        let Next_bt= `
         <button id='bt_next_page' class='standart_bt'> <img class='rotate' src='./img/arrow.png' width="24"> </button>
        `
        let prev_bt= `
         <button id='bt_prev_page' class='standart_bt'> <img  src='./img/arrow.png' width="24"> </button>
        `
        let Bt_full =  `<button id='bt_full' class='standart_bt'> <img src='./img/fullscreen.png' width="24"> </button>`
        Oct8.Factory.render("MenuDash","#menuDash_opt",{Lista:[pages_dashboard, Next_bt,prev_bt, Filtro_dash, Bt_full]})
        Oct8.Factory.render("widgets_",'#dash',{Width:"lg",color:"red",id:"base"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"md",id:"piz"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"md",id:"plot"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"lsm",id:"card"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"lg",id:"teste"})

        let Draw = new DrawGraphs()
        Draw.drawLineChart("element_widgetbase",[40,60,23,90])
        Draw.drawScatterChart("element_widgetplot",[
 {x:10,y:20},
 {x:30,y:40},
 {x:15,y:60}
])
        Draw.drawPieChart("element_widgetpiz",[40,60,23,90])
        Draw.drawBarChart("element_widgetteste",[40,60,23,90])
        Draw.drawCard("element_widgetcard","Title",90,"Soma total")
        
        let controller = new DashboardController()
        
        document.getElementById("bt_full").addEventListener("click",()=>{
            controller.FullScreen()
        })
    }

}

export {DashBoardPage}