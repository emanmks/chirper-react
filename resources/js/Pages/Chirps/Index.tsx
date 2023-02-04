import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/inertia-react';
import useRoute from '@/Hooks/useRoute';
import InputError from '@/Components/InputError';
import { Chirp } from '@/types';
import ChirpItem from './Partials/ChirpItem';

interface Props {
    chirps: Chirp[];
}

export default function Index({ chirps }: Props) {
    const route = useRoute();
    const form = useForm({
        message: '',
    });
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('chirps.store'), {
            onFinish: () => form.reset('message'),
        })
    }
    const onUpdate = (e: React.FormEvent) => {
        form.setData('message', e.currentTarget.value);
    }
    return (
        <AppLayout
            title={'Chirps'}
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Chirps
                </h2>
            )}
        >
            <div>
                <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                    <form onSubmit={onSubmit}>
                        <textarea
                            value={form.data.message}
                            placeholder="What's on your mind?"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={onUpdate}
                        ></textarea>
                        <InputError className="mt-2" message={form.errors.message} />
                        <PrimaryButton className="mt-4">Chirp</PrimaryButton>
                    </form>

                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        {chirps.map(chirp =>
                            <ChirpItem key={chirp.id} chirp={chirp} />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}