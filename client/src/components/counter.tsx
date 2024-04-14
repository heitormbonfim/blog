// features/counter/Counter.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "../redux/slices/counter-slice";

const Counter: React.FC = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10
      </button>
    </div>
  );
};

export default Counter;
