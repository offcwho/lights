'use client'

import Container from '@/components/Container';
import React, { useState, useEffect } from 'react';

// ---------- TYPES ----------
interface PurchaseItem {
    id: string;
    name: string;
    price: number;
    date: string;
    image: string;
    status: 'delivered' | 'processing' | 'returned';
}

interface UserSettings {
    name: string;
    email: string;
    phone: string;
    newsletter: boolean;
    darkMode: boolean;
    language: 'ru' | 'en';
}

// ---------- MOCK DATA ----------
const MOCK_PURCHASES: PurchaseItem[] = [
    {
        id: 'ord-001',
        name: 'LED панель «Aurora Smart» 40W',
        price: 4990,
        date: '2025-04-10T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=200&h=200&fit=crop',
        status: 'delivered',
    },
    {
        id: 'ord-002',
        name: 'Настольная лампа «Glow Pro»',
        price: 2890,
        date: '2025-03-28T14:30:00Z',
        image: 'https://images.unsplash.com/photo-1507473885765-e6b057e782df?w=200&h=200&fit=crop',
        status: 'delivered',
    },
    {
        id: 'ord-003',
        name: 'Светодиодная лента RGB 5м',
        price: 3450,
        date: '2025-04-05T09:15:00Z',
        image: 'https://images.unsplash.com/photo-1551796880-ddd03f861ae6?w=200&h=200&fit=crop',
        status: 'processing',
    },
];

// ---------- UTILS ----------
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getStatusConfig = (status: PurchaseItem['status']) => {
    switch (status) {
        case 'delivered':
            return { text: 'Доставлен', bg: 'bg-emerald-50', color: 'text-emerald-700', dot: 'bg-emerald-500' };
        case 'processing':
            return { text: 'В обработке', bg: 'bg-amber-50', color: 'text-amber-700', dot: 'bg-amber-500' };
        case 'returned':
            return { text: 'Возврат', bg: 'bg-rose-50', color: 'text-rose-700', dot: 'bg-rose-500' };
    }
};

// ---------- ИКОНКИ (SVG) ----------
const Icons = {
    Bag: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    ),
    Settings: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    User: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    Mail: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Phone: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    ),
    Globe: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Bell: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
    ),
    Logout: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    ),
    ChevronRight: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    ),
    Star: () => (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ),
};

// ---------- КОМПОНЕНТ ПОСЛЕДНИХ ПОКУПОК ----------
const RecentPurchases: React.FC<{ purchases: PurchaseItem[] }> = ({ purchases }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 rounded-xl">
                        <Icons.Bag />
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 ">Последние покупки</h2>
                </div>
                <button className="text-xs sm:text-sm text-emerald-600  hover:text-emerald-700 font-medium flex items-center gap-1">
                    Все заказы <Icons.ChevronRight />
                </button>
            </div>
            <div className="divide-y divide-gray-100">
                {purchases.map((item) => {
                    const status = getStatusConfig(item.status);
                    return (
                        <div key={item.id} className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex gap-3 sm:gap-4 flex-col sm:flex-row">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full sm:w-16 h-32 sm:h-16 rounded-xl object-cover shadow-sm"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-gray-900  truncate text-sm sm:text-base">{item.name}</h3>
                                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900 ">
                                                    {item.price.toLocaleString('ru-RU')} ₽
                                                </span>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span className="text-xs text-gray-500">{formatDate(item.date)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full ${status.bg}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                <span className={`text-xs font-medium ${status.color}`}>{status.text}</span>
                                            </div>
                                            <button className="text-xs sm:text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                                                Повторить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ---------- КОМПОНЕНТ НАСТРОЕК ----------
const SettingsPanel: React.FC<{
    settings: UserSettings;
    onUpdate: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
    onSave: () => void;
}> = ({ settings, onUpdate, onSave }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 ">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50  rounded-xl">
                        <Icons.Settings />
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Настройки профиля</h2>
                </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Имя */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Имя и фамилия</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icons.User />
                        </div>
                        <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => onUpdate('name', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200  bg-white text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icons.Mail />
                        </div>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => onUpdate('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200  bg-white  text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* Телефон */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icons.Phone />
                        </div>
                        <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => onUpdate('phone', e.target.value)}
                            placeholder="+7 (999) 123-45-67"
                            className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                        />
                    </div>
                </div>

                {/* Язык */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">Язык</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icons.Globe />
                        </div>
                        <select
                            value={settings.language}
                            onChange={(e) => onUpdate('language', e.target.value as 'ru' | 'en')}
                            className="w-full pl-10 pr-10 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none cursor-pointer"
                        >
                            <option value="ru">🇷🇺 Русский</option>
                            <option value="en">🇬🇧 English</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Переключатели */}
                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                            <Icons.Bell />
                            <span className="text-xs sm:text-sm text-gray-700">Подписка на новинки и акции</span>
                        </div>
                        <button
                            onClick={() => onUpdate('newsletter', !settings.newsletter)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${settings.newsletter ? 'bg-emerald-600' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${settings.newsletter ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Кнопка сохранения */}
                <button
                    onClick={onSave}
                    className="w-full mt-3 sm:mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                >
                    Сохранить изменения
                </button>

                {/* Кнопка выхода */}
                <button className="w-full mt-2 text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium py-2 flex items-center justify-center gap-2 transition-colors">
                    <Icons.Logout />
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
};

// ---------- TOAST ----------
const Toast: React.FC<{ message: string; visible: boolean }> = ({ message, visible }) => {
    if (!visible) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-5 py-3 rounded-full text-sm shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <Icons.Star />
            {message}
        </div>
    );
};

// ---------- MAIN COMPONENT ----------
const UserProfile: React.FC = () => {
    const [settings, setSettings] = useState<UserSettings>({
        name: 'Александра Светлова',
        email: 'a.svetlova@lumenshop.ru',
        phone: '+7 (999) 123-45-67',
        newsletter: true,
        darkMode: false,
        language: 'ru',
    });
    const [purchases] = useState(MOCK_PURCHASES);
    const [toast, setToast] = useState({ message: '', visible: false });

    const showToast = (msg: string) => {
        setToast({ message: msg, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 2500);
    };

    const handleSettingsUpdate = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        if (key === 'darkMode') {
            document.documentElement.classList.toggle('dark', value as boolean);
        }
    };

    const handleSaveSettings = () => {
        showToast('Настройки успешно сохранены');
    };

    // Статистика
    const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);
    const ordersCount = purchases.length;

    return (
        <Container>
            <div className="font-sans transition-colors">
                <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
                    {/* Header с карточкой пользователя */}
                    <div className="mb-6 sm:mb-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                                            <span className="text-3xl font-semibold text-white">АС</span>
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-4 border-white">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{settings.name}</h1>
                                        <p className="text-gray-500 mt-1">Добро пожаловать в ваш световой профиль</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-center px-4 py-2 bg-gray-50 rounded-xl">
                                        <div className="text-2xl font-bold text-emerald-600">{ordersCount}</div>
                                        <div className="text-xs text-gray-500">Заказа</div>
                                    </div>
                                    <div className="text-center px-4 py-2 bg-gray-50 rounded-xl">
                                        <div className="text-2xl font-bold text-emerald-600">{totalSpent.toLocaleString('ru-RU')} ₽</div>
                                        <div className="text-xs text-gray-500">Потрачено</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid: Покупки + Настройки */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <RecentPurchases purchases={purchases} />
                        <SettingsPanel settings={settings} onUpdate={handleSettingsUpdate} onSave={handleSaveSettings} />
                    </div>

                    {/* Футер */}
                    <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-400">
                        <p>© 2025 LUMEN — световые решения для вашего дома</p>
                    </div>
                </div>
                <Toast message={toast.message} visible={toast.visible} />
            </div>
        </Container>
    );
};

export default UserProfile;