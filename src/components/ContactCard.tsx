
import { Card, CardContent } from "@/components/ui/card";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  description: string;
}

const ContactCard = ({ icon, title, content, description }: ContactCardProps) => (
  <Card>
    <CardContent className="flex items-start p-6">
      <div className="mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-800">{content}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default ContactCard;
