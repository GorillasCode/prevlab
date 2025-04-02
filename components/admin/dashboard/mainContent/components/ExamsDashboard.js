import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const sampleData = {
  today: [{ name: "Hoje", count: 0, exams: ["Exame A", "Exame B", "Exame C"] }],
  week: [
    { name: "Seg", count: 5, exams: ["Exame A", "Exame B", "Exame C"] },
    { name: "Ter", count: 8, exams: ["Exame D", "Exame E"] },
    { name: "Qua", count: 3, exams: ["Exame F"] },
    { name: "Qui", count: 6, exams: ["Exame G", "Exame H", "Exame I"] },
    { name: "Sex", count: 10, exams: ["Exame J", "Exame K"] },
    { name: "Sáb", count: 4, exams: ["Exame L", "Exame M"] },
    { name: "Dom", count: 7, exams: ["Exame N", "Exame O", "Exame P"] }
  ],
  month: [
    { name: "Jan", count: 15, exams: ["Exame A", "Exame B"] },
    { name: "Fev", count: 20, exams: ["Exame C", "Exame D"] },
    { name: "Mar", count: 12, exams: ["Exame E", "Exame F"] },
    { name: "Abr", count: 18, exams: ["Exame G", "Exame H"] },
    { name: "Mai", count: 11, exams: ["Exame G", "Exame H"] },
    { name: "Jun", count: 8, exams: ["Exame G", "Exame H"] },
    { name: "Jul", count: 26, exams: ["Exame G", "Exame H"] },
    { name: "Ago", count: 22, exams: ["Exame G", "Exame H"] },
    { name: "Set", count: 15, exams: ["Exame G", "Exame H"] },
    { name: "Out", count: 4, exams: ["Exame G", "Exame H"] },
    { name: "Nov", count: 17, exams: ["Exame G", "Exame H"] },
    { name: "Dez", count: 18, exams: ["Exame G", "Exame H"] }
  ]
};

const ExamsChart = () => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [filter, setFilter] = useState("week");

  const handleBarClick = data => {
    setSelectedExams(data.exams || []);
  };

  return (
    <div>
      <div>
        <label>Filtrar por: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="today">Hoje</option>
          <option value="week">Semana</option>
          <option value="month">Mês</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sampleData[filter]}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#276749"
            onClick={data => handleBarClick(data)}
          />
        </BarChart>
      </ResponsiveContainer>

      {selectedExams.length > 0 && (
        <div>
          <h3>Exames do período selecionado:</h3>
          <ul>
            {selectedExams.map((exam, index) => (
              <li key={index}>{exam}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExamsChart;
