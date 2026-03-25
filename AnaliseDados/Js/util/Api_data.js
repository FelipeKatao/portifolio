
class ApiData{
    constructor(){
        this.DataSource ="/AnaliseDados/Js/Data/User_felipe.json"
    }
    async ReadProject(){
       const response = await fetch(this.DataSource)
       const data = await response.json()
       return data
    }
    async ReadDatabase(DatabaseName){
        const response = await fetch("/AnaliseDados/Js/Data/"+DatabaseName)
       const data = await response.json()
       return data
    }
}

export {ApiData}