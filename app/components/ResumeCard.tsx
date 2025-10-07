import React from 'react'
import { Link } from 'react-router'
import { motion } from "framer-motion";
import ScoreCircle from './ScoreCircle'

const ResumeCard = ({ resume }: { resume: Resume }) => {
    return (

        <motion.div
            initial={{ opacity: 0, y: 40 }}        // start invisible and moved down
            animate={{ opacity: 1, y: 0 }}         // fade in and move up
            transition={{ duration: 0.8, ease: "easeOut" }}  // control smoothness
        >
            <Link to={`/resume/${resume.id}`} className="resume-card ">

                <div className='resume-card-header'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='!text-black font-bold break-words'>{resume.companyName}</h2>
                        <h3 className='text-lg break-words text-gray-500'>{resume.jobTitle}</h3>
                    </div>

                    <div className='flex-shrink-0'>
                        <ScoreCircle score={resume.feedback.overallScore} />
                    </div>
                </div>

                <div className='gradient-border animate-in fade-in duration-1000'>
                    <div className='w-full h-full'>
                        <img
                            src={resume.imagePath}
                            alt="Resume Image"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top " />
                    </div>
                </div>

             

            </Link>
        </motion.div>


    )
}

export default ResumeCard