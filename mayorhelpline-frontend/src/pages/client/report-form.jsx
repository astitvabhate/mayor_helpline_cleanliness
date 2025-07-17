import { useState, useEffect } from "react";
import axios from "axios";
import LocationPicker from "../../components/LocationPicker";
import { ImagePlus, MapPin, FileText } from "lucide-react";
import banner1 from '../../assets/banner/1.jpeg';
import banner2 from '../../assets/banner/2.jpeg';
import modijiImage from "../../assets/modi_boss.jpg";
import yadavjiImage from "../../assets/mohan_yadav.webp";
import mayorImage from "../../assets/images.jpeg";
import { Link } from "react-router-dom";
import videoSrc from "../../assets/video/video.mp4";




export default function ReportForm() {
  const [reportData, setReportData] = useState({
    description: "",
    location: {
      lat: null,
      lng: null,
      address: "",
      mapUrl: "",
    },
    image: null,
  });

  const images = [banner1, banner2];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReportData({ ...reportData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("description", reportData.description);
    formData.append("location", JSON.stringify(reportData.location));
    if (reportData.image) {
      formData.append("image", reportData.image);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reports", formData);
      setMessage("✅ Report submitted successfully!");
      setReportData({
        description: "",
        location: {
          lat: null,
          lng: null,
          address: "",
          mapUrl: "",
        },
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit report.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex justify-center items-start pt-10 px-4">

    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-200 space-y-6"
      encType="multipart/form-data"
    >
    <Link
      to="/"
      className="absolute top-1 left-4 text-black-600 hover:text-blue-800 transition-colors"
    >
      &larr; Back to Home
    </Link>
        <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-md border border-red-200 mb-2">
          {/* Banner Image */}
          <img
            src={images[current]}
            alt={`Banner ${current + 1}`}
            className="w-full h-full object-cover transition-opacity duration-700 ease-in-out rounded-xl"
          />

          {/* Leader Images */}
          <div className="absolute top-2 right-2 flex z-10">
            <img
              src={modijiImage}
              alt="Modiji"
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border-4 border-white shadow-md"
            />
            <img
              src={yadavjiImage}
              alt="Yadavji"
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border-4 border-white shadow-md"
            />
            <img
              src={mayorImage}
              alt="Mayor"
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>
        
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mt-5">
            Report Cleanliness Issue
          </h2>
        
      <p className="text-sm text-gray-500 text-center">
            Help us keep your city clean. Describe the issue and drop a pin!
      </p>

      {/* Description */}
      <div className="space-y-2">
        {/* Heading and Subtext */}
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-800">📝 Describe Your Issue</h1>
          <p className="text-sm text-gray-500">
            Briefly explain what the cleanliness issue is.
          </p>
        </div>

        {/* Input Field with Icon */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 ring-blue-400 transition-all duration-200">
          <FileText className="text-blue-500 w-5 h-5" />
          <input
            type="text"
            name="description"
            placeholder="E.g. Garbage pile near the street light..."
            value={reportData.description}
            onChange={handleChange}
            required
            className="w-full bg-transparent text-gray-700 outline-none placeholder-gray-400"
          />
        </div>
      </div>


      {/* Location Picker */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
          <MapPin className="w-4 h-4" /> Pick Location:
        </label>

        <LocationPicker
          onLocationSelect={({ lat, lng, address }) => {
            setReportData((prev) => ({
              ...prev,
              location: {
                lat,
                lng,
                address,
                mapUrl: `https://www.google.com/maps?q=${lat},${lng}`,
              },
            }));
          }}
        />

        {reportData.location.address && (
          <p className="text-sm text-blue-600 mt-2 font-medium">
            📍 {reportData.location.address}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <ImagePlus className="w-4 h-4" /> Upload Image:
        </label>
        <p className="text-xs mt-2 text-red-600 font-semibold mb-2">
        ⚠️ Note: Only images with GPS location (Geo-Tag Images) will be accepted. Reports without geotagged photos may be rejected.
      </p>
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer text-gray-500"
        >
          {reportData.image ? (
            <span className="text-sm font-medium">
              📎 {reportData.image.name}
            </span>
          ) : (
            <span className="text-sm">Click to select an image (optional)</span>
          )}
        </label>

        

        <input
          id="image-upload"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {preview && (
          <div className="mt-3">
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-lg border border-gray-300 shadow-md"
            />
          </div>
        )}
           <div className="w-full aspect-[9/16] max-w-xs mx-auto mt-6 overflow-hidden rounded-xl shadow-lg border border-emerald-200">
  <video
    src={videoSrc}
    autoPlay
    controls
    className="w-full h-full object-cover rounded-xl"
  />
</div>
      </div>



      {/* Footer */}
      {message && (
        <p className="text-center text-sm font-semibold text-gray-800 mt-4">
          {message}
        </p>
        
      )}
    </form>

    

    {/* Floating Submit FAB */}
    <button
      type="submit"
      disabled={loading}
      onClick={handleSubmit}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl text-base font-semibold transition hover:scale-105 active:scale-95"
    >
      {loading ? "Submitting..." : "Submit Report"}
    </button>
    <Link
      to="/"
      className="fixed bottom-6 left-6 bg-green-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full shadow-lg text-sm font-medium transition hover:scale-105 active:scale-95"
    >
      🏠 Home
    </Link>
  </div>
);
}