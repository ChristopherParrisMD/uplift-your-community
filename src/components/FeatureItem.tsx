interface FeatureItemProps {
  text: string;
}

export const FeatureItem = ({ text }: FeatureItemProps) => (
  <li className="flex items-start">
    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-calm-100 text-calm-600 flex items-center justify-center">
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="ml-3 text-gray-600">{text}</span>
  </li>
); 