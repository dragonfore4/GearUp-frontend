import { SubmitButton } from '@/components/form/Button';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import Link from 'next/link';
import { signinAction } from '../actions/action';



const SignInPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

                <FormContainer action={signinAction}>
                    <div className="mb-4">
                        <FormInput
                            name="username"
                            type="text"
                            label="username"
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

                    <SubmitButton name="submit" text="Sign In" />
                </FormContainer>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;