import UploadZone from "@/components/dashboard/UploadZone";

export default function DashboardUpload() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Remove Background</h1>
        <p className="text-muted-foreground text-sm mt-1">Upload an image to get started</p>
      </div>
      <UploadZone />
    </div>
  );
}

