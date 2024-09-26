export default function Footer() {
    return (
        <>
            <footer className="h-[350px] bg-blue-800 text-white w-full">
                <div className="container mx-auto pt-20 px-10">
                    <h1 className="font-semibold text-2xl">Welcome</h1>
                    <div className="flex">
                        <div className="w-1/2">
                            Experience comfort and luxury at our resort.
                        </div>
                        <div className="w-1/2 flex">
                            <div className="w-1/2 flex flex-col">
                                <h1>Relax</h1>
                                <h1>0909090909</h1>
                                <h1>kctech@kandahar.online</h1>
                            </div>
                            <div className="w-1/2">Reserve</div>
                        </div>
                    </div>
                    <div className="text-sm">
                        &#169; 2024 All rights Reserved
                    </div>
                </div>
            </footer>
        </>
    );
}
