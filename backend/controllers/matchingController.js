const User = require("../models/User");
const Internship = require("../models/Internship");

exports.matchInternships = async (req, res) => {

    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const internships = await Internship.find();

        const matches = internships.filter(internship => {

            return internship.skills.some(skill =>
                user.skills.includes(skill)
            );

        });

        res.json({
            userSkills: user.skills,
            matches
        });

    } catch(error){

        res.status(500).json({
            error: error.message
        });

    }

};