
const checkPermissions = (role) => {
    return (req, res, next) => {
        if(role !== req.user.role){
            return res.status(401).send({
                message: 'ACL'
            });
        }
        
        next();
    }
}

module.exports = {
    checkPermissions
}