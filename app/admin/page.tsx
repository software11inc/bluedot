"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Advisor {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  logos: string[];
  linkedin: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  images: string[];
  createdAt: string;
  published: boolean;
}

// Image Upload Component
function ImageUpload({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
          dragOver ? "border-[#1C39BB] bg-[#1C39BB]/5" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative">
            <img src={value} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center">
            {uploading ? (
              <div className="py-8">
                <div className="animate-spin w-8 h-8 border-2 border-[#1C39BB] border-t-transparent rounded-full mx-auto" />
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              </div>
            ) : (
              <>
                <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500 mt-2">Drag & drop an image here, or</p>
                <label className="inline-block mt-2 px-4 py-2 bg-[#1C39BB] text-white text-sm rounded-lg cursor-pointer hover:bg-[#1C39BB]/90">
                  Browse Files
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                </label>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Multiple Images Upload Component
function MultiImageUpload({
  values,
  onChange,
  label,
}: {
  values: string[];
  onChange: (urls: string[]) => void;
  label: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange([...values, data.url]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="space-y-2">
        {values.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {values.map((url, index) => (
              <div key={index} className="relative">
                <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
        <label className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1C39BB] transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-[#1C39BB] border-t-transparent rounded-full" />
              <span className="text-sm text-gray-500">Uploading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-gray-500">Add Image</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"advisors" | "posts">("advisors");
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingAdvisor, setEditingAdvisor] = useState<Advisor | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    fetchAdvisors();
    fetchPosts();
  }, []);

  const fetchAdvisors = async () => {
    const res = await fetch("/api/advisors");
    const data = await res.json();
    setAdvisors(data);
    setLoading(false);
  };

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  // Advisor CRUD
  const saveAdvisor = async (advisor: Advisor) => {
    const method = advisor.id ? "PUT" : "POST";
    await fetch("/api/advisors", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(advisor),
    });
    fetchAdvisors();
    setEditingAdvisor(null);
  };

  const deleteAdvisor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this advisor?")) return;
    await fetch("/api/advisors", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAdvisors();
  };

  // Post CRUD
  const savePost = async (post: Post) => {
    const method = post.id ? "PUT" : "POST";
    await fetch("/api/posts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    fetchPosts();
    setEditingPost(null);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  };

  const newAdvisor = (): Advisor => ({
    id: "",
    name: "",
    title: "",
    image: "",
    bio: "",
    logos: [],
    linkedin: "",
  });

  const newPost = (): Post => ({
    id: "",
    title: "",
    body: "",
    images: [],
    createdAt: "",
    published: false,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#1C39BB] font-medium hover:opacity-80">
              &larr; Back to site
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("advisors")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "advisors"
                ? "bg-[#1C39BB] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Advisors ({advisors.length})
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "posts"
                ? "bg-[#1C39BB] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Blog Posts ({posts.length})
          </button>
        </div>

        {/* Advisors Tab */}
        {activeTab === "advisors" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Advisory Board</h2>
              <button
                onClick={() => setEditingAdvisor(newAdvisor())}
                className="px-4 py-2 bg-[#1C39BB] text-white rounded-lg hover:bg-[#1C39BB]/90 transition-colors"
              >
                + Add Advisor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {advisors.map((advisor) => (
                <div key={advisor.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                      {advisor.image ? (
                        <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{advisor.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{advisor.title}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setEditingAdvisor(advisor)}
                          className="text-xs text-[#1C39BB] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAdvisor(advisor.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Blog Posts</h2>
              <button
                onClick={() => setEditingPost(newPost())}
                className="px-4 py-2 bg-[#1C39BB] text-white rounded-lg hover:bg-[#1C39BB]/90 transition-colors"
              >
                + Add Post
              </button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{post.title}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            post.published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.body}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingPost(post)}
                        className="text-xs text-[#1C39BB] hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advisor Edit Modal */}
      {editingAdvisor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {editingAdvisor.id ? "Edit Advisor" : "Add New Advisor"}
              </h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveAdvisor(editingAdvisor);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingAdvisor.name}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C39BB] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingAdvisor.title}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C39BB] focus:border-transparent"
                  required
                />
              </div>
              <ImageUpload
                label="Profile Image"
                value={editingAdvisor.image}
                onChange={(url) => setEditingAdvisor({ ...editingAdvisor, image: url })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editingAdvisor.bio}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C39BB] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={editingAdvisor.linkedin}
                  onChange={(e) => setEditingAdvisor({ ...editingAdvisor, linkedin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C39BB] focus:border-transparent"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <MultiImageUpload
                label="Company Logos"
                values={editingAdvisor.logos}
                onChange={(urls) => setEditingAdvisor({ ...editingAdvisor, logos: urls })}
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingAdvisor(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1C39BB] text-white rounded-lg hover:bg-[#1C39BB]/90 transition-colors"
                >
                  Save Advisor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">
                {editingPost.id ? "Edit Post" : "Add New Post"}
              </h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                savePost(editingPost);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C39BB] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                <textarea
                  value={editingPost.body}
                  onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C39BB] focus:border-transparent"
                />
              </div>
              <MultiImageUpload
                label="Images"
                values={editingPost.images}
                onChange={(urls) => setEditingPost({ ...editingPost, images: urls })}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={editingPost.published}
                  onChange={(e) => setEditingPost({ ...editingPost, published: e.target.checked })}
                  className="w-4 h-4 text-[#1C39BB] rounded focus:ring-[#1C39BB]"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1C39BB] text-white rounded-lg hover:bg-[#1C39BB]/90 transition-colors"
                >
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
