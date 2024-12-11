"use client"
import { motion } from "motion/react";

export default function First() {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-black">
			<div className="relative">
				{/* Tree layers */}
				{[...Array(5)].map((_, index) => (
					<motion.div
						key={index}
						className={`w-${20 + index * 12} h-${
							8 + index * 4
						} bg-green-500 rounded-t-lg mx-auto shadow-lg`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.2, duration: 0.5 }}
					></motion.div>
				))}

				{/* Tree trunk */}
				<motion.div
					className="w-12 h-16 bg-yellow-900 mx-auto mt-2 rounded-b-md"
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 0.5, delay: 1 }}
				></motion.div>
			</div>
		</div>
	);
}
