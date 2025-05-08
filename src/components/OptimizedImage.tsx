
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholderClassName,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    // Only set up the intersection observer if needed
    if (!isIntersecting) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsIntersecting(true);
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px' } // Start loading when image is 200px from viewport
      );
      
      // Create a ref element to observe
      const element = document.getElementById(`image-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
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
  }, [src, isIntersecting]);
  
  return (
    <div 
      id={`image-${src.replace(/[^a-zA-Z0-9]/g, '')}`} 
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
      
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
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
