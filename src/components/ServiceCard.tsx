import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export const ServiceCard = ({ icon, title, description, linkText, linkUrl }: ServiceCardProps) => (
  <Card className="card-hover h-full">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="bg-mindful-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link to={linkUrl} className="text-mindful-600 font-medium hover:text-mindful-800 inline-flex items-center">
        {linkText}
        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </CardContent>
  </Card>
); 