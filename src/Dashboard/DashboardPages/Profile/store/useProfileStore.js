import { create } from 'zustand';

export const useProfileStore = create((set, get) => ({
  // --- STATE ---
  view: 'overview',
  currentStep: 1,
  showLegalModal: false,
  loading: false,
  showTaxModal: false,
  errors: {},
  userStatus: {
    profileComplete: false,
    dataReviewed: true,
    legalAgreed: false,
    identityVerified: false,
    taxStatus: 'idle'
  },
  formData: {
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    cvFile: null,
    // --- Added ID Fields ---
    idType: 'passport', // default to passport
    idFront: null,
    idBack: null
  },

  // --- ACTIONS ---
  setView: (view) => set({ view }),
  setShowLegalModal: (showLegalModal) => set({ showLegalModal }),
  setShowTaxModal: (showTaxModal) => set({ showTaxModal }), 

  handleInputChange: (field, value) => {
    set((state) => {
      const newErrors = { ...state.errors };
      if (newErrors[field]) delete newErrors[field];
      
      // If switching ID type, clear the opposite required errors/files
      let updatedFormData = { ...state.formData, [field]: value };
      if (field === 'idType' && value === 'passport') {
        updatedFormData.idBack = null; // passports don't strictly need a back page
        delete newErrors.idBack;
      }

      return {
        formData: updatedFormData,
        errors: newErrors
      };
    });
  },

  validateStep: (step) => {
    const { formData } = get();
    const newErrors = {};

    if (step === 1) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      else if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Please enter a valid phone number';
      
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      else {
        const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
        if (age < 18) newErrors.dateOfBirth = 'You must be at least 18 years old';
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'Zipcode is required';
      else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode) && formData.country === 'us') {
        newErrors.zipCode = 'Please enter a valid US zipcode';
      }
    }

    if (step === 3) {
      if (!formData.cvFile) newErrors.cvFile = 'Please upload your CV';
      else {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(formData.cvFile.type)) newErrors.cvFile = 'Only PDF and DOC files are allowed';
        if (formData.cvFile.size > 5 * 1024 * 1024) newErrors.cvFile = 'File size must be less than 5MB';
      }
    }

    // --- Added Step 4 Validation ---
    if (step === 4) {
      const validImageTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      
      if (!formData.idFront) newErrors.idFront = 'Please upload the front of your ID';
      else {
        if (!validImageTypes.includes(formData.idFront.type)) newErrors.idFront = 'Only JPG, PNG, and PDF files are allowed';
        if (formData.idFront.size > 5 * 1024 * 1024) newErrors.idFront = 'File size must be less than 5MB';
      }

      if (formData.idType === 'license') {
        if (!formData.idBack) newErrors.idBack = 'Please upload the back of your ID';
        else {
          if (!validImageTypes.includes(formData.idBack.type)) newErrors.idBack = 'Only JPG, PNG, and PDF files are allowed';
          if (formData.idBack.size > 5 * 1024 * 1024) newErrors.idBack = 'File size must be less than 5MB';
        }
      }
    }

    set({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  },

  handleNext: () => {
    const { currentStep, validateStep } = get();
    if (validateStep(currentStep)) {
      if (currentStep < 4) { // <-- Increased to 4
        set({ currentStep: currentStep + 1, view: `step${currentStep + 1}` });
      }
    }
  },

  handleBack: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1, view: `step${currentStep - 1}` });
    } else {
      set({ view: 'overview', currentStep: 1 });
    }
  },

  fetchUserStatus: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/profile/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch status');
      
      const data = await response.json();
      set({ userStatus: data.userStatus });
    } catch (error) {
      console.error('Error fetching user status:', error);
    } finally {
      set({ loading: false });
    }
  },

  handleSubmit: async () => {
    const { validateStep, formData } = get();
    if (!validateStep(4)) return; // <-- Changed validation to Step 4

    set({ loading: true });
    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('Not authenticated');

      const dataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === 'phoneNumber') {
            const fullPhone = `${formData.countryCode}${formData.phoneNumber}`;
            dataToSend.append('phoneNumber', fullPhone);
          } 
          else if (key === 'countryCode') {
            return; 
          } 
          else {
            // This loop naturally appends idType, idFront, and idBack alongside the CV!
            dataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/profile/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      const data = await response.json();

      set((state) => ({
        userStatus: data.userStatus, 
        view: 'overview',
        currentStep: 1,
        showTaxModal: true,
        formData: { ...state.formData, cvFile: null, idFront: null, idBack: null } // Clear all files from memory
      }));

    } catch (error) {
      console.error('Error submitting profile:', error);
      set({ errors: { submit: error.message || 'Failed to submit profile. Please try again.' } });
    } finally {
      set({ loading: false });
    }
  },

  handleLegalAgree: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/profile/legal-agree', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to accept agreement');

      set((state) => ({
        userStatus: { ...state.userStatus, legalAgreed: true },
        showLegalModal: false
      }));
    } catch (error) {
      console.error('Error accepting legal agreement:', error);
    } finally {
      set({ loading: false });
    }
  },
  
  setTaxStatus: (status) => set((state) => ({ 
    userStatus: { ...state.userStatus, taxStatus: status } 
  })),

}));