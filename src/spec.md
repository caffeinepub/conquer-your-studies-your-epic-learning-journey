# Specification

## Summary
**Goal:** Build “Conquer Your Studies: Your Epic Learning Journey” with a War Map-style syllabus dashboard and a Divide & Conquer task breakdown area, using a bold “Strategic Battle Plan” theme and persistent data.

**Planned changes:**
- Create the app shell with header showing the full app name and primary navigation to two pages: Dashboard (War Map) and Divide and Conquer.
- Apply a consistent bold/adventurous “Strategic Battle Plan” theme across UI, enforcing status colors and labels: Red=Mission Critical, Blue=Tactical Drills, Green=Victory Zone, Yellow=Scouting.
- Implement the War Map syllabus dashboard UI with map-like nodes/territories, each showing title plus status label and color.
- Implement the Divide and Conquer UI to create chapters/topics, add/update tasks, and mark tasks complete (moving to Victory Zone).
- Add backend persistence (Motoko, single-actor) for syllabus items and tasks, with statuses restricted to the four supported values; connect frontend via React Query for querying/updating with cache invalidation.
- Display the motivational quote exactly as provided as a bottom-most closing section on at least one main page.
- Add generated static art assets under `frontend/public/assets/generated` and render at least one visibly (e.g., background/hero) without harming readability.

**User-visible outcome:** Users can navigate between a War Map syllabus dashboard and a Divide & Conquer task planner, see clear color-coded learning statuses, create and complete tasks with progress saved after refresh, and view a prominent closing motivational quote within a battle-plan themed interface.
