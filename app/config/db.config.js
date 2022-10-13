const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/newposapi', {
    useNewUrlParser:true,
    // useUnifieldTopology:true
}).then( () =>{
    console.log('Connection Mongoose Successfully !!')
}).catch( (err)=>{
    console.log(err)
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDb Disconnected!')
})