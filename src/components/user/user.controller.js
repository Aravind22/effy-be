const userService = require('./user.service')
const messages = require('../../constants/messages')

exports.createUser = async function(req, res){
    try{
        let {
            FirstName,
            Designation,
            LastName,
            Email,
            DOB,
            Active
        } = req.body

        let isDuplicate = await userService.isDuplicate(Email)
        if(isDuplicate && isDuplicate.result){
            return res.status(200).send(messages.duplicateUser)
        }

        let userObj = {
            "FirstName": FirstName,
            "LastName":LastName,
            "Designation":Designation,
            "Email": Email,
            "DOB": new Date(DOB),
            "Active": Active
        }

        let result = await userService.create(userObj)
        if(result && result.success){
            return res.status(200).send(messages.userCreated)
        } else {
            return res.status(500).send(messages.userCreatedError)
        }
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.listAllUser = async function(req,res){
    try{
        let result = await userService.listAll()
        result = formatuserObj(result)
        return res.status(200).send(result)
    }catch(err){
        return res.status(500).send(err)
    }
}

exports.findOneUser = async function(req, res){
    try{
        let result = await userService.getUser(req.params.id)
        if(result && result.result && result.data){
            result = formatuserObj([result.data])
            return res.status(200).send(result[0])
        }else{
            return res.status(200).send(messages.userNotFound)
        }
    }catch(err){
        return res.status(500).send(err)
    }
}

exports.updateUser = async function(req, res){
    try{
        let userObj = {
            "id":req.body.id,
            "FirstName": req.body.FirstName,
            "LastName":req.body.LastName,
            "Email": req.body.Email,
            "Designation":req.body.Designation,
            "DOB": req.body.DOB,
            "Active": req.body.Active
        }
        let result = await userService.getUser(userObj.id)
        if(result && result.result && result.data){
            let resultObj = formatuserObj([result.data])[0]
            userObj.DOB=new Date(userObj.DOB)
            resultObj.DOB = new Date(resultObj.DOB)
            if(JSON.stringify(resultObj) === JSON.stringify(userObj)){
                return res.status(200).send(messages.duplicateUser)
            }else{
                let updateRes = await userService.updateUser(resultObj.id, userObj)
                if(updateRes) res.status(200).send("User Updated Successfully")
                else res.status(500).send("Error in updating user")
            }
        }
        else res.status(500).send("No User Found")
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.deactivateUser = async function(req, res){
    try{
        let userId = req.params.id
        let userObj = await userService.getUser(userId)
        if(userObj && userObj.result && userObj.data){
            userObj.Active = false
            let updateRes = await userService.updateUser(userId, userObj)
            if(updateRes) res.status(200).send("User Deactivated Successfully")
            else res.status(500).send("Error in Deactivating user")
        }else{
            return res.status(500).send("No User Found")
        }
    }catch(err){
        return res.status(500).send(err)
    }
}

exports.deleteUser = async function(req, res){
    try{
        let userId = req.params.id
        let userObj = await userService.getUser(userId)
        if(userObj && userObj.result && userObj.data){
            let deleteRes = await userService.deleteUser(userId)
            if(deleteRes) return res.status(200).send("User Deleetd Successfully")
            else return res.status(500).send("Error in deleting user")
        }else{
            return res.status(500).send("No User Found")
        }
    }catch(err){
        return res.status(500).send(err)
    }
}

formatuserObj = function(obj){
    let result = obj.map(function(obj) {
        return {
            id: obj._id, 
            FirstName: obj.FirstName,
            LastName: obj.LastName,
            Email:obj.Email,
            Designation: obj.Designation,
            DOB: new Date(obj.DOB),
            Active:obj.Active
        };
    });
    return result
}