'use client'
import Link from "next/link";
import {useCartStore} from "@/store/cart-store";
import {MenuIcon, ShoppingCartIcon, X} from "lucide-react";
import {useEffect, useState, useRef} from "react";
import {Button} from "@/components/ui/button";

export const Navbar = () => {
    const {items} = useCartStore()
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const navRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileOpen &&
                navRef.current &&
                mobileMenuRef.current &&
                !navRef.current.contains(event.target as Node) &&
                !mobileMenuRef.current.contains(event.target as Node)
            ) {
                setMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileOpen]);

    return (
        <>
            <nav className='sticky top-0 z-50 bg-black shadow' ref={navRef}>
                <div className='container mx-auto flex items-center justify-between px-4 py-4'>
                    <Link href='/' className='text-white hover:text-blue-200 text-xl font-bold'>
                        Shopswift
                    </Link>

                    <div className='hidden md:flex space-x-6'>
                        <Link href='/' className='text-white hover:text-blue-200'>Home</Link>
                        <Link href='/products' className='text-white hover:text-blue-200'>Products</Link>
                        <Link href='/checkout' className='text-white hover:text-blue-200'>CheckOut</Link>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <Link href='/checkout' className='relative'>
                            <ShoppingCartIcon className='h-6 w-6 text-white'/>
                            {cartCount > 0 && (
                                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-semibold'>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Button
                            variant='ghost'
                            className='md:hidden text-white hover:bg-gray-800'
                            onClick={() => setMobileOpen(prevState => !prevState)}
                        >
                            {mobileOpen ? (
                                <X className='h-6 w-6'/>
                            ) : (
                                <MenuIcon className='h-6 w-6'/>
                            )}
                        </Button>
                    </div>
                </div>
            </nav>

            {mobileOpen && (
                <div className="md:hidden bg-white shadow-md mobile-menu" ref={mobileMenuRef}>
                    <ul className="flex flex-col p-4 space-y-2">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 hover:text-blue-600 transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products"
                                className="block py-2 hover:text-blue-600 transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/checkout"
                                className="block py-2 hover:text-blue-600 transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                Checkout
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )
}