"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { apiPost } from "@/src/services/ApiService";
import { useSnackbar } from "notistack";

interface ContactFormData {
    full_name: string;
    email: string;
    contact_number: string;
    subject: string;
    message: string;
}

const ContactUsPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        full_name: "",
        email: "",
        contact_number: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setImageFile(null);
            setImagePreview(null);
            return;
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!validTypes.includes(file.type)) {
            enqueueSnackbar("Only JPG, JPEG, and PNG images are allowed.", {
                variant: "info",
            });
            return;
        }

        // Validate file size (2 MB = 2 * 1024 * 1024 bytes)
        if (file.size > 2 * 1024 * 1024) {
            enqueueSnackbar("Image must be smaller than 2 MB.", {
                variant: "info",
            });
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Use FormData to send files + text
            const payload = new FormData();
            payload.append("full_name", formData.full_name);
            payload.append("email", formData.email);
            payload.append("contact_number", formData.contact_number);
            payload.append("subject", formData.subject);
            payload.append("message", formData.message);
            if (imageFile) {
                payload.append("image", imageFile);
            }

            const res = await apiPost("/api/base/contact-requests/", payload);
            console.log(res, "submit form");

            // Reset form
            setFormData({
                full_name: "",
                email: "",
                contact_number: "",
                subject: "",
                message: "",
            });
            setImageFile(null);
            setImagePreview(null);

            enqueueSnackbar(
                "Form submitted successfully. We will resolve your query soon.",
                { variant: "success" }
            );
        } catch (error) {
            console.error("Error submitting form:", error);
            enqueueSnackbar("Failed to submit the form. Please try again.", {
                variant: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clean up object URL on unmount or when preview changes
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 shadow-lg rounded-xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg w-full"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg w-full"
                        required
                    />
                </div>
                <input
                    type="tel"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg w-full"
                    required
                />
                <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                >
                    <option value="">Select a subject</option>
                    <option value="payment_issue">Payment Issue</option>
                    <option value="technical_support">Technical Support</option>
                    <option value="general_inquiry">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                </select>
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg w-full h-32"
                    required
                />

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Attach Screenshot (Optional, max 2 MB, JPG/PNG only)
                    </label>
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1 text-left">
                                Preview:
                            </p>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-full max-h-40 object-contain border rounded"
                            />
                        </div>
                    )}
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ContactUsPage;
