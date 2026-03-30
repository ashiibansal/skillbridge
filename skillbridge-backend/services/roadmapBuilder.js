const normalizeText = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  
  const getWeeklyHoursFactor = (weeklyHours = "") => {
    const value = String(weeklyHours).toLowerCase();
  
    if (value.includes("1–3") || value.includes("1-3")) return 1.6;
    if (value.includes("4–6") || value.includes("4-6")) return 1.3;
    if (value.includes("7–10") || value.includes("7-10")) return 1.0;
    if (value.includes("10+")) return 0.8;
    if (value.includes("20+")) return 0.6;
  
    return 1.2;
  };
  
  const getExperienceFactor = (experienceLevel = "") => {
    const value = String(experienceLevel).toLowerCase();
  
    if (value.includes("beginner")) return 1.3;
    if (value.includes("student")) return 1.15;
    if (value.includes("career switcher")) return 1.2;
    if (value.includes("intermediate")) return 1.0;
    if (value.includes("advanced")) return 0.8;
  
    return 1.0;
  };
  
  const estimatePhaseDuration = (skills, weeklyHours, experienceLevel) => {
    const totalGap = skills.reduce((sum, skill) => sum + Number(skill.gap || 0), 0);
    const weighted = Math.max(1, totalGap);
    const rawWeeks = weighted * getWeeklyHoursFactor(weeklyHours) * getExperienceFactor(experienceLevel);
  
    const weeks = Math.max(1, Math.round(rawWeeks));
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  };
  
  const estimateRoadmapTimeline = (phases, weeklyHours, experienceLevel) => {
    const totalGap = phases
      .flatMap((phase) => phase.skills)
      .reduce((sum, skill) => sum + Number(skill.gap || 0), 0);
  
    const rawMonths =
      Math.max(1, totalGap / 4) *
      getWeeklyHoursFactor(weeklyHours) *
      getExperienceFactor(experienceLevel);
  
    const start = Math.max(1, Math.round(rawMonths));
    const end = Math.max(start + 1, start + 2);
  
    return `${start}-${end} months`;
  };
  
  const buildCompletionCriteria = (skills) => {
    return skills
      .slice(0, 3)
      .map((skill) => `Can apply ${skill.name} confidently in a practical project`);
  };
  
  const extractStrongestSkills = (skillGaps = []) => {
    return [...skillGaps]
      .map((skill) => {
        const current = Number(skill.current_level || 0);
        const required = Number(skill.required_level || 0);
        return {
          name: skill.skill,
          score: current - required,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((skill) => skill.name);
  };
  
  const extractTopBlockers = (skillGaps = [], focusSkill = "", weakAreas = []) => {
    const focus = normalizeText(focusSkill);
    const weak = weakAreas.map(normalizeText);
  
    return [...skillGaps]
      .map((skill) => {
        const current = Number(skill.current_level || 0);
        const required = Number(skill.required_level || 0);
        let score = Math.max(required - current, 0);
  
        const skillName = normalizeText(skill.skill);
  
        if (focus && skillName.includes(focus)) score += 2;
        if (weak.some((w) => w && skillName.includes(w))) score += 2;
        if (normalizeText(skill.priority) === "high") score += 2;
        if (normalizeText(skill.priority) === "medium") score += 1;
  
        return {
          name: skill.skill,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((skill) => skill.name);
  };
  
  const buildRoadmapSummary = ({ role, readinessScore, strongestSkills, topBlockers }) => {
    const strongText =
      strongestSkills.length > 0
        ? `Your strongest areas right now are ${strongestSkills.join(", ")}.`
        : "You are still building your strongest foundations.";
  
    const blockerText =
      topBlockers.length > 0
        ? `The biggest blockers for this role are ${topBlockers.join(", ")}.`
        : "You do not have major blockers identified yet.";
  
    return `Your current readiness for ${role} is ${readinessScore}%. ${strongText} ${blockerText}`;
  };
  
  export const buildCareerRoadmap = ({ assessment, profile, template }) => {
    const skillGaps = Array.isArray(assessment?.skill_gaps) ? assessment.skill_gaps : [];
    const weeklyHours = profile?.weekly_hours || "";
    const experienceLevel = profile?.experience_level || "";
    const focusSkill = profile?.focus_skill || "";
    const weakAreas = Array.isArray(profile?.weak_areas) ? profile.weak_areas : [];
  
    const phases = template.phases.map((phase, index) => {
      const phaseSkills = phase.skills.map((templateSkill) => {
        const match = skillGaps.find(
          (gap) => normalizeText(gap.skill) === normalizeText(templateSkill)
        );
  
        const current = Number(match?.current_level || 0);
        const required = Number(match?.required_level || 0);
        const gap = Math.max(required - current, 0);
  
        let status = "Not started";
        if (gap === 0 && required > 0) status = "Strong";
        else if (current > 0) status = "In progress";
  
        return {
          name: templateSkill,
          current_level: current,
          required_level: required,
          gap,
          priority: match?.priority || "Medium",
          status,
        };
      });
  
      const sortedSkills = phaseSkills.sort((a, b) => {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return (
          (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0) ||
          b.gap - a.gap
        );
      });
  
      return {
        id: phase.id,
        title: phase.title,
        description: phase.description,
        status: index === 0 ? "Current phase" : "Upcoming",
        estimated_duration: estimatePhaseDuration(sortedSkills, weeklyHours, experienceLevel),
        skills: sortedSkills,
        milestone_project: template.projects[index] || "",
        completion_criteria: buildCompletionCriteria(sortedSkills),
      };
    });
  
    const role = assessment?.role?.title || profile?.target_role || "Selected role";
    const readinessScore = Number(assessment?.readiness_score || 0);
    const strongestSkills = extractStrongestSkills(skillGaps);
    const topBlockers = extractTopBlockers(skillGaps, focusSkill, weakAreas);
  
    return {
      role,
      readiness_score: readinessScore,
      estimated_timeline: estimateRoadmapTimeline(phases, weeklyHours, experienceLevel),
      summary: buildRoadmapSummary({
        role,
        readinessScore,
        strongestSkills,
        topBlockers,
      }),
      strongest_skills: strongestSkills,
      top_blockers: topBlockers,
      focus_skill: focusSkill || "",
      weekly_hours: weeklyHours || "",
      phases,
    };
  };