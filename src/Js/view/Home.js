import MenuComponent from "../components/Menus.js"
import Banner from "../components/Banner.js"
import { Oct8 } from "../Oct8/Oct8.js"

class HomeView{
    constructor(){
        this.view = new MenuComponent("document_base")
        this.banner = new Banner()
        this.oct = new Oct8();
    }
    Home(){
        this.banner.ConstruirBanner("dynamic","Banner_base","Bem vindo","Portifolio Felipe Catão","Download do Curriculo",`Sou desenvolvedor back end especialista em python C# e em Back end,
        tenho experiencia na area, <br> atuando em diversas vertente desde Back end, front end, Ciencia de dados e DevOps`)
        this.banner.RenderBanner("Banner_base")
        this.oct.createPsudoClassElement("#dynamic",`
            position:absolute;
        margin-top:10vh;
        width:100%;
            `)
        this.oct.createPsudoClassElement("#content",`
                    position:absolute;
        margin-top:90vh;
        width:100%;
            `)
    }

}

export default HomeView