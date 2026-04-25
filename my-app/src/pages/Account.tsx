import { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import { sendEmail } from "../lib/emailservice";
import {
  User,
  Instagram,
  Twitter,
  Youtube,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function Account() {
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dob: "",
    bio: "",
    avatarUrl: "",
    instagram: "",
    twitter: "",
    youtube: "",
  });

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};

      // Robust mapping for Google OAuth and Manual Signup
      // Google provides 'full_name' or 'name', and 'picture' or 'avatar_url'
      const fullName = meta.full_name || meta.name || "";
      const googleFirstName = fullName.split(" ")[0] || "";
      const googleLastName = fullName.split(" ").slice(1).join(" ") || "";
      const googleAvatar = meta.avatar_url || meta.picture || "";

      const initialData = {
        username: meta.username || meta.email?.split("@")[0] || "",
        firstName: meta.first_name || googleFirstName,
        lastName: meta.last_name || googleLastName,
        dob: meta.dob || "",
        bio: meta.bio || "",
        avatarUrl: meta.avatar_url || googleAvatar,
        instagram: meta.instagram || "",
        twitter: meta.twitter || "",
        youtube: meta.youtube || "",
      };

      setFormData(initialData);

      // Auto-save Google info if it's the first time and fields are missing in our custom metadata
      const shouldAutoSave =
        (googleFirstName && !meta.first_name) ||
        (googleAvatar && !meta.avatar_url);

      if (shouldAutoSave) {
        supabase.auth.updateUser({
          data: {
            first_name: initialData.firstName,
            last_name: initialData.lastName,
            avatar_url: initialData.avatarUrl,
            username: initialData.username,
          },
        });
      }

      // Automated Welcome Email
      if (!meta.welcome_sent) {
        sendEmail({
          to: user.email!,
          name: initialData.firstName || "SyncRetreat Member",
          type: "welcome",
        }).then((res) => {
          if (res.success) {
            supabase.auth.updateUser({
              data: { welcome_sent: true },
            });
          }
        });
      }
    }
  }, [user]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          dob: formData.dob,
          bio: formData.bio,
          instagram: formData.instagram,
          twitter: formData.twitter,
          youtube: formData.youtube,
        },
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefbf7]">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fefbf7] px-6">
        <h2 className="text-2xl font-serif text-slate-900 mb-4">
          Please sign in to view your account
        </h2>
        <a
          href="/login"
          className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-500 transition-all"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#fefbf7] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-10">
              <h1 className="text-3xl font-serif text-slate-900">
                Edit Profile
              </h1>
              {success && (
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 animate-in fade-in slide-in-from-right-4">
                  <CheckCircle2 className="w-4 h-4" />
                  Changes Saved!
                </div>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-12">

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="e.g. janesmith"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    Date of birth
                  </label>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium"
                  />
                  <p className="text-[11px] text-slate-400 mt-2 ml-1">
                    This won't be shown publicly. Enter in DD/MM/YYYY format.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-900 font-medium resize-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-2 ml-1">
                    Write a short bio to tell people more about yourself.
                  </p>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="pt-8 border-t border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">
                  Social Links
                </h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 border border-pink-100">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="@ username or paste Instagram profile URL"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-white">
                      <Twitter className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="@ username or paste X/Twitter profile URL"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        placeholder="@ username or paste YouTube channel URL"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm text-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10 disabled:bg-slate-400"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
