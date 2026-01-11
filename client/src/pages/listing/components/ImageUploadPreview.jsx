import React from "react";
import { ImagePlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const ImageUploadPreview = ({ images, setImages }) => {
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    

    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4">
  
        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 hover:bg-muted/20 transition-colors">
          <ImagePlus className="mb-2 h-6 w-6 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Add Image</span>
          <Input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

 
        {images.map((img, idx) => (
          <div key={idx} className="relative h-24 w-24 overflow-hidden rounded-lg border border-border">
            <img src={img.url} alt="preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-red-500 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadPreview;