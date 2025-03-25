import React from 'react'

const Page = () => {
  return (
    <div className='bg-[#0A2ECE] min-h-screen text-white font-sans'>
      <div className='container mx-auto px-4 py-12'>
        <div className='flex flex-col h-full'>
          {/* Header with name */}
          <div className='absolute top-4 right-4 text-right'>
            <h1 className='text-5xl font-bold tracking-tight'>JOSHUA LI's</h1>
            <p className='text-xl opacity-80'>Portfolio</p>
          </div>

          {/* About Section */}
          <div className='mt-32'>
            <h2 className='text-3xl font-bold mb-6'>about:</h2>
            <div className='max-w-2xl space-y-4 text-lg'>
              <p>Hi! My name is Josh, and welcome to my portfolio. I am in my final year of Computer Science and IT Management at the University of Auckland, on track to complete my studies by November 2025.</p>
              
              <p>During the week, I serve as the President of UOACS, an Outreach Executive at Velocity, a UX/UI Designer for WDCC, and a volunteer evangelist for MyUniClub.</p>
              
              <p>On weekends, I busk at the Takapuna markets, a keyholder at AS Colour and also the pianist and MD for my church's band.</p>
              
              <p>In my free time I watch the Lakers dominate and I play a pretty poor Galio in the mid lane. Oh and I love to eat.</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className='mt-16'>
            <h2 className='text-3xl font-bold mb-6'>experience:</h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-2xl font-semibold'>Currently:</h3>
                <p className='text-lg'>Founding President of UOACS (University of Auckland CompSci Society)</p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold'>Outreach Executive at Velocity</h3>
              </div>
              <div>
                <h3 className='text-2xl font-semibold'>UX/UI Designer at WDCC (MedRevue)</h3>
              </div>
              <div>
                <h3 className='text-2xl font-semibold'>Generalist Volunteer at MyUniClub</h3>
              </div>
              <div>
                <h3 className='text-2xl font-semibold'>Keyholder at AS Colour</h3>
              </div>
            </div>
          </div>

          {/* Vertical text on right side */}
          <div className='absolute right-4 top-1/2 transform -rotate-90 origin-right text-2xl font-bold opacity-50'>
            李以勤
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page