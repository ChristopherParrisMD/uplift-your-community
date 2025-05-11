
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, uploadBlogImage } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Edit, Trash2, Plus, LogOut, Upload, Image, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BlogAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    author_name: "",
    author_role: "",
    author_avatar: "",
    publish_date: new Date().toISOString().split('T')[0],
    read_time: "",
    category: "Research",
    image_url: "",
    slug: ""
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const {
    data: blogPosts = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['adminBlogPosts'],
    queryFn: getBlogPosts,
  });
  
  // Convert title to slug
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear selected file if user enters a URL manually
    if (e.target.value && selectedFile) {
      setSelectedFile(null);
    }
    handleInputChange(e);
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({ 
        title: "Invalid file type", 
        description: "Please upload a JPG, PNG, GIF, or WebP image", 
        variant: "destructive" 
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ 
        title: "File too large", 
        description: "Image must be smaller than 5MB", 
        variant: "destructive" 
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Create a preview URL
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, image_url: imageUrl }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!user) {
        toast({ 
          title: "Authentication required", 
          description: "You must be logged in to create or edit posts", 
          variant: "destructive" 
        });
        return;
      }
      
      // First upload the image if a file was selected
      let imageUrl = formData.image_url;
      
      if (selectedFile) {
        setIsUploading(true);
        const uploadedUrl = await uploadBlogImage(selectedFile);
        setIsUploading(false);
        
        if (!uploadedUrl) {
          toast({ 
            title: "Image upload failed", 
            description: "Please try again or use an external image URL", 
            variant: "destructive" 
          });
          return;
        }
        
        imageUrl = uploadedUrl;
        setFormData(prev => ({ ...prev, image_url: uploadedUrl }));
      }

      if (editingId) {
        await updateBlogPost(editingId, { ...formData, image_url: imageUrl });
        toast({ title: "Blog post updated successfully" });
      } else {
        const result = await createBlogPost({ ...formData as Omit<BlogPost, 'id' | 'created_at'>, image_url: imageUrl || '' });
        if (result) {
          toast({ title: "Blog post created successfully" });
        } else {
          toast({ 
            title: "Error creating blog post", 
            description: "Please try again or check console for details", 
            variant: "destructive" 
          });
        }
      }
      
      resetForm();
      refetch();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({ 
        title: "Error saving blog post", 
        description: "Please try again", 
        variant: "destructive" 
      });
    }
  };
  
  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author_name: post.author_name,
      author_role: post.author_role,
      author_avatar: post.author_avatar,
      publish_date: post.publish_date,
      read_time: post.read_time,
      category: post.category,
      image_url: post.image_url,
      slug: post.slug
    });
    setEditingId(post.id);
    setIsEditing(true);
    setSelectedFile(null);
    window.scrollTo(0, 0);
  };
  
  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        const success = await deleteBlogPost(postToDelete);
        if (success) {
          toast({ title: "Blog post deleted successfully" });
          refetch();
        } else {
          toast({ 
            title: "Error deleting blog post", 
            description: "Please try again", 
            variant: "destructive" 
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast({ 
          title: "Error deleting blog post", 
          description: "Please try again", 
          variant: "destructive" 
        });
      }
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author_name: "",
      author_role: "",
      author_avatar: "",
      publish_date: new Date().toISOString().split('T')[0],
      read_time: "",
      category: "Research",
      image_url: "",
      slug: ""
    });
    setEditingId(null);
    setIsEditing(false);
    setSelectedFile(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/admin-login');
    toast({ title: "Signed out successfully" });
  };

  // Pre-populate form with default author info if empty
  useEffect(() => {
    if (user && !formData.author_name) {
      setFormData(prev => ({
        ...prev,
        author_name: user.email?.split('@')[0] || 'Admin User',
        author_role: 'Content Manager',
        author_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      }));
    }
  }, [user, formData.author_name]);
  
  // Function to clear selected image
  const clearSelectedImage = () => {
    setSelectedFile(null);
    setFormData(prev => ({ ...prev, image_url: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Blog Management</h1>
              <p className="text-gray-600 mt-1">Create and manage your blog posts</p>
              {user && (
                <p className="text-sm text-mindful-600 mt-1">
                  Logged in as: {user.email}
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                {isEditing ? 'Cancel' : <><Plus size={16} /> New Post</>}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </div>
          
          {isEditing && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-6">{editingId ? 'Edit Post' : 'Create New Post'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slug">Slug</Label>
                      <Input 
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        required
                        className="text-gray-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea 
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        required
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select 
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="Research">Research</option>
                        <option value="Treatment">Treatment</option>
                        <option value="Technology">Technology</option>
                        <option value="Connection">Connection</option>
                        <option value="Accessibility">Accessibility</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Featured Image</Label>
                      
                      {/* Image preview area */}
                      {formData.image_url && (
                        <div className="relative w-full h-40 mb-2">
                          <img 
                            src={formData.image_url} 
                            alt="Featured image preview" 
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              // If image fails to load, show a placeholder
                              const target = e.target as HTMLImageElement;
                              target.src = "https://images.unsplash.com/photo-1579762593175-20226054cad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                            }}
                          />
                          <Button 
                            type="button"
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={clearSelectedImage}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      )}
                      
                      {/* Image upload and URL input */}
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="image_upload" className="mb-1 block">Upload Image</Label>
                          <div className="flex items-center gap-2">
                            <Button 
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                            >
                              {isUploading ? "Uploading..." : "Choose File"}
                              <Upload size={16} />
                            </Button>
                            {selectedFile && (
                              <span className="text-sm text-gray-600 truncate max-w-[200px]">
                                {selectedFile.name}
                              </span>
                            )}
                          </div>
                          <input 
                            ref={fileInputRef}
                            id="image_upload"
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="image_url" className="flex items-center gap-1">
                            <span>Or use image URL</span>
                            {selectedFile && <span className="text-xs text-gray-500">(will override uploaded file)</span>}
                          </Label>
                          <Input 
                            id="image_url"
                            name="image_url"
                            value={selectedFile ? "" : formData.image_url || ""}
                            onChange={handleImageUrlChange}
                            placeholder="https://example.com/image.jpg"
                            disabled={!!selectedFile}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="author_name">Author Name</Label>
                      <Input 
                        id="author_name"
                        name="author_name"
                        value={formData.author_name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="author_role">Author Role</Label>
                      <Input 
                        id="author_role"
                        name="author_role"
                        value={formData.author_role}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="author_avatar">Author Avatar URL</Label>
                      <Input 
                        id="author_avatar"
                        name="author_avatar"
                        value={formData.author_avatar}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="publish_date">Publish Date</Label>
                        <Input 
                          id="publish_date"
                          name="publish_date"
                          type="date"
                          value={formData.publish_date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="read_time">Read Time</Label>
                        <Input 
                          id="read_time"
                          name="read_time"
                          value={formData.read_time}
                          onChange={handleInputChange}
                          placeholder="e.g., 5 min read"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="content">Content (HTML)</Label>
                  <Textarea 
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? "Uploading..." : (editingId ? 'Update Post' : 'Create Post')}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Blog Posts</h2>
            
            {isLoading ? (
              <p>Loading posts...</p>
            ) : error ? (
              <p className="text-red-500">Error loading posts. Please try again.</p>
            ) : blogPosts.length === 0 ? (
              <p>No blog posts yet. Create your first one!</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-gray-500">/blog/{post.slug}</div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded-full">
                            {post.category}
                          </span>
                        </TableCell>
                        <TableCell>{post.publish_date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(post)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setPostToDelete(post.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default BlogAdmin;
