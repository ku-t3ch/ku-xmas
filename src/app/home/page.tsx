import React from 'react'
import Particles from '@/components/ui/particles'
import christmas from '@/components/ui/chirstmas'
const Homepage = () => {
  return (
    <main className="flex flex-col w-full justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-black">
			<Particles
				className="absolute inset-0"
				quantity={200}
				ease={80}
				color={"#ffffff"}
				refresh
			/>
      </main>
  )
}

export default Homepage
