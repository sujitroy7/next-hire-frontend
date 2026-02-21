"use client";

import { cloneElement, JSX, useState } from "react";
import dynamic from "next/dynamic";

const AddRecruiterDialog = dynamic(() => import("./add-recruiter-dialog"));

export default function AddRecruiterButtonWrapper({
  children,
}: {
  children: JSX.Element;
}) {
  const [open, setOpen] = useState(false);
  const element = cloneElement(children, { onClick: () => setOpen(true) });

  return (
    <>
      {element}
      <AddRecruiterDialog open={open} setOpen={setOpen} />
    </>
  );
}
