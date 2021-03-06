/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpecSchema = new Schema({
	RAM: {
		type: Number,
	},
	ROM: {
		type: Number,
	},
	Pin: {
		type: String,
	},
	CongNgheManHinh: {
		type: String,
	},
	KichThuocManHinh: {
		type: String,
	},
	CameraTruoc: {
		type: String,
	},
	CameraSau: {
		type: String,
	},
	SIM: {
		type: String,
	},
	ChipXuLy: {
		type: String,
	},
	HeDieuHanh: {
		type: String,
	},
	Wifi: {
		type: String,
	},
	Bulutooth: {
		type: String,
	},
	TrongLuong: {
		type: Number,
	},
	TienIchKhac: {
		type: String,
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
});
const Specification = mongoose.model('Specification', SpecSchema);
module.exports = Specification;
