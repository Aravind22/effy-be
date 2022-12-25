const userModel = require('./user.model')

exports.create = async function(userObj){
    try {
        const user = new userModel(userObj)
        let savedUser = await user.save()
        if(!savedUser) throw new Error("User could not be saved")
        return {
            "success": true,
            "data": savedUser
        }
    } catch (err) {
        console.log("Error in Creating user: ", err)
    }
}

exports.listAll = async function(){
    try{
        const users = await userModel.find({})
        return users
    }catch(err){
        console.log("Error in listing users: ", err)
    }
}

exports.getUser = async function(id){
    try{
        const user = await userModel.findById(id)
        if(user !== null) return {data:user, result:true}
        return {}
    }catch(err){
        console.log("Error in get user: ", err)
    }
}

exports.isDuplicate = async function(email){
    try{
        const user = await userModel.findOne({Email:email}).exec()
        if(user!==null) return {data:user, result:true}
        return {data:{}, result:false}
    }catch(err){
        console.log("Error in isDuplicate user: ", err)
    }
}

exports.updateUser = async function(id,userObj){
    try{
        const user = await userModel.findByIdAndUpdate(id, userObj).exec()
        if(user !== null) {
            await user.save()
            return true
        }
        return false
    }catch(err){
        console.log("Error in updating user: ", err)
    }
}

exports.deleteUser = async function(id){
    try{
        const user = await userModel.findByIdAndDelete(id)
        if(user != null) return true
        return false
    }catch(err){
        console.log("Error in deleting user: ", err)
    }
}
