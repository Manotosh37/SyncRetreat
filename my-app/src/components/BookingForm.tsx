import React from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  COUNTRY_CODES,
  INPUT_CLASS,
  BTN_CLASS,
} from "../lib/shared-constants";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  help?: string;
  options?: string[];
  rows?: number;
  icon?: React.ReactNode;
  placeholder?: string;
}

interface FormFieldProps {
  field: FormFieldConfig;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  showCustomCode: boolean;
  setShowCustomCode: (val: boolean) => void;
  index: number;
  error?: string;
  isValid?: boolean;
}

export const FormField = ({
  field,
  value,
  onChange,
  onBlur,
  showCustomCode,
  setShowCustomCode,
  index,
  error,
  isValid,
}: FormFieldProps) => {
  const base = (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      <span className="text-emerald-600 font-bold">{index}.</span> {field.label}{" "}
      {field.required && <span className="text-red-500">*</span>}
    </label>
  );
  const help = field.help && (
    <p className="text-xs text-slate-500 mb-2">{field.help}</p>
  );

  const inputClassName = `${INPUT_CLASS} transition-colors ${
    error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 
    isValid && value ? 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500' : ''
  }`;

  if (field.type === "select") {
    return (
      <div className="mb-6">
        {base} {help}
        <select
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
          className={inputClassName}
          aria-required={field.required}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
        >
          <option value="">Select an option</option>
          {field.options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${field.name}-error`} className="text-xs text-red-600 mt-1 flex items-center gap-1" role="alert">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.type === "textarea") {
    const maxLength = 500;
    const currentLength = value?.length || 0;
    
    return (
      <div className="mb-6">
        {base} {help}
        <div className="relative">
          <textarea
            name={field.name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={field.required}
            rows={field.rows}
            maxLength={maxLength}
            className={inputClassName}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          <span className="text-xs text-slate-500 absolute bottom-2 right-2 bg-white px-1">
            {currentLength}/{maxLength}
          </span>
        </div>
        {error && (
          <p id={`${field.name}-error`} className="text-xs text-red-600 mt-1 flex items-center gap-1" role="alert">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.type === "phone") {
    return (
      <div className="mb-6">
        {base} {help}
        <div className={`flex w-full items-stretch overflow-hidden rounded-lg border ${
          error ? 'border-red-500' : isValid && value.phone ? 'border-emerald-500' : 'border-slate-300'
        } bg-white focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500`}>
          <select
            value={showCustomCode ? "custom" : value.countryCode}
            onChange={(e) => {
              const v = e.target.value;
              setShowCustomCode(v === "custom");
              if (v !== "custom") {
                onChange({ target: { name: "countryCode", value: v } } as any);
              }
            }}
            className="w-28 shrink-0 border-0 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none sm:w-24 min-h-[44px] touch-manipulation"
            aria-label="Country code"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
            <option value="custom">Other</option>
          </select>

          {showCustomCode && (
            <input
              type="text"
              name="countryCode"
              value={value.countryCode}
              onChange={onChange}
              placeholder="+234"
              className="w-28 shrink-0 border-0 border-l border-slate-300 px-3 py-3 text-sm outline-none sm:w-24 min-h-[44px] touch-manipulation"
              required
              aria-label="Custom country code"
            />
          )}

          <input
            type="tel"
            name="phone"
            value={value.phone}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Phone number"
            className="min-w-0 flex-1 border-0 px-3 py-3 text-sm text-slate-900 outline-none min-h-[44px] touch-manipulation"
            required
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {isValid && value.phone && !error && (
            <CheckCircle className="w-5 h-5 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>
        {error && (
          <p id={`${field.name}-error`} className="text-xs text-red-600 mt-1 flex items-center gap-1" role="alert">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6">
      {base} {help}
      <div className="relative">
        <input
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          required={field.required}
          className={inputClassName + " min-h-[44px] touch-manipulation"}
          aria-required={field.required}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
        />
        {field.icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {field.icon}
          </span>
        )}
        {!field.icon && isValid && value && !error && (
          <CheckCircle className="w-5 h-5 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2" />
        )}
        {error && (
          <AlertCircle className="w-5 h-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />
        )}
      </div>
      {error && (
        <p id={`${field.name}-error`} className="text-xs text-red-600 mt-1 flex items-center gap-1" role="alert">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleEmailBlur: () => void;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  showCustomCode: boolean;
  setShowCustomCode: (val: boolean) => void;
  formFields: FormFieldConfig[];
  errors?: Record<string, string>;
  validFields?: Record<string, boolean>;
}

export const BookingForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  handleInputChange,
  handleEmailBlur,
  isSubmitting,
  submitStatus,
  showCustomCode,
  setShowCustomCode,
  formFields,
  errors = {},
  validFields = {},
}: BookingFormProps) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-form-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative border border-slate-200 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded"
          aria-label="Close form"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8 pb-4">
          <h2 id="booking-form-title" className="text-2xl font-serif text-slate-900">Apply Now</h2>
        </div>
        <form onSubmit={onSubmit} className="px-8 pb-8">
          {formFields.map((field: FormFieldConfig, i: number) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleInputChange}
              onBlur={field.name === "email" ? handleEmailBlur : undefined}
              showCustomCode={showCustomCode}
              setShowCustomCode={setShowCustomCode}
              index={i + 1}
              error={errors[field.name]}
              isValid={validFields[field.name]}
            />
          ))}
          <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="undertaking"
                checked={formData.undertaking}
                onChange={handleInputChange}
                required
                className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 min-h-[20px] min-w-[20px] touch-manipulation"
                aria-required="true"
              />
              <span className="text-sm text-slate-700 leading-relaxed">
                {" "}
                I understand that this is not an application for a job and that
                SyncRetreat does not provide remote work. I am applying to
                become a member of a coliving travel community.{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !formData.undertaking}
            className={`${BTN_CLASS} min-h-[44px] touch-manipulation focus:ring-4 focus:ring-emerald-500/50 focus:outline-none ${
              isSubmitting
                ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed shadow-none"
                : submitStatus === "success"
                  ? "bg-emerald-500 hover:bg-emerald-500"
                  : submitStatus === "error"
                    ? "bg-red-500 hover:bg-red-600"
                    : !formData.undertaking
                      ? "bg-slate-400 hover:bg-slate-400 cursor-not-allowed shadow-none"
                      : ""
            }`}
            aria-live="polite"
          >
            {isSubmitting && <Loader2 className="animate-spin mr-2 inline-block w-5 h-5" />}
            {isSubmitting
              ? "Submitting..."
              : submitStatus === "success"
                ? "✓ Submitted!"
                : submitStatus === "error"
                  ? "Error - Try Again"
                  : "Submit & Schedule a Call"}
          </button>
          {submitStatus === "error" && (
            <p className="text-xs text-red-500 text-center mt-2" role="alert">
              Error. Check console and try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
