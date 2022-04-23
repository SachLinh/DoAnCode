
const Promotion = require('../Models/PromotionModel')


const getAllPromotion = async (req, res, next) =>{
   const pros = await Promotion.find({}) 
   return res.status(200).json({pros})
}
const newPromotion = async (req, res, next) =>{
    const newPromos = new Promotion(req.value.body)
    await newPromos.save()
    return res.status(201).json({newPromos})
}
const getPromotion = async (req, res, next) =>{
    const {PromotionID} = req.value.params;
    const promotion = await Promotion.findById(PromotionID)
    return res.status(200).json({promotion})
}
const updatePromotion = async (req, res, next) =>{
    const {PromotionID} = req.value.params;
    const newPromotion = req.value.body;
    const result = await Promotion.findByIdAndUpdate(PromotionID, newPromotion)
    return res.status(200).json({success:true})
}
const replacePromotion = async (req, res, next) =>{
    const {PromotionID} = req.value.params;
    const newPromotion = req.value.body;
    const result = await Promotion.findByIdAndUpdate(PromotionID, newPromotion)
    return res.status(200).json({success:true})
}
const deletePromotion = async (req, res, next) =>{
    const {PromotionID} = req.value.params
    // getPromotion
    const promotion = await Promotion.findById(PromotionID)

    // delete Promotion
    await promotion.remove()
    return res.status(200).json({success:true})

}
 module.exports = {
    newPromotion, getAllPromotion, getPromotion, updatePromotion, replacePromotion, deletePromotion
 }