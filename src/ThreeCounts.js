import React, { useState, useEffect } from "react";

function ThreeCounts() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [changed, setChanged] = useState();

  useEffect(() => {
    console.log("count2 changed!");
    if (count2 > 0) {
      setChanged("count2 changed!");
    }
  }, [count2]);

  return (
    <div>
      <div className="data">
        {count1} {count2} {count3}
      </div>
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>
      <button onClick={() => setCount2(count2 + 1)}>
        Increment count2{changed}
      </button>
      <button onClick={() => setCount3(count3 + 1)}>Increment count3</button>
    </div>
  );
}
// Must export!
export default ThreeCounts;
