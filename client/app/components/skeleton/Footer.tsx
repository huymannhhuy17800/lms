import React from 'react'

const Footer = () => {
    return (
        <footer className='md:h-[300px] h-[100%] bg-[#5cd799] bottom-0 w-full px-12'>
            <div className="md:flex md:flex-row flex flex-col gap-10 shrink-0 text-white pt-10 justify-between md:mx-18">
                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase ">Education</h3>
                    <p>News</p>
                    <p>Learn</p>
                    <p>Certification</p>
                    <p>Publications</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase">Socials</h3>
                    <p>Twitter</p>
                    <p>LinkedIn</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase">Socials 3 </h3>
                    <p>Twitter</p>
                    <p>LinkedIn</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase">Socials 4</h3>
                    <p>Twitter</p>
                    <p>LinkedIn</p>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>

            </div>
            <div className="my-10 w-full">
                <div className="border-t border-gray-200 my-4"></div>
                <div className="text-white">
                    {(new Date()).getFullYear()} © All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer