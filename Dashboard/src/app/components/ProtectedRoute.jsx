'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return null; // Don't render anything until token is validated
  }

  return children;
}
