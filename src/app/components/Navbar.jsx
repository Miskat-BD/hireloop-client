"use client";
//MISKAT
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending, error } = authClient.useSession()
    console.log('session data in navbar: ',session, 'pending is:', isPending);
    const user = session?.user
    const router = useRouter()
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin"); // redirect to login page
                },
            },
        });
    }
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold">
                            P
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-white leading-none">
                                Hire Loop
                            </h1>
                            <p className="text-sm text-gray-400 leading-none"></p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center ml-auto">
                        {/* Menu Container */}
                        <div className="flex items-center rounded-2xl border border-zinc-800 bg-zinc-900/80 px-2 py-2">
                            <Link
                                href="/jobs"
                                className="rounded-xl px-5 py-2 text-sm text-gray-300 transition hover:bg-zinc-800 hover:text-white"
                            >
                                Browse Jobs
                            </Link>

                            <Link
                                href="/companies"
                                className="rounded-xl px-5 py-2 text-sm text-gray-300 transition hover:bg-zinc-800 hover:text-white"
                            >
                                Company
                            </Link>

                            <Link
                                href="/pricing"
                                className="rounded-xl px-5 py-2 text-sm text-gray-300 transition hover:bg-zinc-800 hover:text-white"
                            >
                                Pricing
                            </Link>

                            {/* Divider */}
                            <div className="mx-3 h-6 w-px bg-zinc-700" />

                            {
                                user ?
                                    <>
                                        Hi, {user.name}
                                        <Button onClick={handleSignOut} variant="ghost">SignOut</Button>
                                    </>
                                    :
                                    <Link
                                        href="/auth/signin"
                                        className="rounded-xl px-5 py-2 text-sm text-indigo-400 transition hover:bg-zinc-800 hover:text-indigo-300"
                                    >
                                        Sign In
                                    </Link>}
                            <Link
                                href="/auth/signup"
                                className="ml-4 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
                            >
                                Get Started
                            </Link>
                        </div>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="ml-auto text-white md:hidden"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? (
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="border-t border-zinc-800 py-4 md:hidden">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/jobs"
                                className="rounded-lg px-4 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white"
                            >
                                Browse Jobs
                            </Link>

                            <Link
                                href="/companies"
                                className="rounded-lg px-4 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white"
                            >
                                Company
                            </Link>

                            <Link
                                href="/pricing"
                                className="rounded-lg px-4 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white"
                            >
                                Pricing
                            </Link>

                            <Link
                                href="/signin"
                                className="rounded-lg px-4 py-3 text-indigo-400 hover:bg-zinc-900"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/signup"
                                className="mt-2 rounded-xl bg-white px-4 py-3 text-center font-medium text-black"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;