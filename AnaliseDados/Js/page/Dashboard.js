import { DashboardController } from "../Controller/DashboardController.js"
import DataAnalatics from "../DataSCJs/DataAnalitics.js"
import { DrawGraphs } from "../DataSCJs/DrawGraphs.js"
import { Oct8 } from "../Oct8/Oct.js"
import { ApiData } from "../util/Api_data.js"


class DashBoardPage {
    constructor(nameProject = "") {

        this.nameProject = window.location.hash.replace("#", "")
        this.Context_filter = null
        this.GetProject(this.nameProject)
        this.Selected_value = ""
        this.Select_filed = ""
        this.options_save = []
        this.Page = "Default"
        this.MaxPage = 0
        this.Controller = new DashboardController()
        this.scroll_y = ""
        this.pass = ""
    }

    async GetProject(value) {


        let Projetos = new ApiData()
        let project = await Projetos.ReadProject()
        let ProjNames_api = Object.keys(project)
        let Data_read = await Projetos.ReadDatabase(project[value]["Projeto"][this.Page][0]["Data"])
        Data_read = Data_read["Data"]
        let DataBase = new DataAnalatics(Data_read)
        let Header_data = Object.keys(Data_read[0])

        let Options_page = ""
        let Page_ = []
        Object.keys(project[value]["Projeto"]).forEach(pag => {
            if (pag == this.Page) {
                Options_page += `<option selected value="${pag}">${pag}</option>`
                Page_.push(pag)
            }
            else {
                Options_page += `<option  value="${pag}">${pag}</option>`
                Page_.push(pag)
            }
        })


        if (this.Selected_value != "") {
            DataBase.FilterData(project[value]["Projeto"][this.Page][0]["FilterData"][this.Select_filed], this.Selected_value)
        }
        if (project[value]["Projeto"][this.Page][0]["config"]["mode"] == "full") {
            if (!document.getElementById("dash")) {
                Oct8.Factory.render("Graphs", "#page", {})
                document.querySelectorAll("[oct8-css = 'menu_fixed']")[0].remove()
            }

        }



        if (project[value]["Projeto"][this.Page][0]["config"]["mode"] == "pdf") {
            for (let index = 0; index <= Page_.length - 1; index++) {
                console.log(parseInt(Page_.length - 1) + " " + Page_.indexOf(this.Page))
                if (Page_.indexOf(this.Page) < parseInt(Page_.length - 1)) {

                    this.Page = Page_[Page_.indexOf(this.Page) + 1]
                    Oct8.Factory.render("espace", "#page", { espace: 3 })

                    Oct8.Factory.render("Graphs", "#page", {})
                    //this.GetProject(value)
                    this.scroll_y = window.screenY
                }
            }
        }

        if (project[value]["Projeto"][this.Page][0]["config"]["mode"] == "normal") {
            Oct8.Factory.render("espace", "#page", { espace: 3 })
            Oct8.Factory.render("HeaderTitle", "#page", { Title: project[value]["Titulo"], id: "share_perfil" })
            Oct8.Factory.render("div", "#page", { id: "about", elements: "sobre o projeto", classId: "container_full bege", text: project[value]["Insigths_area"]["Insigths"] })
            Oct8.Factory.render("HeaderTitle", "#about", { id: "share_about", Title: project[value]["Insigths_area"]["Titulo"] })

            Oct8.Factory.render("Graphs", "#page", {})
        }
        if (project[value]["Projeto"][this.Page][0]["ShowCode"]["visible"] == "yes") {
            let QuerySql = "SQL QUERY"
            Oct8.Factory.render("div", "#page", {
                id: "query", elements: "sobre o projeto", classId: "container_full bege", text: `
                        <div class='box_editor'> ${project[value]["Projeto"][this.Page][0]["ShowCode"]["type"]} <br> ${project[value]["Projeto"][this.Page][0]["ShowCode"]["code"]} </div>   
                            `})
            Oct8.Factory.render("HeaderTitle", "#query", { id: "cod_share", Title: project[value]["Projeto"][this.Page][0]["ShowCode"]["Titulo"] })

            document.getElementById("cod_share").addEventListener("click", () => {
                Oct8.Factory.render("modal", "#page", {
                    titulo: "Compartilhar", Conteudo: `
                <div>
                    <h3>Sobre </h3>
                    <p> Sombre o perfil fica completo aqui </p>
                </div>
                `})
                document.getElementById("close_modal").addEventListener("click", () => {

                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()

                })
            })

        }


        let options = ""
        let Filter_comp = ""
        let Filter_valid = Object.keys(project[value]["Projeto"][this.Page][0]["FilterData"])
        let x = 0;
        Filter_valid.forEach(filter => {
            let Opt = DataBase.GroupByClass(project[value]["Projeto"][this.Page][0]["FilterData"][filter], project[value]["Projeto"][this.Page][0]["FilterData"]["value"])
            if (this.options_save.length <= Filter_valid.length - 2) {
                this.options_save.push([Opt, project[value]["Projeto"][this.Page][0]["FilterData"][filter]])
            }
            if (this.options_save[x] != undefined) {
                Filter_comp += `<br> <label>${this.options_save[x][1]}:</label>
                <select name="filter_data_${this.options_save[x][1]}" id="filter_${this.options_save[x][1]}">
                `
                this.options_save[x][0].forEach(el => {

                    if (this.Selected_value == Object.keys(el)[0]) {
                        options += `  <option selected value="${Object.keys(el)}">${Object.keys(el)}</option>`
                    }
                    else {
                        options += `  <option value="${Object.keys(el)}">${Object.keys(el)}</option>`

                    }
                })
                Filter_comp += `<option value="noneFilter"> ------ </option>
                    ${options}
                    </select>`
            }
            x += 1
            options = ""

        })

        if (this.Controller.fullEnabled == false) {
            this.Controller.RunFull()
        }


        let pages_dashboard = `
        <label>Pagina:</label>
        <select name="pag_data" id="pagesFilter">
        ${Options_page}
        </select>
        `

        let Filtro_dash = `
         <label>Filtros</label>
        ${Filter_comp}
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
        let Project_settings = project[value]["Projeto"][this.Page][0]
        let Draw = new DrawGraphs()

        Object.keys(project[value]["Projeto"][this.Page][0]["Widget"]).forEach(widgets => {

            let Value_valid = DataBase.Expression(Project_settings["Widget"][widgets]["formula"]["Operation"]
                , Project_settings["Widget"][widgets]["formula"]["Categorie_base"], Project_settings["Widget"][widgets]["formula"]["ValueMax"]
                , Project_settings["Widget"][widgets]["formula"]["ValueMin"], Project_settings["Widget"][widgets]["formula"]["Limit"])

            if (project[value]["Projeto"][this.Page][0]["Widget"][widgets]["svg"] == "yes") {
                Oct8.Factory.render("widgets_", '#dash', { elem: "svg", Width: project[value]["Projeto"][this.Page][0]["Widget"][widgets]["Width"], color: "red", id: widgets })

                if (project[value]["Projeto"][this.Page][0]["Widget"][widgets]["Type"] == "line") {
                    Draw.drawLineChart("element_widget" + widgets, DataBase.valueByGroupData(Value_valid), "Analise crescimento de vendas", Value_valid)
                }
                if (project[value]["Projeto"][this.Page][0]["Widget"][widgets]["Type"] == "card") {
                    Draw.drawCard("element_widgetcard", Data_x, DataBase.ValueBygroup(g), "Soma total", "sum")
                }
                if (project[value]["Projeto"][this.Page][0]["Widget"][widgets]["Type"] == "bar") {
                    Draw.drawBarChart("element_widget" + widgets, DataBase.valueByGroupData(Value_valid), Value_valid, "Analise mensal por produto")
                }

                if (project[value]["Projeto"][this.Page][0]["Widget"][widgets]["Type"] == "scatter") {

                    let Values_ = [Project_settings["Widget"][widgets]["Prop"]["Groupx"].split(","), Project_settings["Widget"][widgets]["Prop"]["Groupy"].split(",")]
                    Draw.drawScatterChart("element_widget" + widgets, DataBase.valueByGroupData(DataBase.Expression(Values_[0][0], Values_[0][1])), DataBase.valueByGroupData(DataBase.Expression(Values_[1][0], Values_[1][1])), Value_valid, Values_,"Avaliação de Desconto por Mês")

                }
                if (project[value]["Projeto"][this.Page][0]["Widget"][widgets]["Type"] == "pie") {
                    Draw.drawPieChart("element_widget" + widgets, DataBase.valueByGroupData(Value_valid), Value_valid, "Analise de venda por produto")
                }

            }
            else {
                Oct8.Factory.render("widgets_", '#dash', { Width: "lg", id: "table" })
                Oct8.Factory.render("Table", "#element_widgettable", { Header_: Header_data, Values: DataBase.data })
            }

        })

        window.scroll(0, parseInt(this.scroll_y), 10)

        if (!document.querySelector("[oct8-css='menuList'")) {
            Oct8.Factory.render("MenuDash", "#menuDash_opt", { Lista: [pages_dashboard, Next_bt, prev_bt, Filtro_dash, Bt_full, dataBase_bt] })
        }
        document.getElementById("bt_full").addEventListener("click", () => {
            this.Controller.FullScreen()

        })
        if (project[value]["Projeto"][this.Page][0]["config"]["mode"] == "normal") {
            document.getElementById("share_perfil").addEventListener("click", () => {
                Oct8.Factory.render("modal", "#page", {
                    titulo: "Compartilhar", Conteudo: `
                <div>
                    <h3>Sobre </h3>
                    <p> Sombre o perfil fica completo aqui </p>
                </div>
                `})
                document.getElementById("close_modal").addEventListener("click", () => {

                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()

                })
            })

            document.getElementById("share_about").addEventListener("click", () => {
                Oct8.Factory.render("modal", "#page", {
                    titulo: "Compartilhar", Conteudo: `
                <div>
                    <h3>Sobre </h3>
                    <p> Sombre o perfil fica completo aqui </p>
                </div>
                `})
                document.getElementById("close_modal").addEventListener("click", () => {

                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()

                })
            })
        }
        document.getElementById("pagesFilter").addEventListener("change", (e) => {
            this.Page = e.target.value
            document.getElementById("page").innerHTML = ""
            Oct8.Factory.render("MenuSite", "#page", {})
            this.GetProject(value)
        })
        Filter_valid.forEach(filter => {
            console.log()
            if (filter != "value") {
                console.log(project[value]["Projeto"][this.Page][0]["FilterData"][filter])
                document.getElementById("filter_"+project[value]["Projeto"][this.Page][0]["FilterData"][filter]).addEventListener("change", e => {
                    console.log(project[value]["Projeto"][this.Page][0]["FilterData"][filter])
                    DataBase.FilterData(project[value]["Projeto"][this.Page][0]["FilterData"][filter], e.target.value)
                    document.getElementById("page").innerHTML = ""
                    Oct8.Factory.render("MenuSite", "#page", {})
                    this.Selected_value = e.target.value
                    this.Select_filed = filter
                    if (e.target.value == "noneFilter") {
                        document.getElementById("page").innerHTML = ""
                        DataBase.data = DataBase.ctxData
                        this.Selected_value = ""
                        this.Select_filed = ""
                        Oct8.Factory.render("MenuSite", "#page", {})
                    }
                    this.GetProject(value)
                })
            }

        })

        if (project[value]["Projeto"][this.Page][0]["config"]["autoplay"] != "off") {
            let config_autoPlay = project[value]["Projeto"][this.Page][0]["config"]["autoplay"].split(",")
            let a = setInterval(() => {
                if (Page_.indexOf(this.Page) < parseInt(Page_.length - 1)) {
                    document.getElementById("page").innerHTML = ""
                    this.Page = Page_[Page_.indexOf(this.Page) + 1]
                    Oct8.Factory.render("MenuSite", "#page", {})
                    this.GetProject(value)
                    this.scroll_y = window.screenY
                    console.log(this.scroll_y)
                    clearInterval(a)

                }
                else {
                    document.getElementById("page").innerHTML = ""
                    this.Page = Page_[0]
                    Oct8.Factory.render("MenuSite", "#page", {})
                    this.GetProject(value)
                    this.scroll_y = window.screenY
                    clearInterval(a)
                }

            }, parseInt(config_autoPlay[1]));
        }
        document.getElementById("bt_database_page").addEventListener("click", () => {
            Oct8.Factory.render("modal", "#page", {
                titulo: "Fonte de dados", Conteudo: `
                <div
                    <div id='database'>

                    </div>
                </div>
                `})
            Oct8.Factory.render("Table", "#database", { Header_: Header_data, Values: DataBase.data })
            document.getElementById("close_modal").addEventListener("click", () => {

                document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()

            })
        })

        let Disable_bt_advance = false
        let Disable_bt_back = false

        document.getElementById("bt_prev_page").addEventListener("click", () => {
            if (Page_.indexOf(this.Page) + 1 <= parseInt(Page_.length - 1) && Disable_bt_advance == false) {
                document.getElementById("bt_next_page").classList.remove("disable_bt")
                this.Page = Page_[Page_.indexOf(this.Page) + 1]
                document.getElementById("page").innerHTML = ""
                Oct8.Factory.render("MenuSite", "#page", {})
                this.GetProject(value)
            }
            else {
                Disable_bt_advance = true
                document.getElementById("bt_prev_page").classList += " disable_bt"
            }
        })

        document.getElementById("bt_next_page").addEventListener("click", () => {
            if (Page_.indexOf(this.Page) - 1 >= 0 && Disable_bt_back == false) {
                document.getElementById("bt_prev_page").classList.remove("disable_bt")
                this.Page = Page_[Page_.indexOf(this.Page) - 1]
                document.getElementById("page").innerHTML = ""
                Oct8.Factory.render("MenuSite", "#page", {})
                this.GetProject(value)
            }
            else {
                Disable_bt_back = true
                document.getElementById("bt_next_page").classList += " disable_bt"
            }
        })
    }

}

export { DashBoardPage }