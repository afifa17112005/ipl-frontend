export default function WinBar({ label, value }) {
  return (
    <div style={{ width: "300px", margin: "15px auto" }}>
      <p>{label} – {value.toFixed(2)}%</p>
      <div
        style={{
          height: "12px",
          width: `${value}%`,
          background: "red",
          borderRadius: "6px"
        }}
      />
    </div>
  );
}
