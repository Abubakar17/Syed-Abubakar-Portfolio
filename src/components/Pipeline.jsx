import { useRef, useState } from "react";

// Desktop layout is a 5-column × 3-lane grid; connectors are drawn in a 0–100
// viewBox stretched over the same box, so node centres are at fixed percentages.
const X = { 1: 10, 2: 30, 3: 50, 4: 70, 5: 90 };
const Y = { 1: 100 / 6, 2: 50, 3: 500 / 6, 12: 100 / 3, all: 50 };
const ROWS = { 1: "1", 2: "2", 3: "3", 12: "1 / 3", all: "1 / 4" };

// Elbow connectors: out horizontally, turn halfway between columns, in horizontally.
const EDGES = [
  ["video", "fce"],
  ["video", "yolo"],
  ["video", "depth"],
  ["fce", "track"],
  ["yolo", "track"],
  ["track", "length"],
  ["depth", "length"],
  ["length", "mass"],
];

function edgePath(from, to) {
  const x1 = X[from.col];
  const y1 = Y[from.lane];
  const x2 = X[to.col];
  const y2 = Y[to.lane];
  const turn = x2 - 10;
  return `M${x1} ${y1} H${turn} V${y2} H${x2}`;
}

export default function Pipeline({ stages, initial = "fce" }) {
  const ordered = [...stages].sort((a, b) => a.step.localeCompare(b.step));
  const byId = Object.fromEntries(stages.map((stage) => [stage.id, stage]));
  const [selected, setSelected] = useState(initial);
  const buttons = useRef({});
  const current = byId[selected];

  const onKeyDown = (event, index) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = ordered[(index + step + ordered.length) % ordered.length];
    setSelected(next.id);
    buttons.current[next.id]?.focus();
  };

  return (
    <div className="pipeline">
      <div className="pipeline-graph" role="group" aria-label="DeepDive pipeline stages">
        <svg className="pipeline-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {EDGES.map(([from, to]) => {
            const lit = from === selected || to === selected;
            return (
              <path
                key={`${from}-${to}`}
                d={edgePath(byId[from], byId[to])}
                className={lit ? "edge is-lit" : "edge"}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {ordered.map((stage, index) => (
          <button
            key={stage.id}
            ref={(node) => {
              buttons.current[stage.id] = node;
            }}
            type="button"
            className={selected === stage.id ? "node is-active" : "node"}
            style={{ gridColumn: stage.col, gridRow: ROWS[stage.lane] }}
            aria-pressed={selected === stage.id}
            aria-controls="pipeline-detail"
            onClick={() => setSelected(stage.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span className="node-step">{stage.step}</span>
            <span className="node-name">{stage.short}</span>
            {stage.mine ? (
              <span className="node-flag node-mine">my focus</span>
            ) : (
              stage.novel && <span className="node-flag">novel</span>
            )}
          </button>
        ))}
      </div>

      <div id="pipeline-detail" className="pipeline-detail" aria-live="polite">
        <p className="detail-step">
          Stage {current.step} of DeepDive
          {current.novel && <span className="detail-flag">Novel in the paper</span>}
          {current.mine && <span className="detail-flag detail-mine">My focus</span>}
        </p>
        <h4>{current.name}</h4>
        <p className="detail-what">{current.what}</p>
        <ul className="detail-list">
          {current.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <p className="detail-why">
          <span>Why it's there</span>
          {current.why}
        </p>
      </div>
    </div>
  );
}
