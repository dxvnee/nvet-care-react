import {
    EyeIcon,
    EyeSlashIcon,
    MailIcon,
    SpinnerIcon,
    UserIcon,
} from '@/Components/Icons';
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

            {/* Header Titles */}
            <div className="mb-6">
                <h2 className="font-heading text-xl font-bold tracking-tight text-nvet-dark">
                    Buat Akun Nvet Care 🐾
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600 sm:text-sm">
                    Daftar gratis untuk mulai konsultasi kesehatan anabul
                    bersama dokter hewan profesional.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

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
                            <UserIcon className="h-4 w-4" />
                        </div>
                    </div>

                    <InputError
                        message={errors.name}
                        className="mt-1.5 text-xs"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Alamat Email"
                        className="mb-1"
                    />

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
                            <MailIcon className="h-4 w-4" />
                        </div>
                    </div>

                    <InputError
                        message={errors.email}
                        className="mt-1.5 text-xs"
                    />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel htmlFor="password" value="Kata Sandi" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="block w-full pe-10"
                            placeholder="Minimal 8 karakter"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-400 transition-colors hover:text-nvet-dark focus:outline-none"
                            aria-label={
                                showPassword
                                    ? 'Sembunyikan kata sandi'
                                    : 'Tampilkan kata sandi'
                            }
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-4 w-4" />
                            ) : (
                                <EyeIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>

                    <InputError
                        message={errors.password}
                        className="mt-1.5 text-xs"
                    />
                </div>

                {/* Password Confirmation */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Konfirmasi Kata Sandi"
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
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute inset-y-0 end-0 flex items-center pe-3 text-stone-400 transition-colors hover:text-nvet-dark focus:outline-none"
                            aria-label={
                                showConfirmPassword
                                    ? 'Sembunyikan konfirmasi kata sandi'
                                    : 'Tampilkan konfirmasi kata sandi'
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-4 w-4" />
                            ) : (
                                <EyeIcon className="h-4 w-4" />
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
                        className="w-full py-3 font-heading text-sm font-semibold shadow-md shadow-nvet-dark/15"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <SpinnerIcon className="h-4 w-4 animate-spin text-white" />
                                <span>Mendaftarkan Akun...</span>
                            </span>
                        ) : (
                            'Daftar'
                        )}
                    </PrimaryButton>
                </div>
            </form>

            {/* Bottom Login */}
            <div className="mt-6 border-t border-stone-100 pt-5 text-center text-xs text-stone-600 sm:text-sm">
                <span>Sudah memiliki akun Nvet Care? </span>
                <Link
                    href={route('login')}
                    className="font-semibold text-nvet-primary transition-colors hover:text-nvet-dark hover:underline"
                >
                    Masuk ke Akun
                </Link>
            </div>
        </GuestLayout>
    );
}
