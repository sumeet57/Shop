import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineKey,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineRefresh,
} from "react-icons/hi";
import { toast } from "react-toastify";
import { authApi } from "../interceptors/auth.api";

const InputField = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}) => (
  <div className="relative group">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
      {icon}
    </span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required
      className="w-full pl-12 pr-4 py-3 bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500"
    />
  </div>
);

const ActionButton = ({ onClick, disabled, children, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full flex justify-center items-center py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold transition-all duration-300 disabled:from-blue-400 disabled:to-blue-500 shadow-md hover:shadow-lg"
  >
    {children}
  </button>
);

const Auth = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const resetForm = () => {
    setEmail("");
    setName("");
    setPhone("");
    setCode("");
    setIsCodeSent(false);
    setIsLoading(false);
    setAttemptsLeft(null);
    setTimer(0);
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleRequestCode = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await authApi.post("/request-code", {
        email,
        type: isLogin ? "login" : "register",
      });
      toast.success(res.data.message);
      setAttemptsLeft(res.data.attemptsLeft);
      setIsCodeSent(true);
      setTimer(60);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";
    const payload = isLogin ? { email, code } : { email, name, code, phone };
    if (!isLogin) {
      if (!name) {
        toast.error("Please enter your name.");
        return;
      }
      if (!phone) {
        toast.error("Please enter your phone number.");
        return;
      }
    }
    try {
      setIsLoading(true);
      const res = await authApi.post(endpoint, payload);
      toast.success(res.data.message);
      navigate("/profile");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRegistrationFields = (disabled) => (
    <>
      <InputField
        icon={<HiOutlineUser className="h-5 w-5" />}
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
      />
      <InputField
        icon={<HiOutlinePhone className="h-5 w-5" />}
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={disabled}
      />
    </>
  );

  const renderFormFields = () => {
    const emailField = (
      <InputField
        icon={<HiOutlineMail className="h-5 w-5" />}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
    );

    if (!isCodeSent) {
      return (
        <>
          {!isLogin && renderRegistrationFields(isLoading)}
          {emailField}
        </>
      );
    }

    const disabledEmailField = (
      <InputField
        icon={<HiOutlineMail className="h-5 w-5" />}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={() => {}}
        disabled={true}
      />
    );

    const codeField = (
      <InputField
        icon={<HiOutlineKey className="h-5 w-5" />}
        type="text"
        placeholder="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    );

    return (
      <>
        {disabledEmailField}
        {codeField}
        {!isLogin && renderRegistrationFields(false)}
        {attemptsLeft !== null && (
          <div className="flex items-center justify-between text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <HiOutlineClock />
              <span>Attempts Left: {attemptsLeft}</span>
            </div>
            <button
              onClick={handleRequestCode}
              disabled={timer > 0 || isLoading}
              className={`flex items-center gap-1 text-blue-500 hover:text-blue-400 font-medium ${
                timer > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <HiOutlineRefresh />
              {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="authpage flex items-center justify-center min-h-screen bg-black font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800">
        <div>
          <h2 className="text-3xl font-bold text-center text-white">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-center text-gray-400">
            {isLogin
              ? "Sign in to continue"
              : "Get started with a free account"}
          </p>
        </div>

        <form
          onSubmit={isCodeSent ? handleSubmit : handleRequestCode}
          className="space-y-6"
        >
          {renderFormFields()}
          <ActionButton type="submit" disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : isCodeSent
              ? isLogin
                ? "Login"
                : "Create Account"
              : "Send Code"}
          </ActionButton>
        </form>

        <p className="text-sm text-center text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={handleToggleForm}
            className="ml-2 font-semibold text-blue-500 hover:text-blue-400 focus:outline-none"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
