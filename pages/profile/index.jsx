import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../components/Constant/constant";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../components/utils/axiosInstance";
const ProfileForm = () => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    professional_title: "",
    languages: "",
    age: "",
    current_salary: "",
    expected_salary: "",
    description: "",
    country_id: "",
    state_id: "",
    city_id: "",
    photo: "",
    uploadPhoto: null,
    phone: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user profile
        const userProfileResponse = await axios.get(
          `${BASE_URL}/api/user/user-profile?lang=${language}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (userProfileResponse.data.status === "success") {
          const userData = userProfileResponse.data.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            professional_title: userData.professional_title || "",
            languages: userData.languages || "",
            age: userData.age || "",
            current_salary: userData.current_salary || "",
            expected_salary: userData.expected_salary || "",
            phone: userData.phone || "",
            email: userData.email || "",
            description: userData.description || "",
            country_id: userData.country_id || "",
            state_id: userData.state_id || "",
            city_id: userData.city_id || "",
            photo: userData.photo || "",
          }));

          // Fetch countries
          const countriesResponse = await axiosInstance.get(
            `/api/user/countries?lang=${language}`
          );
          if (countriesResponse.data.status === "success") {
            setCountries(countriesResponse.data.data);
          }
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (formData.country_id) {
        try {
          const token = localStorage.getItem("token");
          const response = await axiosInstance.get(
            `/api/user/stats/${formData.country_id}?lang=${language}`
          );
          if (response.data.status === "success") {
            setStates(response.data.data);
          } else if (response.data.message === "Records not found") {
            toast.error("state not availabe");
          } else {
            console.error("API Error:", response.data.message);
          }
        } catch (error) {
          console.error("Request Error:", error);
        }
      }
    };

    fetchStates();
  }, [formData.country_id]);

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state_id) {
        setLoading(true); // Set loading state to true
        try {
          const citiesResponse = await axiosInstance.get(
            `/api/user/cities/${formData.state_id}?lang=${language}`
          );

          if (citiesResponse.data.status === "success") {
            if (citiesResponse.data.message === "Records not found") {
              setCities([]); // Set cities to an empty array if no records are found
              setError("No cities found for the selected state.");
            } else {
              setCities(citiesResponse.data.data); // Set cities if data is found
              setError(null); // Clear any previous error
            }
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setError("An error occurred while fetching cities."); // Set error message
        } finally {
          setLoading(false); // Set loading to false when done
        }
      }
    };

    fetchCities();
  }, [formData.state_id]);

  const handleCountryChange = async (e) => {
    const selectedCountryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country_id: selectedCountryId,
      state_id: "",
      city_id: "",
    }));
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state_id: selectedStateId,
      city_id: "",
    }));
    setCities([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFileChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     uploadPhoto: e.target.files[0],
  //   }));
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        uploadPhoto: file,
        photo: imageUrl, // Show preview before submission
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("auth.token_missing"));
      return;
    }

    // Field validations
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.professional_title ||
      !formData.languages ||
      // !formData.age ||
      !formData.current_salary ||
      !formData.expected_salary ||
      !formData.description ||
      // !formData.country_id ||
      // !formData.state_id ||
      // !formData.city_id ||
      !formData.phone
    ) {
      toast.error(t("profile_error.all_fields_required"));
      return;
    }

    // Age validation (Must be between 18 and 100)
    // if (
    //   !/^\d+$/.test(formData.age) ||
    //   formData.age < 18 ||
    //   formData.age > 100
    // ) {
    //   toast.error(t("profile_error.invalid_age"));
    //   return;
    // }

    // Salary validation (Must be a number and positive)
    if (!/^\d+$/.test(formData.current_salary) || formData.current_salary < 0) {
      toast.error(t("profile_error.invalid_current_salary"));
      return;
    }
    if (
      !/^\d+$/.test(formData.expected_salary) ||
      formData.expected_salary < 0
    ) {
      toast.error(t("profile_error.invalid_expected_salary"));
      return;
    }

    // Phone number validation (8 to 15 digits)
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error(t("profile_error.invalid_phone"));
      return;
    }

    // File validation (Only images allowed)
    if (formData.uploadPhoto) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(formData.uploadPhoto.type)) {
        toast.error(t("profile_error.invalid_image_format"));
        return;
      }
    }

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("professional_title", formData.professional_title);
    formDataToSend.append("languages", formData.languages);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("current_salary", formData.current_salary);
    formDataToSend.append("expected_salary", formData.expected_salary);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("country_id", formData.country_id);
    formDataToSend.append("state_id", formData.state_id);
    formDataToSend.append("city_id", formData.city_id);
    formDataToSend.append("phone", formData.phone);

    if (formData.uploadPhoto) {
      formDataToSend.append("upload_photo", formData.uploadPhoto);
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/api/user/user-profile?lang=${language}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log(response.status, ">>>>response");
      if (response.status === 200) {
        toast.success(t("profile_updated"));
      } else {
        toast.error(t("profile_update_failed"), response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || t("profile.update_error"));
    }
  };

  if (isLoading) {
    return (
      <div className="p-2 md:p-6">
        <div className="text-center text-lg">{t("loading")}</div>
      </div>
    );
  }
  const handleRemovePhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/user/remove-profile-photo?lang=${language}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success(t("photo_removed"));
        setFormData((prev) => ({
          ...prev,
          photo: "", // Remove image preview
          uploadPhoto: null, // Reset selected file
        }));
      } else {
        toast.error(t("photo_remove_failed"));
      }
    } catch (error) {
      console.error("Error removing profile photo:", error);
      toast.error("An error occurred while removing the profile photo");
    }
  };

  return (
    <div className="p-2 md:p-6">
      <div className="w-full mx-auto rounded-lg shadow-lg px-4 py-2 md:p-6">
        <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
          {t("basic_information")}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative">
            {formData.photo && (
              <div className="relative">
                <img
                  src={
                    formData.uploadPhoto
                      ? URL.createObjectURL(formData.uploadPhoto)
                      : `https://api.createmyresume.in${formData.photo}`
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full border object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="border p-2 cursor-pointer bg-gray-100 rounded-md text-center"
              >
                {t("choose_file")}
              </label>
              <span className="text-gray-700 text-sm sm:ml-2 break-all">
                {formData.uploadPhoto
                  ? formData.uploadPhoto.name
                  : formData.photo
                  ? t("image_uploaded")
                  : t("no_file_chosen")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2"> {t("first_name")}*</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border p-2"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block mb-2">{t("last_name")}*</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border p-2"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block mb-2">{t("professional_title")}*</label>
              <input
                type="text"
                name="professional_title"
                value={formData.professional_title}
                onChange={handleChange}
                className="w-full border p-2"
                maxLength={100}
              />
            </div>
            <div>
              <label className="block mb-2">{t("languages")}*</label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                className="w-full border p-2"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block mb-2">{t("current_salary")} :</label>
              <input
                type="number"
                name="current_salary"
                value={formData.current_salary}
                onChange={handleChange}
                className="w-full border p-2"
                min="0"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block mb-2">{t("expected_salary")} :</label>
              <input
                type="number"
                name="expected_salary"
                value={formData.expected_salary}
                onChange={handleChange}
                className="w-full border p-2"
                min="0"
                maxLength={20}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2">{t("description")}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2"
                rows="4"
                maxLength={1000}
              />
            </div>

            <div>
              <label className="block mb-2">{t("phone_number")}</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2"
                maxLength={20}
              />
            </div>
            <div>
              <label className="block mb-2">{t("email")}</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2"
                readOnly
                maxLength={30}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white p-2 rounded"
          >
            {t("update_profile")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
