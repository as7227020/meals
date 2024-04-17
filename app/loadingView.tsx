"use client";

import { useState } from "react";
import Loading from "@/app/loading";
import "./loadingView.css";
type LoadingViewProps = {
  viewSwitch: boolean;
};
export default function LoadingView({ viewSwitch }: LoadingViewProps) {
  const [modalState, SetmodalState] = useState(false);

  return (
    <div>
      {viewSwitch && (
        <div className="topcss p-2">
          <div>
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
}
