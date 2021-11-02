const winston = require('winston')

module.exports = function(){
    process.on('uncaughtException',(ex)=>{
        console.log('Something wrong : index.js!', ex)
        winston.error(ex.message, ex)
    })

    
    winston.exceptions.handle(
        new winston.transports.Console({colorsize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    )

    process.on('unhandledRejection',(ex)=>{
        throw ex
    })

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  

}