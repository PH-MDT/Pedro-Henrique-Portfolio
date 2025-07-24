import { IoMdHeart } from 'react-icons/io'

export const Footer = () => {
    return (
        <footer className="h-14 w-full flex items-center justify-center bg-gray-950">
            <span className='flex items-center gap-1.6 text-xs sm:text-sm font-mono text-gray-400'>
                Made by
                <IoMdHeart size={13} className="text-cyan-400"/>
                <strong className='font-medium'>Pedro Henrique</strong>
            </span>
        </footer>

    )
}