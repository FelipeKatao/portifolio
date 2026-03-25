

class DataAnalatics {
    constructor(DataBase) {
        this.data = DataBase
        this.ctxData = DataBase
        this.Categories = []
        this.FilterData_selected = null
    }

    Expression(CategoryBase, GroupBase, Valuemin = 0, ValueMax = 0, Limit = Infinity) {
        let DataAnalise = this.data
        if (this.FilterData_selected != null) {
            DataAnalise = this.FilterData_selected
        }


        let GroupDataSelect = []
        let SetGroup = {}
        DataAnalise.forEach(f => {
            GroupDataSelect.push(f[GroupBase])
            SetGroup[f[GroupBase]] = 0
        })
        const DataGroupFilter = Object.keys(SetGroup)

        DataAnalise.forEach(d => {
            DataGroupFilter.forEach(select => {
                if (d[GroupBase] == select) {
                    SetGroup[select] = parseInt(d[CategoryBase]) + SetGroup[select]
                }
            })

        })

        if (Limit != "infinity") {
            const pares = Object.entries(SetGroup);
            const resultado = Object.fromEntries(pares.slice(0, Limit));
            return resultado
        }
        return SetGroup

    }
    FilterData(Category, Value) {
        this.FilterData_selected = []
        this.data.forEach(c => {
            if (c[Category] == Value) {
                this.FilterData_selected.push(c)
            }
        })
        this.data = this.FilterData_selected
    }
    ClearFilter() {
        this.data = this.ctxData
    }
    GroupByClass(FieldCategory, ReturnField ) {
        let Categories = []
        let GroupByCategories = []

        this.data.forEach(element => {
            if (Categories.find(x => x == element[FieldCategory]) == undefined) {
                Categories.push(element[[FieldCategory]])
            }
        });
        let value_ = 0
        this.Categories = Categories
        this.Categories.forEach(element => {
            this.data.forEach(value => {
                if (value[FieldCategory] == element) {
                    value_ += value[ReturnField]
                }
            })

            GroupByCategories.push({ [element]: value_ })
        })

        return GroupByCategories
    }
    valueByGroupData(GroupByCategories) {
        let Values = []
        Object.keys(GroupByCategories).forEach(r => {
            Values.push(GroupByCategories[r])
        })
        return Values
    }
    ValueBygroup(GroupByClassData) {
        let ValueClass = []

        GroupByClassData.forEach(e => {
            ValueClass.push(Number(Object.values(e).toString()))
        })
        return ValueClass
    }
}

export default DataAnalatics
