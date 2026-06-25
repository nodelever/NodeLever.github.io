import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL || 'https://the-king-backend-cutd.onrender.com';

const jobs = [
  {
    id: 'nexus',
    title: 'Nexus: Live Multilingual Gaming Transcription',
    tagline: 'Capture and transcribe live multilingual game conversations for AI moderation, translation, and insight.',
    description: 'Join a team that transforms live multiplayer voice and chat into training data for next-gen game intelligence.',
    questions: [
      'What is your native language, and what other languages are you fluent in? Please include proficiency levels.',
      'Describe your gaming experience and the titles you played most in the last 6 months.',
      'Explain how you would transcribe toxic or abusive language without bias or censorship.',
      'What tools have you used for audio transcription, annotation, or timestamping?',
      'How do you handle live speaker diarization and in-game slang in a fast-moving session?'
    ]
  },
  {
    id: 'vlso',
    title: 'VR Live-Sync Optimizer (VLSO)',
    tagline: 'Evaluate real-time VR performance and optimize immersive experiences without breaking flow.',
    description: 'Help build the bridge between live VR telemetry and adaptive rendering strategies through active analysis.',
    questions: [
      'How would you capture VR telemetry without introducing perceptible latency?',
      'What metrics would you prioritize to evaluate VR Experience Quality beyond FPS?',
      'Describe a way to replicate live physics states into a shadow debugging simulation.',
      'How would you handle thermal throttling and dynamic asset delivery in a live headset session?'
    ]
  },
  {
    id: 'fpas',
    title: 'First-Person Action Synthesis (FPAS)',
    tagline: 'Record egocentric video workflows to build actionable training data for AI action understanding.',
    description: 'Contribute to a dataset that helps models understand real-world first-person actions with precise annotations.',
    questions: [
      'How do you ensure consistent field of view and framing during handheld first-person recordings?',
      'Describe your process for timestamping the beginning, peak, and end of a complex action.',
      'What steps do you take to keep physical object interactions clear and easy to label?',
      'How would you summarize a completed action sequence for a non-technical reviewer?' 
    ]
  }
];

const JobsPage = () => {
  const [activeJob, setActiveJob] = useState(null);
  const [formData, setFormData] = useState({
    projectId: '',
    projectTitle: '',
    fullName: '',
    email: '',
    phone: '',
    birthCountry: '',
    currentCountry: '',
    stateRegion: '',
    location: '',
    primaryLanguage: '',
    additionalLanguage: '',
    educationLevel: '',
    portfolio: '',
    consent: false,
    resume: null
  });
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (activeJob) {
      setFormData((prev) => ({
        ...prev,
        projectId: activeJob.id,
        projectTitle: activeJob.title
      }));
      setQuestionAnswers({});
      setStatusMessage('');
    }
  }, [activeJob]);

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleQuestionChange = (index, value) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [index]: value
    }));
  };

  const canSubmit = () => {
    if (!activeJob) return false;
    const requiredBase = ['fullName', 'email', 'birthCountry', 'currentCountry', 'primaryLanguage', 'educationLevel'];
    const filled = requiredBase.every((field) => formData[field]?.toString().trim() !== '');
    const hasAllAnswers = activeJob.questions.every((_, idx) => questionAnswers[idx]?.toString().trim() !== '');
    return filled && hasAllAnswers && formData.consent;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit()) {
      setStatusMessage('Please complete all required fields and consent before submitting.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Sending your application...');

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });
      payload.append('qualificationAnswers', JSON.stringify(questionAnswers));

      const response = await fetch(`${BACKEND_URL}/api/jobs/apply`, {
        method: 'POST',
        body: payload
      });

      if (response.ok) {
        setStatusMessage('Your application was sent successfully. Check email for confirmation.');
        setActiveJob(null);
        setFormData({
          projectId: '', projectTitle: '', fullName: '', email: '', phone: '', birthCountry: '', currentCountry: '', stateRegion: '', location: '', primaryLanguage: '', additionalLanguage: '', educationLevel: '', portfolio: '', consent: false, resume: null
        });
        setQuestionAnswers({});
      } else {
        const result = await response.json();
        setStatusMessage(result?.message || 'The application could not be submitted. Please try again later.');
      }
    } catch (error) {
      setStatusMessage('Network error sending the application. Please try again later.');
      console.error('Job application submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <section className="rounded-[28px] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Careers & Jobs</p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Welcome to the Job Application Hub
            </h1>
            <p className="mt-6 text-slate-400 text-base leading-8">
              Choose the role that best matches your expertise, then complete the full application form below.
              Each position opens a tailored sequence of qualification questions so we can learn exactly how you fit the project.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {jobs.map((job) => (
            <article key={job.id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 shadow-xl transition hover:border-cyan-500/40 hover:shadow-cyan-500/10">
              <div className="mb-5 space-y-4">
                <span className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                  {job.id.toUpperCase()}
                </span>
                <h2 className="text-2xl font-semibold text-white">{job.title}</h2>
                <p className="text-slate-400 leading-7">{job.tagline}</p>
              </div>
              <p className="text-slate-400 mb-8 leading-7">{job.description}</p>
              <button
                onClick={() => setActiveJob(job)}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
              >
                Apply for this role
              </button>
            </article>
          ))}
        </section>

        {activeJob && (
          <section className="rounded-[32px] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">Applying for</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">{activeJob.title}</h2>
                <p className="mt-3 max-w-2xl text-slate-400 leading-7">Answer the tailored questions carefully. The application will be sent to the team by email and Telegram once submitted.</p>
              </div>
              <button
                onClick={() => setActiveJob(null)}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition"
              >
                Cancel application
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Full Name</span>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Jane Doe"
                      required
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Optional"
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Location</span>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="City, region, or timezone"
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Birth Country</span>
                    <input
                      name="birthCountry"
                      value={formData.birthCountry}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Country"
                      required
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Current Country</span>
                    <input
                      name="currentCountry"
                      value={formData.currentCountry}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Country"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Primary Language</span>
                    <input
                      name="primaryLanguage"
                      value={formData.primaryLanguage}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="English, Spanish, etc."
                      required
                    />
                  </label>
                  <label className="block text-sm text-slate-300">
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Additional Language</span>
                    <input
                      name="additionalLanguage"
                      value={formData.additionalLanguage}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Optional"
                    />
                  </label>
                </div>

                <label className="block text-sm text-slate-300">
                  <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Education Level</span>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    required
                  >
                    <option value="">Select your highest level</option>
                    <option value="High School">High School</option>
                    <option value="Associate Degree">Associate Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Portfolio / Link</span>
                  <input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="GitHub, LinkedIn, demo site"
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Resume / CV</span>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    onChange={handleInputChange}
                    className="w-full text-sm text-slate-200 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/10 file:px-4 file:py-2 file:text-cyan-300 focus:outline-none"
                  />
                </label>

                <label className="mt-2 flex items-start gap-3 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>
                    I agree to share this information with the hiring team and receive follow-up messages for this application.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!canSubmit() || isSubmitting}
                  className="mt-4 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-slate-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>

                {statusMessage && (
                  <p className="mt-4 text-sm text-slate-300">{statusMessage}</p>
                )}
              </div>

              <div className="space-y-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Why this role?</h3>
                  <p className="text-slate-400 leading-7">Each application is routed directly to the hiring team. Provide frank, detailed responses — the more context you give, the better we can evaluate your fit.</p>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                  <h3 className="text-lg font-semibold text-white">Project questions</h3>
                  <p className="text-slate-500 text-sm mt-2">Answer every question below with clear, concise detail.</p>

                  <div className="mt-5 space-y-5">
                    {activeJob.questions.map((question, idx) => (
                      <label key={idx} className="block text-sm text-slate-200">
                        <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2">Question {idx + 1}</span>
                        <p className="text-slate-400 mb-3 text-sm leading-6">{question}</p>
                        <textarea
                          value={questionAnswers[idx] || ''}
                          onChange={(event) => handleQuestionChange(idx, event.target.value)}
                          rows={4}
                          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                          placeholder="Your response"
                          required
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                  <h3 className="text-lg font-semibold text-white">Next steps</h3>
                  <ul className="mt-4 space-y-3 text-slate-400 text-sm leading-7 list-disc pl-5">
                    <li>We send your application to the hiring team and a confirmation via email.</li>
                    <li>Telegram alerts are triggered for fast review by the operations team.</li>
                    <li>If selected, you may receive a follow-up interview request within 48 hours.</li>
                  </ul>
                </div>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
