import { Oct8 } from "../Oct8/Oct8.js"

class Banner{
    constructor(){
        this.oct = new Oct8()
    }

    ConstruirBanner(LocalId,BannerName,Titulo,Subtitulo,botão,text=""){
        this.oct.CreateObjectFactory(()=>{
            let Element = this.oct.CreateContainerElement(BannerName,LocalId," ","div")
            this.oct.ModifyPropsDefault(Element,null,null,null,null)
            this.oct.ModifyContentContainer(Element,`
               <h1>${Titulo}</h1> 
               <h2> ${Subtitulo} </h2>
               <p> ${text} </p>
               <button>${botão}</button>
                `)
            this.oct.createPsudoClassElement(`#${BannerName}`,`
            margin-top:10vh;
            border-radius:2vh;
            border:0.2vh black solid;
            padding:2vh;
            background-color:gray;
            color:white;
            width:70%;
            margin-left:15%;
                `)
        },BannerName)
    }
    RenderBanner(BannerName){
        this.oct.AppendObjectFacyotyTo(BannerName,null)
    }
}

export default Banner