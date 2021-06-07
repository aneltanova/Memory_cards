module.exports = (req,res,next)=>{    
    if(req.body.term == null || req.body.body == null){        
        return res.redirect('/create')
    }    
    next()
}