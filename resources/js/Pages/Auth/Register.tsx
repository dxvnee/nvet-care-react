import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun - Nvet Care" />

            {/* Auth Mode Switcher Tab */}
            <div className="mb-6 grid grid-cols-2 rounded-2xl bg-nvet-bg p-1 text-center text-sm font-medium">
                <Link
                    href={route('login')}
                    className="flex items-center justify-center rounded-xl py-2 text-stone-600 transition-colors hover:text-nvet-dark hover:bg-white/60"
                >
                    Masuk
                </Link>
                <span className="flex items-center justify-center rounded-xl bg-nvet-dark py-2 text-white shadow-sm shadow-nvet-dark/20 font-semibold">
                    Daftar Akun
                </span>
            </div>

            {/* Header Titles */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-nvet-dark">
                    Buat Akun Nvet Care 🐾
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Daftar gratis untuk mulai konsultasi kesehatan anabul bersama dokter hewan profesional.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-nvet-dark" />

                    <div className="relative">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full pe-10"
                            placeholder="Contoh: Sarah Lestari / drh. Ahmad"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5 text-stone-400">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.name} className="mt-1.5 text-xs" />
                </div>

                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-nvet-dark" />

                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pe-10"
                            placeholder="nama@email.com"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3.5 text-stone-400">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                            </svg>
                        </div>
                    </div>

                    <InputError message={errors.email} className="mt-1.5 text-xs" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-nvet-dark" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="block w-full pe-10"
                            placeholder="Minimal 8 karakter"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-400 transition-colors hover:text-nvet-dark focus:outline-none"
                            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                        >
                            {showPassword ? (
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                </svg>
                            ) : (
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                {/* Password Confirmation Field */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
                        className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-nvet-dark"
                    />

                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full pe-10"
                            placeholder="Ulangi kata sandi Anda"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-400 transition-colors hover:text-nvet-dark focus:outline-none"
                            aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi kata sandi' : 'Tampilkan konfirmasi kata sandi'}
                        >
                            {showConfirmPassword ? (
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                </svg>
                            ) : (
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full py-3 text-sm font-semibold shadow-md shadow-nvet-dark/15"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                </svg>
                                <span>Mendaftarkan Akun...</span>
                            </span>
                        ) : (
                            'Daftar Akun Baru'
                        )}
                    </PrimaryButton>
                </div>
            </form>

            {/* Bottom Login Prompt */}
            <div className="mt-6 border-t border-stone-100 pt-5 text-center text-xs sm:text-sm text-stone-600">
                <span>Sudah memiliki akun Nvet Care? </span>
                <Link
                    href={route('login')}
                    className="font-semibold text-nvet-primary transition-colors hover:text-nvet-dark hover:underline"
                >
                    Masuk ke Akun
                </Link>
            </div>

            {/* Subtle Green Trust Note */}
            <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-nvet-green/20 bg-nvet-green-light/60 p-2.5 text-[11px] text-nvet-green">
                <svg className="h-3.5 w-3.5 shrink-0 text-nvet-green" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Akun Anda terhubung langsung dengan rekam medis dokter hewan resmi</span>
            </div>
        </GuestLayout>
    );
}

