
const Cata = require('../Models/CataModel')


const getAllCata = async (req, res, next) =>{
   const catas = await Cata.find({}) 
   return res.status(200).json({catas})
}
const newCata = async (req, res, next) =>{
    const newCata = new Cata(req.value.body)
    await newCata.save()
    return res.status(201).json({newCata})
}
const getCata = async (req, res, next) =>{
    const {cataID} = req.value.params;
    const cata = await Cata.findById(cataID)
    return res.status(200).json({cata})
}
const updateCata = async (req, res, next) =>{
    const {cataID} = req.value.params;
    const newCata = req.value.body;
    const result = await Cata.findByIdAndUpdate(cataID, newCata)
    return res.status(200).json({success:true})
}
const replaceCata = async (req, res, next) =>{
    const {cataID} = req.value.params;
    const newCata = req.value.body;
    const result = await Cata.findByIdAndUpdate(cataID, newCata)
    return res.status(200).json({success:true})
}
const deleteCata = async (req, res, next) =>{
    const {cataID} = req.value.params
    console.log('id', cataID);
    // getcata
    const cata = await Cata.findById(cataID)
    // delete cata
    await cata.remove()
    return res.status(200).json({success:true})

}
 module.exports = {
     newCata, getAllCata, getCata, deleteCata, updateCata, replaceCata
 }