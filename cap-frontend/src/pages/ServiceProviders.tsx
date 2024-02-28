

const ServiceProviders = () => {
  return (
    <div className="mt-5 border-t-2 border-green-400 w-full">
        <div className="ml-10">
        <h1 className="my-5 mb-10 text-emerald-500 text-3xl underline">Please submit your cv below</h1>
        <form className="flex flex-col space-y-5 ml-7 mt-16 lg:w-96">
            <select name="" id="" className="select select-info w-full max-w-xs">
                <option disabled selected>Select your field of expertise</option>
                <option value="">Medical</option>
                <option value="">Legal</option>
                <option value="">Alternative Medicine</option>
                <option value="">Other</option>
            </select>
            <h4 className="text-emerald-500 font-bold pl-1">Upload CV</h4>
            <input type="file" id="file_cv" name="cv" accept="image/*" />
            <input type="submit" value="Submit" className="btn btn-outline btn-info btn-wide" />
        </form>
        </div>
    </div>
  )
}

export default ServiceProviders