import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userRegistration } from "../../redux/slices/AuthSlice";

const SignUp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const defaultNumber = location?.state?.phone;

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: defaultNumber,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const storedToken = localStorage.getItem("userToken");

            if (!storedToken) {
                toast.error("Session expired. Please login again.");
                return;
            }

            const { token } = JSON.parse(storedToken);
            const payload = {
                token: token,
                email: form?.email,
                mobile_no: form?.mobile,
                full_name: form?.name
            }
            const res = await dispatch(userRegistration(payload)).unwrap();
            toast.success(res?.message)
            if (res?.code === 200) {
                localStorage.setItem(
                    "userData",
                    JSON.stringify({ token: res?.data?.token })
                );
                localStorage.setItem(
                    "user_id",
                    JSON.stringify(res?.data?.user?.id)
                );
                localStorage.removeItem("userToken");
                // window.location.reload();
                navigate("/")
            }

        } catch (error) {
            toast.error(error?.message || error)
        }

    };

    return (
        <div className="flex flex-row-reverse min-h-[calc(100vh-80px)] w-full">

            {/* LEFT SIDE – SIGNUP FORM */}
            <div className="flex w-full items-center justify-center lg:w-1/2">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                    {/* Header */}
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                    <p className="mt-1 mb-8 text-sm leading-relaxed text-gray-500">
                        Create your account to get started
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <Input
                            label="Mobile Number"
                            name="mobile"
                            type="tel"
                            maxLength={10}
                            placeholder="Enter mobile number"
                            value={form.mobile}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    mobile: e.target.value.replace(/\D/g, ""),
                                })
                            }
                        />

                        <Input
                            label="Full Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <Button
                            type="submit"
                            disabled={
                                !form.name ||
                                !form.email ||
                                form.mobile.length !== 10
                            }
                            className="w-full rounded-lg py-3 text-sm font-medium"
                        >
                            Create Account
                        </Button>

                        <p className="text-center text-xs text-gray-400">
                            By signing up, you agree to our{" "}
                            <span className="cursor-pointer text-orange-500 hover:underline">
                                Terms & Conditions
                            </span>
                        </p>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE – IMAGE */}
            <div className="relative hidden lg:block lg:w-1/2">
                <img
                    src="https://mma.prnewswire.com/media/2717619/Swiggy_Logo.jpg?p=twitter"
                    alt="Signup Banner"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

        </div>
    );
};

export default SignUp;
