

class DataAnalatics{
    constructor(DataBase){
        this.data = DataBase
        this.ctxData = DataBase
        this.Categories = []
        this.FilterData_selected = null 
    }

    Expression(CategoryBase,Operation,Valuemin=0,ValueMax=0,Limit=Infinity){
        // Criar a expressão personalziada para cada Widget
        if(this.FilterData_selected != null)
        {
            // Se for selecionado usa a base selecionada do this.FilterData_selected
            return ""
        }   
        // Filtra aqui usando o data comum 
        return ""

    }
    FilterData(Category,Value){
        this.FilterData_selected = []
        this.data.forEach(c =>{
            if(c[Category] == Value){
                this.FilterData_selected.push(c)
            }
        })  
        this.data = this.FilterData_selected
    }
    ClearFilter(){
        this.data = this.ctxData
    }
    GroupByClass(FieldCategory,ReturnField){
        let Categories = [] 
        let GroupByCategories= []
        this.data.forEach(element => {
            if(Categories.find(x => x == element[FieldCategory]) == undefined){
                Categories.push(element[[FieldCategory]])
            }
        });
        let value_ = 0
        this.Categories = Categories
        this.Categories.forEach(element => {
            this.data.forEach(value => {
                if(value[FieldCategory] == element){
                    value_+=value[ReturnField]
                }
            })
            
            GroupByCategories.push({[element]:value_})
        })
        
        return  GroupByCategories
    }
     ValueBygroup(GroupByClassData){
        let ValueClass = []
        GroupByClassData.forEach(e =>{
            ValueClass.push(Number(Object.values(e).toString()))
        })
       return ValueClass
    }
}

export default DataAnalatics
