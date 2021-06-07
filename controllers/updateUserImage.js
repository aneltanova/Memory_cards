const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    let image = req.files.userimage;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        await User.updateOne({'_id': req.session.userId},
            {
                $set: { 'userimage': '/img/' + image.name }
            })
        res.redirect('/index')
    })
}