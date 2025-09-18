import React from "react";
import KanbanBoard from "./KanbanBoard";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Kanban - Gerenciador de Tarefas</h1>
      <KanbanBoard />
    </div>
  );
}