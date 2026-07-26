import "./KpiStrip.css";

export type Kpi = { label: string; value: string; spark: string };

function KpiStrip({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="kpi-strip" style={{ gridTemplateColumns: `repeat(${kpis.length}, 1fr)` }}>
      {kpis.map((kpi) => (
        <div className="kpi-card" key={kpi.label}>
          <p className="kpi-label">{kpi.label}</p>
          <p className="kpi-value">{kpi.value}</p>
          <img className="kpi-spark" src={kpi.spark} alt="" />
        </div>
      ))}
    </div>
  );
}

export default KpiStrip;
