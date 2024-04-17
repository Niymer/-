//token
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');
module.exports=(req, res, next)=>{
  let token=req.get('token')
  // console.log('Received token:', token); // 调试输出
  if(!token){
    return res.json({
      code:'2003',
      msg:'missing token',
      data:null
    })
  }
  jwt.verify(token,secret,(err,data)=> {
    if(err){
      return res.json({
        code:'2004',
        msg:'token error',
        data:null
      })
    }
    req.user=data;
    next()
  })
}
