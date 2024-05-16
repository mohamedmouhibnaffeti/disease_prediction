export default function StatsCard({value, text}: { value: number, text: string }){
    return(
        <div className="w-full px-4 py-3 border-sickness-border shadow-md rounded-md border stats-card-glassmorphism">
            <p className="text-sickness-gray md:text-lg text-md text-center"> {text} <span> {value} </span> </p>
        </div>
    )
}