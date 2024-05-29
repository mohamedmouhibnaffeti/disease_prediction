"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const Carousel = ({ data }: {data: {image: any}[]}) => {
    useEffect(() => {
        let elem = carouselRef.current as unknown as HTMLDivElement
        let { width, height } = elem.getBoundingClientRect()
        if (carouselRef.current) {
            setCarouselSize({
                width,
                height,
            })
        }
    }, [])
    const [currentImg, setCurrentImg] = useState(0)
    const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 })
    const carouselRef = useRef(null)
    return (
        <div>
            <div className='w-full h-60 rounded-md overflow-hidden relative'>
                <div ref={carouselRef}
                    style={{
                        left: -currentImg * carouselSize.width
                    }}
                    className='w-full h-full absolute flex transition-all duration-300'>
                    {data.map((v, i) => (
                        <div key={i} className='relative shrink-0 w-full h-full'>
                            <Image
                                className='pointer-events-none'
                                alt="Doctor Image"
                                fill
                                src={`data:image/jpeg;base64,${v.image}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center mt-3 gap-4'>
                <button
                    disabled={currentImg == 0}
                    onClick={() => setCurrentImg(prev => prev - 1)}
                    className={`border p-2 font-bold rounded-full transition delay-100 ease-in-out ${currentImg == 0 ? 'opacity-50' : "hover:bg-sickness-primary hover:text-white"} `}
                >
                    <ChevronLeft />
                </button>
                <button
                    disabled={currentImg == data.length - 1}
                    className={`border p-2 font-bold rounded-full transition delay-100 ease-in-out ${currentImg ==  data.length - 1  ? 'opacity-50' : "hover:bg-sickness-primary hover:text-white"} `}
                    onClick={() => setCurrentImg(prev => prev + 1)}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    )
}

export default Carousel