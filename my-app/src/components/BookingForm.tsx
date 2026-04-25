import React from "react";
import { X } from "lucide-react";
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
}

export const FormField = ({
  field,
  value,
  onChange,
  onBlur,
  showCustomCode,
  setShowCustomCode,
  index,
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

  if (field.type === "select") {
    return (
      <div className="mb-6">
        {base} {help}
        <select
          name={field.name}
          value={value}
          onChange={onChange}
          required={field.required}
          className={INPUT_CLASS}
        >
          <option value="">Select an option</option>
          {field.options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="mb-6">
        {base} {help}
        <textarea
          name={field.name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={field.required}
          rows={field.rows}
          className={INPUT_CLASS}
        />
      </div>
    );
  }

  if (field.type === "phone") {
    return (
      <div className="mb-6">
        {base} {help}
        <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500">
          <select
            value={showCustomCode ? "custom" : value.countryCode}
            onChange={(e) => {
              const v = e.target.value;
              setShowCustomCode(v === "custom");
              if (v !== "custom") {
                onChange({ target: { name: "countryCode", value: v } } as any);
              }
            }}
            className="w-28 shrink-0 border-0 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none sm:w-24"
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
              className="w-28 shrink-0 border-0 border-l border-slate-300 px-3 py-3 text-sm outline-none sm:w-24"
              required
            />
          )}

          <input
            type="tel"
            name="phone"
            value={value.phone}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Phone number"
            className="min-w-0 flex-1 border-0 px-3 py-3 text-sm text-slate-900 outline-none"
            required
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {base} {help}
      <div className={field.icon ? "relative" : ""}>
        <input
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={field.placeholder}
          required={field.required}
          className={INPUT_CLASS}
        />
        {field.icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {field.icon}
          </span>
        )}
      </div>
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
}: BookingFormProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative border border-slate-200 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 z-10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-serif text-slate-900">Apply Now</h2>
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
                className="mt-1 w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
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
            className={`${BTN_CLASS} ${
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
          >
            {isSubmitting
              ? "Submitting..."
              : submitStatus === "success"
                ? "✓ Submitted!"
                : submitStatus === "error"
                  ? "Error - Try Again"
                  : "Submit & Schedule a Call"}
          </button>
          {submitStatus === "error" && (
            <p className="text-xs text-red-500 text-center mt-2">
              Error. Check console and try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
