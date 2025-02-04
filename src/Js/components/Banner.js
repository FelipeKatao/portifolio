import { Oct8 } from "../Oct8/Oct8.js"

class Banner{
    constructor(){
        this.oct = new Oct8()
    }

    ConstruirBanner(LocalId,BannerName){
        this.oct.CreateObjectFactory(()=>{
            let Element = this.oct.CreateContainerElement(BannerName,LocalId," ","div")
            this.oct.ModifyPropsDefault(Element,null,null,null,null)
            this.oct.ModifyContentContainer(Element,`
               <h1>Banner</h1> 
                `)
        },BannerName)
    }
    RenderBanner(BannerName){
        this.oct.AppendObjectFacyotyTo(BannerName,null)
    }
}

export default Banner