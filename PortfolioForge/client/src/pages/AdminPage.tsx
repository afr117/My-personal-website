import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, LogOut, Edit, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertProjectSchema, type Project } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

const adminFormSchema = insertProjectSchema.extend({
  technologies: z.string().min(1, "At least one technology is required"),
}).omit({ liveUrl: true });

type AdminFormData = z.infer<typeof adminFormSchema>;

export default function AdminPage() {
  const [, navigate] = useLocation();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all projects
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const form = useForm<AdminFormData>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      technologies: "",
      githubUrl: "",
      featured: "false",
    },
  });

  // Reset form when editing changes
  useEffect(() => {
    if (editingProject) {
      form.reset({
        title: editingProject.title,
        description: editingProject.description,
        image: editingProject.image,
        technologies: editingProject.technologies.join(", "),
        githubUrl: editingProject.githubUrl || "",
        featured: editingProject.featured,
      });
      setImagePreview(editingProject.image);
      setSelectedFile(null);
    } else {
      form.reset({
        title: "",
        description: "",
        image: "",
        technologies: "",
        githubUrl: "",
        featured: "false",
      });
      setImagePreview("");
      setSelectedFile(null);
    }
  }, [editingProject, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const createProjectMutation = useMutation({
    mutationFn: async (data: AdminFormData) => {
      const projectData = {
        ...data,
        technologies: data.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        githubUrl: data.githubUrl || undefined,
      };
      return await apiRequest("POST", "/api/projects", projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success!",
        description: "Your project has been added to the portfolio.",
      });
      form.reset();
      setSelectedFile(null);
      setImagePreview("");
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add project. Please try again.",
      });
      setIsSubmitting(false);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: AdminFormData }) => {
      const projectData = {
        ...data,
        technologies: data.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        githubUrl: data.githubUrl || undefined,
      };
      return await apiRequest("PATCH", `/api/projects/${id}`, projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Updated!",
        description: "Your project has been updated successfully.",
      });
      setEditingProject(null);
      form.reset();
      setSelectedFile(null);
      setImagePreview("");
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update project. Please try again.",
      });
      setIsSubmitting(false);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Deleted!",
        description: "Project has been removed from your portfolio.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete project.",
      });
    },
  });

  const onSubmit = async (data: AdminFormData) => {
    setIsSubmitting(true);

    let imageUrl = data.image;

    // Upload new image if selected
    if (selectedFile) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) {
        setIsSubmitting(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    // Ensure we have an image URL
    if (!imageUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a project image",
      });
      setIsSubmitting(false);
      return;
    }

    const finalData = {
      ...data,
      image: imageUrl,
    };

    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: finalData });
    } else {
      createProjectMutation.mutate(finalData);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    form.reset();
    setSelectedFile(null);
    setImagePreview("");
  };

  const handleDelete = (project: Project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
      deleteProjectMutation.mutate(project.id);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      sessionStorage.removeItem("adminAuth");
      navigate("/");
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout properly",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <h1 className="text-4xl font-display font-bold mb-2" data-testid="text-admin-title">
            {editingProject ? "Edit Project" : "Project Management"}
          </h1>
          <p className="text-muted-foreground" data-testid="text-admin-subtitle">
            {editingProject ? "Update your project details" : "Add new projects or edit existing ones"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {editingProject ? (
                    <>
                      <Edit className="w-5 h-5" />
                      Edit Project
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add New Project
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {editingProject ? "Make changes to your project details" : "Fill in the information about your new project"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="My Awesome Project"
                              {...field}
                              data-testid="input-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project..."
                              className="min-h-24"
                              {...field}
                              data-testid="input-description"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image Upload Field */}
                    <FormItem>
                      <FormLabel>Project Image *</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="flex-1"
                              data-testid="input-image-upload"
                            />
                            {selectedFile && (
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  setSelectedFile(null);
                                  setImagePreview(editingProject?.image || "");
                                }}
                                data-testid="button-clear-image"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          {imagePreview && (
                            <div className="relative w-full h-48 rounded-md overflow-hidden border">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          {!imagePreview && !selectedFile && (
                            <div className="flex items-center justify-center w-full h-48 border-2 border-dashed rounded-md bg-muted/30">
                              <div className="text-center">
                                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">No image selected</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload a project screenshot (max 5MB, jpg/png/gif/webp)
                      </FormDescription>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technologies *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="React, TypeScript, Node.js"
                              {...field}
                              data-testid="input-technologies"
                            />
                          </FormControl>
                          <FormDescription>Comma-separated</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub URL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://github.com/..."
                              {...field}
                              value={field.value || ""}
                              data-testid="input-github"
                            />
                          </FormControl>
                          <FormDescription>Optional - Link to your GitHub repository</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value === "true"}
                              onCheckedChange={(checked) => field.onChange(checked ? "true" : "false")}
                              data-testid="checkbox-featured"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured Project</FormLabel>
                            <FormDescription>
                              Display prominently on portfolio
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting || isUploading}
                        className="flex-1"
                        data-testid="button-submit"
                      >
                        {isUploading ? (
                          <>
                            <Upload className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : isSubmitting ? (
                          editingProject ? "Updating..." : "Adding..."
                        ) : (
                          editingProject ? "Update Project" : "Add Project"
                        )}
                      </Button>
                      {editingProject && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isSubmitting || isUploading}
                          data-testid="button-cancel-edit"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Projects List Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Existing Projects ({projects.length})</CardTitle>
                <CardDescription>
                  Click Edit to modify or Delete to remove a project
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading projects...
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No projects yet. Add your first project using the form.
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                    {projects.map((project) => (
                      <Card
                        key={project.id}
                        className={editingProject?.id === project.id ? "ring-2 ring-primary" : ""}
                        data-testid={`card-project-${project.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold truncate" data-testid={`text-title-${project.id}`}>
                                    {project.title}
                                  </h3>
                                  {project.featured === "true" && (
                                    <Badge variant="default" className="mt-1">Featured</Badge>
                                  )}
                                </div>
                                <div className="flex gap-2 shrink-0">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleEdit(project)}
                                    data-testid={`button-edit-${project.id}`}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleDelete(project)}
                                    data-testid={`button-delete-${project.id}`}
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.slice(0, 3).map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                                {project.technologies.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{project.technologies.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
