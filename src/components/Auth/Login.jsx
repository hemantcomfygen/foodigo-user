import React, { useState } from "react";
import Input from "../Input/Input";
import OTPInput from "../Input/OTPInput";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("")
    const [otpError, setOtpError] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMobileSubmit = async (e) => {
        e.preventDefault();

        try {
            const country_code = {
                name: "India",
                dialCode: "+91",
                shortName: "IN",
                emoji: "🇮🇳"
            };

            setLoading(true);

            const res = await dispatch(
                sendOtp({ phone: mobile, country_code })
            ).unwrap();

            toast.success(res?.message || "OTP sent");

            if (res?.code === 200) {
                localStorage.setItem(
                    "userToken",
                    JSON.stringify({ token: res?.data?.userToken })
                );
                setStep(2);
            }

        } catch (error) {
            toast.error(error?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const storedToken = localStorage.getItem("userToken");

            if (!storedToken) {
                toast.error("Session expired. Please login again.");
                return;
            }

            const { token } = JSON.parse(storedToken);

            setLoading(true);

            const res = await dispatch(
                verifyOtp({ userToken: token, otp })
            ).unwrap();

            if (res?.code === 200) {
                toast.success(res?.message);
                localStorage.setItem(
                    "userData",
                    JSON.stringify({ token: res?.data?.token })
                );
                localStorage.removeItem("userToken");
                navigate("/")
            }

            if (res?.code === 201) {
                toast.success("Account not registered, please signup");

                localStorage.setItem(
                    "userToken",
                    JSON.stringify({ token: res?.data?.token })
                );

                navigate("/signup", { state: { phone: mobile } });
            }

        } catch (error) {
            toast.error(error?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-row-reverse min-h-[calc(100vh-80px)] w-full">

            {/* LEFT SIDE – LOGIN */}
            <div className="flex w-full items-center justify-center lg:w-1/2 bg-orange-50">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                    {/* Header */}
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                        {step === 1 ? "Login" : "Verify OTP"}
                    </h2>

                    <p className="mt-1 mb-8 text-sm leading-relaxed text-gray-500">
                        {step === 1
                            ? "Enter your mobile number to continue"
                            : `OTP sent to +91 ${mobile}`}
                    </p>

                    {/* STEP 1 */}
                    {step === 1 && (
                        <form onSubmit={handleMobileSubmit} className="space-y-6">
                            <Input
                                label="Mobile Number"
                                type="tel"
                                maxLength={10}
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) =>
                                    setMobile(e.target.value.replace(/\D/g, ""))
                                }
                            />

                            <Button
                                type="submit"
                                disabled={mobile.length !== 10}
                                className="w-full rounded-lg py-3 text-sm font-medium"
                            >
                                Continue
                            </Button>

                            <p className="text-center text-xs text-gray-400">
                                By continuing, you agree to our{" "}
                                <span className="cursor-pointer text-orange-500 hover:underline">
                                    Terms & Conditions
                                </span>
                            </p>
                        </form>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <OTPInput length={6} value={otp} onChange={setOtp} error={otpError}
                                onComplete={() => setOtpError("")}
                                disabled={loading} />

                            <Button className="w-full rounded-lg py-3 text-sm font-medium" onClick={() => handleVerifyOTP()}>
                                Verify & Login
                            </Button>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-orange-500 hover:underline"
                                >
                                    Change number
                                </button>

                                <button className="text-gray-400 hover:text-gray-600">
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* RIGHT SIDE – IMAGE */}
            <div className="relative hidden lg:block lg:w-1/2">
                <img
                    src="https://mma.prnewswire.com/media/2717619/Swiggy_Logo.jpg?p=twitter"
                    alt="Login Banner"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>

        </div>
    );
};

export default Login;
