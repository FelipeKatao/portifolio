import { DrawGraphs } from "../DataSCJs/DrawGraphs.js"
import { Oct8 } from "../Oct8/Oct.js"

class DashBoardPage{
    constructor(){
        Oct8.Factory.render("HeaderTitle","#page",{})
        Oct8.Factory.render("div","#page",{id:"about",elements:"sobre o projeto",classId:"container_full bege",text:"Sobre o projeto"})
        Oct8.Factory.render("HeaderTitle","#about",{})

        Oct8.Factory.render("Graphs","#page",{})

        Oct8.Factory.render("div","#page",{id:"query",elements:"sobre o projeto",classId:"container_full bege",text:"Query sql "})
        Oct8.Factory.render("HeaderTitle","#query",{})

        Oct8.Factory.render("widgets_",'#dash',{Width:"lg",color:"red",id:"base"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"md"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"md"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"lsm"})
        Oct8.Factory.render("widgets_",'#dash',{Width:"lg",id:"teste"})


        let Draw = new DrawGraphs()
        Draw.CreateBarsChars([40,60,23,90],"element_widgetbase")




    }
}

export {DashBoardPage}