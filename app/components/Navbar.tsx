import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className=" h-[6vh] w-full bg-zinc-900 px-6 py-2 flex justify-between items-center">
            <Link href="/">
                <h1 className="text-3xl font-bold text-white">CoinWall</h1>
            </Link>
        </nav>
    );
};
