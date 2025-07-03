'use client'
import React, {useState} from 'react'
import {useMotionValue, useTransform, motion} from "framer-motion";

const AnimatedCheckbox = () => {
    const tickVariants = {
        pressed: (isChecked) => ({pathLength: isChecked ? 0.85 : 0.2}),
        checked: {pathLength: 1, transition: {duration: 0.2, ease: "easeInOut"}},
        unchecked: {pathLength: 0, transition: {duration: 0.2, ease: "easeInOut"}},
    }

    const boxVariants= {
        hover: {scale: 1.05},
        pressed: {scale: .95},
        checked: {stroke: "#4caf50", strokeWidth: 2},
        unchecked: {stroke: "#ccc", strokeWidth: 1.5},
    }

    const [isChecked, setIsChecked] = useState(false)
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [.1, .2], [0, 1]);
    const scale = useTransform(pathLength, [0, 1], [.25, .6], );

    // make the path in the center of the svg
    return (
        <motion.div
            variants={boxVariants}
            whileHover="hover"
            whileTap="pressed"
            onClick={() => setIsChecked(!isChecked)}
            animate={isChecked ? "checked" : "unchecked"}
            className={"bg-white rounded-lg border-2 border-gray-700 shadow-md aspect-square cursor-pointer relative scale-[.1]"}>
            <input type={'ckeckbox'} className={'hidden'} checked={isChecked}/>
            <svg
                width={300} height={300} fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M 0 160.666 L 120.658 310.373 L 300.808 0"
                    fill="transparent"
                    strokeWidth="65"
                    stroke="#4caf50"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={tickVariants}
                    style={{pathLength, opacity, scale}}
                    custom={isChecked}
                />
            </svg>
        </motion.div>
    )
}

export default AnimatedCheckbox