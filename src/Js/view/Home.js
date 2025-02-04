import MenuComponent from "../components/Menus.js"
import Banner from "../components/Banner.js"

class HomeView{
    constructor(){
        this.view = new MenuComponent("document_base")
        this.banner = new Banner()
    }
    Home(){
        this.view.ContruirMenu()
        this.view.RenderMenu()

        this.banner.ConstruirBanner("document_base","Big_1")
        this.banner.RenderBanner("Big_1")
        
    }

}

export default HomeView