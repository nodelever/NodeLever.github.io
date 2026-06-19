import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, Home, MailCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const regStyles = `
  /* Shared Keyframes */
  @keyframes glow-in { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  
  /* Container & Backgrounds */
  .nl-reg-wrapper {
    background: #0b0d14;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: sans-serif;
    overflow: hidden;
    padding: 20px;
  }
  .nl-grid-bg { position:absolute;inset:0; background-image:linear-gradient(rgba(120,80,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(120,80,255,.07) 1px,transparent 1px); background-size:44px 44px; pointer-events:none; z-index: 1; }
  
  .nl-glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.3; z-index: 0; pointer-events: none; transition: transform 0.2s ease-out; }
  .nl-glow-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: rgba(124,58,237, 0.4); max-width: 600px; max-height: 600px; }
  .nl-glow-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: rgba(14,165,233, 0.3); max-width: 500px; max-height: 500px; }

  /* Top Navigation */
  .nl-back-nav { position: absolute; top: 32px; left: 32px; z-index: 10; background: rgba(255,255,255,.03); border: 0.5px solid rgba(255,255,255,.08); border-radius: 24px; padding: 10px 20px; color: rgba(255,255,255,.6); font-size: 13px; font-weight: 500; text-decoration: none; display: flex; align-items: center; gap: 8px; transition: all .2s; backdrop-filter: blur(8px); }
  .nl-back-nav:hover { background: rgba(255,255,255,.08); color: #fff; transform: translateY(-1px); border-color: rgba(255,255,255,.15); }

  /* Main Form Card */
  .nl-reg-card {
    background: rgba(255,255,255,.03);
    border: 0.5px solid rgba(255,255,255,.08);
    border-radius: 20px;
    padding: 48px 40px;
    width: 100%;
    max-width: 440px;
    position: relative;
    z-index: 5;
    backdrop-filter: blur(16px);
    animation: glow-in .6s ease both;
    box-shadow: 0 24px 48px rgba(0,0,0,.4);
  }
  
  /* Headers */
  .nl-reg-header { text-align: center; margin-bottom: 32px; }
  .nl-reg-icon { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 16px; background: rgba(124,58,237,.12); border: 0.5px solid rgba(167,139,250,.3); margin-bottom: 20px; color: #a78bfa; }
  .nl-reg-title { font-size: 32px; font-weight: 500; color: #fff; margin-bottom: 8px; letter-spacing: -0.5px; }
  .nl-reg-title em { font-style: normal; background: linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nl-reg-sub { font-size: 15px; color: rgba(255,255,255,.5); }

  /* Progress Bar */
  .nl-step-container { display: flex; gap: 8px; margin-bottom: 36px; }
  .nl-step-bar { height: 4px; flex: 1; background: rgba(255,255,255,.05); border-radius: 2px; transition: background .3s ease; }
  .nl-step-bar.active { background: linear-gradient(135deg, #7c3aed, #0ea5e9); box-shadow: 0 0 8px rgba(124,58,237,.4); }

  /* Form Elements */
  .nl-form-group { margin-bottom: 18px; text-align: left; }
  .nl-label { display: block; font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 8px; font-weight: 500; }
  .nl-input-wrapper { position: relative; display: flex; align-items: center; }
  .nl-input { width: 100%; background: rgba(0,0,0,.3); border: 0.5px solid rgba(255,255,255,.12); border-radius: 12px; padding: 14px 16px; color: #fff; font-size: 14px; outline: none; transition: all .2s; box-sizing: border-box; }
  .nl-input:focus { border-color: #a78bfa; background: rgba(0,0,0,.5); box-shadow: 0 0 0 1px rgba(167,139,250,.2); }
  .nl-input::placeholder { color: rgba(255,255,255,.25); }
  .nl-input-icon-btn { position: absolute; right: 12px; background: none; border: none; color: rgba(255,255,255,.4); cursor: pointer; padding: 4px; display: flex; align-items: center; transition: color .2s; }
  .nl-input-icon-btn:hover { color: #fff; }

  /* Checkbox & Small Links */
  .nl-checkbox-wrapper { display: flex; align-items: center; justify-content: space-between; margin-top: 20px; }
  .nl-checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,.6); cursor: pointer; }
  .nl-checkbox { appearance: none; width: 16px; height: 16px; border: 1px solid rgba(255,255,255,.2); border-radius: 4px; background: rgba(0,0,0,.3); cursor: pointer; position: relative; transition: all .2s; }
  .nl-checkbox:checked { background: #7c3aed; border-color: #7c3aed; }
  .nl-checkbox:checked::after { content: ''; position: absolute; left: 4px; top: 1px; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
  
  .nl-link { color: #a78bfa; text-decoration: none; transition: color .2s; font-weight: 500; cursor: pointer; }
  .nl-link:hover { color: #c4b5fd; }

  /* Buttons */
  .nl-btn-primary { background: linear-gradient(135deg, #7c3aed, #0ea5e9); border: none; border-radius: 24px; padding: 14px 28px; color: #fff; font-size: 14px; font-weight: 500; cursor: pointer; transition: opacity .2s, transform .15s; width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 28px; }
  .nl-btn-primary:hover { opacity: .88; transform: translateY(-1px); }
  .nl-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  
  .nl-btn-secondary { background: rgba(255,255,255,.05); border: 0.5px solid rgba(255,255,255,.15); border-radius: 24px; padding: 14px 24px; color: rgba(255,255,255,.7); font-size: 14px; font-weight: 400; cursor: pointer; transition: background .2s, color .2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .nl-btn-secondary:hover { background: rgba(255,255,255,.1); color: #fff; }
  .nl-btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }

  .nl-form-row { display: flex; gap: 12px; margin-top: 28px; }
  .nl-form-row .nl-btn-primary { margin-top: 0; flex: 1; }

  /* Footers */
  .nl-footer-text { margin-top: 28px; text-align: center; font-size: 13px; color: rgba(255,255,255,.4); }
  .nl-footer-text .nl-link { font-weight: 400; }
  .nl-terms-text { margin-top: 16px; text-align: center; font-size: 12px; color: rgba(255,255,255,.3); }

  /* Error Modal */
  .nl-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.7); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .nl-modal { background: #0b0d14; border: 1px solid rgba(239,68,68,.3); border-radius: 20px; padding: 32px; width: 100%; max-width: 360px; text-align: center; position: relative; overflow: hidden; animation: glow-in .3s ease both; box-shadow: 0 20px 40px rgba(0,0,0,.6); }
  .nl-modal-glow { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 120px; height: 120px; background: rgba(239,68,68,.2); filter: blur(40px); border-radius: 50%; pointer-events: none; }
  .nl-modal-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(239,68,68,.1); border: 1px solid rgba(239,68,68,.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #ef4444; position: relative; z-index: 1; }
  .nl-modal-title { font-size: 18px; font-weight: 500; color: #fff; margin-bottom: 8px; position: relative; z-index: 1; }
  .nl-modal-text { font-size: 14px; color: rgba(255,255,255,.5); margin-bottom: 24px; position: relative; z-index: 1; line-height: 1.5; }
  .nl-modal-btn { background: rgba(255,255,255,.05); border: 0.5px solid rgba(255,255,255,.15); border-radius: 24px; padding: 12px 24px; color: #fff; font-size: 14px; cursor: pointer; transition: all .2s; width: 100%; position: relative; z-index: 1; }
  .nl-modal-btn:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.3); }

  /* Transitions for steps */
  .nl-step-view { transition: transform 0.4s ease, opacity 0.4s ease; width: 100%; }
  .nl-step-view.hidden-left { position: absolute; transform: translateX(-20px); opacity: 0; pointer-events: none; }
  .nl-step-view.hidden-right { position: absolute; transform: translateX(20px); opacity: 0; pointer-events: none; }
  .nl-step-view.active { position: relative; transform: translateX(0); opacity: 1; }
`;

export default function LangwageRegistration() {
  const navigate = useNavigate();
  const [injected, setInjected] = useState(false);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '' // <-- Added OTP field
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);


  useEffect(() => {
  let timer;
  if (resendCooldown > 0) {
    timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(timer);
}, [resendCooldown]);

  useEffect(() => {
    if (!injected) {
      const tag = document.createElement('style');
      tag.textContent = regStyles;
      document.head.appendChild(tag);
      setInjected(true);
    }
  }, [injected]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth - 0.5) * 40, 
        y: (e.clientY / window.innerHeight - 0.5) * 40 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (formData.firstName && formData.lastName && formData.email) {
        setCurrentStep(2);
      } else {
        setErrorMsg('Please fill in all fields before continuing.');
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // STEP 2 -> STEP 3: Request OTP
  const handleRequestOTP = async () => {
    if (!formData.password || !formData.confirmPassword) {
      setErrorMsg('Please enter and confirm your password.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please try again.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email,
          firstName: formData.firstName 
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setResendCooldown(60);
        setCurrentStep(3); // Move to OTP verification step
      } else {
        setErrorMsg(data.message || 'Failed to send verification code.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3 -> SUBMIT: Verify OTP and Register
  const handleFinalSubmit = async () => {
    if (!formData.otp || formData.otp.length < 6) {
      setErrorMsg('Please enter a valid 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('https://the-king-backend-cutd.onrender.com/reg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          otp: formData.otp // Send the OTP along with the data
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', otp: '' });
        navigate('/login'); 
      } else {
        setErrorMsg(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nl-reg-wrapper">
      <div className="nl-grid-bg" />
      
      <div 
        className="nl-glow-orb nl-glow-1" 
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }} 
      />
      <div 
        className="nl-glow-orb nl-glow-2" 
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }} 
      />

      <Link to="/" className="nl-back-nav">
        <Home size={16} /> Home
      </Link>
      
      {errorMsg && (
        <div className="nl-modal-overlay">
          <div className="nl-modal">
            <div className="nl-modal-glow" />
            <div className="nl-modal-icon">
              <AlertCircle size={24} />
            </div>
            <h3 className="nl-modal-title">Notice</h3>
            <p className="nl-modal-text">{errorMsg}</p>
            <button onClick={() => setErrorMsg('')} className="nl-modal-btn">
              Got it
            </button>
          </div>
        </div>
      )}

      <div className="nl-reg-card">
        <div className="nl-reg-header">
          <div className="nl-reg-icon">
            {currentStep === 3 ? <MailCheck size={28} /> : <Globe size={28} />}
          </div>
          <h1 className="nl-reg-title">
            {currentStep === 3 ? 'Verify Email' : <>Join <em>NodeLever</em></>}
          </h1>
          <p className="nl-reg-sub">
            {currentStep === 3 
              ? `We sent a code to ${formData.email}` 
              : 'Create your account to start training.'}
          </p>
        </div>

        {/* Updated Progress Bar to 3 Steps */}
        <div className="nl-step-container">
          <div className={`nl-step-bar ${currentStep >= 1 ? 'active' : ''}`} />
          <div className={`nl-step-bar ${currentStep >= 2 ? 'active' : ''}`} />
          <div className={`nl-step-bar ${currentStep >= 3 ? 'active' : ''}`} />
        </div>

        <div style={{ position: 'relative' }}>
          
          {/* Step 1: Personal Details */}
          <div className={`nl-step-view ${currentStep === 1 ? 'active' : 'hidden-left'}`}>
            <div className="nl-form-group">
              <label className="nl-label">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Jane"
                className="nl-input"
              />
            </div>
            <div className="nl-form-group">
              <label className="nl-label">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                className="nl-input"
              />
            </div>
            <div className="nl-form-group">
              <label className="nl-label">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="jane@example.com"
                className="nl-input"
              />
            </div>
            <button type="button" onClick={handleNextStep} className="nl-btn-primary">
              Continue <ArrowRight size={16} />
            </button>
          </div>

          {/* Step 2: Password Setup */}
          <div className={`nl-step-view ${currentStep === 2 ? 'active' : (currentStep < 2 ? 'hidden-right' : 'hidden-left')}`}>
            <div className="nl-form-group">
              <label className="nl-label">Password</label>
              <div className="nl-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="nl-input"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="nl-input-icon-btn"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="nl-form-group">
              <label className="nl-label">Confirm Password</label>
              <div className="nl-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className="nl-input"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="nl-input-icon-btn"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="nl-checkbox-wrapper">
              <label className="nl-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="nl-checkbox" 
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="nl-link" style={{ fontSize: '13px' }}>
                Forgot password?
              </Link>
            </div>

            <div className="nl-form-row">
              <button 
                type="button" 
                onClick={handlePrevStep} 
                disabled={isLoading}
                className="nl-btn-secondary"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button 
                type="button" 
                onClick={handleRequestOTP} 
                disabled={isLoading}
                className="nl-btn-primary"
              >
                {isLoading ? (
                  <><Loader2 size={16} className="lucide-loader-2" style={{ animation: 'spin 1s linear infinite' }} /> Sending Code...</>
                ) : (
                  <>Send Verification <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>

          {/* Step 3: OTP Verification */}
          <div className={`nl-step-view ${currentStep === 3 ? 'active' : 'hidden-right'}`}>
            <div className="nl-form-group">
              <label className="nl-label">6-Digit Code</label>
              <input
                type="text"
                maxLength="6"
                value={formData.otp}
                onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="nl-input"
                style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '18px' }}
              />
            </div>

            <div className="nl-checkbox-wrapper" style={{ justifyContent: 'center' }}>
              <span onClick={handleRequestOTP} className="nl-link" style={{ fontSize: '13px' }}>
                Didn't receive a code? Resend
              </span>
            </div>

            <div className="nl-form-row">
              <button 
                type="button" 
                onClick={handlePrevStep} 
                disabled={isLoading}
                className="nl-btn-secondary"
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button 
                type="button" 
                onClick={handleFinalSubmit} 
                disabled={isLoading || formData.otp.length < 6}
                className="nl-btn-primary"
              >
                {isLoading ? (
                  <><Loader2 size={16} className="lucide-loader-2" style={{ animation: 'spin 1s linear infinite' }} /> Verifying...</>
                ) : (
                  <>Create Account <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </div>

        </div>

        <div className="nl-footer-text">
          Already have an account? <Link to="/login" className="nl-link">Sign in</Link>
        </div>
        <div className="nl-terms-text">
          By signing up, you agree to our <Link to="/terms" className="nl-link">Terms</Link> and <Link to="/privacy" className="nl-link">Privacy</Link>.
        </div>
      </div>
    </div>
  );
}