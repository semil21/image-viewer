import { ToastContainer, toast } from "react-toastify";

export const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        toast.error("Failed to download image.");
    }
};