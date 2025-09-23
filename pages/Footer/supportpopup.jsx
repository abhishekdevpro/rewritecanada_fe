import React, { useState } from "react";
import axiosInstance from "../../components/utils/axiosInstance";
import { toast } from "react-toastify";

const SupportPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    subject: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const requestData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        category: formData.category,
        subject: formData.subject,
        description: formData.description,
        lang: navigator.language || "en",
      };

      console.log("Sending support form data:", requestData);

      const response = await axiosInstance.post(
        "/api/user/support-form",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Support request submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        category: "",
        subject: "",
        description: "",
      });
      onClose(); // Optional: Close modal after success
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to submit the form.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative shadow-xl max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-mainColor">Support Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="font-semibold">First Name *</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border rounded"
                maxLength={20}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <label className="font-semibold">Last Name *</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
                maxLength={20}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="font-semibold">Email *</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              className="w-full p-2 border rounded"
              maxLength={50}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">- Select Category -</option>
              <option value="general">General Inquiry</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Subject *</label>
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Type your subject"
              className="w-full p-2 border rounded"
              maxLength={50}
            />
            {errors.subject && (
              <p className="text-red-600 text-sm">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue"
              rows="4"
              className="w-full p-2 border rounded"
              maxLength={300}
            />
            {errors.description && (
                <p className="text-red-600 text-sm">{errors.description}</p>
              )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-mainColor text-white px-6 py-2 rounded font-semibold hover:bg-green-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "SUBMIT FORM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportPopup;
