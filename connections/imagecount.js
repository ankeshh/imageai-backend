const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '3fef8537306e4c018585ac391a663284'
});

const handleApicall = (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('API not available'));
}

const handleImagecount = (req,res,db) => {
    const{id} = req.body;
    db('users').where('id','=',id).increment('count', 1)
        .returning('count')
        .then(count => res.json(count[0]))
        .catch(err => res.status(400).json('Unable to get count'));
}

module.exports = {
    handleImagecount,
    handleApicall
};