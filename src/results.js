import React, { useState, useEffect } from "react";

export default function Results(props) {
  const [formInfo, setFormInfo] = useState(props.info);

  useEffect(() => {
    console.log("component mounted");
  }, []);

  return (
    <div>
      <p>{formInfo.tilgung}</p>
    </div>
  );
}
