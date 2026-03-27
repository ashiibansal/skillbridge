import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, Search, BriefcaseBusiness, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Layout from "../components/Layout";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";

const CareerRoles = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRoles = useCallback(async () => {
    try {
      const response = await fetch(`${API}/roles`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      setRoles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load career roles");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const filteredRoles = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return roles;
    return roles.filter((role) => [role.title, role.description, ...(role.skills || [])].join(" ").toLowerCase().includes(query));
  }, [roles, search]);

  return (
    <Layout>
      <div className="space-y-8">
        <section className="flex flex-col gap-6 rounded-[32px] bg-white p-8 shadow-sm lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900">
              <BriefcaseBusiness className="h-4 w-4" />
              Role library
            </div>
            <h1 className="text-4xl font-bold text-slate-950">Choose a role worth chasing</h1>
            <p className="mt-3 max-w-2xl text-slate-600">Browse roles, compare required skills, and launch an assessment from the role that matches your direction.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search roles, skills, keywords…" className="h-12 min-w-[280px] rounded-2xl border-slate-200 pl-10" />
            </div>
            <div className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600">
              <Filter className="h-4 w-4" />
              {filteredRoles.length} roles
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex h-64 items-center justify-center"><div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-400/30 border-t-slate-700" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredRoles.map((role, index) => {
              const skills = role.skills || [];
              return (
                <motion.div
                  key={role._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="group flex h-full cursor-pointer flex-col rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => navigate(`/assessment/${role._id}`)}
                  data-testid={`role-card-${role._id}`}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">{role.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{role.description}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 text-slate-800"><BriefcaseBusiness className="h-5 w-5" /></div>
                  </div>

                  <div className="mb-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-slate-700" />{role.average_salary || "Salary data coming soon"}</div>
                    <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-orange-500" />{role.growth_rate || "Growth data coming soon"}</div>
                  </div>

                  <div className="mb-6 flex-1">
                    <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Top skills</div>
                    <div className="flex flex-wrap gap-2">
                      {skills.slice(0, 6).map((skill, idx) => (
                        <span key={idx} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-900">{skill}</span>
                      ))}
                      {skills.length > 6 && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">+{skills.length - 6} more</span>}
                    </div>
                  </div>

                  <Button className="mt-auto w-full rounded-full bg-slate-950 text-white hover:bg-slate-900" data-testid={`start-assessment-${role._id}`}>
                    Start assessment <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && filteredRoles.length === 0 && (
          <div className="rounded-[28px] border border-slate-200 bg-white p-10 text-center text-slate-600">No roles matched your search. Try a different keyword.</div>
        )}
      </div>
    </Layout>
  );
};

export default CareerRoles;
