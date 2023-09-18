import { useEffect, useState } from "react";
import classes from './style.module.scss'


const Counter = () => {
  const [count, setCount] = useState(0)  

  const increment = () => {
    setCount(count + 1)
  }

  return (
    <div className={classes.divTest}>
     12
    </div>
  );
};

export default Counter;

