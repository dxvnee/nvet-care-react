import Checkbox from '@/Components/Checkbox';
import {
    EyeIcon,
    EyeSlashIcon,
    MailIcon,
    SpinnerIcon,
} from '@/Components/Icons';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk - Nvet Care" />

            {/* Header Titles */}
            <div className="mb-6">
                <h2 className="font-heading text-xl font-bold tracking-tight text-nvet-dark">
                    Selamat Datang Kembali!
                </h2>
                <p className="mt-1 font-sans text-xs leading-relaxed text-black sm:text-sm">
                    Masuk untuk melanjutkan konsultasi kesehatan hewan
                    kesayangan Anda.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email Field */}
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email :" />

                    <div className="relative">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pe-10"
                            placeholder="nama@email.com"
                            autoComplete="username"
                            isFocused={true}
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
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi:" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-medium text-nvet-primary transition-colors hover:text-nvet-dark hover:underline"
                            >
                                Lupa kata sandi?
                            </Link>
                        )}
                    </div>

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="block w-full pe-10"
                            placeholder="••••••••"
                            autoComplete="current-password"
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

                {/* Remember Me Checkbox */}
                <div className="pt-1">
                    <label className="inline-flex cursor-pointer items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2.5 text-xs text-stone-600 sm:text-sm">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <PrimaryButton
                        className="w-full py-3 font-heading text-lg font-semibold"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center gap-2">
                                <SpinnerIcon className="h-4 w-4 animate-spin text-white" />
                                <span>Sedang Masuk...</span>
                            </span>
                        ) : (
                            'Masuk'
                        )}
                    </PrimaryButton>
                </div>
            </form>

            {/* Bottom Register */}
            <div className="mt-6 border-t border-stone-100 pt-5 text-center text-xs text-stone-600 sm:text-sm">
                <span>Belum memiliki akun Nvet Care? </span>
                <Link
                    href={route('register')}
                    className="font-semibold text-nvet-primary transition-colors hover:text-nvet-dark hover:underline"
                >
                    Daftar Sekarang Gratis
                </Link>
            </div>
        </GuestLayout>
    );
}
