import { Oct8 } from "../Oct8/Oct.js"
import { ApiData } from "../util/Api_data.js"

class ProfilePage{
    constructor(){
        Oct8.Factory.render("Banner","#page",{})
        this.ReadDataUser()
        this.loadProject()
        

       
        
    }

    async ReadDataUser(){
         let Projetos = new ApiData()
        let project = await Projetos.ReadProject()
        console.log(project["User"])
        Oct8.Factory.render("Header","#page",{Nome:`  ${project["User"]["Name"]}`,Header:project["User"]["HeadLine"],Status:project["User"]["Subtitle"],Badge:`<div id='badge_area'></div>`})
        Oct8.Factory.render("DataCard","#page",{Type:"container",Id:"base_001"})
        Oct8.Factory.render("Badge","#badge_area",{Name:"Pro",Tipo:"pro"})
        Oct8.Factory.render("Badge","#badge_area",{Name:"Contribuidor de database ",Tipo:"vault"})
        Oct8.Factory.render("Badge","#badge_area",{Name:"Projetos em Produção ",Tipo:"red"})
        this.project =""
        Oct8.Factory.render("DataCard","#base_001",{id:"ver_mais",Titulo:project["User"]["About"]["Title"],Sobre:project["User"]["About"]["Apptxt"]})
        Oct8.Factory.render("DataCard","#base_001",{id:"skills",Titulo:project["User"]["Skills"]["Title"],Sobre:project["User"]["Skills"]["Apptxt"]})
        Oct8.Factory.render("ProjetoF","#page",{Titulo:"Projetos criados"})

         document.getElementById("shareperfil").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Compartilhar",Conteudo:`
                <div>
                    <h3>Compartilhe esse perfil: </h3>
                    <p> http://127.0.0.1:5500/AnaliseDados/  </p>
                </div>
                `})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })

         document.getElementById("skills").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Sobre",Conteudo:`
                <div>
                    <h3>Habilidade </h3>
                    <p> ${project["User"]["Skills"]["text"]} </p>
                </div>
                `})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })

        document.getElementById("ver_mais").addEventListener("click",()=>{
            Oct8.Factory.render("modal","#page",{titulo:"Compartilhar",Conteudo:`
                <div>
                    <h3>Sobre </h3>
                    <p> ${project["User"]["About"]["text"]} </p>
                </div>
                `})
                 document.getElementById("close_modal").addEventListener("click",()=>{
                    
                    document.querySelectorAll("[oct8-css='bg-modal']")[0].remove()
                    
                })
        })
            
    }

    async FilterData(value){
        let Projetos = new ApiData()
        let project = Projetos.ReadProject()
        let NamesProject = Object.keys(this.project)
       NamesProject =  NamesProject.filter(item => item.includes(value) && item != "User")
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
        NamesProject = NamesProject.filter(item =>  item != "User")
        NamesProject.forEach(el =>{
           
            Oct8.Factory.render("ProjetoCard","#Projeto_cards",{
                Titulo:this.project[el].Titulo,
                Subtitulo:this.project[el].SubTitulo
                ,Sobre:this.project[el].Descricao
                ,Link:this.project[el].link})
        })

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
        return this.project
    }
}

export {ProfilePage}