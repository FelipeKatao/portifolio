import { DashboardController } from "../Controller/DashboardController.js"
import { DrawGraphs } from "../DataSCJs/DrawGraphs.js"
import { Oct8 } from "../Oct8/Oct.js"
import { ApiData } from "../util/Api_data.js"


class DashBoardPage {
    constructor(nameProject = "") {
        console.log(nameProject)
        this.nameProject = window.location.hash.replace("#", "")

        this.GetProject(this.nameProject)

    }
    
    async GetProject(value) {
        let Projetos = new ApiData()
        let project = await Projetos.ReadProject()
        let ProjNames_api = Object.keys(project)


        
        Oct8.Factory.render("espace", "#page", { espace: 3 })
        Oct8.Factory.render("HeaderTitle", "#page", { Title: project[value]["Titulo"],id:"share_perfil"})
        console.log([value])
        Oct8.Factory.render("div", "#page", { id: "about", elements: "sobre o projeto", classId: "container_full bege", text: project[value]["Insigths_area"]["Insigths"] })
        Oct8.Factory.render("HeaderTitle", "#about", {id:"share_about",Title:project[value]["Insigths_area"]["Titulo"]})

        Oct8.Factory.render("Graphs", "#page", {})

        if (project[value]["Projeto"]["ShowCode"]["visible"] == "yes") {
            let QuerySql = "SQL QUERY"
            Oct8.Factory.render("div", "#page", {
                id: "query", elements: "sobre o projeto", classId: "container_full bege", text: `
                        <div class='box_editor'> ${project[value]["Projeto"]["ShowCode"]["type"]} <br> ${project[value]["Projeto"]["ShowCode"]["code"]} </div>   
                            `})
            Oct8.Factory.render("HeaderTitle", "#query", {id:"cod_share",Title:project[value]["Projeto"]["ShowCode"]["Titulo"]})

            document.getElementById("cod_share").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Compartilhar",Conteudo:`
                <div>
                    <h3>Sobre </h3>
                    <p> Sombre o perfil fica completo aqui </p>
                </div>
                `})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })

        }


        
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
        let Next_bt = `
         <button id='bt_next_page' class='standart_bt'> <img class='rotate' src='./img/arrow.png' width="24"> </button>
        `
        let prev_bt = `
         <button id='bt_prev_page' class='standart_bt'> <img  src='./img/arrow.png' width="24"> </button>
        `

         let dataBase_bt = `
         <button id='bt_database_page' class='standart_bt'> <img  src='./img/table.png' width="24"> </button>
        `
        let Bt_full = `<button id='bt_full' class='standart_bt'> <img src='./img/fullscreen.png' width="24"> </button>`
        Oct8.Factory.render("MenuDash", "#menuDash_opt", { Lista: [pages_dashboard, Next_bt, prev_bt, Filtro_dash, Bt_full,dataBase_bt] })
        Oct8.Factory.render("widgets_", '#dash', { elem:"svg", Width: "lg", color: "red", id: "base" })
        Oct8.Factory.render("widgets_", '#dash', { elem:"svg", Width: "md", id: "piz" })
        Oct8.Factory.render("widgets_", '#dash', { elem:"svg", Width: "md", id: "plot" })
        Oct8.Factory.render("widgets_", '#dash', { elem:"svg", Width: "lsm", id: "card" })
        Oct8.Factory.render("widgets_", '#dash', { elem:"svg", Width: "lg", id: "teste" })
        Oct8.Factory.render("widgets_", '#dash', {Width: "lg", id: "table" })
        Oct8.Factory.render("Table","#element_widgettable",{})


        let Draw = new DrawGraphs()
        Draw.drawLineChart("element_widgetbase", [40, 60, 23, 90])
        Draw.drawScatterChart("element_widgetplot", [
            { x: 10, y: 20 },
            { x: 30, y: 40 },
            { x: 15, y: 60 }
        ])
        Draw.drawPieChart("element_widgetpiz", [40, 60, 23, 90])
        Draw.drawBarChart("element_widgetteste", [40, 60, 23, 90])
        Draw.drawCard("element_widgetcard", "Title", 90, "Soma total")

        let controller = new DashboardController()

        document.getElementById("bt_full").addEventListener("click", () => {
            controller.FullScreen()
        })

        document.getElementById("share_perfil").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Compartilhar",Conteudo:`
                <div>
                    <h3>Sobre </h3>
                    <p> Sombre o perfil fica completo aqui </p>
                </div>
                `})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })

       
        document.getElementById("bt_database_page").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Fonte de dados",Conteudo:`
                <div
                    <div id='database'>

                    </div>
                </div>
                `})
                Oct8.Factory.render("Table","#database",{})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })
        document.getElementById("share_about").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Compartilhar",Conteudo:`
                <div>
                    <h3>Sobre </h3>
                    <p> Sombre o perfil fica completo aqui </p>
                </div>
                `})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })
    }

}

export { DashBoardPage }