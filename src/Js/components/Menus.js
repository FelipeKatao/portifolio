import { Oct8 } from "../Oct8/Oct8.js";

class MenuComponent{
    constructor(Id){
        this.Id = Id
        this.oct = new Oct8()
    }
    ContruirMenu(){
        this.oct.CreateObjectFactory(()=>{
            let elemento = this.oct.CreateContainerElement("menu",this.Id,"nav","nav")
            this.oct.ModifyPropsDefault(elemento,null,null,null,null)
            this.oct.ModifyContentContainer(elemento,`
                <h1>Teste</h1>
                `)
        },"MenuBase")
    }
    RenderMenu(){
        alert("ola")
        this.oct.AppendObjectFacyotyTo("MenuBase",null)
    }
}

export default MenuComponent