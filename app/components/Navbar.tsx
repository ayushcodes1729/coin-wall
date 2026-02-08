import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className=" h-[8vh] w-full bg-zinc-900 px-6 py-0 flex justify-between items-center">
            <Link href="/">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-600">CoinWall</h1>
            </Link>
        </nav>
    );
};
