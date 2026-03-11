
class ApiData{
    constructor(){
        this.DataSource ="/AnaliseDados/Js/Data/User_felipe.json"
    }
    async ReadProject(){
       const response = await fetch(this.DataSource)
       const data = await response.json()
       return data

    }
}

export {ApiData}