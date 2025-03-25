import  { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { authContent } from "../constants/contents";
import { styles } from "../constants/styles";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  marketing_accept: boolean;
};

type TabType = "login" | "register";

export default function AuthPage() {
  const [passwordError, setPasswordError] = useState<string>("");
  const [onError, setOnError] = useState<string>("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("login");

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    marketing_accept: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password_confirmation") {
      setPasswordError(value !== formData.password ? "Passwords do not match" : "");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, password_confirmation, first_name, last_name } = formData;

    if (!email || !password || (activeTab === "register" && (!password_confirmation || !first_name || !last_name))) {
      setOnError("All fields are required");
      return;
    }

    try {
      if (activeTab === "register") {
        // Handle registration logic here
        navigate("/login");
      } else {
        // Handle login logic here
        navigate("/dashboard");
      }
    } catch (error) {
      setOnError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div className={styles.authStyles.container}>
      <div className={styles.authStyles.card}>
        <div className={styles.authStyles.header}>
          <h2 className={styles.authStyles.title}>{authContent.title}</h2>
          <p className={styles.authStyles.subtitle}>{authContent.subtitle}</p>
        </div>

        <div className={styles.authStyles.tabContainer}>
          {["login", "register"].map((tab) => (
            <div
              key={tab}
              className={`${styles.authStyles.tab} ${
                activeTab === tab ? styles.authStyles.activeTab : styles.authStyles.inactiveTab
              }`}
              onClick={() => setActiveTab(tab as TabType)}
            >
              {tab === "login" ? authContent.loginTab : authContent.registerTab}
            </div>
          ))}
        </div>

        {onError && <div className="text-red-500 text-center mb-4">{onError}</div>}

        <form onSubmit={handleSubmit} className={styles.authStyles.form}>
          {activeTab === "register" && (
            <>
            
              <div className={styles.authStyles.inputGroup}>
                <label className={styles.authStyles.label} htmlFor="fullname">
                  {authContent.formLabels.name}
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={styles.authStyles.input}
                  placeholder={authContent.formLabels.name}
                />
              </div>
            </>
          )}

          <div className={styles.authStyles.inputGroup}>
            <label className={styles.authStyles.label} htmlFor="email">
              {authContent.formLabels.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.authStyles.input}
              placeholder={authContent.formLabels.email}
            />
          </div>

          <div className={styles.authStyles.inputGroup}>
            <label className={styles.authStyles.label} htmlFor="password">
              {authContent.formLabels.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.authStyles.input}
              placeholder={authContent.formLabels.password}
            />
          </div>

          {activeTab === "register" && (
            <div className={styles.authStyles.inputGroup}>
              <label className={styles.authStyles.label} htmlFor="password_confirmation">
                {authContent.formLabels.confirmPassword}
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                className={styles.authStyles.input}
                placeholder={authContent.formLabels.confirmPassword}
              />
              {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.authStyles.button.primary}
            disabled={activeTab === "register" && Boolean(passwordError)}
          >
            {activeTab === "login" ? authContent.buttons.login : authContent.buttons.register}
          </button>

          {activeTab === "login" && (
            <div className="text-center">
              <a href="#" className={styles.authStyles.button.forgotPassword}>
                {authContent.forgotPasswordText}
              </a>
            </div>
          )}
        </form>

        <div className={styles.authStyles.divider.container}>
          <div className={styles.authStyles.divider.line} />
          <div className={styles.authStyles.divider.text}>
            <span className={styles.authStyles.divider.span}>Or continue with</span>
          </div>
        </div>

        <button type="button" className={styles.authStyles.button.social}>
          <FcGoogle className="h-5 w-5" />
          {authContent.socialLogin.googleText}
        </button>
        <button type="button" className={styles.authStyles.button.social}>
          <FaFacebook className="h-5 w-5 text-[#1877F2]" />
          {authContent.socialLogin.facebookText}
        </button>
      </div>
    </div>
  );
}
