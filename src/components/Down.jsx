import * as React from "react";

export function Down(props) {
  return (
    <svg viewBox="0 0 384 512" width="1em" height="1em" {...props}>
      <path d="M360.501 217.453L208.499 361.438c-4.625 4.374-10.562 6.562-16.5 6.562s-11.875-2.188-16.5-6.562L23.497 217.453c-9.625-9.125-10.031-24.312-.937-33.933 9.125-9.688 24.375-10.032 33.937-.938l135.502 128.363 135.502-128.363c9.563-9.094 24.75-8.75 33.938.938 9.093 9.621 8.687 24.808-.938 33.933z" />
    </svg>
  );
}

const MemoDown = React.memo(Down);
export default MemoDown;
