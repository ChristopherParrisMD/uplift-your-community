
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  priority?: boolean; // Add priority flag for critical images
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholderClassName,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority); // Start loading immediately if priority
  const uniqueId = `image-${src.replace(/[^a-zA-Z0-9]/g, '')}`;
  
  useEffect(() => {
    // Preload high priority images
    if (priority && !isLoaded) {
      const preloadImage = new Image();
      preloadImage.src = src;
      preloadImage.onload = () => setIsLoaded(true);
      return;
    }
    
    // Only set up the intersection observer if needed
    if (!isIntersecting && !priority) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsIntersecting(true);
              observer.disconnect();
            }
          });
        },
        { 
          rootMargin: '200px',  // Start loading when image is 200px from viewport
          threshold: 0.01 // Trigger when even a small portion is visible
        }
      );
      
      // Create a ref element to observe
      const element = document.getElementById(uniqueId);
      if (element) {
        observer.observe(element);
      }
      
      return () => {
        if (element) {
          observer.unobserve(element);
        }
        observer.disconnect();
      };
    }
  }, [src, isIntersecting, uniqueId, priority, isLoaded]);
  
  // Add image to browser cache on page load for important images
  useEffect(() => {
    // For non-priority images that might be needed soon, we can still prefetch them
    // when the component mounts but with lower priority
    if (!priority && !isIntersecting) {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = src;
      link.id = `prefetch-${uniqueId}`;
      document.head.appendChild(link);
      
      return () => {
        const existingLink = document.getElementById(`prefetch-${uniqueId}`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      };
    }
  }, [src, uniqueId, priority, isIntersecting]);
  
  return (
    <div 
      id={uniqueId}
      className={cn("relative overflow-hidden", className)}
    >
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse", 
            placeholderClassName
          )}
        />
      )}
      
      {(isIntersecting || priority) && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setIsLoaded(true)}
          fetchPriority={priority ? "high" : "auto"}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
