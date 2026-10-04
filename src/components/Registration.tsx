import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventData } from '../types/event';
import { validateCommonFields, validateUrl } from '../utils/validation';
import type { FormErrors } from '../utils/validation';

interface Props {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
}

const stepLabels = ['Your Details', 'Event Details', 'Review', 'Complete'];

export const Registration: React.FC<Props> = ({ event, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [commonData, setCommonData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: ''
  });

  const [teamSize, setTeamSize] = useState<number>(0);
  const [participants, setParticipants] = useState<{ name: string; phone: string }[]>([]);
  const [additionalData, setAdditionalData] = useState<Record<string, string | File>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setCommonData({ name: '', email: '', phone: '', college: '', department: '', year: '' });
      const minSize = event?.registration?.teamSize?.min || 0;
      setTeamSize(event?.registration?.teamBased ? minSize : 0);
      setParticipants(
        event?.registration?.teamBased
          ? Array.from({ length: minSize }, () => ({ name: '', phone: '' }))
          : []
      );
      setAdditionalData({});
      setErrors({});
      setIsSubmitting(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, event]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const reg = event.registration;
  const hasAdditionalFields = reg?.additionalFields && reg.additionalFields.length > 0;
  const isTeamBased = reg?.teamBased;
  const needsStep2 = hasAdditionalFields || isTeamBased;

  const getFieldKey = (field: { id?: string; name?: string; label: string }) =>
    field.id || field.name || field.label;

  const handleNext = () => {
    if (step === 1) {
      const validationErrors = validateCommonFields(commonData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
    } else if (step === 2) {
      const stepErrors: FormErrors = {};

      if (reg?.additionalFields) {
        reg.additionalFields.forEach(field => {
          const key = getFieldKey(field);
          if (field.required && !additionalData[key]) {
            stepErrors[key] = 'This field is required.';
          } else if (field.type === 'url' && additionalData[key] && !validateUrl(additionalData[key] as string)) {
            stepErrors[key] = 'Please enter a valid URL.';
          }
        });
      }

      if (isTeamBased) {
        if (!teamSize) {
          stepErrors.teamSize = 'Please select a team size.';
        } else {
          participants.forEach((p, idx) => {
            if (!p.name.trim()) stepErrors[`participant_name_${idx}`] = 'Required';
            if (!p.phone.trim()) stepErrors[`participant_phone_${idx}`] = 'Required';
          });
        }
      }

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
      setErrors({});
    }
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
    }, 1500);
  };

  const handleTeamSizeChange = (size: number) => {
    setTeamSize(size);
    const newParticipants = [...participants];
    if (size > newParticipants.length) {
      for (let i = newParticipants.length; i < size; i++) {
        newParticipants.push({ name: '', phone: '' });
      }
    } else {
      newParticipants.splice(size);
    }
    setParticipants(newParticipants);
  };

  const handleParticipantChange = (index: number, field: 'name' | 'phone', value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };

  const inputClass = (fieldName: string) =>
    `w-full bg-[#0a0a0a] border ${errors[fieldName] ? 'border-red-500' : 'border-[#1f1f1f]'} rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all text-white placeholder-gray-600`;

  const renderCommonInput = (
    label: string,
    id: keyof typeof commonData,
    type: string = 'text',
    placeholder?: string
  ) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-[#a1a1a1] font-medium">{label}</label>
      <input
        id={id}
        type={type}
        value={commonData[id]}
        onChange={e => setCommonData({ ...commonData, [id]: e.target.value })}
        placeholder={placeholder}
        className={inputClass(id)}
      />
      {errors[id] && <span className="text-red-500 text-xs">{errors[id]}</span>}
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className="bg-[#141414] border border-[#1f1f1f] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative"
        >
          {/* Close button */}
          {step < 4 && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close registration"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Header & Stepper */}
          <div className="p-6 md:p-8 border-b border-[#1f1f1f] shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
              Register for <span className="text-red-500">{event.name}</span>
            </h2>

            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-4 h-[2px] bg-[#1f1f1f] w-full" />
              <motion.div
                className="absolute left-0 top-4 h-[2px] bg-red-600"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / 3) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />

              {stepLabels.map((s, idx) => {
                const stepNum = idx + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;

                return (
                  <div key={s} className="flex flex-col items-center gap-2 relative z-10 bg-[#141414] px-1 sm:px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                      ${isCompleted ? 'bg-red-600 border-red-600 text-white' :
                        isActive ? 'border-red-600 text-red-500 bg-[#141414]' :
                        'border-[#333] text-[#555] bg-[#141414]'}`}
                    >
                      {isCompleted ? '✓' : stepNum}
                    </div>
                    <span className={`text-[10px] sm:text-xs whitespace-nowrap ${isActive ? 'text-red-500' : isCompleted ? 'text-white' : 'text-gray-600'}`}>
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {renderCommonInput('Full Name', 'name', 'text', 'Enter your full name')}
                    {renderCommonInput('Email ID', 'email', 'email', 'you@example.com')}
                    {renderCommonInput('Phone Number', 'phone', 'tel', '+91 9876543210')}
                    {renderCommonInput('College Name', 'college', 'text', 'Your college name')}
                    {renderCommonInput('Department', 'department', 'text', 'Your department')}

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="year" className="text-sm text-[#a1a1a1] font-medium">Year of Study</label>
                      <select
                        id="year"
                        value={commonData.year}
                        onChange={e => setCommonData({ ...commonData, year: e.target.value })}
                        className={inputClass('year') + ' appearance-none cursor-pointer'}
                      >
                        <option value="" disabled>Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th Year">5th Year</option>
                      </select>
                      {errors.year && <span className="text-red-500 text-xs">{errors.year}</span>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {!needsStep2 && (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-4">✨</div>
                      <p className="text-gray-400 text-lg">No additional information required for this event.</p>
                      <p className="text-gray-600 text-sm mt-2">Proceed to review your details.</p>
                    </div>
                  )}

                  {/* URL / File fields */}
                  {reg?.additionalFields?.map(field => {
                    const key = getFieldKey(field);
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm text-[#a1a1a1] font-medium">{field.label}</label>

                        {field.type === 'url' && (
                          <div>
                            <input
                              type="url"
                              value={(additionalData[key] as string) || ''}
                              onChange={e => setAdditionalData({ ...additionalData, [key]: e.target.value })}
                              placeholder="https://..."
                              className={inputClass(key)}
                            />
                            {field.instruction && (
                              <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {field.instruction}
                              </p>
                            )}
                            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                          </div>
                        )}

                        {field.type === 'file' && (
                          <div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={e => {
                                if (e.target.files?.[0]) {
                                  setAdditionalData({ ...additionalData, [key]: e.target.files[0] });
                                }
                              }}
                              className="hidden"
                              accept={field.accept}
                            />
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-red-600'); }}
                              onDragLeave={e => { e.currentTarget.classList.remove('border-red-600'); }}
                              onDrop={e => {
                                e.preventDefault();
                                e.currentTarget.classList.remove('border-red-600');
                                if (e.dataTransfer.files?.[0]) {
                                  setAdditionalData({ ...additionalData, [key]: e.dataTransfer.files[0] });
                                }
                              }}
                              className={`border-2 border-dashed ${errors[key] ? 'border-red-500' : 'border-[#2a2a2a]'} bg-[#0a0a0a] rounded-xl p-8 text-center cursor-pointer hover:border-red-600/50 transition-all duration-300`}
                            >
                              {additionalData[key] ? (
                                <div className="text-white">
                                  <div className="text-3xl mb-2">📄</div>
                                  <p className="font-semibold">{(additionalData[key] as File).name}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {((additionalData[key] as File).size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                  <button
                                    onClick={e => {
                                      e.stopPropagation();
                                      const newData = { ...additionalData };
                                      delete newData[key];
                                      setAdditionalData(newData);
                                    }}
                                    className="text-red-500 text-sm mt-3 hover:underline"
                                  >
                                    Remove file
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <div className="text-4xl mb-3 opacity-30">📁</div>
                                  <p className="text-gray-400 font-medium">Click or drag file to upload</p>
                                  {field.instruction && <p className="text-xs text-gray-600 mt-2">{field.instruction}</p>}
                                </div>
                              )}
                            </div>
                            {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Team Registration */}
                  {isTeamBased && reg?.teamSize && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm text-[#a1a1a1] font-medium mb-3">Number of Participants in Team</label>
                        {reg.teamSize.fixed ? (
                          <div className="flex flex-wrap gap-3">
                            {reg.teamSize.fixed.map(size => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => handleTeamSizeChange(size)}
                                className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all duration-200
                                  ${teamSize === size
                                    ? 'border-red-600 bg-red-600/10 text-red-500'
                                    : 'border-[#1f1f1f] text-gray-400 hover:border-gray-600'
                                  }`}
                              >
                                {size} Participants
                              </button>
                            ))}
                          </div>
                        ) : (
                          <select
                            value={teamSize || ''}
                            onChange={e => handleTeamSizeChange(parseInt(e.target.value))}
                            className={inputClass('teamSize') + ' appearance-none cursor-pointer max-w-xs'}
                          >
                            <option value="" disabled>Select team size</option>
                            {Array.from(
                              { length: (reg.teamSize.max || 10) - (reg.teamSize.min || 1) + 1 },
                              (_, i) => (reg.teamSize!.min || 1) + i
                            ).map(size => (
                              <option key={size} value={size}>{size} Participant{size > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        )}
                        {errors.teamSize && <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>}
                      </div>

                      <AnimatePresence>
                        {teamSize > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            <h4 className="text-white font-semibold border-b border-[#1f1f1f] pb-2">
                              Team Member Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {participants.map((p, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.06 }}
                                  className="bg-[#0a0a0a] border border-[#1f1f1f] p-4 rounded-xl"
                                >
                                  <h5 className="text-sm text-red-500/70 font-medium mb-3">
                                    Participant {idx + 1}
                                  </h5>
                                  <div className="space-y-3">
                                    <input
                                      type="text"
                                      placeholder="Full Name"
                                      value={p.name}
                                      onChange={e => handleParticipantChange(idx, 'name', e.target.value)}
                                      className={`w-full bg-[#141414] border ${errors[`participant_name_${idx}`] ? 'border-red-500' : 'border-[#1f1f1f]'} rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors`}
                                    />
                                    {errors[`participant_name_${idx}`] && <p className="text-red-500 text-[10px]">{errors[`participant_name_${idx}`]}</p>}
                                    <input
                                      type="tel"
                                      placeholder="Phone Number"
                                      value={p.phone}
                                      onChange={e => handleParticipantChange(idx, 'phone', e.target.value)}
                                      className={`w-full bg-[#141414] border ${errors[`participant_phone_${idx}`] ? 'border-red-500' : 'border-[#1f1f1f]'} rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors`}
                                    />
                                    {errors[`participant_phone_${idx}`] && <p className="text-red-500 text-[10px]">{errors[`participant_phone_${idx}`]}</p>}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: Review */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Personal Info */}
                  <div className="bg-[#0a0a0a] rounded-xl p-5 border border-[#1f1f1f]">
                    <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-2">
                      <h3 className="text-white font-semibold">Personal Information</h3>
                      <button onClick={() => setStep(1)} className="text-red-500 text-sm hover:underline">Edit</button>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      <div><span className="text-gray-500 block text-xs">Name</span><span className="text-white">{commonData.name}</span></div>
                      <div><span className="text-gray-500 block text-xs">Email</span><span className="text-white">{commonData.email}</span></div>
                      <div><span className="text-gray-500 block text-xs">Phone</span><span className="text-white">{commonData.phone}</span></div>
                      <div><span className="text-gray-500 block text-xs">College</span><span className="text-white">{commonData.college}</span></div>
                      <div><span className="text-gray-500 block text-xs">Department</span><span className="text-white">{commonData.department}</span></div>
                      <div><span className="text-gray-500 block text-xs">Year</span><span className="text-white">{commonData.year}</span></div>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="bg-[#0a0a0a] rounded-xl p-5 border border-[#1f1f1f]">
                    <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-2">
                      <h3 className="text-white font-semibold">Event Details</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500 block text-xs">Event</span>
                        <span className="text-white font-medium">{event.name}</span>
                      </div>
                      {event.mode && (
                        <div>
                          <span className="text-gray-500 block text-xs">Mode</span>
                          <span className="text-white capitalize">{event.mode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional info */}
                  {(hasAdditionalFields || isTeamBased) && (
                    <div className="bg-[#0a0a0a] rounded-xl p-5 border border-[#1f1f1f]">
                      <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-2">
                        <h3 className="text-white font-semibold">Submission Details</h3>
                        <button onClick={() => setStep(2)} className="text-red-500 text-sm hover:underline">Edit</button>
                      </div>
                      <div className="space-y-4 text-sm">
                        {reg?.additionalFields?.map(field => {
                          const key = getFieldKey(field);
                          return (
                            <div key={key}>
                              <span className="text-gray-500 block text-xs">{field.label}</span>
                              <span className="text-white break-all">
                                {field.type === 'file'
                                  ? additionalData[key] ? (additionalData[key] as File).name : 'No file uploaded'
                                  : (additionalData[key] as string) || 'Not provided'}
                              </span>
                            </div>
                          );
                        })}

                        {isTeamBased && teamSize > 0 && (
                          <div>
                            <span className="text-gray-500 block text-xs mb-2">Team ({teamSize} Participants)</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {participants.map((p, i) => (
                                <div key={i} className="bg-[#141414] p-3 rounded-lg border border-[#1f1f1f]">
                                  <span className="text-gray-500 text-[10px] block mb-1">Participant {i + 1}</span>
                                  <p className="text-white text-sm">{p.name || '-'}</p>
                                  <p className="text-gray-400 text-xs">{p.phone || '-'}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    REGISTRATION COMPLETE
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-400 mb-1"
                  >
                    You're officially registered for <span className="text-white font-semibold">{event.name}</span>
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 text-sm"
                  >
                    Your registration has been submitted successfully.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="p-6 md:p-8 border-t border-[#1f1f1f] bg-[#141414] rounded-b-2xl shrink-0">
            <div className="flex justify-between items-center">
              {step > 1 && step < 4 ? (
                <button
                  onClick={handleBack}
                  className="border border-[#1f1f1f] text-white hover:bg-[#1a1a1a] px-6 py-2.5 rounded-lg transition-colors font-medium"
                >
                  BACK
                </button>
              ) : <div />}

              {step === 1 || step === 2 ? (
                <button
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/30"
                >
                  NEXT →
                </button>
              ) : step === 3 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-red-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      SUBMITTING...
                    </>
                  ) : 'SUBMIT REGISTRATION'}
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  BACK TO EVENTS
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
