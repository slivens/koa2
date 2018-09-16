const mongoose = require('mongoose');
const {resolve} = require('path');
mongoose.Promise = global.Promise;
const db = 'mongodb://localhost/slw';
const glob = require('glob');

exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require);
}
exports.connect = () => {
    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{
        if(process.env.NODE_ENV!=='production'){
            mongoose.set('debug',true)
        }  
        mongoose.connect(db,{ useNewUrlParser: true })
        mongoose.connection.on('disconnected',() => {
            mongoose.connect(db,{ useNewUrlParser: true })        
        })
        mongoose.connection.on('error',err => {
            maxConnectTimes++;
            if(maxConnectTimes<5){
                mongoose.connect(db,{ useNewUrlParser: true })   
            }else{
                throw new Error('数据库挂了！快去维修吧！')
            }
        })
        mongoose.connection.once('open',()=>{
            // const Dog = mongoose.model('Dog',{name:String})
            // const doga = new Dog({name:'阿尔法'})
            // doga.save().then(()=>{
            //     console.log('wang')    
            // })
            resolve()
            console.log('mongodb connection  successfully!')
        })
    })
    
}