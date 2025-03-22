import React from 'react';
import Link from 'next/link';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { signupAction } from '../../actions/action';
import { SubmitButton } from '@/components/form/Button';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-indigo-800 to-purple-900 py-16">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Create an Account
                    </h1>
                    <p className="mt-4 text-lg text-indigo-100 max-w-3xl mx-auto">
                        Join GearUp today and discover premium tech for your next adventure
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-md mx-auto px-4 py-12 -mt-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                            <FaUserPlus className="text-white text-2xl" />
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                    
                    <FormContainer action={signupAction}>
                        <div className="mb-5">
                            <FormInput 
                                name="username" 
                                type="text" 
                                label="Username" 
                                placeholder="Choose a username" 
                                className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg"
                                icon={<FaUser className="text-gray-400" />}
                            />
                        </div>
                        <div className="mb-5">
                            <FormInput 
                                name="email" 
                                type="email" 
                                label="Email" 
                                placeholder="Enter your email address" 
                                className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg"
                                icon={<FaEnvelope className="text-gray-400" />}
                            />
                        </div>
                        <div className="mb-6">
                            <FormInput 
                                name="password" 
                                type="password" 
                                label="Password" 
                                placeholder="Create a secure password" 
                                className="border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-lg"
                                icon={<FaLock className="text-gray-400" />}
                            />
                        </div>
                        <SubmitButton 
                            name="submit" 
                            text="Create Account" 
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                            icon={<FaUserPlus className="ml-2" />}
                        />
                    </FormContainer>
                    
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link href="/signin" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors">
                                Sign In
                            </Link>
                        </p>
                        <Link href="/" className="block mt-4 text-sm text-indigo-500 hover:text-indigo-700 transition-colors">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;