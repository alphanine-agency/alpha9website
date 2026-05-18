import React, { useId } from "react";
import {
  AiAutomationArt,
  AdsManagementArt,
  GraphicDesignArt,
  VideoEditingArt,
  ContentProductionArt,
  WebDesignArt,
} from "./ServiceIllustrationArts";
import "./ServiceIllustration.css";

const illustrations = {
  "ai-automation": AiAutomationArt,
  "ads-management": AdsManagementArt,
  "graphic-design": GraphicDesignArt,
  "video-editing": VideoEditingArt,
  "content-production": ContentProductionArt,
  "web-design": WebDesignArt,
};

function ServiceIllustration({ id, className = "", compact = false }) {
  const uid = useId().replace(/:/g, "");
  const Art = illustrations[id];
  if (!Art) return null;

  return (
    <div
      className={[
        "service-illustration",
        compact && "service-illustration--compact",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Art uid={uid} />
    </div>
  );
}

export default ServiceIllustration;
