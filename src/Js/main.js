import {Oct8} from "./Oct8/Oct8.js"
import HomeView from "./view/Home.js"

let Oct =new Oct8()
let Home = new HomeView()

// Rotas do Site
Oct.CreateNewRoute("/",Home.Home())
Oct.LoadRoutes()