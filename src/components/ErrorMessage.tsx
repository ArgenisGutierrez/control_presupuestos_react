import { PropsWithChildren } from "react";

export function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-500 text-white text-center p-2 text-xl rounded-lg font-bold">
      {children}
    </p>
  )
}
