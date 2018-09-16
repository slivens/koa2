const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');
const {resolve} =  require('path');
const views = require('koa-views');
const {connect,initSchemas} = require('./server/database/init');
const router = require('./server/router/index');

;(async()=>{
    await connect()
    initSchemas()
    require('./server/task/movie')
    // const Movie = await mongoose.model('Movie');
    // Movie.findOne({})
})()
app
   .use(router.routes())
   .use(router.allowedMethods())

app.use(views(resolve(__dirname,'./server/views'),{
    extension:'pug'
}))
app.use(async(ctx,next)=>{
    await ctx.render('index',{
        you:'cjx',
        me:'slw'
    })
})

app.listen(4455);
console.log('port 4455');