import React from "react";

function OptimizedPicture({
  className,
  webpSrc,
  fallbackSrc,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority,
  sizes,
  decoding = "async",
}) {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        className={className}
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        sizes={sizes}
      />
    </picture>
  );
}

export default OptimizedPicture;
