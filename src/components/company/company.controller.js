const companyService = require('./company.service')

exports.createCompany = async function(req, res){
    try{
        let result = await companyService.create(req.body)
        return res.status(200).send(result)
    }catch(err){
        return res.status(500).send(err)
    }
}

exports.listAllCompany = async function(req,res){
    try{
        let result = await companyService.listAll()
        return res.status(200).send(result)
    }catch(err){
        return res.status(500).send(err)
    }
}

exports.getCompanyByID = async function(req, res){
    try{
        let result = await companyService.getById(req.params.id)
        return res.status(200).send(result)
    }catch(err){
        return res.status(500).send(err)
    }
}

exports.deleteCompany = async function(req, res){
    try{
        let result = await companyService.deleteCompany(req.params.id)
        return res.status(200).send(result)
    }catch(err){
        return res.status(500).send(err)
    }
}