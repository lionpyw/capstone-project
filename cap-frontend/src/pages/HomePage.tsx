

const HomePage = () => {
  return (
    <>
      <div className="hero min-h-screen" style={{ backgroundImage:"url(https://wallpapercave.com/wp/wp2131434.jpg)"}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Consultation Online</h1>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-3xl font-bold">Mission Statement</h1>
            <p className="mb-5 text-md text-primary-content">Welcome to our consultation website!<br />
              We are here to provide you with expert advice and guidance on various topics. Whether you have questions about business, finance, legal matters, health, relationships, or any other area of interest, our team of professionals is ready to assist you.<br />

              Our platform connects you directly with experienced consultants who specialize in different fields. These consultants have a wealth of knowledge and expertise and are dedicated to helping you find solutions and make informed decisions.<br />

              To get started, simply browse through our list of consultants and choose someone who suits your needs. You can schedule a consultation at a time that is convenient for you, and our secure online platform ensures that your discussions remain confidential.<br />

              Our goal is to create a comfortable and supportive environment where you can receive personalized advice tailored to your specific situation. We understand that everyone's needs are unique, and our consultants are committed to providing guidance that is practical, relevant, and effective.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage