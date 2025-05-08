
interface HeroSectionProps {
  title: string;
  description: string;
}

const HeroSection = ({ title, description }: HeroSectionProps) => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
