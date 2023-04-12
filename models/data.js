const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	userName: { type: String, required: true },
	userDo: { type: String },
	userAbout: { type: String},
	technologies: { type: Array},
	services: { type: Array},
	isExperience: { type: Boolean, required: true },
	experiences: { type: Array },
	isTestimonial: { type: Boolean, required: true },
	testimonials: { type: Array},
	isProject: { type: Boolean, required: true },
	projects: { type: Array},
	aboutProject:{type:String}
    


});


const Data = mongoose.model("data", dataSchema);

module.exports={Data}