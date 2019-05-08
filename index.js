require('./lib/connectdb');
const { UserModel } = require('./model/User');
const { PostModel } = require('./model/Post');
const { CommentModel } = require('./model/Comment');
const { hash } = require('./lib/bcrypt')

UserModel.findOne({email: 'manager@gmail.com'})
.then(user=>{
    if(!user) return new Error('Cannot find user!')
    return PostModel.findOneAndUpdate({_id:'5cd02834e608ba1fdbc4386e'},{
        $pull: {
            likes: user._id
        } 
    },{new: true})
})
.then(post=>console.log(post))
.catch(err=>console.log({Error: err.message}))

//4.4
// UserModel.findOne({email: 'admin@gmail.com'})
// .then(user=>{
//     if(!user) return new Error('Cannot find user!');
//     else{
//         return PostModel.findOneAndUpdate({_id: '5cd02834e608ba1fdbc4386e'},{
//             $addToSet: {
//                 likes: user._id
//             }
//         }, {new: true})
//     }
// })
// .then(post=>console.log(post))
// .catch(err=>console.log({Error: err.message}))


//4.3
// CommentModel.create({
//     author: '5cd0215a3bfbcc18d208c6b1', // manager
//     post: '5cd02834e608ba1fdbc4386e', // post 3
//     content: 'Manager Comment tren bai post so 3'
// })
// .then( cmt =>{
//     return PostModel.findOneAndUpdate({
//         _id: '5cd02834e608ba1fdbc4386e'
//     },{
//         $addToSet: {
//             comments: cmt._id
//         }
//     }, { new: true})
// })
// .then(post=>console.log(post))
// .catch(err=>console.log({Error: err.message}))

//4.2
// admin: 5cd020fd5ae5361868f3dfb5
// PostModel.create({
//     author: '5cd020fd5ae5361868f3dfb5',
//     content: 'Bai post so 4 cua admin'
// })
// .then(post=>{
//     return UserModel.findOneAndUpdate({
//         _id:'5cd020fd5ae5361868f3dfb5'
//     },{
//         $addToSet:{
//             posts: post._id 
//         }
//     },{ new:true } )
// })
// .then(user=>console.log(user))
// .catch(err=>console.log({Error: err.message}))



// 4.1
// hash('111111')
// .then(passwordHash=>{
//     return UserModel.create({
//         email: 'guest@gmail.com',
//         password: passwordHash,
//         name: 'Guest'
//     })
// })
// .then(user=>console.log(user))
// .catch(err=>console.log(err.message))
