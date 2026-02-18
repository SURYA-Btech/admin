"use client";
import { useState, ChangeEvent, FormEvent, SyntheticEvent } from "react";
import Navbar from "../components/Navbar";
import StorageIcon from "@mui/icons-material/Storage";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LabelIcon from "@mui/icons-material/Label";
import ScienceIcon from "@mui/icons-material/Science";
import WcIcon from "@mui/icons-material/Wc";
import TimelineIcon from "@mui/icons-material/Timeline";
import LandscapeIcon from "@mui/icons-material/Landscape";
import DevicesIcon from "@mui/icons-material/Devices";
import PlaceIcon from "@mui/icons-material/Place";
import CollectionsIcon from "@mui/icons-material/Collections";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Snackbar from "@mui/material/Snackbar";

interface Dataset {
  name: string;
  uploader: string;
  uploadDate: string;
  species: string;
  type: string;
  status: string;
  location: string;
  size: string;
  fileFormat: string;
  downloads: number;
  details?: Record<string, string>;
}

interface OtolithForm {
  otolithID: string;
  scientificName: string;
  sex: string;
  lifeStage: string;
  habitat: string;
  platform: string;
  stationID: string;
  collectionMethod: string;
  collectionDate: string;
  decimalLatitude: string;
  decimalLongitude: string;
  locality: string;
  collectionDepth: string;
  stationDepth: string;
  submittedBy: string;
}

interface LifeHistoryForm {
  scientificName: string;
  commonName: string;
  family: string;
  order: string;
  genus: string;
  species: string;
  standardLength: string;
  totalLength: string;
  weight: string;
  sex: string;
  uploadedBy: string;
  uploadDate: string;
}

interface TaxonomyForm {
  scientificName: string;
  commonName: string;
  family: string;
  order: string;
  genus: string;
  species: string;
}

interface EdnaForm {
  species: string;
  commonName: string;
  readCount: string;
  percentage: string;
  abundance: string;
}

export default function DatasetManagementPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      name: "Pacific Kelp Forest eDNA 2024",
      uploader: "Dr. Sarah Chen",
      uploadDate: "2024-09-20",
      species: "Macrocytis pyrifera, Strongylocentrotus purpuratus +1 more",
      type: "eDNA",
      status: "Active",
      location: "Monterey Bay, CA",
      size: "2.3 GB",
      fileFormat: "FASTQ",
      downloads: 23,
    },
    {
      name: "Atlantic Cod Otolith Collection",
      uploader: "Dr. James Wilson",
      uploadDate: "2024-09-18",
      species: "Gadus morhua",
      type: "Otolith",
      status: "Active",
      location: "North Atlantic",
      size: "5.7 GB",
      fileFormat: "TIFF/CSV",
      downloads: 15,
    },
    {
      name: "Gulf Stream Temperature Data",
      uploader: "Emma Thompson",
      uploadDate: "2024-09-15",
      species: "",
      type: "Ocean Data",
      status: "Processing",
      location: "Gulf Stream",
      size: "890 MB",
      fileFormat: "NetCDF",
      downloads: 8,
    },
    {
      name: "Coral Reef Fish Traits Database",
      uploader: "Alex Rivera",
      uploadDate: "2024-09-10",
      species: "Chaetodon auriga, Pomacanthus imperator +1 more",
      type: "Life History Traits",
      status: "Active",
      location: "Great Barrier Reef",
      size: "45 MB",
      fileFormat: "CSV",
      downloads: 31,
    },
  ]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [fileFormatFilter, setFileFormatFilter] = useState("All");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const [otolithForm, setOtolithForm] = useState<OtolithForm>({
    otolithID: "",
    scientificName: "",
    sex: "",
    lifeStage: "",
    habitat: "",
    platform: "",
    stationID: "",
    collectionMethod: "",
    collectionDate: "",
    decimalLatitude: "",
    decimalLongitude: "",
    locality: "",
    collectionDepth: "",
    stationDepth: "",
    submittedBy: "",
  });

  const [lifeHistoryForm, setLifeHistoryForm] = useState<LifeHistoryForm>({
    scientificName: "",
    commonName: "",
    family: "",
    order: "",
    genus: "",
    species: "",
    standardLength: "",
    totalLength: "",
    weight: "",
    sex: "",
    uploadedBy: "Admin",
    uploadDate: new Date().toISOString().slice(0, 10),
  });

  const [taxonomyForm, setTaxonomyForm] = useState<TaxonomyForm>({
    scientificName: "",
    commonName: "",
    family: "",
    order: "",
    genus: "",
    species: "",
  });

  const [ednaForm, setEdnaForm] = useState<EdnaForm>({
    species: "",
    commonName: "",
    readCount: "",
    percentage: "",
    abundance: "",
  });

  const openModal = () => {
    setUploadModalOpen(true);
    setUploadType("");
    setUploadFile(null);
    setStep(1);
    setFileFormatFilter("All");
    setOtolithForm({
      otolithID: "",
      scientificName: "",
      sex: "",
      lifeStage: "",
      habitat: "",
      platform: "",
      stationID: "",
      collectionMethod: "",
      collectionDate: "",
      decimalLatitude: "",
      decimalLongitude: "",
      locality: "",
      collectionDepth: "",
      stationDepth: "",
      submittedBy: "",
    });
    setLifeHistoryForm({
      scientificName: "",
      commonName: "",
      family: "",
      order: "",
      genus: "",
      species: "",
      standardLength: "",
      totalLength: "",
      weight: "",
      sex: "",
      uploadedBy: "Admin",
      uploadDate: new Date().toISOString().slice(0, 10),
    });
    setTaxonomyForm({
      scientificName: "",
      commonName: "",
      family: "",
      order: "",
      genus: "",
      species: "",
    });
    setEdnaForm({
      species: "",
      commonName: "",
      readCount: "",
      percentage: "",
      abundance: "",
    });
  };

  const closeModal = () => {
    setUploadModalOpen(false);
    setUploadType("");
    setUploadFile(null);
    setStep(1);
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUploadType(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleOtolithInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOtolithForm((prev) => ({ ...prev, [name]: value }));
  };

  /*
  const handleLifeHistoryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLifeHistoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaxonomyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxonomyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdnaInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEdnaForm((prev) => ({ ...prev, [name]: value }));
  };
  */

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024,
      sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  const submitOtolithForm = (e: FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }
    if (!otolithForm.otolithID || !otolithForm.scientificName) {
      alert("Please fill required fields.");
      return;
    }
    const newDataset: Dataset = {
      name: uploadFile.name,
      uploader: otolithForm.submittedBy || "Unknown",
      uploadDate: new Date().toISOString().slice(0, 10),
      species: otolithForm.scientificName || "",
      type: "Otolith",
      status: "Active",
      size: formatBytes(uploadFile.size),
      fileFormat: uploadFile.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
      downloads: 0,
      location: otolithForm.locality || "Unknown",
      details: { ...otolithForm },
    };
    setDatasets((prev) => [newDataset, ...prev]);
    closeModal();
    setSnackbarOpen(true);
  };

  /* Unused submit handlers removed */

  const filteredDatasets =
    fileFormatFilter === "All"
      ? datasets
      : datasets.filter((d) => d.fileFormat.toLowerCase() === fileFormatFilter.toLowerCase());

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="sticky top-0 h-screen bg-[#fafcff] text-white">
        <Navbar />
      </div>
      <div className="flex-1 p-10 overflow-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Dataset Management</h1>
          <p className="text-gray-500 mt-1">Manage marine research datasets, monitor usage, and control access permissions.</p>
        </div>
        <div className="flex flex-1 items-center mb-4 gap-3 flex-wrap">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl shadow-inner">
            <SearchIcon className="text-gray-400 mr-2" />
            <input type="text" placeholder="Search datasets..." className="bg-transparent outline-none text-gray-700 w-40 sm:w-60" />
          </div>
          <select
            value={fileFormatFilter}
            onChange={(e) => setFileFormatFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 outline-none"
          >
            <option value="All">All Formats</option>
            {[...new Set(datasets.map((d) => d.fileFormat))].map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt}
              </option>
            ))}
          </select>
          <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Processing</option>
          </select>
          <button
            onClick={openModal}
            className="ml-auto bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 shadow hover:from-blue-700 hover:to-teal-600 transition"
          >
            <CloudUploadIcon fontSize="small" /> Upload Dataset
          </button>
        </div>
        <div className="bg-white shadow rounded-2xl px-6 py-7">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-3">
            <StorageIcon className="text-blue-600" /> Dataset Repository
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-100 text-sm">
                <th className="pb-3 font-semibold">Dataset</th>
                <th className="pb-3 font-semibold">Upload Date</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Location</th>
                <th className="pb-3 font-semibold">Size</th>
                <th className="pb-3 font-semibold">Downloads</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredDatasets.map((d, i) => (
                <tr key={i} className="border-b last:border-none border-gray-100 hover:bg-blue-50 transition">
                  <td className="py-5 min-w-[200px]">
                    <div className="font-semibold text-slate-800 mb-0.5">{d.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">by {d.uploader}</div>
                    {d.species && <div className="text-xs text-gray-400 mt-1">Species: {d.species}</div>}
                  </td>
                  <td className="py-5 text-gray-600 text-sm">{d.uploadDate}</td>
                  <td>
                    <Tag type={d.type} />
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${d.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <span className="flex gap-1 items-center text-sm text-gray-500">
                      <LocationOnIcon fontSize="small" /> {d.location}
                    </span>
                  </td>
                  <td>
                    <div className="font-semibold text-slate-800">{d.size}</div>
                    <div className="text-xs text-gray-400">{d.fileFormat}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-blue-600 font-semibold">
                      <ArrowDownwardIcon fontSize="small" />
                      {d.downloads}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="bg-gray-100 text-gray-600 rounded-full p-1.5 hover:bg-gray-200 transition"
                        title="View"
                      >
                        <VisibilityIcon fontSize="small" />
                      </button>
                      <button
                        className="bg-blue-100 text-blue-600 rounded-full p-1.5 hover:bg-blue-200 transition"
                        title="Download"
                      >
                        <DownloadIcon fontSize="small" />
                      </button>
                      <button
                        className="bg-red-100 text-red-600 rounded-full p-1.5 hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal open={uploadModalOpen} onClose={closeModal}>
          {!uploadType && (
            <>
              <h3 className="text-xl font-semibold mb-4 bg-blue-100 p-3 rounded text-black">Select Dataset Type to Upload</h3>
              <select
                value={uploadType}
                onChange={handleUploadTypeChange}
                className="w-full border border-gray-300 rounded-md p-2 mb-6 text-black"
                autoFocus
              >
                <option value="">-- Select Type --</option>
                <option value="Otolith">Otolith</option>
                <option value="eDNA">eDNA</option>
                <option value="Ocean Data">Ocean Data</option>
                <option value="Life History Traits">Life History Traits</option>
                <option value="Taxonomy">Taxonomy</option>
              </select>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-black"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
          {uploadType === "Otolith" && (
            <form onSubmit={submitOtolithForm} className="text-black">
              <h3 className="text-xl font-semibold mb-2">Upload Otolith Dataset</h3>
              <div className="mb-4 font-semibold">Step {step} of 3</div>
              {step === 1 && (
                <>
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <LabelIcon fontSize="small" />
                    Otolith ID
                  </label>
                  <input
                    name="otolithID"
                    placeholder="Otolith ID"
                    value={otolithForm.otolithID}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <ScienceIcon fontSize="small" />
                    Scientific Name
                  </label>
                  <input
                    name="scientificName"
                    placeholder="Scientific Name"
                    value={otolithForm.scientificName}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2 italic"
                    required
                  />
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <WcIcon fontSize="small" />
                    Sex
                  </label>
                  <input
                    name="sex"
                    placeholder="Sex"
                    value={otolithForm.sex}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                </>
              )}
              {step === 2 && (
                <>
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <TimelineIcon fontSize="small" />
                    Life Stage
                  </label>
                  <input
                    name="lifeStage"
                    placeholder="Life Stage"
                    value={otolithForm.lifeStage}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <LandscapeIcon fontSize="small" />
                    Habitat
                  </label>
                  <input
                    name="habitat"
                    placeholder="Habitat"
                    value={otolithForm.habitat}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <DevicesIcon fontSize="small" />
                    Platform
                  </label>
                  <input
                    name="platform"
                    placeholder="Platform"
                    value={otolithForm.platform}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                </>
              )}
              {step === 3 && (
                <>
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <PlaceIcon fontSize="small" />
                    Station ID
                  </label>
                  <input
                    name="stationID"
                    placeholder="Station ID"
                    value={otolithForm.stationID}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <CollectionsIcon fontSize="small" />
                    Collection Method
                  </label>
                  <input
                    name="collectionMethod"
                    placeholder="Collection Method"
                    value={otolithForm.collectionMethod}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                  <label className="flex items-center gap-2 mb-1 font-semibold">
                    <CalendarTodayIcon fontSize="small" />
                    Collection Date
                  </label>
                  <input
                    type="date"
                    name="collectionDate"
                    value={otolithForm.collectionDate}
                    onChange={handleOtolithInputChange}
                    className="block mb-3 w-full border border-gray-300 rounded-md p-2"
                  />
                  <label className="block mb-1 font-semibold">Choose Dataset File (required):</label>
                  <input type="file" onChange={handleFileChange} required className="mb-3" />
                  {uploadFile && <div className="text-green-600 font-semibold">{uploadFile.name} selected</div>}
                </>
              )}
              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-1"
                  >
                    <ChevronLeftIcon fontSize="small" /> Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                  >
                    Next <ChevronRightIcon fontSize="small" />
                  </button>
                ) : (
                  <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
                    Submit
                  </button>
                )}
              </div>
            </form>
          )}
          {/* Continue similarly for Life History Traits, Taxonomy, eDNA & Ocean Data forms */}
          {/* Omitted for brevity but following the same pattern as Otolith form */}
        </Modal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message="Dataset uploaded successfully!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </div>
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto text-black">
        {children}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

interface TagProps {
  type: string;
}

function Tag({ type }: TagProps) {
  let classes = "";
  const text = type;
  if (type === "eDNA") classes = "bg-blue-100 text-blue-700";
  else if (type === "Otolith") classes = "bg-orange-100 text-orange-600";
  else if (type === "Ocean Data") classes = "bg-teal-100 text-teal-600";
  else if (type === "Life History Traits") classes = "bg-yellow-100 text-yellow-700";
  else if (type === "Taxonomy") classes = "bg-pink-100 text-pink-700";
  else classes = "bg-gray-100 text-gray-600";
  return <span className={`px-3 py-1 text-xs rounded-full font-semibold ${classes}`}>{text}</span>;
}
