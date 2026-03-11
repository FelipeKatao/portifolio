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

    }
    async loadProject(){
         let Projetos = new ApiData()
        this.project = await Projetos.ReadProject()
        let NamesProject = Object.keys(this.project)
        
        NamesProject.forEach(el =>{
           
            Oct8.Factory.render("ProjetoCard","#Projeto_cards",{
                Titulo:this.project[el].Titulo,
                Subtitulo:this.project[el].SubTitulo
                ,Sobre:this.project[el].Descricao
                ,Link:this.project[el].link})
            console.log(this.project[el])
        })
        return this.project
    }
}

export {ProfilePage}