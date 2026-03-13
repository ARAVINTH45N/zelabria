const Internship = require("../models/Internship");
const User = require("../models/User");

const sendInternshipAlert = require("../services/emailService");
const sendWhatsAppAlert = require("../services/whatsappService");


exports.createInternship = async (req,res)=>{

    try{

        const internship = new Internship(req.body);

        await internship.save();

        const users = await User.find();

        for(const user of users){

            if(!user.skills) continue;

            const match = internship.skills.some(skill =>
                user.skills.includes(skill)
            );

            if(match){

                if(user.email){

                    await sendInternshipAlert(user.email,internship);

                }

                if(user.phone){

                    await sendWhatsAppAlert(user.phone,internship);

                }

            }

        }

        res.status(201).json({
            message:"Internship created and alerts sent",
            internship
        });

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};


exports.getInternships = async (req,res)=>{

    try{

        const internships = await Internship.find().sort({createdAt:-1});

        res.json(internships);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

};