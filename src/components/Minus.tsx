import * as React from "react";

export function Minus(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" width="1em" height="1em" {...props}>
      <path d="M432 256c0 13.25-10.75 24-24 24H40c-13.25 0-24-10.75-24-24s10.75-24 24-24h368c13.25 0 24 10.75 24 24z" />
    </svg>
  );
}

const MemoMinus = React.memo(Minus);
export default MemoMinus;
