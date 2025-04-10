import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import Link from 'next/link';
import { signinAction } from '../../actions/action';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const SignInPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Banner */}
            <div className="relative bg-gradient-to-r from-indigo-800 to-purple-900 py-16">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative max-w-5xl mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-4 text-lg text-indigo-100 max-w-3xl mx-auto">
                        Sign in to your account to continue your GearUp experience
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-md mx-auto px-4 py-12 mt-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 transform transition-all duration-300 hover:shadow-xl">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                            <FaUser className="text-white text-2xl" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign In</h2>

                    <FormContainer action={signinAction}>
                        <div className="mb-5">
                            <FormInput
                                name="username"
                                type="text"
                                label="Username"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-6">
                            <FormInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            name="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
                        >
                            Sign In
                            <FaSignInAlt className="ml-2" />
                        </button>
                    </FormContainer>

                    {/* Divider */}
                    <div className="my-8 flex items-center justify-center">
                        <span className="h-px bg-gray-300 w-full" />
                        <span className="mx-4 text-sm text-gray-500">or</span>
                        <span className="h-px bg-gray-300 w-full" />
                    </div>

                    {/* OAuth Button */}
                    <a
                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorization/google`}
                        className="w-full py-3 bg-white border border-gray-300 text-gray-700 text-lg font-medium rounded-lg shadow-md hover:shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                            <path
                                fill="#fbc02d"
                                d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.5-5.9 7.7-11.3 7.7-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .8 8.3 2.5l6.1-6.1C33.9 4.6 29.2 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.2-.1-2.1-.4-3.5z"
                            />
                            <path
                                fill="#e53935"
                                d="M6.3 14.7l6.6 4.8C14 16.2 18.7 13 24 13c3.1 0 6 .8 8.3 2.5l6.1-6.1C33.9 4.6 29.2 3 24 3c-7.4 0-13.9 3.5-18.1 8.8z"
                            />
                            <path
                                fill="#4caf50"
                                d="M24 45c5.4 0 10.4-2.1 14.1-5.5l-6.5-5.3c-2 1.4-4.5 2.3-7.6 2.3-5.4 0-9.9-3.4-11.5-8.1l-6.6 5.1C9.8 41.6 16.4 45 24 45z"
                            />
                            <path
                                fill="#1565c0"
                                d="M43.6 20.5H42V20H24v8h11.3c-0.7 1.9-1.9 3.6-3.4 5l6.5 5.3c1.7-1.6 3.1-3.5 4-5.8.8-2.1 1.2-4.3 1.2-6.5 0-1.2-.1-2.1-.4-3.5z"
                            />
                        </svg>
                        Sign in with Google
                    </a>
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition-colors">
                                Sign Up
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

export default SignInPage;
