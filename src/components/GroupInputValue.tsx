import React from "react";

export default function GroupInputValue({ title, value }) {
  return (
    <div className="gap-4 join join-horizontal w-full">
      <div className="join-item">
        <b>{title}</b>
      </div>

      <input
        className="join-item input input-ghost input-sm w-full"
        value={value}
      />
    </div>
  );
}
