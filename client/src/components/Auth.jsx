import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineKey, HiOutlineUser } from "react-icons/hi";
import { toast } from "react-toastify";

const InputField = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}) => (
  <div className="relative group">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
      {icon}
    </span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required
      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
    {disabled && (
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    )}
    {children}
  </button>
);

const Auth = () => {
  const backendUrl =
    // import.meta.env.VITE_BACKEND_URL || "https://portfolio-t0hl.onrender.com";
    import.meta.env.VITE_BACKEND_URL;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setName("");
    setCode("");
    setIsCodeSent(false);
    setIsLoading(false);
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
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/request-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: isLogin ? "login" : "register" }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Verification code sent!");
        setIsCodeSent(true);
      } else {
        toast.error(data.message || "Failed to send code.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    const payload = isLogin ? { email, code } : { email, name, code };

    if (!isLogin && !name) {
      toast.error("Please enter your name.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`${isLogin ? "Login" : "Registration"} successful!`);
        window.location.href = "/shop";
      } else {
        toast.error(
          data.message || `${isLogin ? "Login" : "Registration"} failed.`
        );
      }
    } catch (error) {
      console.log("Error during form submission:", error);
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  const renderFormFields = () => {
    if (!isCodeSent) {
      return (
        <InputField
          icon={<HiOutlineMail className="h-5 w-5" />}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      );
    }
    // After code is sent
    return (
      <>
        <InputField
          icon={<HiOutlineMail className="h-5 w-5" />}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={() => {}} // No-op
          disabled={true}
        />
        <InputField
          icon={<HiOutlineKey className="h-5 w-5" />}
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {!isLogin && (
          <InputField
            icon={<HiOutlineUser className="h-5 w-5" />}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
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

        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={handleToggleForm}
            className="ml-2 font-semibold text-blue-600 hover:text-blue-500 focus:outline-none"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
