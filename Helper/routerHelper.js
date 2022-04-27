const Joi = require("@hapi/joi")

const validateBody = (schema)=>{
    return (req, res, next)=>{
        const validatorResult = schema.validate(req.body)
        if(validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            if(!req.value) req.value = {}
            if(!req.value['params']) req.value.params = {}
            req.value.body = validatorResult.value
            next()
        }
    }
}


const validateParam = (schema, name)=>{
    return(req, res, next)=>{
       const validatorResult = schema.validate({param:req.params[name]})
       if(validatorResult.error) {
           return res.status(400).json(validatorResult.error)
       }
       else{
           if(!req.value) req.value = {}
           if(!req.value['params']) req.value.params = {}
           req.value.params[name] = req.params[name]
           next()
       }
    }
}

const schemas = {
    authSignInSchema:Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    authSignUpSchema:Joi.object().keys({
        name: Joi.string().min(2).required(),
        phone: Joi.string().min(10).regex(/^[0-9]{10}$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }),
    idSchema : Joi.object().keys({
        param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    userSchema:Joi.object().keys({
        name: Joi.string().min(2).required(),
        phone: Joi.string().min(10).required(),
        email: Joi.string().email().required()
    }),
    userOptionSchema:Joi.object().keys({
        name: Joi.string().min(2),
        phone: Joi.string().min(10),
        email: Joi.string().email(),
        password: Joi.string().min(6)
    }),
    newCataSchema:Joi.object().keys({
        name: Joi.string().min(2).required()
    }),
    newCataOptionSchema:Joi.object().keys({
        name: Joi.string().min(2)
    }),
    idCata : Joi.object().keys({
        param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    newProSchema:Joi.object().keys({
        value: Joi.number().required(),
        DateOfStart:Joi.date().required(),
        DateOfEnd:Joi.date().required()
    }),
    newProOptionSchema:Joi.object().keys({
        value: Joi.number(),
        DateOfStart:Joi.date(),
        DateOfEnd:Joi.date()
    }),
    idPro : Joi.object().keys({
        param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    newSpecSchema:Joi.object().keys({
        RAM:Joi.number().required(),
        ROM:Joi.number().required(),
        Pin:Joi.string().min(1).required(),
        CongNgheManHinh:Joi.string().min(1).required(),
        KichThuocManHinh:Joi.number().required(),
        CameraTruoc:Joi.string().min(1).required(),
        CameraSau:Joi.string().min(1).required(),
        SIM:Joi.string().min(1).required(),
        ChipXuLy:Joi.string().min(1).required(),
        HeDieuHanh:Joi.string().min(1).required(),
        Wifi:Joi.string().min(1).required(),
        Bulutooth:Joi.string().min(1).required(),
        TrongLuong:Joi.number().required(),
        TienIchKhac:Joi.string().min(1).required()
    }),
    newSpecOptionSchema:Joi.object().keys({
        RAM:Joi.number(),
        ROM:Joi.number(),
        Pin:Joi.string().min(2),
        CongNgheManHinh:Joi.string().min(2),
        KichThuocManHinh:Joi.string().min(2),
        CameraTruoc:Joi.string().min(2),
        CameraSau:Joi.string().min(2),
        SIM:Joi.string().min(2),
        ChipXuLy:Joi.string().min(2),
        HeDieuHanh:Joi.string().min(2),
        Wifi:Joi.string().min(2),
        Bulutooth:Joi.string().min(2),
        TrongLuong:Joi.number().min(2),
        TienIchKhac:Joi.string().min(2)
    }),
    idSpec : Joi.object().keys({
        param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    newProductSchema:Joi.object().keys({
        ID_Cata:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        ID_Promotion:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        Name:Joi.string().min(2).required(),
        Image:Joi.string().min(2).required(),
        Price:Joi.number().min(2).required(),
        Color:Joi.string().min(2).required(),
        Endow:Joi.string().min(2).required(),
        Count:Joi.number().min(2).required()
    }),
    newProductOptionSchema:Joi.object().keys({
        ID_Cata:Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        ID_Promotion:Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        ID_Spec:Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        Name:Joi.string().min(2),
        Image:Joi.string().min(2),
        Price:Joi.number().min(2),
        Color:Joi.string().min(2),
        Endow:Joi.string().min(2),
        Count:Joi.number().min(2)
    }),
    idProduct : Joi.object().keys({
        param : Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    newInvoiceDetailSchema:Joi.object().keys({
        ID_Product:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        Count:Joi.number().required(),
    }),
    newInvoiceSchema:Joi.object().keys({
        ID_User:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        Address:Joi.string().required(),
        Total:Joi.number().required()
    }),
    newInvoiceOptionSchema:Joi.object().keys({
        Address:Joi.string(),
        Total:Joi.number(),
        Status:Joi.boolean()
    })
}

module.exports = {
    validateBody,validateParam, schemas
}