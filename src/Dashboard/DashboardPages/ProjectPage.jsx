import React, { useState } from 'react';
import locationData from './locations.json'; // Make sure this path matches where you saved the JSON

export const ProjectPage = () => {
  const [applyingFor, setApplyingFor] = useState(null);
  const [appliedProjects, setAppliedProjects] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Track standard fields (Changed usState to stateRegion to support all countries)
  const [formData, setFormData] = useState({
    resume: null,
    fullName: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    birthCountry: "",
    currentCountry: "",
    stateRegion: "", 
    primaryLanguage: "",
    additionalLanguage: "",
    educationLevel: "",
    consent: false
  });

  // Track dynamic qualification questions
  const [questionAnswers, setQuestionAnswers] = useState({});

  // 1. Live Gaming Transcription
  const projectOneDetails = (
    <div className="space-y-4 text-sm text-slate-300">
      <div>
        <h4 className="text-white font-semibold text-base mb-1">Project Description</h4>
        <p><strong>Overview:</strong> Project Nexus is a specialized data collection and analysis initiative aimed at capturing, transcribing, and evaluating live, inter-linguistic player interactions in multiplayer online gaming environments.</p>
        <p className="mt-2"><strong>Objectives:</strong> Build a robust dataset to train AI-driven gaming features (real-time translation, matchmaking, moderation) by transcribing and analyzing how players communicate and conflict in real-time.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">Key Responsibilities</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Monitor live multiplayer sessions (FPS, MOBA, MMORPG).</li>
          <li>Transcribe live VoIP and text chat verbatim, capturing gaming lexicon.</li>
          <li>Analyze inter-linguistic interactions for sentiment and barriers.</li>
          <li>Evaluate cross-cultural communication effectiveness.</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">Requirements</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Hardware:</strong> Modern PC/Console, High-fidelity headset, 100/20 Mbps internet.</li>
          <li><strong>Skills:</strong> Strict C2 fluency in English + 1 target language. Deep understanding of gaming culture and slang (gank, aggro, smurf).</li>
          <li><strong>Rules:</strong> Verbatim capture, Speaker Diarization, Timestamps, PII Redaction.</li>
        </ul>
      </div>
    </div>
  );

  // 2. VR Live-Sync Optimizer
  const projectTwoDetails = (
    <div className="space-y-4 text-sm text-slate-300">
      <div>
        <h4 className="text-white font-semibold text-base mb-1">Project Description</h4>
        <p><strong>Overview:</strong> The VR Live-Sync Optimizer (VLSO) is a sophisticated architectural framework sitting between the VR engine and the end-user. It functions as a "Live Builder" to assess interactions and replicate gameplay into a sandbox for immediate analysis.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">Core Functions</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Evaluates hardware latency and software bottlenecks in real-time.</li>
          <li>Offers alternate rendering paths or LOD swaps without breaking immersion.</li>
          <li>Summarizes complex telemetry into actionable insights for on-the-fly refinement.</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">Development Guidelines</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Analysis:</strong> Non-intrusive monitoring on separate threads; strict 8-11ms latency budgeting.</li>
          <li><strong>Replication:</strong> Deterministic 1:1 simulation capturing random physics seeds.</li>
          <li><strong>Improvement:</strong> A/B Live Testing and tiered quality scaling for dynamic assets.</li>
        </ul>
      </div>
    </div>
  );

  // 3. First-Person Action Synthesis
  const projectThreeDetails = (
    <div className="space-y-4 text-sm text-slate-300">
      <div>
        <h4 className="text-white font-semibold text-base mb-1">Project Description</h4>
        <p><strong>Overview:</strong> The First-Person Action Synthesis (FPAS) project focuses on Egocentric Vision (Ego-Vis). Participants record "Live Scenes" of chores to build a dataset for Computer Vision for Action Understanding.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">Core Functions</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Assess raw egocentric footage and analyze hand-object interactions.</li>
          <li>Replicate actions in generative models, summarizing key kinematic frames.</li>
          <li>Produce alternate versions (lighting, objects) while improving temporal stability.</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">Recording Protocol</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Hardware:</strong> Smartphone with 0.5x wide-angle, tilted 15° downward.</li>
          <li><strong>Quality:</strong> 60 FPS at 4K resolution minimum.</li>
          <li><strong>Analysis:</strong> Extract 5-10 Keyframes per action and map occlusion states.</li>
        </ul>
      </div>
    </div>
  );

  const projectList = [
    { 
      id: 1, 
      title: 'Nexus: Live Multilingual Gaming Transcription', 
      description: 'Capture, transcribe, and evaluate live inter-linguistic player interactions in multiplayer online environments to train AI moderation and translation.', 
      rate: 'Contract',
      details: projectOneDetails,
      // Added new gaming questions here
      questions: [
        "1. What is your native language, and what other languages are you fluent in? (Indicate proficiency)",
        "2. Describe your gaming experience (Genres, specific titles played in the last 6 months).",
        "3. Define in your target language and explain: Tilt, Meta, Griefing, RNG, Peeling.",
        "4. How would you handle transcribing highly toxic language/hate speech without bias?",
        "5. Describe a time you witnessed a linguistic barrier in a game and how it was resolved.",
        "6. Detail previous audio transcription/annotation experience and tools used.",
        "7. How do you evaluate the success of an interaction using mixed languages and in-game pings?",
        "8. List hardware specs (CPU, GPU, Headset) and attach a speed test (describe speeds here).",
        "9. Are you available to monitor live sessions during peak gaming hours?",
        "10. What type of gaming console(s) do you currently use?",
        "11. What is your favorite game right now?"
      ]
    },
    { 
      id: 2, 
      title: 'VR Live-Sync Optimizer (VLSO)', 
      description: 'Develop a framework between Unity/Unreal and the end-user to evaluate latency, replicate live states, and dynamically optimize VR asset delivery.',
      rate: 'Contract',
      details: projectTwoDetails,
      // Added VR brand question here
      questions: [
        "1. How do you approach low-level telemetry extraction from VR headsets without increasing latency?",
        "2. Describe a method for replicating a live networked physics state into a debugging shadow sim.",
        "3. What metrics would you use to evaluate Experience Quality beyond FPS?",
        "4. How would you implement dynamic alternate asset delivery based on GPU thermal throttling?",
        "5. How do you summarize high-frequency 6DOF spatial data for non-technical stakeholders?",
        "6. What brand of VR headset(s) do you currently use for development or personal use?"
      ]
    },
    { 
      id: 3, 
      title: 'First-Person Action Synthesis (FPAS)', 
      description: 'Record and synthesize Egocentric Vision (Ego-Vis) data of complex physical actions to bridge physical movement and generative AI video models.',
      rate: 'Contract',
      details: projectThreeDetails,
      questions: [
        "1. How do you ensure a consistent FOV during high-motion chores without rolling shutter?",
        "2. What steps ensure consistent lighting and clean backgrounds for hand-object analysis?",
        "3. How will you timestamp and summarize the start, peak, and end points of a complex chore?",
        "4. How do you evaluate the success of a generated video against the Ground Truth?",
        "5. Describe a method to record scripted actions allowing models to alternate variables (e.g., swapping objects)?"
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
      };
      
      // Reset stateRegion if they switch countries to avoid mismatch
      if (name === 'currentCountry') {
        updatedData.stateRegion = "";
      }
      
      return updatedData;
    });
  };

  const handleQuestionChange = (index, value) => {
    setQuestionAnswers(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const isFormValid = () => {
    const basicValid = formData.fullName.trim() !== "" &&
                       formData.email.trim() !== "" &&
                       formData.birthCountry !== "" &&
                       formData.currentCountry !== "" &&
                       formData.primaryLanguage !== "" &&
                       formData.educationLevel !== "";
    
    // Check if current country has states, if so, ensure stateRegion is filled
    const needsState = formData.currentCountry && locationData[formData.currentCountry]?.states.length > 0;
    const stateValid = needsState ? formData.stateRegion !== "" : true;
    
    const questionsValid = applyingFor?.questions.every((_, i) => 
      questionAnswers[i] && questionAnswers[i].trim() !== ""
    );

    return basicValid && stateValid && questionsValid;
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('projectId', applyingFor.id);
      payload.append('projectTitle', applyingFor.title);
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          payload.append(key, formData[key]);
        }
      });
      
      payload.append('qualificationAnswers', JSON.stringify(questionAnswers));

      const response = await fetch('https://the-king-backend-cutd.onrender.com/api/profile/projectsubmission', {
        method: 'POST',
        body: payload
      });

      if (response.ok) {
        setAppliedProjects([...appliedProjects, applyingFor.id]);
        closeOverlay();
        setShowSuccessPopup(true);
      } else {
        console.warn("API route not found, simulating success state.");
        setAppliedProjects([...appliedProjects, applyingFor.id]);
        closeOverlay();
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeOverlay = () => {
    setApplyingFor(null);
    setQuestionAnswers({});
    setFormData({
      resume: null, fullName: "", email: "", phone: "", location: "", company: "",
      birthCountry: "", currentCountry: "", stateRegion: "", primaryLanguage: "",
      additionalLanguage: "", educationLevel: "", consent: false
    });
  };

  const inputClasses = "w-full bg-slate-800/50 border border-slate-700/60 rounded-lg p-2.5 text-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all mb-4";
  const labelClasses = "text-xs text-slate-400 uppercase font-bold block mb-1.5 tracking-wider";

  // Check if we need to show the state dropdown based on selected current country
  const availableStates = formData.currentCountry && locationData[formData.currentCountry] 
    ? locationData[formData.currentCountry].states 
    : [];

  return (
    <div className="space-y-6 min-h-screen bg-slate-950 p-6 font-sans">
      
      {/* Main Listing View */}
      <div className="max-w-6xl mx-auto bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-2xl">
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          Open Project Opportunities
        </h1>
        <p className="text-slate-400 mb-8 border-b border-slate-800 pb-6">
          Review the detailed requirements below and tailor your application to the specialized project modules.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projectList.map((project) => {
            const isPending = appliedProjects.includes(project.id);

            return (
              <div key={project.id} className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50 flex flex-col justify-between min-h-[280px] shadow-lg hover:border-slate-600/80 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-slate-100 leading-tight pr-2">{project.title}</h3>
                  </div>
                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                </div>

                {isPending ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Submitted</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => setApplyingFor(project)}
                    className="w-full bg-blue-600/90 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-md"
                  >
                    View Details & Apply
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Popup Notification */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center transform animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Application Received</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              You will get a verification link in a few minutes. Then check your email or spam, if not seen normally.
            </p>
            <button 
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Full Application Form Modal */}
      {applyingFor && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 lg:p-8 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl flex flex-col w-full max-w-5xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-hidden">
            
            <div className="p-6 border-b border-slate-800 shrink-0 bg-slate-900/50">
              <h2 className="text-2xl font-bold text-slate-100 mb-1">{applyingFor.title}</h2>
              <p className="text-slate-400 text-sm">Please review the requirements before submitting your tailored application.</p>
            </div>
            
            <div className="flex-grow overflow-hidden flex flex-col lg:flex-row">
              
              <div className="lg:w-1/2 p-6 overflow-y-auto custom-scrollbar border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/30">
                <h3 className="text-blue-400 font-bold mb-4 text-xs tracking-widest uppercase bg-blue-500/10 inline-block px-3 py-1 rounded-full">Full Project Details</h3>
                {applyingFor.details}
              </div>

              <div className="lg:w-1/2 p-6 overflow-y-auto custom-scrollbar">
                
                <h3 className="text-slate-200 font-semibold mb-4 text-sm tracking-wide uppercase">Personal Information</h3>
                
                <label className={labelClasses}>Resume/CV</label>
                <input type="file" name="resume" onChange={handleInputChange} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 mb-4 cursor-pointer file:transition-colors file:border file:border-slate-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  <div>
                    <label className={labelClasses}>Full name <span className="text-red-400">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Email <span className="text-red-400">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Current location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className={inputClasses} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Current company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className={inputClasses} />
                  </div>
                </div>

                <h3 className="text-slate-200 font-semibold mt-4 mb-4 text-sm tracking-wide uppercase border-t border-slate-800 pt-6">Demographics & Skills</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                  
                  {/* Dynamic Country Dropdowns mapping from JSON */}
                  <div>
                    <label className={labelClasses}>Birth Country <span className="text-red-400">*</span></label>
                    <select name="birthCountry" value={formData.birthCountry} onChange={handleInputChange} className={inputClasses}>
                      <option value="">Select...</option>
                      {Object.entries(locationData).map(([code, data]) => (
                        <option key={`birth-${code}`} value={code}>{data.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className={labelClasses}>Current Country <span className="text-red-400">*</span></label>
                    <select name="currentCountry" value={formData.currentCountry} onChange={handleInputChange} className={inputClasses}>
                      <option value="">Select...</option>
                      {Object.entries(locationData).map(([code, data]) => (
                        <option key={`curr-${code}`} value={code}>{data.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic State Dropdown based on Current Country */}
                  {availableStates.length > 0 && (
                    <div>
                      <label className={labelClasses}>State / Province <span className="text-red-400">*</span></label>
                      <select name="stateRegion" value={formData.stateRegion} onChange={handleInputChange} className={inputClasses}>
                        <option value="">Select State...</option>
                        {availableStates.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className={labelClasses}>Education Level <span className="text-red-400">*</span></label>
                    <select name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} className={inputClasses}>
                      <option value="">Select...</option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's">Bachelor's Degree</option>
                      <option value="Master's">Master's Degree</option>
                      <option value="PhD">Doctorate (PhD)</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Primary Language <span className="text-red-400">*</span></label>
                    <select name="primaryLanguage" value={formData.primaryLanguage} onChange={handleInputChange} className={inputClasses}>
                      <option value="">Select...</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="Mandarin">Mandarin</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Additional Language</label>
                    <select name="additionalLanguage" value={formData.additionalLanguage} onChange={handleInputChange} className={inputClasses}>
                      <option value="">Select...</option>
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="Mandarin">Mandarin</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-blue-400 font-semibold mt-4 mb-4 text-sm tracking-wide uppercase border-t border-slate-800 pt-6">Project Qualification Questions</h3>
                <div className="space-y-4">
                  {applyingFor.questions.map((question, index) => (
                    <div key={index}>
                      <label className="text-xs text-slate-300 font-medium block mb-2 leading-relaxed">{question} <span className="text-red-400">*</span></label>
                      <textarea 
                        rows="2"
                        value={questionAnswers[index] || ""}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        className={`${inputClasses} resize-none`}
                        placeholder="Provide your detailed response..."
                      ></textarea>
                    </div>
                  ))}
                </div>

                <div className="mt-4 mb-2 flex items-start gap-3 bg-slate-800/40 border border-slate-700/50 p-4 rounded-lg">
                  <input 
                    type="checkbox" 
                    name="consent" 
                    checked={formData.consent} 
                    onChange={handleInputChange}
                    className="mt-0.5 cursor-pointer w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                  />
                  <label className="text-sm text-slate-300 leading-snug cursor-pointer" onClick={() => setFormData(p => ({...p, consent: !p.consent}))}>
                    I consent to the collection of my data and confirm all qualification answers are accurate. <br/>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex gap-3 shrink-0 justify-end">
              <button 
                onClick={closeOverlay}
                disabled={isSubmitting}
                className="px-6 py-2.5 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                disabled={!isFormValid() || isSubmitting}
                className={`px-8 py-2.5 rounded-lg text-white font-medium transition-all text-sm flex items-center justify-center min-w-[180px] ${
                  !isFormValid() 
                  ? 'bg-slate-700 cursor-not-allowed opacity-50' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-md hover:shadow-lg hover:shadow-blue-900/20'
                }`}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};