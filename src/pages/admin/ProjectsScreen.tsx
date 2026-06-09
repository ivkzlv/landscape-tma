import { projectCards } from "@/lib/data";
import type { KanbanColumn, ProjectCard, ProjectTag } from "@/lib/types";
import { Colors } from "@/lib/theme";

const COLUMNS: KanbanColumn[] = ["To Do", "In Progress", "Done"];
const COL_STYLES: Record<KanbanColumn, { bg: string; dot: string }> = {
  "To Do":       { bg: "#F5F5F5", dot: "#9E9E9E" },
  "In Progress": { bg: "#E3F2FD", dot: "#1976D2" },
  Done:          { bg: "#E8F5E9", dot: Colors.primary },
};
const TAG_BG: Record<ProjectTag, string> = {
  Design:       "#E8F5E9",
  Finance:      "#FFF3E0",
  "On-site":    "#E3F2FD",
  Installation: "#F3E5F5",
  Completed:    "#E8F5E9",
  Sales:        "#FFF8E1",
};

function KanbanCard({ card }: { card: ProjectCard }) {
  return (
    <div className="bg-white rounded-xl p-3 mb-2 shadow-sm">
      <p className="text-xs font-semibold text-gray-800 leading-snug mb-2">{card.title}</p>
      <span
        className="inline-block px-2 py-0.5 rounded-full text-xs text-gray-600"
        style={{ backgroundColor: TAG_BG[card.tag] ?? "#F5F5F5" }}
      >
        {card.tag}
      </span>
    </div>
  );
}

export default function ProjectsScreen() {
  return (
    <div className="flex flex-col bg-app-bg overflow-hidden" style={{ height: "100%" }}>
      <h1 className="text-2xl font-extrabold text-gray-900 px-4 pt-12 pb-3">Projects</h1>

      {/* Horizontal kanban scroll */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-3 px-4 pb-6 h-full" style={{ width: "max-content" }}>
          {COLUMNS.map((col) => {
            const cards = projectCards.filter((c) => c.column === col);
            const { bg, dot } = COL_STYLES[col];
            return (
              <div
                key={col}
                className="rounded-2xl p-3 flex-shrink-0"
                style={{ backgroundColor: bg, width: "72vw", maxWidth: 280 }}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />
                  <span className="flex-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                    {col}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">{cards.length}</span>
                </div>

                {/* Cards */}
                {cards.map((c) => <KanbanCard key={c.id} card={c} />)}

                {/* Add card */}
                <button className="w-full border border-dashed border-gray-300 rounded-xl py-2 text-xs text-gray-400 mt-1">
                  + Add card
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
