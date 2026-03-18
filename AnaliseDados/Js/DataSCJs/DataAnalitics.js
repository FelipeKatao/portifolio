

class DataAnalatics{
    constructor(DataBase){
        this.data = DataBase
        this.Categories = []
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
