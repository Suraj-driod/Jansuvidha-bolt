"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockIssues } from "@/lib/mock-data";
import { ThumbsUp, ThumbsDown, MessageCircle, Filter, Plus, Image as ImageIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Community() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    category: "",
    media: null as File | null
  });

  const filteredIssues = mockIssues.filter(issue => {
    return !filterStatus || issue.status === filterStatus;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPostForm(prev => ({ ...prev, media: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post form data:", postForm);
    setIsModalOpen(false);
    setPostForm({ title: "", content: "", category: "", media: null });
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <Button variant="outline" size="sm" asChild className="mr-2">
              <Link href="/">Home</Link>
            </Button>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-600">Community</span>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
          <p className="text-gray-600 mb-6">
            Discuss, vote, and comment on issues in your community
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={filterStatus === null ? "default" : "outline"}
              onClick={() => setFilterStatus(null)}
            >
              All Issues
            </Button>
            <Button 
              variant={filterStatus === "Pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("Pending")}
              className={filterStatus === "Pending" ? "" : "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"}
            >
              Pending
            </Button>
            <Button 
              variant={filterStatus === "Progress" ? "default" : "outline"}
              onClick={() => setFilterStatus("Progress")} 
              className={filterStatus === "Progress" ? "" : "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"}
            >
              In Progress
            </Button>
            <Button 
              variant={filterStatus === "Resolved" ? "default" : "outline"}
              onClick={() => setFilterStatus("Resolved")}
              className={filterStatus === "Resolved" ? "" : "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"}
            >
              Resolved
            </Button>
          </div>
        </div>
        
        <div className="space-y-6 max-w-2xl mx-auto">
          {filteredIssues.map(issue => (
            <div key={issue.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{issue.title}</h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    issue.status === 'Pending' 
                      ? 'bg-amber-100 text-amber-800' 
                      : issue.status === 'Progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{issue.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">Reported on: {issue.reportedOn}</span>
                  {issue.resolvedOn && (
                    <span>Resolved on: {issue.resolvedOn}</span>
                  )}
                </div>
                
                {issue.photos && issue.photos.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {issue.photos.map((photo, index) => (
                        <div key={index} className="rounded-lg overflow-hidden h-48">
                          <img 
                            src={photo} 
                            alt={`Photo ${index + 1} of ${issue.title}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex space-x-4">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{issue.votes.upvotes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                      <ThumbsDown className="h-4 w-4" />
                      <span>{issue.votes.downvotes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <MessageCircle className="h-4 w-4" />
                      <span>{issue.comments.length} comments</span>
                    </button>
                  </div>
                  
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/reports/details/${issue.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
              
              {issue.comments.length > 0 && (
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Comments</h3>
                  <div className="space-y-4">
                    {issue.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.userAvatar} alt={comment.username} />
                          <AvatarFallback>{comment.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{comment.username}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Add a comment</h4>
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Write your comment..."
                          rows={2}
                        />
                        <div className="mt-2 flex justify-end">
                          <Button size="sm">Post Comment</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Post title"
                value={postForm.title}
                onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full"
              />
            </div>

            <div>
              <Select
                value={postForm.category}
                onValueChange={(value) => setPostForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Textarea
                placeholder="Write your post content here..."
                value={postForm.content}
                onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <label className="block">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="post-media"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-1" />
                      <p className="text-sm text-gray-500">
                        {postForm.media ? postForm.media.name : "Click to upload media"}
                      </p>
                    </div>
                    <input
                      id="post-media"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Post
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}