import * as React from "react";

export function Plus(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" width="1em" height="1em" {...props}>
      <path d="M432 256c0 13.25-10.75 24-24 24H248v160c0 13.25-10.75 24-24 24s-24-10.75-24-24V280H40c-13.25 0-24-10.75-24-24s10.75-24 24-24h160V72c0-13.25 10.75-24 24-24s24 10.75 24 24v160h160c13.25 0 24 10.75 24 24z" />
    </svg>
  );
}

const MemoPlus = React.memo(Plus);
export default MemoPlus;
