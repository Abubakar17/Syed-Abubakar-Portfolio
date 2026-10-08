// Single source of truth for every fact on the site.
// Sources: the CV (public/CV_SyedMuhammadAbubakar.pdf), the DeepDive manuscript
// (github.com/Abubakar17/FYP-reports-Fish-Biomass-Estimation) and the
// lidar_pose_estimation repository (README + model/outputs/metrics.json).
// Strings wrapped in TODO() render as visible placeholders until confirmed.

export const TODO = (text) => ({ todo: text });

const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Syed Muhammad Abubakar",
  shortName: "Syed M. Abubakar",
  role: "ML & Computer Vision Engineer",
  location: "Genoa, Italy",
  email: "syedabubakar03@yahoo.com",
  github: "https://github.com/Abubakar17",
  linkedin: "https://www.linkedin.com/in/s-m-abubakar/",
  cv: `${base}CV_SyedMuhammadAbubakar.pdf`,
  seeking: {
    headline: "Open to a master's thesis internship",
    role: "ML / computer vision engineer",
    focus: "perception · 3D vision · label-efficient learning",
  },
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

// Employer line in the hero; `strong` gets the most visual weight.
export const employers = [
  { name: "Google", role: "Data Center Technician Intern, 2026", strong: true },
  { name: "Dcube Technologies", role: "Machine Learning Engineer, 2024–25" },
  { name: "ARS Corp. · METI Japan", role: "AI/IT Intern, 2024" },
];

// Credential strip under the hero. Project results live on the project cards instead.
export const proof = [
  {
    value: "Google",
    label: "Data Center Technician Intern · Belgium · Summer 2026",
    href: "#experience",
    highlight: true,
  },
  {
    value: "2 manuscripts",
    label: "MICCAI 2025 (lead author) and ICES J. Marine Science, both submitted",
    href: "#research",
  },
  {
    value: "Erasmus Mundus",
    label: "fully funded scholar, European Master in Sustainable Systems Engineering",
    href: "#education",
  },
  {
    value: "METI Japan",
    label: "only Pakistani selected from 15,000 applicants for the AI/IT internship",
    href: "#experience",
  },
];

// Project cards on the home page; each opens its case-study page at #/<route>.
export const caseCards = [
  {
    route: "deepdive",
    kicker: "Flagship · Computer vision research",
    title: "DeepDive: fish biomass from one underwater camera",
    metric: "97.5%",
    metricLabel: "detection F1 on LifeCLEF 2015",
    summary: "Detect, track and measure fish in monocular reef video, then estimate biomass per species.",
    role: "Depth stage · co-author",
    chain: ["video", "FCE + YOLOv8", "tracking", "depth", "length → mass"],
  },
  {
    route: "aal",
    kicker: "Lead author · Medical imaging",
    title: "Agentic Active Learning for dental X-rays",
    metric: "20–30%",
    metricLabel: "less labelled data for full-data performance",
    summary: "A vision-language agent describes each X-ray; text and image features decide what a dentist labels next.",
    role: "Lead author · MICCAI 2025 submission",
    chain: ["X-ray", "Qwen2-VL text", "YOLOv11 features", "core-set", "dentist"],
  },
  {
    route: "lidar",
    kicker: "Robotics perception",
    title: "6-DoF object pose from a single 2D LiDAR",
    metric: "2.0 mm · 0.68°",
    metricLabel: "mean position / angular error",
    summary: "A conveyor turns a 2D LiDAR into a 3D scanner; a 28 KB network regresses pose on a Jetson.",
    role: "ML model + Jetson deployment",
    chain: ["2D LiDAR", "15 slices", "MLP", "ONNX on Jetson"],
  },
];

/* ------------------------------------------------------------------ */
/* Flagship: DeepDive                                                  */
/* ------------------------------------------------------------------ */

const fishRepo = "https://github.com/Abubakar17/FYP-reports-Fish-Biomass-Estimation";

export const deepdive = {
  id: "deepdive",
  route: "deepdive",
  kicker: "Flagship · Research",
  title: "DeepDive: fish biomass from a single underwater camera",
  meta: [
    "OPTIMAL Lab, NUST × Machine Vision Group, UWA",
    "2023 – 2024",
    "Co-author, 2nd of 4",
  ],
  problem:
    "Estimating fish biomass needs fish size, and size normally needs stereo cameras to recover depth. Most underwater footage in the world is monocular, low-resolution and hostile: murky water, moving coral, light beams and fish that blend into the reef.",
  why:
    "Biomass is how fisheries and conservationists track the health of a stock. Measuring it from existing single-camera archives avoids expensive stereo rigs and avoids pulling live fish out of the water to weigh them.",
  approach:
    "A hierarchical pipeline that fuses a temporal motion model with a spatial detector, tracks every fish, and turns a learned depth map into a physical length and mass. Select a stage to see how it works.",
  // Pipeline graph. `lane`/`col` place nodes on the desktop diagram.
  stages: [
    {
      id: "video",
      step: "0",
      name: "Monocular video",
      short: "Input",
      col: 1,
      lane: "all",
      what: "Single-camera RGB video from fixed reef cameras: no stereo pair and no depth sensor.",
      details: [
        "LifeCLEF 2015 · 93 videos · 15 coral-reef species",
        "19,583 annotated boxes over ~14,000 frames",
        "640×480 and 320×240, with blur and compression noise",
      ],
      why: "The data most marine surveys actually have, rather than the data a method would like.",
    },
    {
      id: "fce",
      step: "1a",
      name: "Foreground change estimator",
      short: "FCE · motion",
      col: 2,
      lane: 1,
      novel: true,
      what: "Each pixel is modelled as a mixture of Gaussians over time. Pixels that leave their background distribution become fast-moving fish candidates.",
      details: [
        "20 Gaussians per pixel, weights fitted with EM",
        "Background ratio 0.7 · variance threshold 127",
        "Filters swaying plants and light flicker",
      ],
      why: "Catches blurred, camouflaged fish that have no clear texture for a frame detector to see.",
    },
    {
      id: "yolo",
      step: "1b",
      name: "YOLOv8 detector + classifier",
      short: "YOLOv8 · appearance",
      col: 2,
      lane: 2,
      what: "A YOLOv8 detector localises fish and classifies them into 15 species. Its boxes are fused with the FCE candidates.",
      details: [
        "500 epochs · 640×480 · HSV, mosaic and flip augmentation",
        "Fusion: union of detections; YOLO's box wins on overlap",
        "Benchmarked against ResNet, ResNeXt and MobileNetV3 backbones",
      ],
      why: "Finds the stationary fish that motion alone cannot see, so the two branches cover each other's blind spots.",
    },
    {
      id: "track",
      step: "2",
      name: "Hungarian tracker",
      short: "Tracking",
      col: 3,
      lane: "12",
      what: "Detections are matched across frames with a gated distance matrix solved by the Hungarian algorithm. Tracks expire after 15 unseen frames.",
      details: [
        "Uses frames t−1 and t+1 to reject one-frame false alarms",
        "Interpolates boxes missed in a single frame",
        "Gives every fish one ID for the whole video",
      ],
      why: "Raises precision and recall, and lets size be measured once per fish instead of once per frame.",
    },
    {
      id: "depth",
      step: "1c",
      name: "Attention U-Net depth",
      short: "Monocular depth",
      col: 2,
      lane: 3,
      novel: true,
      mine: true,
      what: "A U-Net with multi-head self-attention in every encoder block translates each RGB frame into a disparity map.",
      details: [
        "Trained from scratch on KITTI + NYU (>1.5M RGB–depth pairs)",
        "Transferred to underwater frames",
        "Depth sampled at each fish's box centre",
        "My focus: evaluating Depth Anything (foundation model) on underwater footage",
      ],
      why: "Recovers the distance to each fish, which a single camera cannot measure directly.",
    },
    {
      id: "length",
      step: "3",
      name: "Length from pixels + depth",
      short: "Length",
      col: 4,
      lane: "all",
      what: "For each track, the frame with the best side profile is selected. Pixel length is converted to centimetres using depth and a per-species scale.",
      details: [
        "Best frame = max mean of box length and diagonal",
        "length = pixel length × distance ÷ scale",
        "Scale calibrated from FishBase species averages",
      ],
      why: "Fish turn constantly. Measuring only the clearest side view avoids underestimating length.",
    },
    {
      id: "mass",
      step: "4",
      name: "Mass and biomass",
      short: "Biomass",
      col: 5,
      lane: "all",
      what: "Mass comes from the species' length–weight relation, W = a·Lᵇ, and biomass is aggregated per species from fish counts.",
      details: [
        "a, b: species-specific regression constants",
        "Biomass = fish count × mass, per species",
        "Reported for 14 annotated species",
      ],
      why: "Produces the number an ecologist actually needs, from footage that already exists.",
    },
  ],
  // Detection F1 on LifeCLEF 2015 (manuscript, Table 4).
  comparison: [
    { method: "AlexNet", f1: 0.74 },
    { method: "FishNet", f1: 0.804 },
    { method: "Image enhancement + Cascade R-CNN", f1: 0.817 },
    { method: "GoogleNet", f1: 0.84 },
    { method: "GMM + optical flow", f1: 0.843 },
    { method: "GMM + optical flow + YOLOv3", f1: 0.954 },
    { method: "DeepDive (YOLOv8 + FCE)", f1: 0.975, ours: true },
  ],
  results: [
    { value: "97.5%", label: "detection F1", note: "precision 96.5 · recall 95.9" },
    { value: "96.3%", label: "species accuracy", note: "across 14 annotated species" },
    { value: "5.69 cm", label: "length RMSE", note: "vs. FishBase ranges · SD 3.27" },
  ],
  limitation:
    "LifeCLEF has no per-fish length ground truth, so length is validated against FishBase species ranges. A dataset with measured fish is the obvious next step for validating the whole pipeline.",
  contribution:
    "I worked on the depth stage, the step that turns a single camera into distance-to-fish. My main focus was monocular depth with Depth Anything, a foundation model for depth estimation, tested on murky, low-resolution reef footage it was never trained on.",
  figures: {
    tracking: {
      alt: "Three consecutive underwater frames of one tracked fish with its bounding box and path, above the matching depth maps from the U-Net.",
      caption:
        "One fish tracked across three frames, with depth maps below. The middle frame has the cleanest side profile, so only it is used to measure length.",
    },
    compare: {
      alt: "Two rows of reef frames in four columns: ground truth, FCE, YOLOv8 and the fused result. YOLOv8 misses camouflaged fish that FCE finds.",
      caption:
        "Ground truth · FCE · YOLOv8 · fused. YOLOv8 alone misses fish that blend into the coral; the motion branch recovers them.",
    },
  },
  stack: ["Python", "PyTorch", "YOLOv8", "OpenCV", "U-Net + attention", "Hungarian tracking", "GMM"],
  links: [
    { label: "Manuscript (PDF)", href: `${fishRepo}/blob/main/ICESJMS_2024a_compressed.pdf` },
    { label: "Demo video", href: `${fishRepo}/blob/main/fyp%20demo%20upload%20final.mp4` },
    { label: "Poster", href: `${fishRepo}/blob/main/FYP%20POSTER%20FINAL.pdf` },
    { label: "Repository", href: fishRepo },
  ],
};

/* ------------------------------------------------------------------ */
/* Featured: LiDAR 6-DoF pose                                          */
/* ------------------------------------------------------------------ */

export const lidar = {
  id: "lidar-pose",
  route: "lidar",
  kicker: "Featured · Robotics perception",
  title: "6-DoF object pose from a single 2D LiDAR",
  meta: ["Master's team project (5), UTC Compiègne", "Sep 2025 – Jan 2026"],
  problem:
    "Recover the full position and orientation (x, y, z, roll, pitch, yaw) of an object on a conveyor using one low-cost 2D LiDAR, with no camera.",
  approach:
    "The LiDAR is mounted vertically and the conveyor turns it into a 3D scanner: a servo advances the object 1 cm per slice, and a small network regresses the pose from per-slice statistics. Everything runs as ROS 2 nodes on a Jetson Orin Nano.",
  pipeline: [
    { name: "YDLidar G2", note: "mounted vertically" },
    { name: "Angle filter", note: "ROS 2 node" },
    { name: "15 slices", note: "servo steps 1 cm" },
    { name: "150 features", note: "10 statistics per slice" },
    { name: "MLP", note: "256-128-64-32 · PyTorch" },
    { name: "ONNX Runtime", note: "Jetson Orin Nano" },
    { name: "6-DoF pose", note: "RViz + point cloud" },
  ],
  // model/outputs/metrics.json: held-out test MAE.
  metrics: [
    { axis: "x", value: "1.48", unit: "mm" },
    { axis: "y", value: "2.65", unit: "mm" },
    { axis: "z", value: "1.86", unit: "mm" },
    { axis: "roll", value: "0.28", unit: "°" },
    { axis: "pitch", value: "0.37", unit: "°" },
    { axis: "yaw", value: "1.37", unit: "°" },
  ],
  headline: [
    { value: "2.0 mm", label: "mean position error" },
    { value: "0.68°", label: "mean angular error" },
    { value: "28 KB", label: "ONNX model" },
  ],
  note: "Held-out test MAE; 5-fold cross-validation stays within 2.1–2.5 mm. Yaw is the hardest axis (1.37°).",
  contribution:
    "I owned the ML side: the pose-regression network that maps 150 per-slice features to a 6-DoF pose, and its training and evaluation. I also optimised it for embedded inference on the Jetson Orin Nano: exported to ONNX (28 KB) and run with ONNX Runtime inside the ROS 2 pipeline.",
  figure: {
    alt: "The physical test rig: a white cube on a small tracked conveyor, a vertically mounted LiDAR on a breadboard, a Jetson Orin Nano and a monitor showing RViz.",
    caption: "The rig: conveyor, vertical LiDAR, Jetson Orin Nano and RViz.",
  },
  stack: ["ROS 2 Humble", "PyTorch", "ONNX Runtime", "Jetson Orin Nano", "Python"],
  links: [{ label: "Repository", href: "https://github.com/Abubakar17/lidar_pose_estimation" }],
};

/* ------------------------------------------------------------------ */
/* Smaller projects                                                    */
/* ------------------------------------------------------------------ */

export const moreProjects = [
  {
    title: "JARVIS: voice-driven robot teammate",
    year: "2025",
    summary:
      "AMD Robotics Hackathon, team of 2. An SO-101 arm takes spoken tool requests, releases objects only when it sees an open hand, and switches between LeRobot ACT policies trained on an AMD MI300X cluster; Llama 3.2 runs locally for conversation.",
    stack: ["LeRobot (ACT)", "SO-101 arm", "Llama 3.2", "AMD MI300X"],
    href: "https://github.com/Abubakar17/AMD_Robotics_Hackathon_2025_Jarvis",
  },
  {
    title: "ChatWithPDFs",
    year: "2024",
    summary:
      "RAG question answering over PDFs, comparing a QA chain, a chat-history variant and a retriever-based variant.",
    stack: ["LangChain", "Gemini API", "FAISS", "Streamlit"],
    href: "https://github.com/Abubakar17/Chat_With_PDFS",
  },
  {
    title: "GroupChat Karaoke",
    year: "2026",
    summary:
      "Aligns a group's separate voice notes to one song and mixes them in turns: Demucs vocal separation, chroma cross-correlation with a DTW fallback, phrase assignment and loudness-matched mixing.",
    stack: ["Demucs", "librosa", "DTW", "FastAPI"],
    href: "https://github.com/Abubakar17/karaoke",
  },
  {
    title: "Finger Magic",
    year: "2026",
    summary:
      "Real-time AR in the browser: comic-book shader filters stretched between your two hands, driven by MediaPipe hand landmarks. Pinch to stamp a frame, swipe apart to clear.",
    stack: ["MediaPipe", "WebGL2", "JavaScript"],
    href: "https://github.com/Abubakar17/spidey-cam",
  },
  {
    title: "SPLERGE table structure recognition",
    year: "2021–22",
    summary:
      "PyTorch implementation of the Split model, which predicts row and column separators in document images; 95.9% precision in table extraction.",
    stack: ["PyTorch", "Document AI"],
    href: "https://github.com/Abubakar17/splerge-abubakar",
  },
  {
    title: "Serverless text-to-audio pipeline",
    year: "2024",
    summary:
      "An asynchronous AWS pipeline that converts text posts to speech. Ingestion is decoupled from synthesis across Lambda functions, with IDs tracked in DynamoDB.",
    stack: ["AWS Lambda", "Polly", "DynamoDB", "S3"],
  },
  {
    title: "GPS tracker for the NUST shuttle",
    year: "2023",
    summary:
      "Bare-metal ATmega32A firmware that parses NMEA from a GPS module, shows position on an LCD and streams it over Bluetooth to an Android map. Team of 3.",
    stack: ["C++ (AVR)", "ATmega32A", "NMEA", "Bluetooth"],
    href: "https://github.com/Abubakar17/GPS-INTEGRATION-FOR-SHUTTLE-SERVICE",
  },
];

/* ------------------------------------------------------------------ */
/* Research                                                            */
/* ------------------------------------------------------------------ */

export const research = {
  statement:
    "I work on measuring the physical world from imperfect sensors: getting reliable geometry and counts out of monocular video, sparse LiDAR and expensive-to-label medical images.",
  interests: [
    {
      title: "Measurement under unconstrained imaging",
      text: "Monocular depth, detection and tracking when the image is murky, blurred or camouflaged.",
    },
    {
      title: "Fusing motion and appearance",
      text: "Combining temporal models (background statistics, tracks) with spatial detectors so each covers the other's failure modes.",
    },
    {
      title: "Label-efficient learning",
      text: "Active learning guided by vision-language agents, deciding which images are worth an expert's time.",
    },
    {
      title: "3D perception on low-cost hardware",
      text: "Point-cloud pose estimation and compact models deployed on edge devices.",
    },
  ],
  papers: [
    {
      authors: ["S. M. Abubakar", "et al."],
      title: "Agentic Active Learning: Agent Assisted Active Learning for Disease Detection in Panoramic Dental X-Rays",
      venue: "MICCAI 2025",
      status: "Submitted · lead author",
      year: "2025",
      summary:
        "Vision-language agents describe each X-ray in text; those descriptions are fused with image features to choose which X-rays a dentist labels next. Matches a fully supervised detector with 20–30% less labelled data.",
      links: [{ label: "Method & results", href: "#/aal" }],
    },
    {
      authors: ["U. Jalil", "S. M. Abubakar", "M. Saad", "A. Salman"],
      title: "DeepDive: On Estimating Fish Biomass Using Monocular Unconstrained Underwater Videos",
      venue: "ICES Journal of Marine Science",
      status: "Manuscript submitted · ICESJMS-2024-271",
      year: "2024",
      summary:
        "Hierarchical FCE + YOLOv8 detection, Hungarian tracking and attention U-Net depth for species-level biomass from monocular video. 97.5% detection F1 on LifeCLEF 2015.",
      links: [
        { label: "PDF", href: `${fishRepo}/blob/main/ICESJMS_2024a_compressed.pdf` },
        { label: "Case study", href: "#/deepdive" },
      ],
    },
  ],
  // Agentic Active Learning manuscript (MICCAI 2025 submission).
  aal: {
    id: "aal",
    route: "aal",
    kicker: "Lead-author research · Medical imaging",
    title: "Agentic Active Learning for dental X-rays",
    meta: ["MICCAI 2025 submission", "2025", "Lead author"],
    contribution:
      "Lead author. I led the work end to end under the supervision of university professors: agent prompting, text–image embedding fusion, the combined core-set query, and the 30-experiment evaluation.",
    problem:
      "Labelling dental X-rays needs a dentist's time. Standard active learning chooses what to label from low-level image features alone, which miss context a clinician would notice (crowns, fillings, missing teeth).",
    idea:
      "Ask a vision-language agent for generic descriptions it handles reliably, never for the diagnosis itself, which would bias selection. Fuse that text with image features and pick the most diverse X-rays to label next.",
    pipeline: [
      { name: "Panoramic X-rays", note: "DENTEX · 564 train / 141 test" },
      { name: "Text view", note: "Qwen2-VL · 3 queries → ClinicalBERT, 2304-d" },
      { name: "Image view", note: "in parallel: YOLOv11x backbone, 768-d" },
      { name: "Fused distance", note: "normalised · 0.5 text + 0.5 image" },
      { name: "Core-set pick", note: "furthest-first · +10% per round" },
      { name: "Dentist labels", note: "caries, deep caries, periapical, impacted" },
      { name: "Detector", note: "YOLOv11x, retrained each round" },
    ],
    results: [
      { value: "20–30%", label: "less labelled data", note: "to match the detector trained on 100%" },
      { value: "9.18%", label: "of agent text needed fixing", note: "dentist review of all 705 descriptions" },
      { value: "50–60 s", label: "dentist review per X-ray", note: "to correct an agent description" },
      { value: "50 / 50", label: "text–image weighting", note: "beat 60/40 and 70/30 on mAP, P, R" },
    ],
    note:
      "30 experiments comparing image-only, text-only and combined selection. The combined strategy led on mAP50, mAP50:95, precision and recall across most rounds. Because selection is driven by text, you can read why each batch was chosen. The dentist review was deliberately quick, so 9.18% is a rough estimate of agent error.",
    stack: ["Qwen2-VL", "ClinicalBERT", "YOLOv11", "PyTorch", "Core-set active learning"],
  },
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience = [
  {
    org: "Google",
    summary: "Hardware diagnosis and repair, fibre fault tracing and secure decommissioning across five data center domains.",
    role: "Data Center Technician Intern",
    period: "Jun – Sep 2026",
    place: "Belgium",
    points: [
      "Rotated through five operational domains: deployments, network delivery, interrupts, networking and data security.",
      "Diagnosed and repaired production server hardware (DIMMs, BIOS chips, QSFP optics) and traced backbone fibre faults with OTDR.",
      "Sanitised 300+ storage devices and verified live traffic before decommissioning, with zero customer impact.",
    ],
    tags: ["Server hardware", "Fibre / OTDR", "Data security"],
  },
  {
    org: "Dcube Technologies",
    summary: "Shipped GAN audio enhancement for NFL broadcasts (96% recall), LLM features and Dockerised model services; led the MICCAI paper.",
    role: "Machine Learning Engineer",
    period: "Aug 2024 – Jul 2025",
    place: "Islamabad",
    points: [
      "Built a generative-AI audio enhancement system for NFL broadcast recordings: 96% recall on audio event detection, GAN-based augmentation, real-time controls for studio engineers. Demoed to FOX Sports.",
      "Built LLM modules for the Fabric e-commerce platform: natural-language querying and automated BI summaries, fine-tuned per client.",
      "Lead author of a MICCAI 2025 submission: vision-language agents guide active learning for dental X-ray disease detection, matching full-data performance with 20–30% less labelled data.",
      "Shipped models as Dockerised FastAPI services, including an attendance system used daily by 100+ students; set up MLflow, W&B and CI/CD.",
    ],
    tags: ["PyTorch", "GANs", "LLMs", "Docker", "FastAPI", "MLflow"],
  },
  {
    org: "ARS Corporation · METI AI/IT programme",
    summary: "Serverless monitoring on AWS SAM and edge data pipelines on Raspberry Pi / Armadillo, with 99.9% remote uptime.",
    role: "AI/IT Intern",
    period: "Nov – Dec 2024",
    place: "Tokyo",
    points: [
      "Built and deployed serverless remote-monitoring applications with AWS SAM.",
      "Set up secure remote networking with ZeroTier: 99.9% uptime for remote device access.",
      "Optimised real-time data pipelines on Raspberry Pi and Armadillo G3L edge devices, with Docker-containerised configurations.",
    ],
    tags: ["AWS SAM", "Edge devices", "Docker", "ZeroTier"],
  },
  {
    org: "OPTIMAL Lab, NUST",
    summary: "DeepDive fish biomass with UWA's Machine Vision Group; I worked on monocular depth.",
    role: "Undergraduate Research Assistant",
    period: "Jun 2023 – Jun 2024",
    place: "Islamabad",
    points: [
      "DeepDive fish biomass estimation with the Machine Vision Group at UWA, funded by an Australian Government research grant.",
      "Worked on the monocular depth stage (Depth Anything); co-authored the ICES J. Marine Science manuscript (97.5% detection F1 on LifeCLEF 2015).",
    ],
    tags: ["YOLOv8", "Depth estimation", "Tracking"],
  },
  {
    org: "TUKL-NUST R&D Center",
    summary: "Table-structure recognition (95.9% precision), EEG anomaly detection and a face-recognition entry system.",
    role: "Undergraduate Research Intern",
    period: "Jun 2021 – Sep 2022",
    place: "Islamabad",
    points: [
      "Selected through a competitive programming test.",
      "Implemented SPLERGE for table structure recognition (95.9% precision) and an AlexNet + MLP EEG anomaly detector (89% accuracy).",
      "Built a real-time face-recognition entry system used daily by ~30 lab members.",
    ],
    tags: ["PyTorch", "TensorFlow", "OpenCV"],
  },
];

export const education = [
  {
    degree: "European Master in Sustainable Systems Engineering",
    note: "Erasmus Mundus scholar",
    school: "UTC Compiègne (France) → Albania → University of Genoa (Computer Engineering)",
    period: "2025 – 2027 (expected)",
    detail: "GPA 3.70/4.00 (France) · 9.41/10 (Albania) · Scientific ML, MBSE (SysML), Industrial Automation",
  },
  {
    degree: "BSc Electrical Engineering",
    note: "Distinction · CGPA 3.62/4.00",
    school: "National University of Sciences and Technology (NUST), Islamabad",
    period: "2020 – 2024",
    detail: "Thesis: fish biomass estimation in unconstrained underwater environments (DeepDive)",
  },
];

export const honors = [
  {
    year: "2026",
    title: "Data Center Technician internship",
    org: "Google, Belgium",
    detail: "Selected for a summer infrastructure internship.",
  },
  {
    year: "2025",
    title: "Erasmus Mundus Joint Master's Scholarship",
    org: "European Commission",
    detail: "Fully funded scholarship for the European Master in Sustainable Systems Engineering (EMSSE).",
  },
  {
    year: "2024",
    title: "METI AI/IT Japan Internship",
    org: "Ministry of Economy, Trade and Industry, Japan",
    detail: "Fully funded; the only Pakistani selected from a global pool of 15,000 candidates.",
  },
  {
    year: "2024",
    title: "FAST Sustainability Award",
    org: "FAST Cables Ltd",
    detail: "PKR 200,000 for the most sustainable undergraduate final-year project.",
  },
  {
    year: "2023",
    title: "Australian Government Research Grant",
    org: "OPTIMAL Lab × Machine Vision Group, University of Western Australia",
    detail: "Grant support for real-time fish biomass estimation.",
  },
  {
    year: "2020",
    title: "High Achievers Award, Gold Medal",
    org: "",
    detail: "",
  },
  {
    year: "2019",
    title: "24th National Physics Talent Contest",
    org: "STEM Careers Programme, HEC Pakistan",
    detail: "Qualified for the national contest.",
  },
  {
    year: "2018",
    title: "Distinction in O-Level Computer Science",
    org: "",
    detail: "Among the top performers in Northern Pakistan.",
  },
];

export const about = [
  "I trained as an electrical engineer at NUST, where signals, control and embedded systems taught me to think about the sensor before the model. My first ML work, at the TUKL-NUST R&D Center, was close to the signal: EEG anomalies and the structure of document images.",
  "My final-year project pulled that into computer vision: measuring fish from a single underwater camera, which became the DeepDive manuscript. At Dcube Technologies I learned the production side, shipping GANs for broadcast audio, LLM features and models behind Dockerised APIs. I also led my first paper there: using vision-language agents to decide which X-rays a dentist should label.",
  "The Erasmus Mundus master's took me to France, Albania and now Genoa, and toward robotics. In Compiègne our team turned a 2D LiDAR and a conveyor into a 6-DoF pose estimator running on a Jetson. A summer at Google's Belgian data center showed me the hardware all of this runs on.",
];

export const stack = [
  { group: "Languages", items: ["Python", "C/C++", "MATLAB", "SQL", "Bash"] },
  {
    group: "ML / deep learning",
    items: ["PyTorch", "TensorFlow / Keras", "scikit-learn", "Hugging Face Transformers", "OpenCV"],
  },
  {
    group: "Computer vision",
    items: [
      "Detection (YOLOv8, YOLOv11)",
      "Multi-object tracking",
      "Monocular depth",
      "Segmentation",
      "Point clouds",
      "Active learning",
      "MediaPipe",
    ],
  },
  {
    group: "LLMs & VLMs",
    items: [
      "Vision-language models (Qwen2-VL)",
      "ClinicalBERT",
      "LangChain",
      "RAG",
      "FAISS",
      "LoRA / PEFT fine-tuning",
      "Gemini / OpenAI APIs",
    ],
  },
  {
    group: "Robotics & edge",
    items: ["ROS 2", "LeRobot (ACT)", "Jetson Orin Nano", "ONNX Runtime", "Raspberry Pi", "LiDAR"],
  },
  {
    group: "MLOps & cloud",
    items: ["Docker", "FastAPI", "MLflow", "Weights & Biases", "CI/CD", "AWS (Lambda, S3, DynamoDB, SAM)"],
  },
  { group: "Systems", items: ["Linux / Ubuntu", "Git", "Data center hardware"] },
];
