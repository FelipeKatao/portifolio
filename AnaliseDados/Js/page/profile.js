import { Oct8 } from "../Oct8/Oct.js"

class ProfilePage{
    constructor(){
        Oct8.Factory.render("Banner","#page",{})
        Oct8.Factory.render("Header","#page",{})
        Oct8.Factory.render("DataCard","#page",{Type:"container",Id:"base_001"})

        Oct8.Factory.render("DataCard","#base_001",{})
        Oct8.Factory.render("DataCard","#base_001",{})
        Oct8.Factory.render("ProjetoF","#page",{})

        Oct8.Factory.render("ProjetoCard","#Projeto_cards",{})
        Oct8.Factory.render("ProjetoCard","#Projeto_cards",{})

        Oct8.Factory.render("ProjetoCard","#Projeto_cards",{})
        Oct8.Factory.render("ProjetoCard","#Projeto_cards",{})
    }
}

export {ProfilePage}