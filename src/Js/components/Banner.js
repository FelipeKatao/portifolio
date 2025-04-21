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
                <article>
               <h1>${Titulo}</h1> 
               <h2> ${Subtitulo} </h2>
               <p> ${text} </p>
               <button>${botão}</button>
               </article>
                `)
            this.oct.createPsudoClassElement(`#${BannerName}`,`
            padding:2vh;
            height:70vh;
            width:100%;
            margin-top:10vh;
            text-align:center;
            color:#333;

            `)
             this.oct.createPsudoClassElement(`#${BannerName} article`,`
            margin-top:20vh;
                `)
        },BannerName)
    }
    RenderBanner(BannerName){
        this.oct.AppendObjectFacyotyTo(BannerName,null)
    }
}

export default Banner