import React from "react";

import TimeLine from "./components/TimeLine";
import ExamsDashboard from "./components/ExamsDashboard";

function AdminDashboard() {
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="container" style={{ height: 700, overflow: "auto" }}>
          <ExamsDashboard />
          {/* <TimeLine /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
