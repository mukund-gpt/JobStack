import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { baseUrl } from "@/utils/baseUrl";
import { setUser } from "@/redux/authSlice";

const EditProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    profile: "",
    profilePreview: user?.profile?.profilePic || "",
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.join(",") || "",
    resume: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^[0-9]{0,10}$/.test(value)) {
        setError("Phone number must contain only digits.");
      } else if (value.length !== 10) {
        setError("Phone number must be exactly 10 digits.");
      } else {
        setError("");
      }
    }
    setInput({ ...input, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (!selectedFiles.length) return;
    const selectedFile = selectedFiles[0];

    // File validation
    if (name === "profile") {
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(selectedFile.type)) {
        toast.error("Invalid format! Use JPG, JPEG, or PNG.");
        return;
      }
      if (selectedFile.size > 1 * 1024 * 1024) {
        toast.error("Profile picture must be under 1MB.");
        return;
      }

      setInput((prev) => ({
        ...prev,
        profile: selectedFile,
        profilePreview: URL.createObjectURL(selectedFile),
      }));
    }

    if (name === "resume") {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Invalid resume format! Only PDFs are allowed.");
        return;
      }
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error("Resume file must be under 2MB.");
        return;
      }

      setInput((prev) => ({
        ...prev,
        resume: selectedFile,
      }));
    }
  };

  const handleSubmit = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phone", input.phone);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.profile) formData.append("profile", input.profile);
    if (input.resume) formData.append("resume", input.resume);
    console.log(input);
    console.log([...formData]);

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/user/profile`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      console.log(res);

      const data = await res.json();
      console.log(data);

      if (data.success) {
        dispatch(setUser(data.user));
        setOpen(false);
        toast.success(data.message);
      } else {
        toast.error(`update failed: ${data.message}`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="w-[95vw] sm:max-w-[500px] min-w-[350px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="mx-auto text-xl font-semibold">
              Edit profile
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {input.profilePreview && (
              <div className="flex justify-center">
                <img
                  src={input.profilePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profile" className="text-right">
                Profile
              </Label>
              <Input
                id="profile"
                name="profile"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Full name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={input.phone}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm ml-8 text-bold text-center">
                  {error}
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                type="text"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                type="text"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button>
                <Loader className="w-6 h-6" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Save changes</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
