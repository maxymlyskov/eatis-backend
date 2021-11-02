const winston = require('winston')


module.exports = function(err,req,res,next){
    winston.log(err.message, err)
    // Logging the error
    res.status(500).send('Something failed!')
    
}