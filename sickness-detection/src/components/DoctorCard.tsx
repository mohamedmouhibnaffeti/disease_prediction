import { useRouter } from "next/navigation"

export default (props: {doctor: any, color: any}) => {
    const Router = useRouter()
    const {doctor, color} = props
    return(
        <div className="w-[20rem] rounded-xl shadow-md border border-sickness-border flex flex-col pb-4 hover:shadow-xl shad hover:shadow-sickness-primary/70 transition delay-100 ease-in">
            <div className={`rounded-t-xl h-28`} style={{backgroundColor: `${color.bg}`}}/>
            <div className="self-center border-2 border-sickness-border rounded-full w-16 h-16 flex justify-center items-center shadow-xl z-30 -translate-y-8" style={{backgroundColor: `${color.bg}`}}> 
                <p className="font-semibold" style={{color: `${color.text}`}}>
                    {`${doctor.name[0]}${doctor.lastname[0]}`.toUpperCase()}
                </p> 
            </div>
            <p className="font-semibold self-center -translate-y-5"> {`${doctor.name} ${doctor.lastname}`} </p>
            <p className="font-medium text-sickness-gray self-center -translate-y-5"> {doctor.specialty} </p>
            <div className="w-full flex justify-between px-1">
                <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{doctor?.rating}</p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a href="#" className="text-sm font-semibold text-gray-900 underline hover:no-underline dark:text-white ">73 reviews</a>
                </div>
                <p className="font-semibold text-sm"> {doctor?.years_of_experience} <span className="text-sickness-gray font-medium">years of experience</span> </p>
            </div>
            <button className="self-center mt-4 bg-sickness-primaryText text-white rounded-full px-4 py-2 shadow-lg text-sm font-semibold" onClick={()=>Router.push('/doctor')}> Visit Profile </button>
        </div>
    )
}