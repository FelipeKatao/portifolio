import { Oct8 } from "./Oct8/Oct.js"

import { Banner } from "./Components/banner.js"
import { Header } from "./Components/Header.js"
import { DataCard } from "./Components/DataCard.js"
import { ProjetoFrame } from "./Components/ProjetoFrame.js"
import { ProjectCard } from "./Components/ProjectCard.js"
import { ProfilePage } from "./page/profile.js"
import { Headertitle } from "./Components/HeaderTitles.js"
import { Graphs } from "./Components/Graphs.js"
import { Container } from "./Components/Containers.js"
import { DashBoardPage } from "./page/Dashboard.js"
import { Widgets } from "./Components/Widget.js"
//https://www.youtube.com/watch?v=5638u_F9_hY

Oct8.Factory.register("Banner",Banner)
Oct8.Factory.register("Header",Header)
Oct8.Factory.register("DataCard",DataCard)
Oct8.Factory.register("ProjetoF",ProjetoFrame)
Oct8.Factory.register("ProjetoCard",ProjectCard)
Oct8.Factory.register("HeaderTitle",Headertitle)
Oct8.Factory.register("Graphs",Graphs)
Oct8.Factory.register("div",Container)
Oct8.Factory.register("widgets_",Widgets)




Oct8.Route.register("home",()=>{
    document.getElementById("page").innerHTML = ""
    let page = new ProfilePage()    
},"#home")

Oct8.Route.register("dashboard",()=>{
      document.getElementById("page").innerHTML = ""
      let page = new DashBoardPage()
},"#project")

Oct8.Styled.InitCSS()


Oct8.Route.navigate("#page","home")
Oct8.Route.RunRoutes()