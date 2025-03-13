import React from 'react'

const ProductReview = ({ shortName = "JD", name = "John Doe", day = 2, review = "This product is amazing! The quality is top-notch and it exceeded my expectations. Highly recommend!" }: { shortName?: string, name?: string, day?: number, review?: string }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-700 font-semibold">{shortName}</span>
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{day} days ago</p>
                </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
                {review}
            </p>
        </div>
    )
}

export default ProductReview