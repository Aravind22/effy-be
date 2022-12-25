const companyModel = require('./company.model')

exports.create = async function(companyObj){
    try{
        companyObj = {
            "Name": companyObj.Name,
            "Address":companyObj.Address,
            "loc":{
                "type":"point",
                "Coordinates":companyObj.coordinates
            }
        }
        const company = new companyModel(companyObj)
        await company.save()
        return company
    }catch(err){
        console.log("Error in creating company: ", err)
    }
}

exports.listAll = async function(){
    try{
        const companies = await companyModel.find({})
        return companies
    }catch(err){
        console.log("Error in listing companies: ", err)
    }
}

exports.getById =async function(id){
    try{
        let companyObj = {}
        const company = await companyModel.findById(id)
        if(company) companyObj = company
        return companyObj
    }catch(err){
        console.log("Error in getting company: ", err)
    }
}

exports.deleteCompany = async function(id){
    try{
        let deleteRes = await companyModel.findByIdAndDelete(id)
        if(deleteRes != null) return true
        return false
    }catch(err){
        console.log("Error in deleting company: ", err)
    }
}