const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const UserSchema = new Schema({
    username:{
        unique:true,
        type:String,
    },
    email:{
        unique:true,
        type:String,
    },
    password:{
        unique:true,
        type:String,
    },
    meta: {
      createdAt: {
        type: Date,
        default: Date.now()
      },
      updatedAt: {
        type: Date,
        default: Date.now()
      }
    }
})
UserSchema.pre('save', function (next) {
    if(!this.isModified('possword')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
    
        bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) return next(error)
    
          user.password = hash
          next()
        })
      })
    if (this.isNew) {
       this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
       this.meta.updatedAt = Date.now()
    }
next()
})
mongoose.model('User',UserSchema)