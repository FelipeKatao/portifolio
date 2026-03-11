
class DashboardController{
    constructor(){
        this.DashBoardScreen = "dash"
        this.PageViews = "page"
        this.fullEnabled = true
    }
    FullScreen(){
        if(this.fullEnabled)
        {
            
            document.getElementById(this.DashBoardScreen).style.width = "100%"
            document.getElementById(this.DashBoardScreen).style.height = "20%"
            document.querySelector("#espace_top").style.display = "none"
            document.querySelectorAll("[oct8-css~='container_full']").forEach(el =>{
                el.style.display = "none"
            })
             document.querySelectorAll("[oct8-css='headertitle']").forEach(el =>{
                el.style.display = "none"
            })
             document.querySelectorAll("[oct8-css='menu_fixed']").forEach(el =>{
                el.style.display = "none"
            })
            document.documentElement.requestFullscreen()
            this.fullEnabled = false
        }
        else
        {
         document.getElementById(this.DashBoardScreen).style.height = "80vh"
         document.getElementById(this.DashBoardScreen).style.width = "90%"
         document.querySelector("#espace_top").style.display = "block"
          document.querySelectorAll("[oct8-css~='container_full']").forEach(el =>{
                el.style.display = "block"
            })
            document.querySelectorAll("[oct8-css='headertitle']").forEach(el =>{
                el.style.display = "block"
            })
            document.querySelectorAll("[oct8-css='menu_fixed']").forEach(el =>{
                el.style.display = "block"
            })
         document.exitFullscreen()
         this.fullEnabled = true
        }
    }
}

export {DashboardController}