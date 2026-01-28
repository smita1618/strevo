import { useState, useCallback } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateProfilePic } from "../lib/api";
import { CameraIcon, UploadIcon, ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [uploadingPic, setUploadingPic] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(authUser?.profilePic || "");

  const { mutate: updatePicMutation } = useMutation({
    mutationFn: updateProfilePic,
    onSuccess: (data) => {
      setProfilePicPreview(data.profilePic);
      setUploadingPic(false);
      toast.success("Profile picture updated!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      setUploadingPic(false);
      toast.error(error.response?.data?.message || "Upload failed");
    },
  });

  const getProfilePicUrl = (pic) => {
    if (!pic || pic === "") return "https://via.placeholder.com/150/4285F4/FFFFFF?text=👤";
    if (pic.startsWith("http")) return pic;
    return `http://localhost:5001${pic}`;
  };

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploadingPic(true);
    const formData = new FormData();
    formData.append('profilePic', file);
    updatePicMutation(formData);
  }, [updatePicMutation]);

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link to="/" className="btn btn-ghost inline-flex items-center gap-2">
          <ShipWheelIcon className="size-5" />
          Back to Home
        </Link>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center p-8 space-y-6">
            <div className="relative">
              <div className="w-48 h-48 rounded-full mx-auto overflow-hidden ring-4 ring-primary/20 shadow-2xl">
                <img
                  src={getProfilePicUrl(profilePicPreview || authUser?.profilePic)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -inset-2 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 -top-2 -left-2">
                <label className="btn btn-primary px-6 py-2 gap-2 cursor-pointer">
                  <UploadIcon className="size-5" />
                  Change Photo
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingPic}
                  />
                </label>
              </div>

              {uploadingPic && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-full">
                  <span className="loading loading-spinner loading-lg" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{authUser?.fullName}</h2>
              <p className="text-sm opacity-70">{authUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
