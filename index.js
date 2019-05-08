require('./lib/connectdb');
const { UserModel } = require('./model/User');
const { PostModel } = require('./model/Post');
const { CommentModel } = require('./model/Comment');
const { hash } = require('./lib/bcrypt')

//4,7
UserModel.findOne({email:'manager@gmail.com'})
.then(sender=>{
    if(!sender) return new Error('Cannot find sender!')
    return UserModel.findOneAndUpdate({
        email: 'guest@gmail.com',
    },{
        $pull: {
            receiveRequests: sender._id
        },
        $addToSet:{
            friends: sender._id
        }
    })
})
.then(receiver=>{
    if(!receiver) return new Error('Cannot find receiver!')
    return UserModel.findOneAndUpdate({
        email: 'manager@gmail.com'
    },{
        $pull: {
            sendRequests: receiver._id
        },
        $addToSet: {
            friends: receiver._id
        }
    },{new:true})
})
.then(friend=>console.log(friend))
.catch(err=>console.log({Error: err.message}))

// 4.6
// UserModel.findOne({
//     email: 'guest@gmail.com',
// })
// .then(receiver=>{
//     if(!receiver) return new Error('Cannot find receiver!')
//     // update sender
//     return UserModel.findOneAndUpdate({
//         email: 'manager@gmail.com'
//     },{
//         $addToSet:{
//             sendRequests: receiver._id
//         }
//     }, {new: true})
// })
// .then(sender=>{
//     if(!sender) return new Error('Cannot find sender!')
//     return UserModel.findOneAndUpdate({email: 'guest@gmail.com'},{
//         $addToSet: {
//             receiveRequests: sender._id
//         }
//     },{ new: true})
// })
// .then(receiver=>console.log(receiver))
// .catch(err=>console.log({Error: err.message}))


// UserModel.findOne({email: 'manager@gmail.com'})
// .then(user=>{
//     if(!user) return new Error('Cannot find user!')
//     return PostModel.findOneAndUpdate({_id:'5cd02834e608ba1fdbc4386e'},{
//         $pull: {
//             likes: user._id
//         } 
//     },{new: true})
// })
// .then(post=>console.log(post))
// .catch(err=>console.log({Error: err.message}))

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
