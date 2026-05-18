import React from "react";
import ServiceIllustration from "../ServiceIllustration/ServiceIllustration";
import "./ServiceCard.css";

function ServiceCard({
  service,
  index,
  size = "default",
  as: Tag = "li",
  className = "",
  ...motionProps
}) {
  const Component = Tag;
  const isCompact = size === "compact";
  const wide = !isCompact && service.wide;

  return (
    <Component
      className={[
        "service-card",
        wide && "service-card--wide",
        isCompact && "service-card--compact",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...motionProps}
    >
      <ServiceIllustration id={service.id} compact={isCompact} />
      <div className="service-card__body">
        <div className="service-card__meta">
          {!isCompact ? (
            <span className="service-card__index">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <span className="service-card__tag">{service.tag}</span>
        </div>
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__desc">{service.desc}</p>
        {!isCompact && service.highlights?.length ? (
          <ul className="service-card__highlights">
            {service.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Component>
  );
}

export default ServiceCard;
