import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserRound, MapPin, Goal, FileText, Mail } from "lucide-react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

const Profile = () => {
  const { token } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    career_goal: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to load profile");
      }

      const data = await res.json();
      setProfile({
        name: data?.name || "",
        email: data?.email || "",
        bio: data?.bio || "",
        location: data?.location || "",
        career_goal: data?.career_goal || "",
      });
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async () => {
    try {
      setSaving(true);

      const res = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Profile updated");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-slate-800" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl shadow-slate-900/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 text-white">
            <UserRound className="h-9 w-9" />
          </div>

          <h1 className="mt-6 text-4xl font-bold">Your profile</h1>

          <p className="mt-4 leading-8 text-slate-200">
            Keep your personal context complete so the rest of the product feels
            more tailored, more useful, and less like it just met you five
            seconds ago.
          </p>

          <div className="mt-8 space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
            <div>
              <span className="text-slate-400">Email</span>
              <div className="font-medium text-white">
                {profile.email || "Not set"}
              </div>
            </div>

            <div>
              <span className="text-slate-400">Location</span>
              <div className="font-medium text-white">
                {profile.location || "Add your location"}
              </div>
            </div>

            <div>
              <span className="text-slate-400">Career goal</span>
              <div className="font-medium text-white">
                {profile.career_goal || "Add your target direction"}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-950">Edit details</h2>
            <p className="mt-2 text-slate-600">
              Clean settings-style profile editing, minus the weird leftover
              styling drama.
            </p>
          </div>

          <div className="grid gap-5">
            {[
              {
                key: "name",
                label: "Full name",
                icon: UserRound,
                placeholder: "Your name",
              },
              {
                key: "email",
                label: "Email",
                icon: Mail,
                placeholder: "you@example.com",
                disabled: true,
              },
              {
                key: "location",
                label: "Location",
                icon: MapPin,
                placeholder: "Berlin, Germany",
              },
              {
                key: "career_goal",
                label: "Career goal",
                icon: Goal,
                placeholder: "Frontend Developer",
              },
            ].map(({ key, label, icon: Icon, placeholder, disabled }) => (
              <label key={key} className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  {label}
                </span>

                <div className="relative">
                  <Icon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder={placeholder}
                    value={profile[key] || ""}
                    disabled={disabled}
                    onChange={(e) =>
                      setProfile({ ...profile, [key]: e.target.value })
                    }
                    className="h-12 rounded-2xl border-slate-200 pl-10"
                  />
                </div>
              </label>
            ))}

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Short bio
              </span>

              <div className="relative">
                <FileText className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <textarea
                  className="min-h-[160px] w-full rounded-2xl border border-slate-200 px-10 py-3 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-blue-100"
                  placeholder="Tell the platform a little about your background and interests"
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
              </div>
            </label>

            <div className="flex justify-end pt-2">
              <Button
                onClick={updateProfile}
                className="rounded-full bg-slate-950 px-8 text-white hover:bg-slate-900"
                disabled={saving}
              >
                {saving ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Profile;