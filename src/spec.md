# Specification

## Summary
**Goal:** Refresh the Class 9 Epic Adventure experience with a dark-mode neon, game-inspired landing flow leading into a World Map hub, subject realm maps, chapter-based Boss Fights, and fixed chapter rewards with coins/mastery tracking.

**Planned changes:**
- Update landing page visuals to a dark-mode neon (Roblox x Minecraft-inspired) aesthetic with a visually dominant pulsing CTA labeled exactly “START YOUR QUEST”.
- Add a central World Map hub screen with exactly three clickable realms: THE QUANTUM GALAXY (Science), THE INFINITY DUNGEON (Mathematics), THE CIVILIZATION QUEST (SST).
- Implement Science realm map with 3 planets (Chemistry, Physics, Biology) and chapter Mission Level nodes with 3D-styled icons and locked/unlocked states.
- Implement Maths realm map as a single linear sequence of chapter Boss Level nodes in the specified order, with progression locking.
- Implement SST realm map with 4 kingdoms (History Portal, Geography Portal, Civics/Pol Science Fortress, Economics Valley) and chapter nodes with 3D-styled icons and locked/unlocked states.
- Update Boss Fight flow so each chapter launches its own “Boss Fight” quiz with minimal text and icon-forward “Power Card” presentation, and returns to the map with completion reflected.
- Implement rewards end-to-end: completing a chapter Boss Fight grants exactly 500 XP, 50 Coins, and a per-chapter “Chapter Mastery Medal” used for unlock progression.
- Extend backend to store coins and per-user, per-chapter mastery/completion; add methods to fetch coins + mastery/unlock state and to complete a chapter Boss Fight with idempotent reward behavior.
- Update the top HUD (non-landing screens) to include a glowing level progress bar, a daily streak fire icon, and a coins counter sourced from backend state.
- Apply subject color themes consistently: Science = neon green, Maths = neon gold, SST = neon red.
- Add a frontend content model enumerating all chapters exactly as specified and use it to drive map rendering and Boss Fight routing.
- Serve realm/map visuals from static generated assets under frontend/public/assets/generated (no backend image routing).

**User-visible outcome:** Users land on a neon dark-mode start screen, enter a World Map with three realms, navigate subject-specific maps to chapter nodes, play chapter-specific Boss Fights using Power Cards, earn fixed XP/coins/medals, and see progression/coins reflected across the HUD and maps.
