import React, { useEffect, useState } from 'react'
import ButtonCustom from '../../components/user/ButtonCustom/ButtonCustom';
import Breadcrumb from '../../components/user/Breadcrumb';
import { changePassword, getMyInformation } from '../../services/authService';
import { Booking } from '../../types/Booking';
import { getBookingHistory } from '../../services/bookingService';
import { useSearchParams } from 'react-router-dom';

const Account: React.FC = () => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") || "info";
    const [activeCategory, setActiveCategory] = useState<string>(initialTab);
    const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');
            await changePassword(auth.user.user._id, passwordData.oldPassword, passwordData.newPassword);
            alert("Password changed successfully!");

            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            
            window.location.href = '/login';
        } catch (error) {
            console.error("Failed to change password:", error);
            alert("Failed to change password. Please try again.");
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getMyInformation();
                setFormData({
                    username: userInfo.user.fullname || '',
                    name: userInfo.user.username || '',
                    email: userInfo.user.email || '',
                    phone: userInfo.user.phone || '',
                    address: userInfo.user.address || ''
                });
            } catch (err) {
                console.error('Failed to fetch user information:', err);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            if (activeCategory !== 'history') return;

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const auth = JSON.parse(localStorage.getItem('auth') || '{}');
            console.log(auth.user.user._id)
            try {
                const data = await getBookingHistory(auth.user.user._id);
                console.log(data)
                setBookingHistory(data);
            } catch (error) {
                console.error('Failed to fetch booking history:', error);
            }
        };

        fetchBookingHistory();
    }, [activeCategory]);

    return (
        <section className="account">
            <Breadcrumb
                title="Account"
                links={[{ name: 'Home', href: '/' }]} />
            <div className='mx-70'>
                <div className="flex gap-8 mt-8">
                    {/* Left Sidebar */}
                    <div className="w-1/4 h-[40rem] bg-white p-4 shadow-md rounded-lg">
                        <ul className="space-y-4 h-full flex flex-col gap-4">
                            <li>
                                <button
                                    onClick={() => handleCategoryClick('info')}
                                    className={`text-lg font-semibold ${activeCategory === 'info' ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-400`}
                                >
                                    Account Information
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleCategoryClick('history')}
                                    className={`text-lg font-semibold ${activeCategory === 'history' ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-400`}
                                >
                                    Booking History
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleCategoryClick('changePassword')}
                                    className={`text-lg font-semibold ${activeCategory === 'changePassword' ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-400`}>
                                    Change Password
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-lg font-semibold text-gray-500 hover:text-gray-400"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Right Content */}
                    <div className="w-3/4">
                        {/* Render content based on activeCategory */}
                        {activeCategory === 'info' && (
                            <div id="info" className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800">Account Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                                    {/* Form Section */}
                                    <div className="form_info md:col-span-2">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Name Field */}
                                            <div>
                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter your user name"
                                                />
                                            </div>

                                            {/* Username Field */}
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">User Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter your user name"
                                                />
                                            </div>

                                            {/* Email Field */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter your email"
                                                />
                                            </div>

                                            {/* Phone Field */}
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>

                                            {/* Address Field */}
                                            <div>
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter your address"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <div>
                                                <ButtonCustom type='submit' className='w-full uppercase transition duration-300'>
                                                    Update Information
                                                </ButtonCustom>
                                            </div>
                                        </form>
                                    </div>
                                    {/* Avatar Section */}
                                    <div className="avatar flex flex-col items-center">
                                        <img
                                            className="h-40 w-40 rounded-full object-cover shadow-lg"
                                            src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-50.jpg"
                                            alt="Avatar Profile"
                                        />
                                        <ButtonCustom type='button' className='transition duration-300 rounded-md'>
                                            Update Image
                                        </ButtonCustom>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeCategory === "history" && (
                            <div id="history" className="mb-10">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking History</h2>
                                <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-lg">
                                    {bookingHistory.length > 0 ? (
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-blue-500 text-white">
                                                    <th className="p-4 text-left rounded-tl-lg">Tour</th>
                                                    <th className="p-4 text-left">Date</th>
                                                    <th className="p-4 text-left rounded-tr-lg">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookingHistory.map((booking, index) => (
                                                    <tr
                                                        key={booking._id}
                                                        className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                            } hover:bg-gray-100 transition-all`}
                                                    >
                                                        <td className="p-4 font-medium text-gray-800">{booking.tourDetails?.name || "N/A"}</td>
                                                        <td className="p-4 text-gray-600">
                                                            {new Date(booking.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="p-4 font-semibold">
                                                            <span
                                                                className={`px-3 py-1 text-sm rounded-full ${booking.status === "Confirmed"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : booking.status === "Pending"
                                                                            ? "bg-yellow-100 text-yellow-700"
                                                                            : "bg-red-100 text-red-700"
                                                                    }`}
                                                            >
                                                                {booking.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-gray-500 text-center py-6">No booking history available.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeCategory === 'changePassword' && (
                            <div id="changePassword" className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
                                <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
                                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Old Password</label>
                                            <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter old password" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">New Password</label>
                                            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter new password" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                            <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Confirm new password" required />
                                        </div>
                                        <ButtonCustom type="submit" className="w-full uppercase transition duration-300">
                                            Change Password
                                        </ButtonCustom>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Account;
