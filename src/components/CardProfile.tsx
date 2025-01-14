type Props ={
image:string,
accountHash:string,
ethAmount:number
}
const CardProfile = ({image,accountHash,ethAmount}:Props)=>{
    return (
        <div className="flex flex-col justify-center items-center py-10 p px-5 mx-4 my-2 dark:bg-zinc-800 bg-slate-200 min-w-64 w-64 max-w-64 rounded-md">

            <div className="">
                <img src={image} height={100} width={100} alt="avatar" className="rounded-full scale-100 transition-all hover:scale-110  border border-gray-400"/>
            </div>

            <div className="pt-10 text-center">
                <p className="dark:text-white text-black font-mono truncate md:w-56 w-52">{accountHash}</p>
                <p className="dark:text-white text-black font-mono font-semibold ">{ethAmount} ETH</p>
            </div>

        </div>
    )
}
export default CardProfile