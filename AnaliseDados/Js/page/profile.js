import { Oct8 } from "../Oct8/Oct.js"
import { ApiData } from "../util/Api_data.js"

class ProfilePage{
    constructor(){
        Oct8.Factory.render("Banner","#page",{})
        Oct8.Factory.render("Header","#page",{})
        Oct8.Factory.render("DataCard","#page",{Type:"container",Id:"base_001"})
        this.project =""
        Oct8.Factory.render("DataCard","#base_001",{})
        Oct8.Factory.render("DataCard","#base_001",{})
        Oct8.Factory.render("ProjetoF","#page",{Titulo:"Projetos criados"})
        this.loadProject()
        document.getElementById("filter_proj").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Filtrar projetos",Conteudo:`
                <div>
                    <label>Nome do projeto</label>
                    <input id='projsearch_name' type='text'/>
                    <button id='SearchProje'>Buscar</button>
                    <div id='results_filter' class='auto_h'>
                        ${Oct8.Reaction.inject("filtroProjeto")}
                    </div>
                </div>
                `},()=>{
                document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
                document.getElementById("SearchProje").addEventListener("click",()=>{
                    document.getElementById("projsearch_name").innerHTML =""
                    document.getElementById("results_filter").innerHTML =""
                    this.FilterData()
                     Oct8.Reaction.update("filtroProjeto","")
                     let NamesProject = Object.keys(this.project)
                      Oct8.Reaction.update("filtroProjeto",document.getElementById("projsearch_name").value)
                     this.FilterData(Oct8.Reaction.GetReaction("filtroProjeto"))
                   
                })
            })
        })
    }
    async FilterData(value){
        let Projetos = new ApiData()
        let project = Projetos.ReadProject()
        let NamesProject = Object.keys(this.project)
       NamesProject =  NamesProject.filter(item => item.includes(value))
         NamesProject.forEach(el =>{
            Oct8.Factory.render("ProjetoCard","#results_filter",{
                Titulo:this.project[el].Titulo,
                Subtitulo:this.project[el].SubTitulo
                ,Sobre:this.project[el].Descricao
                ,Link:this.project[el].link})
        })
    }
    async loadProject(nameProject=""){
         let Projetos = new ApiData()
        this.project = await Projetos.ReadProject()
        let NamesProject = Object.keys(this.project)
        
        NamesProject.forEach(el =>{
           
            Oct8.Factory.render("ProjetoCard","#Projeto_cards",{
                Titulo:this.project[el].Titulo,
                Subtitulo:this.project[el].SubTitulo
                ,Sobre:this.project[el].Descricao
                ,Link:this.project[el].link})
        })
        return this.project
    }
}

export {ProfilePage}