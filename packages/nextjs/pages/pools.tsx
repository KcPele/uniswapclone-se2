import React, { useState } from "react";
import { PoolAdd, PoolConnect } from "../components/index";

const Pools = () => {
  const [closePool, setClosePool] = useState(false);
  return (
    <div className="w-[90%] lg:w-[50%] my-[5rem] mx-auto">
      {closePool ? <PoolAdd setClosePool={setClosePool} /> : <PoolConnect setClosePool={setClosePool} />}
    </div>
  );
};

export default Pools;
