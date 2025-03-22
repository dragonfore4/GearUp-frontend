// import { SubmitButton } from '@/components/form/Button';
// import FormContainer from '@/components/form/FormContainer';
// import FormInput from '@/components/form/FormInput';
// import Link from 'next/link';
// import { signinAction } from '../actions/action';

// const SignInPage = () => {
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//             <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//                 <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Sign In</h2>

//                 <FormContainer action={signinAction}>
//                     <div className="mb-4">
//                         <FormInput
//                             name="username"
//                             type="text"
//                             label="Username"
//                             placeholder="Enter your username"
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <FormInput
//                             name="password"
//                             type="password"
//                             label="Password"
//                             placeholder="Enter your password"
//                         />
//                     </div>

//                     <SubmitButton name="submit" text="Sign In" />
//                 </FormContainer>

//                 <p className="mt-6 text-center text-sm text-gray-600">
//                     Don&apos;t have an account?{' '}
//                     <Link href="/signup" className="text-indigo-600 hover:underline font-medium">
//                         Sign Up
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SignInPage;


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
            <div className="max-w-md mx-auto px-4 py-12 -mt-8">
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
