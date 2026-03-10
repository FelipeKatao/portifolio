import { DrawGraphs } from "../DataSCJs/DrawGraphs.js"
import { Oct8 } from "../Oct8/Oct.js"

class DashBoardPage{
    constructor(){
        Oct8.Factory.render("HeaderTitle","#page",{})
        Oct8.Factory.render("div","#page",{id:"about",elements:"sobre o projeto",classId:"container_full bege",text:"Sobre o projeto"})
        Oct8.Factory.render("HeaderTitle","#about",{})

        Oct8.Factory.render("Graphs","#page",{})
        let QuerySql = "SQL QUERY"
        Oct8.Factory.render("div","#page",{id:"query",elements:"sobre o projeto",classId:"container_full bege",text:`
         <div class='box_editor'> ${QuerySql} </div>   
            `})
        Oct8.Factory.render("HeaderTitle","#query",{})

        Oct8.Factory.render("widgets_",'#dash',{Width:"lg",color:"red",id:"base"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"md",id:"piz"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"md",id:"plot"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"lsm"})
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

    }

}

export {DashBoardPage}