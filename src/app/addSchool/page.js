"use client";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

export default function AddSchool() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();

        // append all text fields
        formData.append("name", data.name);
        formData.append("address", data.address);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("contact", data.contact);
        formData.append("email_id", data.email_id);

        // append the first file only
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        try {
            const res = await axios.post("/api/schools", formData);
            toast.success("School added successfully!");
            router.push("/");
            reset();
        } catch (error) {
            toast.error("Error adding school data!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center  ">Add School Data</h1>

            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
                {loading ? (
                    <Loader />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                School Name : <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("name", { required: true })}
                                placeholder="Enter Name"
                                className="border border-gray-500 p-2 w-full"
                            />
                            {errors.name && <p className="text-red-500">Name is required</p>}
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address : <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register("address", { required: true })}
                                placeholder="Enter Address"
                                className="border border-gray-500 p-2 w-full"
                            />
                            {errors.address && <p className="text-red-500">Address is required</p>}
                        </div>

                        {/* City */}
                        <div className="mb-4">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City : <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("city", { required: true })}
                                placeholder="Enter City"
                                className="border border-gray-500 p-2 w-full"
                            />
                            {errors.city && <p className="text-red-500">City is required</p>}
                        </div>

                        {/* State */}
                        <div className="mb-4">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                State : <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("state", { required: true })}
                                placeholder="Enter State"
                                className="border border-gray-500 p-2 w-full"
                            />
                            {errors.state && <p className="text-red-500">State is required</p>}
                        </div>

                        {/* Contact */}
                        <div className="mb-4">
                            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                                Contact No : <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("contact", {
                                    required: "Contact is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit Indian mobile number",
                                    },
                                })}
                                placeholder="Enter Contact No"
                                className="border border-gray-500 p-2 w-full"
                            />
                            {errors.contact && <p className="text-red-500">{errors.contact.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email_id" className="block text-sm font-medium text-gray-700 mb-1">
                                Email : <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("email_id", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                placeholder="Enter Email"
                                className="border border-gray-500 p-2 w-full"
                            />
                            {errors.email_id && <p className="text-red-500">{errors.email_id.message}</p>}
                        </div>

                        {/* Image */}
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                Image : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: "Image is required" })}
                                className="border border-gray-500 p-2 w-full bg-gray-100 cursor-pointer"
                            />
                            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 cursor-pointer">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}