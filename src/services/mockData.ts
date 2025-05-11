
import { BlogPost } from '@/types/blog';

// Default mock data for fallback
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Anxiety: Causes and Treatment Options",
    excerpt: "Learn about the root causes of anxiety disorders and explore effective treatment approaches.",
    content: "<p>Anxiety disorders are a group of mental health conditions characterized by significant feelings of anxiety and fear. These feelings are strong enough to interfere with daily activities.</p><p>Common treatment options include cognitive behavioral therapy (CBT), medication, and lifestyle changes like regular exercise and mindfulness practices.</p>",
    author_name: "Dr. Sarah Johnson",
    author_role: "Clinical Psychologist",
    author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    publish_date: "2023-09-15",
    read_time: "6 min read",
    category: "Treatment",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    featured: true,
    slug: "understanding-anxiety-causes-and-treatment-options"
  },
  {
    id: "2",
    title: "Digital Tools for Mental Health Support",
    excerpt: "Discover how technology is transforming access to mental health resources and support systems.",
    content: "<p>With the advancement of technology, mental health support is becoming more accessible than ever before. From meditation apps to online therapy sessions, digital tools are bridging gaps in care.</p><p>Studies show that digital interventions can be effective for conditions like mild to moderate depression and anxiety, especially when combined with traditional therapy approaches.</p>",
    author_name: "Alex Rivera",
    author_role: "Tech & Wellbeing Specialist",
    author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    publish_date: "2023-08-28",
    read_time: "4 min read",
    category: "Technology",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    featured: false,
    slug: "digital-tools-for-mental-health-support"
  },
  {
    id: "3",
    title: "Building Meaningful Connections in a Digital Age",
    excerpt: "Strategies for fostering genuine human connections while navigating our increasingly digital world.",
    content: "<p>Despite being more 'connected' than ever through technology, many people report feeling increasingly isolated. This article explores the paradox of modern connection and offers practical strategies for building meaningful relationships.</p><p>Research suggests that quality of relationships, rather than quantity, is what contributes most significantly to mental wellbeing and life satisfaction.</p>",
    author_name: "Maya Patel",
    author_role: "Social Psychologist",
    author_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    publish_date: "2023-08-10",
    read_time: "7 min read",
    category: "Connection",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
    featured: false,
    slug: "building-meaningful-connections-in-a-digital-age"
  }
];
