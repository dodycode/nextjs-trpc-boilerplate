"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConfirm } from "@/components/ui/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSessionContext } from "@/contexts/session-provider";
import { api } from "@/trpc/react";

export function LatestPosts() {
  const { session } = useSessionContext();
  const confirm = useConfirm();

  const [latestPosts] = api.post.latestPost.useSuspenseQuery();
  const utils = api.useUtils();

  const [editingPost, setEditingPost] = useState<{
    id: number;
    name: string;
    content: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false);

  const updatePost = api.post.update.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setEditingPost(null);
      setIsOpen(false);
      toast.success("Post updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update post: ${error.message}`);
    },
  });

  const deletePost = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete post: ${error.message}`);
    },
  });

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setIsAddingPost(false);
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  const handleEdit = (post: { id: number; name: string; content: string }) => {
    setEditingPost(post);
    setIsOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updatePost.mutate({
        id: editingPost.id,
        data: { name: editingPost.name, content: editingPost.content },
      });
    }
  };

  const handleDelete = (id: number) => {
    void confirm({
      title: "Delete Confirmation",
      description: "Are you sure you want to delete this post?",
      onConfirm: async () => {
        await deletePost.mutateAsync(id);
      },
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      createPost.mutate({
        name: editingPost.name,
        content: editingPost.content,
        createdById: session.user.id,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {session && (
        <div className="mb-4">
          <Button
            onClick={() => {
              setIsAddingPost(true);
              setEditingPost({ id: 0, name: "", content: "" });
            }}
          >
            Add New Post
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {latestPosts && latestPosts.length > 0 ? (
          latestPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{post.content}</p>
              </CardContent>
              {session && (
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => handleEdit(post)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <p>You have no posts yet.</p>
        )}
      </div>

      <Dialog
        open={isOpen || isAddingPost}
        onOpenChange={(open) => {
          setIsOpen(open);
          setIsAddingPost(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isAddingPost ? "Add New Post" : "Edit Post"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={isAddingPost ? handleCreate : handleUpdate}
            className="space-y-4"
          >
            <Input
              placeholder="Title"
              value={editingPost?.name || ""}
              onChange={(e) =>
                setEditingPost((prev) =>
                  prev ? { ...prev, name: e.target.value } : null,
                )
              }
            />
            <Textarea
              placeholder="Content"
              value={editingPost?.content || ""}
              onChange={(e) =>
                setEditingPost((prev) =>
                  prev ? { ...prev, content: e.target.value } : null,
                )
              }
            />
            <Button
              type="submit"
              disabled={updatePost.isPending || createPost.isPending}
            >
              {isAddingPost
                ? createPost.isPending
                  ? "Creating..."
                  : "Create"
                : updatePost.isPending
                  ? "Updating..."
                  : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
