import MenuComponent from "../components/Menus.js"
import Banner from "../components/Banner.js"

class HomeView{
    constructor(){
        this.view = new MenuComponent("document_base")
        this.banner = new Banner()
    }
    Home(){
        this.banner.ConstruirBanner("dynamic","Banner_base","Bem vindo","Portifolio Felipe Catão","Veja meus projetos",`Sou felipe Catão desenvolvedor back end especialisat em python`)
        this.banner.RenderBanner("Banner_base")
    }

}

export default HomeView