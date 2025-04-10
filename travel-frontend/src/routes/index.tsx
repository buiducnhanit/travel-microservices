import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from '../layouts/UserLayout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Tours from '../pages/user/Tours'
import Home from '../pages/user/Home'
import About from '../pages/user/About'
import Contact from '../pages/user/Contact'
import TourDetails from '../pages/user/TourDetails'
import DestinationPage from '../pages/user/DestinationPage'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard/Dashboard'
import ManageTours from '../pages/admin/ManageTours/ManageTours'
import CreateTour from '../pages/admin/ManageTours/CreateTour'
import ManageDestinations from '../pages/admin/ManageDestinations/ManageDestinations'
import EditTour from '../pages/admin/ManageTours/EditTour'
import DestinationForm from '../pages/admin/ManageDestinations/DestinationForm'
import ManageCustomer from '../pages/admin/ManageCustomer/ManageCustomer'
import ManageBooking from '../pages/admin/ManageBooking/ManageBooking'
import Account from '../pages/user/Account'
import ProtectedRoute from './ProtectedRoute'
import NotFound from '../pages/error/NotFound'
import Forbidden from '../pages/error/Forbidden'
import BookingForm from '../pages/user/BookingForm'
import ManageRole from '../pages/admin/ManageRole/ManageRole'

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* User Layout */}
                <Route element={<UserLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/tours/:id" element={<TourDetails />} />
                    <Route path="/destinations" element={<DestinationPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/booking/:tourId" element={<BookingForm />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoute roleRequired="Admin" />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/dashboard/tours" element={<ManageTours />} />
                        <Route path="/dashboard/tours/create" element={<CreateTour />} />
                        <Route path="/dashboard/tours/edit/:id" element={<EditTour />} />

                        <Route path="/dashboard/destinations" element={<ManageDestinations />} />
                        <Route path="/dashboard/destinations/create" element={<DestinationForm />} />
                        <Route path="/dashboard/destinations/edit/:id" element={<DestinationForm />} />

                        <Route path="/dashboard/customers" element={<ManageCustomer />} />

                        <Route path="/dashboard/bookings" element={<ManageBooking />} />

                        <Route path="/dashboard/roles" element={<ManageRole />} />
                    </Route>
                </Route>

                {/* Trang lỗi */}
                <Route path="*" element={<NotFound />} />
                <Route path="/403" element={<Forbidden />} />
            </Routes>
        </BrowserRouter >
    )
}

export default AppRoutes