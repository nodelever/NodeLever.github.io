import React, { useState, useRef } from 'react';
import { useProfileStore } from '../Profile/store/useProfileStore';

export const TaxComplianceTab = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userStatus, setTaxStatus } = useProfileStore();
  const [status, setStatus] = useState(
      ['pending', 'verified', 'success'].includes(userStatus?.taxStatus) ? 'success' : 'idle'
    );

  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Basic validation (PDF/JPG, < 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File is too large. Max size is 10MB.");
        return;
      }
      setFile(selectedFile);
      setStatus('idle');
    }
  };

  // Handle uploading to the backend
const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      formData.append('w9File', file);

      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/profile/w9-submit', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      // Success! Update local AND global state to instantly unlock tabs
      setStatus('success');
      setTaxStatus('pending'); // <-- THIS unlocks the app globally
      setFile(null); 
      
    } catch (error) {
      console.error("Upload error:", error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#0f0a1e] backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Tax Compliance</h2>
        <p className="text-gray-400 mt-1 text-sm">Manage your tax identity and documentation for legal compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Action Section: W-9 Workflow */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">W-9 Form</h3>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Required for US-based entities</p>
              </div>
            </div>

            {/* Stepper UI */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-bold">1</div>
                  <div className="w-0.5 h-10 bg-white/10"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-white text-sm font-medium">Download Official Form</p>
                  {/* IMPORTANT: Ensure 'w9.pdf' is placed in your public folder */}
                  <a href="/w9.pdf" download="IRS_W9_Form.pdf" className="mt-2 flex items-center space-x-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors w-fit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>DOWNLOAD W-9.PDF</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border border-white/20 text-gray-400 text-[10px] flex items-center justify-center font-bold">2</div>
                  <div className="w-0.5 h-10 bg-white/10"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-white text-sm font-medium">Fill & Sign</p>
                  <p className="text-gray-500 text-xs">Complete all required fields digitally or manually.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full border border-white/20 text-gray-400 text-[10px] flex items-center justify-center font-bold">3</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium mb-3">Upload Completed Document</p>
                  
                  {/* Hidden file input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept=".pdf,.jpg,.jpeg" 
                    className="hidden" 
                  />

                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${
                      file ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-gray-400 group-hover:text-purple-400 transition-colors mb-2 flex justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    {file ? (
                      <p className="text-sm text-purple-400 font-semibold">{file.name}</p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500"><span className="text-white font-semibold">Click to upload</span></p>
                        <p className="text-[10px] text-gray-600 mt-1">PDF, JPG up to 10MB</p>
                      </>
                    )}
                  </div>

                  {/* Submit Button & Status */}
                  {file && status !== 'success' && (
                    <button 
                      onClick={handleUpload}
                      disabled={loading}
                      className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex justify-center items-center"
                    >
                      {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : "Submit W-9 Form"}
                    </button>
                  )}

                  {/* Pending Review Success Status */}
                  {status === 'success' && (
                    <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-blue-400 text-sm flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      W-9 successfully submitted and is pending review.
                    </div>
                  )}

                  {status === 'error' && (
                    <p className="mt-2 text-red-400 text-xs text-center">Failed to upload. Please try again.</p>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info & History Section */}
        {/* <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4 opacity-70">Tax Identity</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400 text-xs">Tax ID (TIN)</span>
                <span className="text-white text-xs font-mono">••-•••6789</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400 text-xs">Region</span>
                <span className="text-white text-xs">United States</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs">Status</span>
                <span className={status === 'success' ? "text-blue-400 text-xs font-bold" : "text-yellow-400 text-xs font-bold"}>
                  {status === 'success' ? 'Pending Review' : 'Pending W-9'}
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};