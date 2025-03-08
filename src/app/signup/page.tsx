import React, { useState } from 'react';
import Link from 'next/link';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { signupAction } from '../actions/action';
import { SubmitButton } from '@/components/form/Button';


const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <FormContainer action={signupAction}>

                    <div className="mb-4">
                        <FormInput name={'username'} type={'text'} label={'username'} placeholder='Enter your username' />
                    </div>
                    <div className="mb-4">
                        <FormInput name={'email'} type={'text'} label={'email'} placeholder='Enter your email' />
                    </div>
                    <div className="mb-6">
                        <FormInput name={'password'} type={'password'} label={'password'} placeholder='Enter your password' />
                    </div>
                  <SubmitButton name="submit" text="Sign Up" />
                </FormContainer>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link href="/signin" className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;