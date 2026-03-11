
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
            document.getElementById(this.DashBoardScreen).style.height = "100%"
            document.documentElement.requestFullscreen()
            this.fullEnabled = false
        }
        else
        {
         document.getElementById(this.DashBoardScreen).style.height = "80vh"
         document.getElementById(this.DashBoardScreen).style.width = "90%"

         document.exitFullscreen()
         this.fullEnabled = true
        }
    }
}

export {DashboardController}