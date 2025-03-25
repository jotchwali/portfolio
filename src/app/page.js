import React from 'react'

const Page = () => {
  return (
    <div className='bg-[#0A2ECE] min-h-screen text-white font-sans relative'>
      {/* Hamburger Menu */}
      <div className='absolute top-4 right-4 space-y-2 cursor-pointer'>
        <div className='w-8 h-2 bg-white rounded-full'></div>
        <div className='w-8 h-2 bg-white rounded-full'></div>
        <div className='w-8 h-2 bg-white rounded-full'></div>
      </div>

      {/* Vertical Chinese Characters */}
      <div className='absolute right-4 bottom-4 text-2xl font-bold opacity-50 tracking-wider'>
        李<br/>
        以<br/>
        勤
      </div>

      <div className='container mx-auto px-4 py-12 flex flex-col items-center justify-center h-full'>
        {/* Centered Name and Portfolio Text */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold tracking-tight'>JOSHUA LI's</h1>
          <p className='text-xl opacity-80'>Portfolio</p>
        </div>

        {/* About Section */}
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold mb-6'>about:</h2>
          <div className='space-y-4 text-lg'>
            <p>Hi! My name is Josh, and welcome to my portfolio. I am in my final year of Computer Science and IT Management at the University of Auckland, on track to complete my studies by November 2025.</p>
            
            <p>During the week, I serve as the President of UOACS, an Outreach Executive at Velocity, a UX/UI Designer for WDCC, and a volunteer evangelist for MyUniClub.</p>
            
            <p>On weekends, I busk at the Takapuna markets, a keyholder at AS Colour and also the pianist and MD for my church's band.</p>
            
            <p>In my free time I watch the Lakers dominate and I play a pretty poor Galio in the mid lane. Oh and I love to eat.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page