import Image from 'next/image'

const Header = () => {
    return (
        <>
            <div className="bg-violet-600 text-white h-[10%] flex justify-between pl-3 pr-3 items-center font-semibold">

                <div className="">
                    {/* <Image
                        src="../../work.jpeg"
                        alt="Vercel Logo"
                        className=""
                        width={50}
                        height={50}
                        priority
                    /> */}
                    Work Manager</div>
                <div className="">Logout</div>


            </div>
        </>
    )

    }
export default Header;