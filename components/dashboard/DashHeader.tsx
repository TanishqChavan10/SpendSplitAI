import React from 'react'
import Searchbar from './searchbar'
import { ModeToggle } from '../modetoggle'

function DashHeader() {
    return (
        <div className="flex flex-col w-full h-15 px-6 py-4">
            <Searchbar /> 
            <ModeToggle/>
            {/* <div className="flex  items-center gap-4">
                <ModeToggle />
                User pfp
            </div> */}
        </div>
    )
}

export default DashHeader