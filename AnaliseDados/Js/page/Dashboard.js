import { DashboardController } from "../Controller/DashboardController.js"
import DataAnalatics from "../DataSCJs/DataAnalitics.js"
import { DrawGraphs } from "../DataSCJs/DrawGraphs.js"
import { Oct8 } from "../Oct8/Oct.js"
import { ApiData } from "../util/Api_data.js"


class DashBoardPage {
    constructor(nameProject = "") {
        console.log(nameProject)
        this.nameProject = window.location.hash.replace("#", "")
        this.Context_filter = null
        this.GetProject(this.nameProject)
        this.Selected_value = ""
        this.options_save = []

    }
    
    async GetProject(value) {
        let Projetos = new ApiData()
        let project = await Projetos.ReadProject()
        let ProjNames_api = Object.keys(project)
        let Data_result = project[value]["Projeto"]["Data"]
        let Header_data = Object.keys(Data_result[0])
        let DataBase = new DataAnalatics(project[value]["Projeto"]["Data"])

        // Iniciar a DataBase aqui

        if(this.Selected_value != ""){
            DataBase.FilterData(project[value]["Projeto"]["FilterData"]["Filter"],this.Selected_value)
        }

        Oct8.Factory.render("espace", "#page", { espace: 3 })
        Oct8.Factory.render("HeaderTitle", "#page", { Title: project[value]["Titulo"],id:"share_perfil"})
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


        let options =""
        let Opt = DataBase.GroupByClass(project[value]["Projeto"]["FilterData"]["Filter"],project[value]["Projeto"]["FilterData"]["value"])
        console.log(this.options_save.length+"=====")
        if(this.options_save.length == 0){
            this.options_save = Opt
        }
        this.options_save.forEach(el =>{
            if(this.Selected_value == Object.keys(el)[0])
            {
                options+=`  <option selected value="${Object.keys(el)[0]}">${Object.keys(el)[0]}</option>`
            }
            else{
                options+=`  <option value="${Object.keys(el)[0]}">${Object.keys(el)[0]}</option>`

            }
        })
    
        
        
        let pages_dashboard = `
        <label>Pagina:</label>
        <select name="pag_data" id="pages">
        <option value="page1">Page 1</option>
        </select>
        `
        let Filtro_dash = `
         <label>Filtro:</label>
        <select name="filter_data" id="filter">
        ${options}
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
        
        let Draw = new DrawGraphs()
        let Data_x = project[value]["Projeto"]["Widget"]["Lines"]["Data"]["Data"]["x"]
        let Data_y = project[value]["Projeto"]["Widget"]["Lines"]["Data"]["Data"]["y"]
        let Data_eixos = []
        let LineEixos = []
        let Card = 0


        project[value]["Projeto"]["Data"].forEach(element => {

            LineEixos.push(element[Data_x])
            Data_eixos.push({x:element[Data_x],y:element[Data_y]})

        });
        Object.keys(project[value]["Projeto"]["Widget"]).forEach(widgets =>{
            let g =""
            if(project[value]["Projeto"]["Widget"][widgets]["svg"] == "yes")
            {
                 g = DataBase.GroupByClass(project[value]["Projeto"]["Widget"][widgets]["Data"]["group"]["group"],project[value]["Projeto"]["Widget"][widgets]["Data"]["group"]["value"])
            }
            
            if(project[value]["Projeto"]["Widget"][widgets]["svg"] == "yes"){
                Oct8.Factory.render("widgets_", '#dash', { elem:"svg", Width: project[value]["Projeto"]["Widget"][widgets]["Width"], color: "red", id: widgets })
            
                if(project[value]["Projeto"]["Widget"][widgets]["Type"] == "line"){
                    Draw.drawLineChart("element_widget"+widgets, DataBase.ValueBygroup(g),"Analise crescimento de vendas",g)
                }
                if(project[value]["Projeto"]["Widget"][widgets]["Type"] == "card"){
                    Draw.drawCard("element_widgetcard",Data_x, LineEixos, "Soma total","sum")
                }
                if(project[value]["Projeto"]["Widget"][widgets]["Type"] == "bar"){
                    Draw.drawBarChart("element_widget"+widgets, DataBase.ValueBygroup(g),g,"Analise mensal por produto")
                }

                if(project[value]["Projeto"]["Widget"][widgets]["Type"] == "scatter"){
                    Draw.drawScatterChart("element_widget"+widgets, LineEixos,g)
                }
                if(project[value]["Projeto"]["Widget"][widgets]["Type"] == "pie"){
                    Draw.drawPieChart("element_widget"+widgets, DataBase.ValueBygroup(g),g,"Analise de venda por produto")
                }

            }
            else{
                        Oct8.Factory.render("widgets_", '#dash', {Width: "lg", id: "table" })
                        Oct8.Factory.render("Table","#element_widgettable",{Header_:Header_data,Values:Data_result})
            }
            
        })

        let controller = new DashboardController()
        Oct8.Factory.render("MenuDash", "#menuDash_opt", { Lista: [pages_dashboard, Next_bt, prev_bt, Filtro_dash, Bt_full,dataBase_bt] })

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

       
        document.getElementById("filter").addEventListener("change",e=>{
            DataBase.FilterData(project[value]["Projeto"]["FilterData"]["Filter"],e.target.value)
            document.getElementById("page").innerHTML = ""
             Oct8.Factory.render("MenuSite","#page",{})
             this.Selected_value = e.target.value
            this.GetProject(value)

            
        })

        document.getElementById("bt_database_page").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Fonte de dados",Conteudo:`
                <div
                    <div id='database'>

                    </div>
                </div>
                `})
                Oct8.Factory.render("Table","#database",{Header_:Header_data,Values:Data_result})
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