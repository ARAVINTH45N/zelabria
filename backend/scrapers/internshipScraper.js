const axios = require("axios");
const cheerio = require("cheerio");
const Internship = require("../models/Internship");

const scrapeInternships = async () => {

    try{

        const url = "https://remoteok.com/remote-dev-jobs";

        const response = await axios.get(url,{
            headers:{
                "User-Agent":"Mozilla/5.0"
            }
        });

        const $ = cheerio.load(response.data);

        const jobs = [];

        $("tr.job").each((index,element)=>{

            const title = $(element).find("h2").text().trim();
            const company = $(element).find(".companyLink h3").text().trim();

            if(title && company){

                jobs.push({
                    title,
                    company,
                    location:"Remote",
                    skills:["JavaScript"],
                    stipend:"Not specified",
                    applyLink:url
                });

            }

        });

        for(const job of jobs){

            const exists = await Internship.findOne({
                title:job.title,
                company:job.company
            });

            if(!exists){

                const internship = new Internship(job);
                await internship.save();

                console.log("New internship added:",job.title);

            }

        }

    }catch(error){

        console.log("Scraper error:",error.message);

    }

};

module.exports = scrapeInternships;