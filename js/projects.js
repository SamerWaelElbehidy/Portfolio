// ============================================================
//  PROJECTS DATA — Portfolio of 130+ Engineering Projects
// ============================================================

const CATEGORIES = [
  {
    "id": "medical",
    "name": "Medical & Healthcare",
    "icon": "🏥",
    "color": "#ff4d6d",
    "gradient": "linear-gradient(135deg, #ff4d6d, #c9184a)",
    "description": "Assistive technology, diagnostics, and patient care systems",
    "featured": true
  },
  {
    "id": "ai_ml",
    "name": "AI & Machine Learning",
    "icon": "🤖",
    "color": "#7c3aed",
    "gradient": "linear-gradient(135deg, #7c3aed, #4c1d95)",
    "description": "Deep learning, CNNs, and intelligent prediction systems",
    "featured": true
  },
  {
    "id": "agriculture",
    "name": "Agriculture & Environment",
    "icon": "🌱",
    "color": "#16a34a",
    "gradient": "linear-gradient(135deg, #16a34a, #14532d)",
    "description": "Smart farming, irrigation, and environmental monitoring",
    "featured": false
  },
  {
    "id": "smart_home",
    "name": "Smart Home & IoT",
    "icon": "🏠",
    "color": "#0ea5e9",
    "gradient": "linear-gradient(135deg, #0ea5e9, #075985)",
    "description": "Intelligent automation, sensors, and connected systems",
    "featured": true
  },
  {
    "id": "robotics",
    "name": "Robotics & Vehicles",
    "icon": "🚗",
    "color": "#f97316",
    "gradient": "linear-gradient(135deg, #f97316, #c2410c)",
    "description": "Autonomous vehicles, robots, and embedded motor control",
    "featured": true
  },
  {
    "id": "vr_games",
    "name": "VR & Simulation",
    "icon": "🥽",
    "color": "#06b6d4",
    "gradient": "linear-gradient(135deg, #06b6d4, #0e7490)",
    "description": "Virtual reality, Unity simulations, and interactive games",
    "featured": false
  },
  {
    "id": "speech_vision",
    "name": "Speech & Computer Vision",
    "icon": "🎤",
    "color": "#eab308",
    "gradient": "linear-gradient(135deg, #eab308, #713f12)",
    "description": "Voice assistants, emotion recognition, and gaze tracking",
    "featured": false
  },
  {
    "id": "hardware",
    "name": "Hardware & Electronics",
    "icon": "🔧",
    "color": "#94a3b8",
    "gradient": "linear-gradient(135deg, #94a3b8, #334155)",
    "description": "Microcontrollers, sensors, displays, and embedded systems",
    "featured": false
  },
  {
    "id": "web_apps",
    "name": "Web & Applications",
    "icon": "🌐",
    "color": "#14b8a6",
    "gradient": "linear-gradient(135deg, #14b8a6, #0f766e)",
    "description": "Web platforms, dashboards, and mobile applications",
    "featured": false
  }
];

const PROJECTS = [
  {
    "id": "small_wheelchair",
    "name": "Smart Wheelchair System",
    "category": "medical",
    "featured": true,
    "tags": [
      "Raspberry Pi",
      "Python",
      "OpenCV",
      "Arduino",
      "gaze tracking",
      "voice control",
      "Firebase",
      "ESP32",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Multi-modal wheelchair controlled by eyes, voice, and joystick",
    "fullDesc": "A sophisticated multi-modal wheelchair control system integrating gaze tracking, voice commands (Speech-to-Text), joystick input, and a mobile app. The system runs on a Raspberry Pi and communicates via serial with an Arduino Nano for motor control.\n\nThe architecture uses a master integration script that coordinates between all input modalities with priority-based switching. Firebase Realtime Database is used for cloud connectivity, while the mobile app provides remote monitoring.",
    "howItWorks": [
      "Raspberry Pi runs OpenCV-based gaze tracking to detect eye direction",
      "Whisper STT processes voice commands for hands-free operation",
      "Arduino Nano receives serial commands and drives L298N motor controllers",
      "Firebase syncs state between Pi, mobile app, and ESP32 module",
      "Priority system: Voice > Gaze > Joystick > App control"
    ],
    "codeSnippet": "# Priority-based input handler\nclass WheelchairController:\n    def get_direction(self):\n        if self.voice_active:\n            return self.voice_direction\n        elif self.gaze_active:\n            return self.gaze_direction\n        elif self.joystick_active:\n            return self.joystick_direction\n        return \"STOP\"\n    \n    def send_to_arduino(self, direction):\n        cmd = COMMAND_MAP[direction]\n        self.serial.write(cmd.encode())",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gaze_wheelchair",
    "name": "Gaze-Controlled Wheelchair",
    "category": "medical",
    "featured": true,
    "tags": [
      "gaze tracking",
      "Python",
      "OpenCV",
      "dlib",
      "ESP32",
      "wheelchair",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Wheelchair driven purely by eye gaze direction",
    "fullDesc": "A standalone gaze-controlled wheelchair where the user only needs to look in the direction they want to move. Uses pupil detection and corneal reflection tracking via a camera mounted on the user's face.\n\nThe system tracks eye landmarks using dlib's 68-point facial landmark predictor, then determines gaze direction from pupil position relative to the eye corners.",
    "howItWorks": [
      "Camera captures face at 30fps",
      "dlib detects 68 facial landmarks around eyes",
      "Pupil position extracted using threshold + contour detection",
      "Gaze ratio determines LEFT/RIGHT/UP/DOWN/CENTER",
      "Commands sent via serial to ESP32 motor driver"
    ],
    "codeSnippet": "def get_gaze_ratio(eye_points, facial_landmarks):\n    eye_region = get_eye_region(eye_points, landmarks)\n    gray_eye = cv2.cvtColor(eye_region, cv2.COLOR_BGR2GRAY)\n    _, threshold = cv2.threshold(gray_eye, 70, 255, cv2.THRESH_BINARY)\n    \n    left_side = threshold[0:h, 0:w//2]\n    right_side = threshold[0:h, w//2:]\n    \n    ratio = cv2.countNonZero(left_side) / (cv2.countNonZero(right_side) + 1)\n    return ratio",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "brain_tumor",
    "name": "Brain Tumor Detection (CNN)",
    "category": "medical",
    "featured": true,
    "tags": [
      "CNN",
      "Keras",
      "TensorFlow",
      "MRI",
      "deep learning",
      "medical imaging",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "CNN classifying MRI scans into tumor types with 95%+ accuracy",
    "fullDesc": "A Convolutional Neural Network trained on MRI brain scan images to detect and classify brain tumors into four categories: Glioma, Meningioma, Pituitary, and No Tumor.\n\nThe model uses transfer learning with a custom CNN architecture achieving over 95% classification accuracy. A Flask web app wraps the model for clinical use.",
    "howItWorks": [
      "MRI images preprocessed: resized to 224×224, normalized",
      "Custom CNN: 4 Conv layers → MaxPool → Dropout → Dense",
      "Trained on 7,000+ MRI images with data augmentation",
      "Flask API receives image upload, returns classification + confidence",
      "Grad-CAM visualization shows which region triggered detection"
    ],
    "codeSnippet": "model = Sequential([\n    Conv2D(32, (3,3), activation='relu', input_shape=(224,224,3)),\n    MaxPooling2D(2,2),\n    Conv2D(64, (3,3), activation='relu'),\n    MaxPooling2D(2,2),\n    Conv2D(128, (3,3), activation='relu'),\n    GlobalAveragePooling2D(),\n    Dense(128, activation='relu'),\n    Dropout(0.5),\n    Dense(4, activation='softmax')  # 4 tumor classes\n])",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "blind_glasses",
    "name": "Smart Glasses for the Blind",
    "category": "medical",
    "featured": false,
    "tags": [
      "ultrasonic",
      "Arduino",
      "vibration",
      "assistive tech",
      "obstacle detection",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Glasses with ultrasonic sensors guiding visually impaired users",
    "fullDesc": "Wearable glasses equipped with ultrasonic sensors that detect obstacles and alert the user through haptic vibration feedback and audio cues. Multiple sensors cover forward and lateral directions for comprehensive obstacle detection.",
    "howItWorks": [
      "HC-SR04 ultrasonic sensors measure distance in front and sides",
      "Arduino processes distance readings at 10Hz",
      "Vibration motors on frame temples provide directional feedback",
      "DF Mini Player speaks distance warnings via small speaker",
      "Battery pack fits in temple arm for all-day use"
    ],
    "codeSnippet": "void loop() {\n  int frontDist = getDistance(TRIG_FRONT, ECHO_FRONT);\n  int leftDist  = getDistance(TRIG_LEFT,  ECHO_LEFT);\n  \n  if (frontDist < 50) {\n    analogWrite(VIBRATE_PIN, map(frontDist, 0, 50, 255, 0));\n    playWarning(\"FRONT\");\n  }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "blind_stick",
    "name": "Smart Blind Stick",
    "category": "medical",
    "featured": false,
    "tags": [
      "ultrasonic",
      "Arduino",
      "GPS",
      "assistive tech",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Intelligent walking stick with obstacle detection and GPS",
    "fullDesc": "An enhanced version of a traditional white cane with embedded ultrasonic obstacle detection, water detection sensor, and GPS tracking for caretaker location monitoring via SMS.",
    "howItWorks": [
      "Ultrasonic sensor at tip detects obstacles 0-200cm away",
      "Water sensor at ground level detects puddles",
      "GPS module sends location via GSM to caretaker phone",
      "Vibration + buzzer alerts for different obstacle types",
      "Emergency button triggers SOS SMS"
    ],
    "codeSnippet": "if (distance < OBSTACLE_THRESHOLD) {\n    int intensity = map(distance, 0, THRESHOLD, 255, 0);\n    analogWrite(BUZZER, intensity);\n    vibrate(SHORT_PULSE);\n}\nif (waterDetected()) {\n    vibrate(LONG_PULSE);\n    speak(\"Water ahead\");\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "blind_watch",
    "name": "Blind Watch",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "RTC",
      "assistive tech",
      "vibration",
      "Braille",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Tactile watch for blind users using vibration patterns to tell time",
    "fullDesc": "A wearable watch that communicates the current time to blind users through distinct vibration patterns — similar to Braille encoding but for haptic time-telling. The watch uses an RTC module for accurate timekeeping.",
    "howItWorks": [
      "DS3231 RTC maintains accurate time",
      "User presses button to query time",
      "Hours encoded as long pulses, minutes as short pulses",
      "Vibration motor on wrist produces tactile time readout",
      "OLED display for sighted companions"
    ],
    "codeSnippet": "void tellTime(int hours, int minutes) {\n    // Hours: long vibrations\n    for(int i = 0; i < hours % 12; i++) {\n        vibrate(500); delay(300);\n    }\n    delay(1000); // separator\n    // Minutes: short vibrations (groups of 5)\n    for(int i = 0; i < minutes/5; i++) {\n        vibrate(200); delay(200);\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_splint",
    "name": "Smart Splint",
    "category": "medical",
    "featured": false,
    "tags": [
      "ESP32",
      "accelerometer",
      "Flask",
      "rehab",
      "physiotherapy",
      "IoT",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "IoT splint monitoring limb movement during physiotherapy",
    "fullDesc": "A smart splint equipped with an accelerometer that monitors joint angles and limb movement during physiotherapy rehabilitation. Data is uploaded to a cloud backend for therapist review and progress tracking.",
    "howItWorks": [
      "MPU6050 IMU sensor captures 6-DOF motion data at 50Hz",
      "ESP32 processes and buffers motion samples",
      "WiFi upload to Flask REST API every 30 seconds",
      "Backend stores sessions in SQLite, generates progress graphs",
      "React dashboard shows ROM (range of motion) trends over time"
    ],
    "codeSnippet": "// ESP32 angle calculation\nfloat calcAngle(int16_t ax, int16_t ay, int16_t az) {\n    float angle = atan2(ay, sqrt(ax*ax + az*az));\n    return angle * 180.0 / PI;\n}\n\n// Upload to backend\nvoid uploadSession(float* angles, int count) {\n    HTTPClient http;\n    http.begin(SERVER_URL \"/api/session\");\n    // POST JSON payload...\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "sleep_driver",
    "name": "Drowsiness & Sleep Detection",
    "category": "medical",
    "featured": false,
    "tags": [
      "OpenCV",
      "dlib",
      "Python",
      "EAR",
      "driver safety",
      "alert system",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Real-time drowsiness detection alerting drowsy drivers",
    "fullDesc": "A computer vision system that detects driver drowsiness in real-time by monitoring the Eye Aspect Ratio (EAR). When the driver's eyes remain closed for more than a threshold duration, an alert is triggered to prevent accidents.",
    "howItWorks": [
      "Webcam captures face at 30fps",
      "dlib 68-point landmark detector locates eye regions",
      "EAR calculated from 6 eye landmark points",
      "EAR < 0.25 for 3+ consecutive frames → drowsiness detected",
      "Buzzer + voice alert 'Wake Up!' triggered"
    ],
    "codeSnippet": "def eye_aspect_ratio(eye):\n    A = dist.euclidean(eye[1], eye[5])\n    B = dist.euclidean(eye[2], eye[4])\n    C = dist.euclidean(eye[0], eye[3])\n    return (A + B) / (2.0 * C)\n\nEAR_THRESHOLD = 0.25\nCONSEC_FRAMES = 20\n\nif ear < EAR_THRESHOLD:\n    counter += 1\n    if counter >= CONSEC_FRAMES:\n        alert_driver()",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "ann_breast_cancer",
    "name": "Breast Cancer Prediction (ANN)",
    "category": "medical",
    "featured": false,
    "tags": [
      "ANN",
      "scikit-learn",
      "ML",
      "classification",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Neural network predicting breast cancer malignancy from cell features",
    "fullDesc": "An Artificial Neural Network trained on the Wisconsin Breast Cancer Dataset to classify tumors as Malignant or Benign based on 30 cell nucleus features extracted from digitized FNA (fine needle aspirate) images.",
    "howItWorks": [
      "30 features extracted: radius, texture, perimeter, area, smoothness, etc.",
      "Data normalized using StandardScaler",
      "3-layer ANN: 30 → 64 → 32 → 1 (sigmoid output)",
      "Trained with Adam optimizer, binary cross-entropy loss",
      "Achieved 97.4% test accuracy with cross-validation"
    ],
    "codeSnippet": "model = Sequential([\n    Dense(64, activation='relu', input_shape=(30,)),\n    Dropout(0.3),\n    Dense(32, activation='relu'),\n    Dropout(0.2),\n    Dense(1, activation='sigmoid')\n])\nmodel.compile(optimizer='adam', \n              loss='binary_crossentropy', \n              metrics=['accuracy'])",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "stroke_prediction",
    "name": "Stroke Prediction (ML)",
    "category": "medical",
    "featured": false,
    "tags": [
      "Random Forest",
      "XGBoost",
      "ML",
      "healthcare",
      "prediction",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "ML model predicting stroke risk from patient health indicators",
    "fullDesc": "A machine learning pipeline comparing multiple classifiers (Logistic Regression, Random Forest, XGBoost, SVM) to predict stroke occurrence from 11 clinical features including age, hypertension, heart disease, glucose levels, and BMI.",
    "howItWorks": [
      "Dataset: 5,110 patient records from Kaggle",
      "Class imbalance handled with SMOTE oversampling",
      "Feature engineering: BMI categories, age groups",
      "XGBoost achieved best AUC-ROC of 0.87",
      "SHAP values explain feature importance"
    ],
    "codeSnippet": "from xgboost import XGBClassifier\nfrom imblearn.over_sampling import SMOTE\n\nsmote = SMOTE(random_state=42)\nX_res, y_res = smote.fit_resample(X_train, y_train)\n\nmodel = XGBClassifier(\n    n_estimators=200,\n    max_depth=6,\n    learning_rate=0.1,\n    eval_metric='auc'\n)\nmodel.fit(X_res, y_res)",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_cast",
    "name": "Smart Cast",
    "category": "medical",
    "featured": false,
    "tags": [
      "IoT",
      "ESP32",
      "temperature",
      "humidity",
      "medical cast",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Medical cast with sensors monitoring healing conditions inside",
    "fullDesc": "An instrumented medical cast that monitors temperature and humidity inside the cast to detect infection risk or improper healing conditions. Alerts are sent to a mobile app if readings go out of safe range.",
    "howItWorks": [
      "DHT22 sensor embedded inside cast monitors temp/humidity",
      "ESP32 reads and uploads data every minute to Firebase",
      "Mobile app displays real-time and historical readings",
      "Alert notification when temp > 37.5°C or humidity > 80%",
      "Rechargeable battery lasts 5+ days"
    ],
    "codeSnippet": "void loop() {\n  float temp = dht.readTemperature();\n  float humid = dht.readHumidity();\n  \n  if (temp > FEVER_THRESHOLD || humid > HUMID_MAX) {\n    sendAlert(temp, humid);\n    firebase.setFloat(\"cast/temp\", temp);\n    firebase.setFloat(\"cast/humid\", humid);\n  }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "facial_emotion",
    "name": "Facial Emotion Recognition (CNN)",
    "category": "ai_ml",
    "featured": true,
    "tags": [
      "CNN",
      "Keras",
      "OpenCV",
      "emotion",
      "real-time",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "Real-time CNN detecting 7 human emotions from webcam feed",
    "fullDesc": "A real-time facial emotion recognition system using a custom CNN trained on the FER-2013 dataset. The system detects 7 emotions: Angry, Disgust, Fear, Happy, Sad, Surprise, and Neutral in live webcam streams with overlaid emotion labels.",
    "howItWorks": [
      "Haar Cascade detects face bounding boxes in each frame",
      "Face ROI converted to grayscale, resized to 48×48",
      "CNN predicts emotion probability for all 7 classes",
      "Dominant emotion label overlaid on video in real-time",
      "Confidence bar chart displayed alongside video"
    ],
    "codeSnippet": "model = Sequential([\n    Conv2D(64, (3,3), padding='same', activation='relu'),\n    BatchNormalization(),\n    MaxPooling2D(2,2), Dropout(0.25),\n    Conv2D(128, (3,3), activation='relu'),\n    GlobalAveragePooling2D(),\n    Dense(512, activation='relu'),\n    Dropout(0.5),\n    Dense(7, activation='softmax')\n])\n\nemotion_labels = ['Angry','Disgust','Fear',\n                  'Happy','Sad','Surprise','Neutral']",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "handwritten_digit",
    "name": "Handwritten Digit Recognition",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "CNN",
      "MNIST",
      "Keras",
      "digit recognition",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "CNN achieving 99.2% accuracy on MNIST handwritten digits",
    "fullDesc": "A CNN trained on the MNIST dataset to recognize handwritten digits 0-9. Includes a drawing canvas web interface where users can draw a digit and get instant prediction with confidence scores.",
    "howItWorks": [
      "MNIST dataset: 60,000 training + 10,000 test images",
      "CNN architecture: 2× (Conv + ReLU + MaxPool) + FC layers",
      "Data augmentation: rotation, shift, zoom for robustness",
      "99.2% test accuracy achieved",
      "Flask web app with HTML5 canvas drawing interface"
    ],
    "codeSnippet": "model = Sequential([\n    Conv2D(32,(3,3), activation='relu', input_shape=(28,28,1)),\n    MaxPooling2D(2,2),\n    Conv2D(64,(3,3), activation='relu'),\n    MaxPooling2D(2,2),\n    Flatten(),\n    Dense(128, activation='relu'),\n    Dense(10, activation='softmax')\n])\n# Test accuracy: 99.21%",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "face_recognition_attendance",
    "name": "Face Recognition Attendance System",
    "category": "ai_ml",
    "featured": true,
    "tags": [
      "face recognition",
      "OpenCV",
      "ESP32-CAM",
      "attendance",
      "Python",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "Automated attendance via face recognition with ESP32-CAM",
    "fullDesc": "An end-to-end automated attendance system using ESP32-CAM for image capture and Python face_recognition library for identification. Attendance records are stored in CSV and displayed on a web dashboard.",
    "howItWorks": [
      "ESP32-CAM streams video over WiFi HTTP server",
      "Python client polls frames and detects faces using HOG",
      "128D face embeddings compared to enrolled student database",
      "Match found → mark attendance with timestamp in CSV",
      "Flask dashboard displays real-time attendance grid"
    ],
    "codeSnippet": "import face_recognition\nknown_encodings = load_known_faces(\"students/\")\n\ndef process_frame(frame):\n    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)\n    locations = face_recognition.face_locations(rgb)\n    encodings = face_recognition.face_encodings(rgb, locations)\n    \n    for enc in encodings:\n        matches = face_recognition.compare_faces(\n            known_encodings, enc, tolerance=0.5)\n        if True in matches:\n            name = known_names[matches.index(True)]\n            mark_attendance(name)",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "battery_rul",
    "name": "Battery RUL Prediction (ML)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "ML",
      "LSTM",
      "regression",
      "battery",
      "predictive maintenance",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "LSTM predicting remaining useful life of Li-ion batteries",
    "fullDesc": "A machine learning model using LSTM (Long Short-Term Memory) networks to predict the Remaining Useful Life (RUL) of lithium-ion batteries from charge/discharge cycle data, enabling predictive maintenance.",
    "howItWorks": [
      "NASA battery dataset: charge/discharge capacity per cycle",
      "Feature extraction: capacity fade rate, internal resistance",
      "LSTM model with 2 layers, 64 hidden units",
      "Sliding window approach: 20 cycles → predict next RUL",
      "MAE of 12 cycles on test set"
    ],
    "codeSnippet": "model = Sequential([\n    LSTM(64, return_sequences=True, \n         input_shape=(window_size, n_features)),\n    Dropout(0.2),\n    LSTM(32, return_sequences=False),\n    Dense(16, activation='relu'),\n    Dense(1)  # RUL in cycles\n])\nmodel.compile(optimizer='adam', loss='mse')",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "houses_prices",
    "name": "House Price Prediction (ML)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Random Forest",
      "feature selection",
      "regression",
      "ML",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "Feature selection study for house price regression models",
    "fullDesc": "A comprehensive study on feature selection techniques (Filter, Wrapper, Embedded) applied to house price prediction. Compares Random Forest, Gradient Boosting, and Ridge Regression after various feature selection strategies.",
    "howItWorks": [
      "Kaggle House Prices dataset: 80 features, 1,460 samples",
      "Filter methods: Pearson correlation, mutual information",
      "Wrapper: Recursive Feature Elimination (RFE)",
      "Embedded: LASSO L1 regularization feature selection",
      "Best: GBM + RFE → RMSE of 0.118 (log scale)"
    ],
    "codeSnippet": "from sklearn.feature_selection import RFE\nfrom sklearn.ensemble import GradientBoostingRegressor\n\nestimator = GradientBoostingRegressor()\nselector = RFE(estimator, n_features_to_select=30)\nselector.fit(X_train, y_train)\n\nselected_features = X.columns[selector.support_]\nprint(f\"Selected {len(selected_features)} features\")",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "gender_recognition",
    "name": "Gender Recognition (Speech)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "SVM",
      "audio features",
      "MFCC",
      "classification",
      "speech",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "SVM classifying speaker gender from voice audio features",
    "fullDesc": "A gender classification system that extracts MFCC (Mel-Frequency Cepstral Coefficients) and other spectral features from voice recordings, then uses SVM to classify the speaker as male or female.",
    "howItWorks": [
      "Audio preprocessed: trimmed, normalized, resampled to 22050Hz",
      "Features: 20 MFCCs, spectral centroid, rolloff, chroma, ZCR",
      "SVM with RBF kernel, C=10, gamma=0.001",
      "Dataset: 3,168 voice samples (male/female balanced)",
      "Cross-validated accuracy: 96.8%"
    ],
    "codeSnippet": "import librosa\nfrom sklearn.svm import SVC\n\ndef extract_features(audio_path):\n    y, sr = librosa.load(audio_path)\n    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)\n    spectral = librosa.feature.spectral_centroid(y=y, sr=sr)\n    return np.hstack([mfcc.mean(axis=1), spectral.mean()])\n\nclf = SVC(kernel='rbf', C=10, gamma=0.001)\nclf.fit(X_train, y_train)",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "smart_greenhouse",
    "name": "Smart Greenhouse",
    "category": "agriculture",
    "featured": true,
    "tags": [
      "ESP32",
      "sensors",
      "IoT",
      "automation",
      "web dashboard",
      "agriculture",
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Fully automated greenhouse with web dashboard and sensor control",
    "fullDesc": "An IoT-based greenhouse automation system that monitors temperature, humidity, soil moisture, and light intensity, then automatically controls fans, water pumps, and grow lights. A web dashboard is hosted directly on the ESP32.",
    "howItWorks": [
      "DHT22 for air temp/humidity, capacitive sensors for soil",
      "LDR for light intensity, BMP280 for atmospheric pressure",
      "ESP32 runs async web server hosting control dashboard",
      "Automatic thresholds: fan ON if temp > 30°C, pump if soil < 40%",
      "Historical data logged to SPIFFS flash filesystem"
    ],
    "codeSnippet": "// Auto-control logic\nif (temperature > TEMP_MAX) {\n    digitalWrite(FAN_PIN, HIGH);\n    webSocket.broadcastTXT(\"FAN:ON\");\n}\nif (soilMoisture < SOIL_MIN) {\n    pumpTimer.start(PUMP_DURATION);\n    webSocket.broadcastTXT(\"PUMP:ON\");\n}\n// Serve dashboard\nserver.on(\"/\", HTTP_GET, handleRoot);",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "auto_watering",
    "name": "Auto Watering System",
    "category": "agriculture",
    "featured": false,
    "tags": [
      "Arduino",
      "soil moisture",
      "relay",
      "water pump",
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Arduino-controlled automatic plant watering based on soil moisture",
    "fullDesc": "An automatic plant watering system using a soil moisture sensor to trigger a water pump when the soil becomes too dry. The system is configurable with threshold presets and logs watering events to an LCD.",
    "howItWorks": [
      "Capacitive soil moisture sensor reads analog value",
      "Arduino maps raw ADC to 0-100% moisture percentage",
      "Relay activates water pump when moisture < threshold",
      "LCD I2C displays current readings and last watered time",
      "Configurable threshold via potentiometer"
    ],
    "codeSnippet": "int soilRaw = analogRead(SOIL_PIN);\nint moisture = map(soilRaw, DRY_VALUE, WET_VALUE, 0, 100);\n\nif (moisture < THRESHOLD && !pumpRunning) {\n    digitalWrite(RELAY_PIN, LOW); // Activate pump\n    pumpRunning = true;\n    lcd.print(\"Watering...\");\n    delay(PUMP_DURATION * 1000);\n    digitalWrite(RELAY_PIN, HIGH);\n    pumpRunning = false;\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_planter_stm",
    "name": "Smart Planter (STM32)",
    "category": "agriculture",
    "featured": false,
    "tags": [
      "STM32",
      "embedded C",
      "sensors",
      "planter",
      "STM32F4 Arm Cortex-M4 Board",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "STM32-powered smart planter with multi-sensor monitoring",
    "fullDesc": "A smart plant monitoring and care system built on the STM32 microcontroller. More powerful than Arduino-based systems, it handles multiple sensors simultaneously via DMA, displays data on a TFT screen, and controls actuators with precision timing.",
    "howItWorks": [
      "STM32F4 runs at 168MHz, handles sensor DMA transfers",
      "4 soil moisture zones monitored independently",
      "ILI9341 TFT display shows live sensor dashboard",
      "RTC-based scheduled watering with configurable schedules",
      "UART logs data to PC for analysis"
    ],
    "codeSnippet": "// STM32 ADC DMA multi-channel read\nHAL_ADC_Start_DMA(&hadc1, adc_buf, ADC_CHANNELS);\n\nvoid HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef *hadc) {\n    for(int i = 0; i < ADC_CHANNELS; i++) {\n        moisture[i] = map(adc_buf[i], 0, 4095, 0, 100);\n    }\n    updateDisplay();\n    checkThresholds();\n}",
    "techStack": [
      "STM32F4 Arm Cortex-M4 Board",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "mist_project",
    "name": "Mist Irrigation System",
    "category": "agriculture",
    "featured": false,
    "tags": [
      "Arduino",
      "misting",
      "timer",
      "humidity",
      "irrigation",
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Automated mist irrigation system with humidity feedback",
    "fullDesc": "A mist irrigation system for nurseries and greenhouses that uses humidity sensors to trigger misting nozzles, maintaining optimal humidity for delicate plant propagation.",
    "howItWorks": [
      "DHT11/DHT22 measures ambient humidity continuously",
      "Relay bank controls up to 4 misting zones",
      "Timer-based minimum interval prevents over-misting",
      "LCD shows humidity targets and current values",
      "Manual override button for immediate misting"
    ],
    "codeSnippet": "float humidity = dht.readHumidity();\nunsigned long elapsed = millis() - lastMistTime;\n\nif (humidity < TARGET_HUMIDITY && elapsed > MIN_INTERVAL) {\n    for(int zone = 0; zone < ZONES; zone++) {\n        digitalWrite(relayPins[zone], LOW);\n    }\n    delay(MIST_DURATION);\n    for(int zone = 0; zone < ZONES; zone++) {\n        digitalWrite(relayPins[zone], HIGH);\n    }\n    lastMistTime = millis();\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_lab",
    "name": "Smart Lab System",
    "category": "smart_home",
    "featured": true,
    "tags": [
      "ESP32",
      "face recognition",
      "RFID",
      "IoT",
      "dashboard",
      "automation",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Intelligent lab with face recognition access, environment monitoring",
    "fullDesc": "A comprehensive smart lab system with face recognition entry, RFID backup access, environmental monitoring (temp, humidity, CO2, light), automatic lighting, and a live web dashboard. Multiple ESP32 nodes communicate via MQTT.",
    "howItWorks": [
      "ESP32-CAM at entrance performs face recognition for access",
      "RFID reader provides backup authentication",
      "Sensor node monitors CO2, temp, humidity, light, occupancy",
      "MQTT broker (Mosquitto) coordinates all nodes",
      "Node-RED dashboard aggregates all data with live charts"
    ],
    "codeSnippet": "// MQTT publish example\nvoid publishSensorData() {\n    DynamicJsonDocument doc(256);\n    doc[\"temp\"] = bme.readTemperature();\n    doc[\"humidity\"] = bme.readHumidity();\n    doc[\"co2\"] = mhz19.getCO2();\n    doc[\"lux\"] = lightMeter.readLightLevel();\n    \n    String payload;\n    serializeJson(doc, payload);\n    mqttClient.publish(\"lab/sensors\", payload.c_str());\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_building",
    "name": "Smart Building",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "ESP-CAM",
      "IoT",
      "building automation",
      "security",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Multi-floor smart building with cameras, sensors, and automation",
    "fullDesc": "A building automation system spanning multiple floors, integrating security cameras (ESP32-CAM), motion detection, smart lighting, HVAC control, and energy monitoring into a unified control panel.",
    "howItWorks": [
      "ESP32-CAM units at each floor capture security footage",
      "PIR motion sensors trigger automatic lighting",
      "Current sensors measure per-floor energy consumption",
      "Central ESP32 aggregates all data and hosts web interface",
      "Relay boards control HVAC zones and lighting circuits"
    ],
    "codeSnippet": "// Energy monitoring per floor\nfloat readPower(int floor) {\n    int rawCurrent = analogRead(CS_PINS[floor]);\n    float current = (rawCurrent - 512) * (3.3 / 1024) / 0.066;\n    float power = current * MAINS_VOLTAGE;\n    energy[floor] += power * (SAMPLE_INTERVAL / 3600000.0);\n    return power;\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_gate",
    "name": "Smart Security Gate",
    "category": "smart_home",
    "featured": true,
    "tags": [
      "face recognition",
      "RFID",
      "Raspberry Pi",
      "ESP32",
      "security",
      "servo",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Automated security gate with face recognition and RFID",
    "fullDesc": "A smart access control gate combining face recognition (running on Raspberry Pi with OpenCV) and RFID card authentication. The gate servo is controlled by an ESP32 that receives unlock commands from the Pi's authentication server.",
    "howItWorks": [
      "Camera streams live feed to RPi running face_recognition library",
      "Recognized faces → RPi sends unlock command to ESP32 via HTTP",
      "RFID RC522 reader provides alternative authentication",
      "Servo motor controls gate arm (0° = closed, 90° = open)",
      "Web dashboard shows entry logs with face snapshots"
    ],
    "codeSnippet": "# Raspberry Pi authentication server\n@app.route('/verify', methods=['POST'])\ndef verify_face():\n    frame = decode_image(request.json['image'])\n    locations = face_recognition.face_locations(frame)\n    encodings = face_recognition.face_encodings(frame, locations)\n    \n    for enc in encodings:\n        if face_recognition.compare_faces(known_faces, enc, 0.5):\n            requests.post(ESP32_URL + \"/open_gate\")\n            log_entry(get_name(enc))\n            return jsonify({\"access\": \"granted\"})\n    return jsonify({\"access\": \"denied\"})",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_lecture_hall",
    "name": "Smart Lecture Hall",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "IoT",
      "ESP32",
      "attendance",
      "smart classroom",
      "automation",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Automated lecture hall with smart attendance and environment control",
    "fullDesc": "A smart lecture hall system that automatically adjusts lighting and AC based on occupancy, takes automated attendance via face recognition at the door, and allows the professor to control all systems from a tablet app.",
    "howItWorks": [
      "IR arrays count students entering/exiting",
      "ESP32-CAM at door logs student faces for attendance",
      "Smart lighting adjusts based on ambient light sensor",
      "AC controlled via IR blaster based on room temperature",
      "Professor tablet app shows attendance roster in real-time"
    ],
    "codeSnippet": "// Student counting with IR arrays\nvoid IRAM_ATTR entrySensorISR() {\n    if (digitalRead(INNER_IR) == LOW) {\n        studentCount++;  // Entry detected\n    }\n}\nvoid IRAM_ATTR exitSensorISR() {\n    if (digitalRead(INNER_IR) == LOW) {\n        if (studentCount > 0) studentCount--;\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "gas_fire_detection",
    "name": "Hazardous Gas & Flame Safety Monitoring Node",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "Arduino",
      "MQ-2",
      "flame sensor",
      "GSM",
      "alarm",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Multi-sensor gas leak and fire alarm with SMS notification",
    "fullDesc": "A safety system using MQ-2 gas sensor, flame sensor, and temperature sensor to detect gas leaks and fires. Upon detection, it triggers a loud alarm, activates an exhaust fan, and sends an SMS alert.",
    "howItWorks": [
      "MQ-2 detects LPG, methane, smoke, hydrogen gas",
      "Flame sensor detects infrared radiation from fire",
      "DHT11 monitors temperature rise pattern",
      "Upon any alert: buzzer + fan ON + SIM800 GSM SMS",
      "LCD displays current gas PPM and temperature"
    ],
    "codeSnippet": "int gasPPM = analogRead(MQ2_PIN) * PPM_FACTOR;\nbool flameDetected = digitalRead(FLAME_PIN) == LOW;\nfloat temp = dht.readTemperature();\n\nif (gasPPM > GAS_THRESHOLD || flameDetected || temp > 60) {\n    tone(BUZZER_PIN, 1000);\n    digitalWrite(FAN_PIN, HIGH);\n    gsm.println(\"AT+CMGS=\\\"+201XXXXXXXXX\\\"\");\n    gsm.println(\"ALERT: Fire/Gas detected!\");\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_parking",
    "name": "IoT Smart Parking Guidance System",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "Arduino",
      "ultrasonic",
      "LED",
      "parking",
      "IoT",
      "display",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "IoT parking lot with real-time slot availability display",
    "fullDesc": "A smart parking system with ultrasonic sensors in each bay monitoring occupancy. LED indicators show red/green per slot, and an LCD at the entrance displays total available spaces. Data is pushed to a web dashboard.",
    "howItWorks": [
      "HC-SR04 in each parking slot detects vehicle presence",
      "Red/Green LED per slot for visual guidance",
      "LCD at entrance shows 'X/Y Spaces Available'",
      "ESP8266 uploads occupancy data to Blynk cloud",
      "Mobile app shows parking map with real-time availability"
    ],
    "codeSnippet": "for(int i = 0; i < NUM_SLOTS; i++) {\n    float dist = getDistance(trigPins[i], echoPins[i]);\n    bool occupied = dist < VEHICLE_THRESHOLD;\n    \n    digitalWrite(redLEDs[i],   occupied ? HIGH : LOW);\n    digitalWrite(greenLEDs[i], occupied ? LOW  : HIGH);\n    \n    if(slotOccupied[i] != occupied) {\n        slotOccupied[i] = occupied;\n        updateBlynk();\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_bin",
    "name": "Ultrasonic Touchless Smart Trash Bin",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "Arduino",
      "ultrasonic",
      "servo",
      "IoT",
      "smart waste",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Automatic lid-opening smart bin with fill-level monitoring",
    "fullDesc": "A touchless smart trash bin that automatically opens its lid when a hand is detected above it, and sends fill-level notifications when the bin is 80%+ full. Uses ultrasonic sensors for both hand detection and fill-level measurement.",
    "howItWorks": [
      "Top ultrasonic sensor detects hand approaching < 20cm",
      "Servo motor opens lid 90° for 3 seconds then closes",
      "Bottom ultrasonic sensor measures bin fill level",
      "ESP8266 sends MQTT notification when bin is full",
      "Solar panel on lid charges LiPo battery"
    ],
    "codeSnippet": "float handDist = getDistance(TOP_TRIG, TOP_ECHO);\nfloat fillLevel = 100 - ((getDistance(BTM_TRIG, BTM_ECHO) \n                          / BIN_HEIGHT) * 100);\n\nif (handDist < HAND_THRESHOLD) {\n    lidServo.write(90);   // Open\n    delay(3000);\n    lidServo.write(0);    // Close\n}\nif (fillLevel > 80) sendFullAlert(fillLevel);",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "solar_building",
    "name": "Solar Energy Harvesting & Building Management Node",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "solar",
      "ESP32",
      "energy",
      "monitoring",
      "IoT",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Smart building powered by solar with energy harvest monitoring",
    "fullDesc": "A smart building automation system powered entirely by solar energy, with real-time monitoring of solar panel output, battery charge state, energy consumption per zone, and automatic load shedding when battery is low.",
    "howItWorks": [
      "INA219 current/voltage sensors on solar panels and battery",
      "MPPT charge controller maximizes solar harvest",
      "ESP32 monitors energy balance: generation vs consumption",
      "Non-essential loads auto-shed when battery < 20%",
      "Grafana dashboard shows energy flow in real-time"
    ],
    "codeSnippet": "float solarPower = ina219Solar.getPower_mW() / 1000.0;\nfloat loadPower  = ina219Load.getPower_mW() / 1000.0;\nfloat battVoltage = analogRead(BATT_PIN) * BATT_SCALE;\n\nif (battVoltage < LOW_BATT_THRESHOLD) {\n    // Shed non-essential loads\n    digitalWrite(AIRCON_RELAY, LOW);\n    digitalWrite(HEATER_RELAY, LOW);\n    sendAlert(\"Low battery: Load shedding active\");\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_wallet",
    "name": "Anti-Lost Bluetooth Smart Wallet with GPS",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "Arduino",
      "Bluetooth",
      "buzzer",
      "lost item tracker",
      "wearable",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Bluetooth-connected wallet that buzzes when you leave it behind",
    "fullDesc": "An anti-loss smart wallet with a thin Bluetooth module that connects to your phone. If the wallet moves out of Bluetooth range, both the phone and the wallet buzz to alert the owner. Also tracks the last known location via phone GPS.",
    "howItWorks": [
      "HC-05 Bluetooth module embedded in wallet",
      "Android app monitors RSSI signal strength continuously",
      "RSSI < threshold → alert on phone + wallet buzzer via BT",
      "App logs GPS coordinates when BT connection drops",
      "Rechargeable 100mAh LiPo lasts 2 weeks on standby"
    ],
    "codeSnippet": "// Android app RSSI monitor\nBluetoothDevice wallet = adapter.getRemoteDevice(WALLET_MAC);\nwhile (connected) {\n    int rssi = getRSSI(wallet);\n    if (rssi < LOST_THRESHOLD) {\n        vibrate(); playAlert();\n        sendCommandToWallet(\"BUZZ\");\n        saveLastLocation(gps.getLocation());\n    }\n    Thread.sleep(1000);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "4wd_car",
    "name": "4WD Autonomous & Bluetooth Robotic Car",
    "category": "robotics",
    "featured": true,
    "tags": [
      "Arduino",
      "L298N",
      "ultrasonic",
      "Bluetooth",
      "4WD",
      "robot car",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "4-wheel drive robot car with obstacle avoidance and Bluetooth control",
    "fullDesc": "A 4-wheel drive robot car platform with multiple operating modes: Bluetooth remote control from Android app, autonomous obstacle avoidance using ultrasonic sensor and servo-mounted scanning, and line following.",
    "howItWorks": [
      "4× DC motors controlled by 2× L298N H-bridge drivers",
      "HC-SR04 on servo scans ±90° to detect obstacles",
      "HC-05 Bluetooth receives commands from custom Android app",
      "Mode selector: BT control / Obstacle avoid / Line follow",
      "PID control for straight-line driving accuracy"
    ],
    "codeSnippet": "void obstacleAvoid() {\n    int frontDist = scan(0);  // Scan forward\n    if (frontDist < SAFE_DIST) {\n        stopMotors();\n        int leftDist  = scan(-90);\n        int rightDist = scan(90);\n        if (rightDist > leftDist) {\n            turnRight(); delay(TURN_TIME);\n        } else {\n            turnLeft();  delay(TURN_TIME);\n        }\n    } else {\n        moveForward(BASE_SPEED);\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "line_follower",
    "name": "Line Following Car",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "IR sensors",
      "PID",
      "line follower",
      "robot",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "PID-controlled line follower with high-speed precision",
    "fullDesc": "A precision line-following robot using 5-sensor IR array and PID control algorithm. The PID controller continuously adjusts motor speeds to keep the robot centered on the line, enabling smooth high-speed line following around curves.",
    "howItWorks": [
      "5× TCRT5000 IR sensors read line position as binary word",
      "Weighted average calculates error from center",
      "PID: P=40, I=0.5, D=20 (tuned empirically)",
      "Differential motor speed correction applied each 10ms",
      "Speed: 0.8m/s straight, slows on sharp curves automatically"
    ],
    "codeSnippet": "float error = getLineError();  // -4 to +4\nintegral += error;\nfloat derivative = error - prevError;\n\nfloat correction = Kp*error + Ki*integral + Kd*derivative;\n\nint leftSpeed  = BASE_SPEED - correction;\nint rightSpeed = BASE_SPEED + correction;\n\nsetMotors(constrain(leftSpeed,0,255), \n          constrain(rightSpeed,0,255));\nprevError = error;",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "sumo_car",
    "name": "Autonomous Heavyweight Sumo Combat Robot",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "sumo",
      "competition",
      "robot",
      "IR",
      "ultrasonic",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Competition sumo robot with enemy detection and push strategy",
    "fullDesc": "A competitive sumo robot designed for arena battles. Uses ultrasonic sensors for enemy detection, IR sensors for ring boundary detection, and a wedge-shaped low-profile chassis for maximum pushing force.",
    "howItWorks": [
      "3× HC-SR04 sensors: front, front-left, front-right for enemy tracking",
      "5× IR sensors on bottom detect white ring boundary",
      "State machine: SEARCH → ATTACK → EVADE → BOUNDARY_AVOID",
      "DC motors run at full 12V for maximum torque",
      "Custom wedge chassis 3D-printed from PLA"
    ],
    "codeSnippet": "void loop() {\n    bool boundaryLeft  = !digitalRead(IR_L);\n    bool boundaryRight = !digitalRead(IR_R);\n    int  enemyDist     = scanFront();\n    \n    if (boundaryLeft || boundaryRight) {\n        state = EVADE;\n        reverseAndTurn(boundaryLeft ? RIGHT : LEFT);\n    } else if (enemyDist < DETECT_RANGE) {\n        state = ATTACK;\n        fullSpeedForward();\n    } else {\n        state = SEARCH;\n        spinSearch();\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "firefighter_car",
    "name": "Flame-Detecting Fire Extinguisher Rover",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "flame sensor",
      "pump",
      "robot",
      "autonomous",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Autonomous robot that navigates to fires and extinguishes them",
    "fullDesc": "An autonomous firefighting robot that uses flame sensors in 3 directions to locate and navigate toward a fire source, then activates a water pump and servo-mounted nozzle to extinguish it.",
    "howItWorks": [
      "3 flame sensors (front, left, right) detect IR radiation from fire",
      "Robot steers toward strongest flame sensor reading",
      "Within 15cm of fire: stop, activate water pump",
      "Servo rotates nozzle to sweep water across fire",
      "Returns to base position after extinguishing"
    ],
    "codeSnippet": "int flameL = analogRead(FLAME_LEFT);\nint flameF = analogRead(FLAME_FRONT);\nint flameR = analogRead(FLAME_RIGHT);\n\nif (flameF < FIRE_THRESHOLD) {\n    moveForward();\n} else if (flameL < flameR) {\n    turnLeft();\n} else if (flameR < flameL) {\n    turnRight();\n}\nif (flameF < EXTINGUISH_DIST) {\n    stopMotors();\n    activatePump(3000);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "military_vehicle",
    "name": "Tactical RC Surveillance Vehicle",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "RF",
      "tank tracks",
      "remote control",
      "turret",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "RC military vehicle with servo turret and camera feed",
    "fullDesc": "A remote-controlled military-style vehicle with tank tracks, a rotating servo turret, and an ESP32-CAM providing live FPV (First Person View) video stream. Controlled via a custom RF module with proportional steering.",
    "howItWorks": [
      "NRF24L01 RF module provides long-range control (100m+)",
      "Tank tracks on each side driven by high-torque motors",
      "Servo pan/tilt mount for turret rotation",
      "ESP32-CAM streams video over WiFi to browser",
      "Custom RC transmitter with dual joysticks"
    ],
    "codeSnippet": "// Receiver side\nif (radio.available()) {\n    radio.read(&data, sizeof(data));\n    \n    int leftSpeed  = data.joyY + data.joyX;\n    int rightSpeed = data.joyY - data.joyX;\n    \n    setTrack(LEFT,  constrain(leftSpeed,  -255, 255));\n    setTrack(RIGHT, constrain(rightSpeed, -255, 255));\n    \n    turretServo.write(data.turretAngle);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_bike",
    "name": "Smart Bike System",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "GPS",
      "speed",
      "helmet",
      "IoT",
      "bike safety",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Intelligent bike system with GPS tracking and helmet safety lock",
    "fullDesc": "A smart bicycle system that tracks GPS location, measures speed via reed switch on wheel, has a helmet-lock safety feature (bike won't start without helmet), and sends crash alerts via GSM.",
    "howItWorks": [
      "Reed switch + magnet on wheel calculates RPM → speed",
      "Neo-6M GPS tracks real-time position",
      "Helmet RFID chip paired with bike lock system",
      "Accelerometer detects crash signature (sudden decel)",
      "GSM sends SMS crash alert with GPS coordinates"
    ],
    "codeSnippet": "// Crash detection\nfloat accelX = mpu.getAccelerationX();\nfloat accelY = mpu.getAccelerationY();\nfloat totalG  = sqrt(accelX*accelX + accelY*accelY);\n\nif (totalG > CRASH_G_THRESHOLD && speed > MIN_CRASH_SPEED) {\n    sendSMS(emergencyNumber, \n            \"CRASH detected! Location: \" + \n            gps.getLatLon());\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "vr_firefighter",
    "name": "Firefighter Simulator VR",
    "category": "vr_games",
    "featured": true,
    "tags": [
      "Unity",
      "VR",
      "SteamVR",
      "C#",
      "simulation",
      "Blender",
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "Immersive VR firefighting simulation with physics and fire dynamics",
    "fullDesc": "A fully immersive Virtual Reality firefighting training simulation built in Unity with SteamVR integration. Features dynamic fire spread simulation, realistic water physics, structural damage modeling, and VR-native hand interactions with firefighting equipment.",
    "howItWorks": [
      "Unity 3D with SteamVR Plugin for VR headset integration",
      "Custom fire spread simulation: heat-based cellular automaton",
      "VR hands grab hose, open water valve, feel recoil",
      "Blender models: building, equipment, vehicles",
      "Steam Audio for spatial 3D sound of fire and water",
      "Scoring system: fire extinguished, time taken, area saved"
    ],
    "codeSnippet": "// Fire spread system\nvoid SpreadFire(Vector3 origin, float intensity) {\n    Collider[] nearby = Physics.OverlapSphere(origin, SPREAD_RADIUS);\n    foreach(Collider col in nearby) {\n        if (col.TryGetComponent<Flammable>(out var flammable)) {\n            float heatTransfer = intensity * (1 - col.distance/SPREAD_RADIUS);\n            flammable.ApplyHeat(heatTransfer * Time.deltaTime);\n        }\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "memory_game",
    "name": "Embedded Tactile Memory Game Unit",
    "category": "vr_games",
    "featured": false,
    "tags": [
      "HTML",
      "JavaScript",
      "CSS",
      "game",
      "memory",
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "Card matching memory game with animations and score tracking",
    "fullDesc": "A polished card-matching memory game with smooth flip animations, difficulty levels, time pressure mode, and high score tracking. Features a clean modern UI with themed card decks.",
    "howItWorks": [
      "Cards shuffled using Fisher-Yates algorithm on each game start",
      "CSS 3D transform creates realistic card flip animation",
      "3 difficulty levels: 4×4, 6×6, 8×8 grids",
      "Timer and move counter tracked per game",
      "LocalStorage saves high scores per difficulty level"
    ],
    "codeSnippet": "function flipCard() {\n    this.classList.add('flipped');\n    flippedCards.push(this);\n    \n    if (flippedCards.length === 2) {\n        moves++;\n        if (flippedCards[0].dataset.card === \n            flippedCards[1].dataset.card) {\n            lockBoard = false;\n            checkWin();\n        } else {\n            setTimeout(() => unflipCards(), 1000);\n        }\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "planets_exploration",
    "name": "3D Solar System Planet Exploration Simulator",
    "category": "vr_games",
    "featured": false,
    "tags": [
      "Unity",
      "3D",
      "space",
      "simulation",
      "educational",
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "3D interactive solar system exploration with planetary facts",
    "fullDesc": "An interactive 3D solar system simulation built in Unity where users can explore planets, moons, and space objects. Clicking on any planet displays real scientific data and an animated fact card.",
    "howItWorks": [
      "Accurately scaled solar system with Keplerian orbital mechanics",
      "Clickable planet triggers info panel with NASA data",
      "Flythrough camera mode to navigate between planets",
      "Day/night cycle simulation with realistic sun lighting",
      "Scale mode: switch between true scale and comparative scale"
    ],
    "codeSnippet": "// Orbital mechanics\nvoid Update() {\n    orbitalAngle += (360f / orbitalPeriodDays) * Time.deltaTime;\n    \n    float x = Mathf.Cos(orbitalAngle * Mathf.Deg2Rad) * orbitalRadius;\n    float z = Mathf.Sin(orbitalAngle * Mathf.Deg2Rad) * orbitalRadius;\n    \n    transform.position = new Vector3(x, 0, z);\n    transform.Rotate(Vector3.up, rotationSpeed * Time.deltaTime);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "playtopia",
    "name": "Playtopia (Web Platform)",
    "category": "vr_games",
    "featured": false,
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "web",
      "gaming platform",
      "Raspberry Pi 4 Model B",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "Web-based gaming and entertainment platform with multiple games",
    "fullDesc": "A web-based gaming hub platform featuring multiple mini-games, user profiles, leaderboards, and a clean game-discovery interface. Built as a full website with multi-page navigation.",
    "howItWorks": [
      "Multi-page HTML website with consistent navigation",
      "Game launcher cards with preview screenshots",
      "CSS grid-based responsive layout",
      "JavaScript handles page transitions and game launches",
      "LocalStorage for user preferences and scores"
    ],
    "codeSnippet": "// Dynamic game card generation\ngames.forEach(game => {\n    const card = document.createElement('div');\n    card.className = 'game-card';\n    card.innerHTML = `\n        <img src=\"${game.thumbnail}\" alt=\"${game.name}\">\n        <div class=\"card-info\">\n            <h3>${game.name}</h3>\n            <span class=\"genre\">${game.genre}</span>\n            <button onclick=\"launch('${game.id}')\">Play</button>\n        </div>`;\n    gameGrid.appendChild(card);\n});",
    "techStack": [
      "Raspberry Pi 4 Model B",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "unity_physics",
    "name": "Unity 3D Physics Lab",
    "category": "vr_games",
    "featured": false,
    "tags": [
      "Unity",
      "physics",
      "C#",
      "simulation",
      "educational",
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "Interactive physics simulation lab for educational demonstrations",
    "fullDesc": "An educational Unity-based physics lab where students can perform virtual physics experiments: projectile motion, pendulums, spring oscillations, and collision simulations with adjustable parameters and real-time graphs.",
    "howItWorks": [
      "Unity physics engine handles all simulation dynamics",
      "UI sliders adjust mass, velocity, gravity, friction",
      "Real-time graph plots position/velocity/acceleration",
      "Slow-motion mode for detailed observation",
      "Save & compare: run multiple trials side by side"
    ],
    "codeSnippet": "// Projectile simulation\nIEnumerator LaunchProjectile(float angle, float speed) {\n    rb.velocity = new Vector2(\n        speed * Mathf.Cos(angle * Mathf.Deg2Rad),\n        speed * Mathf.Sin(angle * Mathf.Deg2Rad)\n    );\n    while (!grounded) {\n        dataLogger.Log(transform.position, rb.velocity);\n        yield return new WaitForFixedUpdate();\n    }\n    graphRenderer.DrawTrajectory(dataLogger.positions);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "mini_siri",
    "name": "Mini Siri (Voice Assistant)",
    "category": "speech_vision",
    "featured": true,
    "tags": [
      "Python",
      "speech recognition",
      "NLP",
      "voice assistant",
      "text-to-speech",
      "Raspberry Pi 4 Model B",
      "USB HD Camera",
      "OpenCV"
    ],
    "shortDesc": "Custom voice assistant with natural language command processing",
    "fullDesc": "A custom Python-based voice assistant similar to Siri/Alexa. Recognizes spoken commands using Google Speech Recognition, processes intent with keyword matching, and responds via text-to-speech. Can control PC, search web, tell time, jokes, and more.",
    "howItWorks": [
      "PyAudio captures microphone input",
      "Google Speech Recognition API converts speech to text",
      "Intent parser extracts command type from keywords",
      "Actions: open apps, web search, weather, time, jokes, math",
      "pyttsx3 synthesizes responses as speech output"
    ],
    "codeSnippet": "import speech_recognition as sr\nimport pyttsx3\n\ndef listen():\n    with sr.Microphone() as source:\n        audio = recognizer.listen(source)\n    return recognizer.recognize_google(audio)\n\ndef respond(command):\n    if \"time\" in command:\n        speak(f\"It's {datetime.now().strftime('%I:%M %p')}\")\n    elif \"search\" in command:\n        query = command.replace(\"search\", \"\").strip()\n        webbrowser.open(f\"https://google.com/search?q={query}\")",
    "techStack": [
      "Raspberry Pi 4 Model B",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "gaze_tracking",
    "name": "Gaze Tracking System",
    "category": "speech_vision",
    "featured": false,
    "tags": [
      "Python",
      "OpenCV",
      "dlib",
      "eye tracking",
      "gaze",
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera"
    ],
    "shortDesc": "Real-time gaze tracking mapping eye direction to screen coordinates",
    "fullDesc": "A gaze tracking system that maps eye direction to screen coordinates without specialized hardware — using just a standard webcam. Calibration phase maps gaze vectors to screen positions for cursor control or gaze-based UI.",
    "howItWorks": [
      "dlib 68-point face landmark detection",
      "Pupil center extracted from eye ROI via ellipse fitting",
      "4-point calibration maps gaze vectors to screen corners",
      "Polynomial regression estimates screen gaze point",
      "Smooth gaze cursor overlaid on any application"
    ],
    "codeSnippet": "class GazeTracker:\n    def calibrate(self, corners):\n        \"\"\"Map gaze vectors to screen corners\"\"\"\n        self.calibration_points = []\n        for corner in corners:\n            vectors = self.capture_gaze_vectors(n=30)\n            self.calibration_points.append((vectors.mean(0), corner))\n        self.model = PolynomialRegression(degree=2)\n        self.model.fit(gaze_vecs, screen_points)\n    \n    def get_gaze_point(self):\n        gaze_vec = self.get_current_vector()\n        return self.model.predict([gaze_vec])[0]",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "air_mouse",
    "name": "MEMS Motion-Controlled Wireless Air Mouse",
    "category": "speech_vision",
    "featured": false,
    "tags": [
      "MPU6050",
      "Arduino",
      "gyroscope",
      "mouse",
      "gesture",
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Python",
      "OpenCV"
    ],
    "shortDesc": "Gyroscope-based hand gesture mouse for touchless PC control",
    "fullDesc": "A hand-held wireless mouse replacement that uses an MPU6050 IMU sensor to translate hand rotations and movements into mouse cursor movement and clicks. Works as a HID device via USB.",
    "howItWorks": [
      "MPU6050 provides 6-DOF acceleration and gyroscope data",
      "Kalman filter fuses accel + gyro for stable orientation",
      "Euler angles mapped to relative cursor velocity",
      "Flex sensor on index finger triggers left click",
      "Arduino Leonardo acts as native USB HID mouse"
    ],
    "codeSnippet": "void loop() {\n    float pitch = imu.getPitch();\n    float roll  = imu.getRoll();\n    \n    float dx = roll  * SENSITIVITY;\n    float dy = pitch * SENSITIVITY;\n    \n    Mouse.move((int)dx, (int)dy, 0);\n    \n    if (analogRead(FLEX_PIN) > CLICK_THRESHOLD) {\n        if (!clicking) { Mouse.press(MOUSE_LEFT); clicking = true; }\n    } else {\n        if (clicking) { Mouse.release(MOUSE_LEFT); clicking = false; }\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "sound_direction",
    "name": "Sound Direction Detection",
    "category": "speech_vision",
    "featured": false,
    "tags": [
      "Arduino",
      "microphone",
      "TDOA",
      "sound localization",
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Python",
      "OpenCV"
    ],
    "shortDesc": "Multi-mic array determining the direction of a sound source",
    "fullDesc": "A 4-microphone array that determines the horizontal direction of a sound source using Time Difference of Arrival (TDOA) measurements. LEDs indicate the detected sound direction on a compass-style display.",
    "howItWorks": [
      "4 microphones placed at 90° intervals on circular PCB",
      "Arduino samples all 4 mics simultaneously via ADC",
      "Cross-correlation finds time delay between mic pairs",
      "TDOA from each pair triangulates horizontal angle",
      "8 LEDs in circle show detected direction"
    ],
    "codeSnippet": "int findDirection(int* samples_A, int* samples_B, int len) {\n    int maxCorr = 0, bestDelay = 0;\n    for(int d = -MAX_DELAY; d <= MAX_DELAY; d++) {\n        int corr = 0;\n        for(int i = MAX_DELAY; i < len - MAX_DELAY; i++) {\n            corr += samples_A[i] * samples_B[i + d];\n        }\n        if(corr > maxCorr) { maxCorr = corr; bestDelay = d; }\n    }\n    return bestDelay;  // Convert to angle\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "smart_helmet",
    "name": "Smart Workers Helmet",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "gas sensor",
      "temperature",
      "GPS",
      "safety",
      "industrial",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Industrial safety helmet with gas, temp, and GPS monitoring",
    "fullDesc": "A smart safety helmet for industrial workers embedded with gas sensors (MQ-7 for CO, MQ-135 for air quality), temperature sensor, GPS tracker, and panic button. All readings transmitted to a supervisor dashboard.",
    "howItWorks": [
      "MQ-7 detects CO levels (dangerous > 35ppm)",
      "MQ-135 monitors air quality index",
      "DHT22 measures ambient temperature near worker",
      "Neo-6M GPS provides real-time worker location",
      "Panic button triggers immediate SOS with location"
    ],
    "codeSnippet": "void monitorSafety() {\n    float co_ppm  = readMQ7();\n    float aqi     = readMQ135();\n    float temp    = dht.readTemperature();\n    String loc    = gps.getLatLon();\n    \n    if(co_ppm > CO_LIMIT || aqi > AQI_LIMIT || temp > TEMP_LIMIT) {\n        buzzAlert();\n        gsm.sendSMS(supervisor, \n            \"DANGER: Worker at \" + loc + \n            \" CO:\" + co_ppm + \" AQI:\" + aqi);\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "driver_helmet",
    "name": "Smart Safety Helmet with Hazard Detection",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "alcohol sensor",
      "motorbike",
      "safety",
      "ignition lock",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Helmet with alcohol detection preventing drunk riding",
    "fullDesc": "A safety system for motorcycles that prevents drunk riding. The helmet contains an alcohol sensor; the engine ignition is controlled by an Arduino relay — if blood alcohol exceeds the legal limit, the bike won't start.",
    "howItWorks": [
      "MQ-3 alcohol sensor in helmet near rider's face",
      "Rider breathes normally; sensor reads alcohol vapor",
      "Below limit: relay closes, ignition works normally",
      "Above limit: relay opens, engine cannot start",
      "OLED display shows alcohol level and status",
      "Override PIN code for emergency use"
    ],
    "codeSnippet": "float alcoholLevel = readMQ3_BAC();\noled.print(\"BAC: \" + String(alcoholLevel, 2) + \" g/L\");\n\nif (alcoholLevel > LEGAL_BAC_LIMIT) {\n    digitalWrite(IGNITION_RELAY, LOW);  // Lock ignition\n    oled.print(\"DRUNK DETECTED\");\n    tone(BUZZER, 2000, 500);\n} else {\n    digitalWrite(IGNITION_RELAY, HIGH); // Allow start\n    oled.print(\"Safe to Ride\");\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "ultrasonic_radar",
    "name": "2D Ultrasonic Radar Mapping System",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "Processing",
      "radar",
      "ultrasonic",
      "visualization",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "360° radar system with real-time Processing.js visualization",
    "fullDesc": "A radar system using a servo-mounted ultrasonic sensor that sweeps 180° and displays detected objects on a radar-style circular display in Processing IDE. Objects are shown as dots with distance and angle data.",
    "howItWorks": [
      "HC-SR04 mounted on servo sweeps from 15° to 165°",
      "Each degree: measure distance, send angle+distance via Serial",
      "Processing sketch draws radar circles and sweep line",
      "Detected objects plotted as red dots on radar display",
      "Range rings at 50cm, 100cm, 150cm, 200cm"
    ],
    "codeSnippet": "// Arduino: sweep and measure\nfor(int angle = 15; angle <= 165; angle++) {\n    myServo.write(angle);\n    delay(30);\n    int dist = getDistance();\n    Serial.println(angle + \",\" + dist);\n}\n\n// Processing: draw radar display\nvoid drawDetection(int angle, int dist) {\n    float x = dist * cos(radians(angle));\n    float y = dist * sin(radians(angle));\n    fill(255, 0, 0);\n    ellipse(centerX + x, centerY - y, 5, 5);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "big_clock",
    "name": "Big Digital Clock",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "7-segment",
      "RTC",
      "large display",
      "clock",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Large 7-segment display wall clock with alarm and temperature",
    "fullDesc": "A large-scale digital wall clock built with 4-digit 7-segment displays, showing time, date, and temperature. Features configurable alarms and brightness control based on ambient light.",
    "howItWorks": [
      "DS3231 RTC for highly accurate timekeeping (±2ppm)",
      "4× 4-digit 7-segment modules daisy-chained via I2C",
      "LDR automatically adjusts display brightness",
      "3 configurable alarms with buzzer",
      "DHT22 shows temperature on secondary display"
    ],
    "codeSnippet": "void displayTime() {\n    DateTime now = rtc.now();\n    \n    int hour = now.hour();\n    int minute = now.minute();\n    int second = now.second();\n    \n    // Display HH:MM:SS with blinking colon\n    display.showNumberDecEx(hour*100 + minute, \n                            (second % 2) ? 0x40 : 0x00, true);\n    \n    adjustBrightness(analogRead(LDR_PIN));\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "rfid_system",
    "name": "RFID Access System",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "RFID",
      "RC522",
      "access control",
      "I2C LCD",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "RFID card-based access control with user management",
    "fullDesc": "An RFID-based access control system supporting multiple registered cards, access log display on LCD, and green/red LED + buzzer feedback. Card UIDs stored in EEPROM for persistence without external storage.",
    "howItWorks": [
      "RC522 RFID reader scans Mifare 13.56MHz cards/fobs",
      "Card UID compared against registered UIDs in EEPROM",
      "Match: green LED + open relay (1 second) + 'Access Granted'",
      "No match: red LED + long buzzer + 'Access Denied'",
      "Admin card toggles registration mode for new cards"
    ],
    "codeSnippet": "if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {\n    byte uid[4];\n    memcpy(uid, rfid.uid.uidByte, 4);\n    \n    if (isRegistered(uid)) {\n        grantAccess();\n        lcd.print(\"Welcome, \" + getName(uid));\n        logEntry(uid, true);\n    } else {\n        denyAccess();\n        lcd.print(\"Access Denied\");\n        logEntry(uid, false);\n    }\n    rfid.PICC_HaltA();\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "compass",
    "name": "Digital Magnetometer Compass Navigation Unit",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "magnetometer",
      "HMC5883L",
      "compass",
      "OLED",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Digital magnetic compass with OLED direction display",
    "fullDesc": "A digital compass using the HMC5883L magnetometer IC to measure Earth's magnetic field and calculate heading. Displayed on an OLED screen with a graphical compass rose and numerical degree readout.",
    "howItWorks": [
      "HMC5883L measures X,Y,Z magnetic field components",
      "Hard-iron calibration removes local magnetic distortion",
      "Heading = atan2(Y, X) converted to 0-360°",
      "OLED draws animated compass rose with needle",
      "Tilt compensation using accelerometer data"
    ],
    "codeSnippet": "void readCompass() {\n    sensors_vec_t mag;\n    mag_sensor.getEvent(&mag_event);\n    \n    float heading = atan2(mag_event.magnetic.y, \n                          mag_event.magnetic.x) * 180.0 / PI;\n    if (heading < 0) heading += 360;\n    \n    // Draw compass rose on OLED\n    float rad = heading * PI / 180.0;\n    int nx = centerX + NEEDLE_LEN * sin(rad);\n    int ny = centerY - NEEDLE_LEN * cos(rad);\n    display.drawLine(centerX, centerY, nx, ny, WHITE);\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_safe_stm",
    "name": "Biometric & PIN Safe Security System (STM32)",
    "category": "hardware",
    "featured": false,
    "tags": [
      "STM32",
      "RFID",
      "keypad",
      "fingerprint",
      "servo",
      "safe",
      "STM32F4 Arm Cortex-M4 Board",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Triple-authentication smart safe using STM32 microcontroller",
    "fullDesc": "A high-security smart safe built with STM32 requiring triple authentication: RFID card + PIN keypad + fingerprint sensor. Uses STM32 for faster processing of fingerprint templates and real-time TFT feedback.",
    "howItWorks": [
      "AS608 fingerprint sensor stores up to 127 templates",
      "4×4 matrix keypad for PIN entry",
      "RFID RC522 for card authentication",
      "All 3 must pass for servo to unlock",
      "TFT display guides user through authentication steps",
      "Failed attempts logged, lockout after 3 failures"
    ],
    "codeSnippet": "AuthState authenticate() {\n    // Stage 1: RFID\n    if (!waitForRFID(TIMEOUT)) return AUTH_FAIL;\n    \n    // Stage 2: PIN\n    String pin = getKeypadInput();\n    if (!checkPIN(pin)) return AUTH_FAIL;\n    \n    // Stage 3: Fingerprint\n    int id = getFingerprint();\n    if (id < 0) return AUTH_FAIL;\n    \n    openSafe();\n    logAccess(id, getCurrentTime());\n    return AUTH_SUCCESS;\n}",
    "techStack": [
      "STM32F4 Arm Cortex-M4 Board",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "cashiq",
    "name": "CashIQ React App",
    "category": "web_apps",
    "featured": true,
    "tags": [
      "React",
      "JavaScript",
      "finance",
      "budget tracker",
      "web app",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "JavaScript ES6+",
      "React.js"
    ],
    "shortDesc": "Personal finance management app built with React",
    "fullDesc": "A full-featured personal finance management web application built with React. Features expense tracking, budget setting, income logging, category-based analytics, and visual charts for spending patterns.",
    "howItWorks": [
      "React SPA with component-based architecture",
      "Context API for global state management",
      "Chart.js for expense visualization (pie, bar, line)",
      "LocalStorage for data persistence",
      "Category system: Food, Transport, Entertainment, Utilities",
      "Monthly budget vs spending comparison"
    ],
    "codeSnippet": "const ExpenseContext = createContext();\n\nfunction ExpenseProvider({ children }) {\n    const [transactions, setTransactions] = useState(\n        JSON.parse(localStorage.getItem('cashiq_data')) || []\n    );\n    \n    const addTransaction = (transaction) => {\n        const updated = [...transactions, \n                         { ...transaction, id: Date.now() }];\n        setTransactions(updated);\n        localStorage.setItem('cashiq_data', JSON.stringify(updated));\n    };\n    \n    return (\n        <ExpenseContext.Provider value={{ transactions, addTransaction }}>\n            {children}\n        </ExpenseContext.Provider>\n    );\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "JavaScript ES6+",
      "React.js",
      "Node.js / Express",
      "HTML5 & CSS3"
    ]
  },
  {
    "id": "podix",
    "name": "Podix",
    "category": "web_apps",
    "featured": false,
    "tags": [
      "web",
      "platform",
      "JavaScript",
      "HTML",
      "CSS",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "JavaScript ES6+",
      "React.js"
    ],
    "shortDesc": "Full-featured web platform with modern UI design",
    "fullDesc": "A modern web platform application with comprehensive UI components, user authentication flows, dashboard analytics, and responsive design. Features a polished design system with dark/light mode support.",
    "howItWorks": [
      "Multi-page web application with SPA-like routing",
      "Responsive design system with CSS custom properties",
      "Interactive dashboard with animated stat cards",
      "Form validation with real-time feedback",
      "Dark/Light mode toggle with localStorage persistence"
    ],
    "codeSnippet": "// Theme system\nconst ThemeManager = {\n    toggle() {\n        const isDark = document.body.classList.toggle('dark-mode');\n        localStorage.setItem('theme', isDark ? 'dark' : 'light');\n        this.updateIcon(isDark);\n    },\n    init() {\n        const saved = localStorage.getItem('theme') || 'light';\n        if (saved === 'dark') document.body.classList.add('dark-mode');\n    }\n};",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "JavaScript ES6+",
      "React.js",
      "Node.js / Express",
      "HTML5 & CSS3"
    ]
  },
  {
    "id": "astro_attendance",
    "name": "Biometric ASTRO Attendance Terminal",
    "category": "web_apps",
    "featured": false,
    "tags": [
      "web",
      "attendance",
      "dashboard",
      "students",
      "management",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "JavaScript ES6+",
      "React.js"
    ],
    "shortDesc": "Web-based student attendance tracking and reporting system",
    "fullDesc": "A comprehensive attendance management web application for educational institutions. Tracks student attendance by class, subject, and date, generates reports, and alerts instructors about chronic absenteeism.",
    "howItWorks": [
      "Multi-role system: Admin, Instructor, Student views",
      "Attendance marked via QR code or manual entry",
      "Automatic absence rate calculation per student",
      "Email alerts when student exceeds absence threshold",
      "Excel/PDF export for attendance reports"
    ],
    "codeSnippet": "function markAttendance(studentId, classId, date) {\n    const record = {\n        student: studentId,\n        class: classId,\n        date: date,\n        timestamp: new Date().toISOString(),\n        method: 'QR_SCAN'\n    };\n    \n    db.attendance.add(record);\n    updateAbsenceRate(studentId, classId);\n    \n    if (getAbsenceRate(studentId, classId) > THRESHOLD) {\n        sendAbsenceAlert(studentId, classId);\n    }\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "JavaScript ES6+",
      "React.js",
      "Node.js / Express",
      "HTML5 & CSS3"
    ]
  },
  {
    "id": "smart_data_center",
    "name": "Data Center Environmental & Power Monitoring System",
    "category": "web_apps",
    "featured": false,
    "tags": [
      "IoT",
      "monitoring",
      "data center",
      "dashboard",
      "temperature",
      "ESP32",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "JavaScript ES6+",
      "React.js"
    ],
    "shortDesc": "IoT monitoring dashboard for server room environmental control",
    "fullDesc": "A smart monitoring and control system for data centers/server rooms. Monitors temperature, humidity, power consumption, and equipment status, with automated cooling control and alert escalation.",
    "howItWorks": [
      "ESP32 nodes monitor temp/humidity at multiple rack positions",
      "Current sensors measure per-rack power draw",
      "MQTT broker aggregates all sensor data centrally",
      "Grafana dashboard shows real-time heat maps of the room",
      "Auto-trigger cooling when any zone exceeds threshold"
    ],
    "codeSnippet": "// Heat map generation\nfunction generateHeatMap(sensorReadings) {\n    const canvas = document.getElementById('heatmap');\n    const ctx = canvas.getContext('2d');\n    \n    sensorReadings.forEach(sensor => {\n        const color = tempToColor(sensor.temperature);\n        const grad = ctx.createRadialGradient(\n            sensor.x, sensor.y, 0, sensor.x, sensor.y, 50);\n        grad.addColorStop(0, color);\n        grad.addColorStop(1, 'transparent');\n        ctx.fillStyle = grad;\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\n    });\n}",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "JavaScript ES6+",
      "React.js",
      "Node.js / Express",
      "HTML5 & CSS3"
    ]
  },
  {
    "id": "4wd_car",
    "name": "4WD Autonomous & Bluetooth Robotic Car",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The 4WD Autonomous & Bluetooth Robotic Car is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// 4wd Car\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "ann_breast_cancer_prediction_ml",
    "name": "Breast Cancer Malignancy Prediction (ANN)",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Breast Cancer Malignancy Prediction (ANN) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// ANN Breast Cancer Prediction (ML)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "astro_attendance",
    "name": "Biometric ASTRO Attendance Terminal",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Biometric ASTRO Attendance Terminal is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// ASTRO Attendance\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "big_water_pump",
    "name": "High-Capacity Industrial Water Pump Controller",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The High-Capacity Industrial Water Pump Controller is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Big Water Pump\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "brain_tumor_detection_using_mri_images_cnn",
    "name": "Brain Tumor Classification from MRI Scans (CNN)",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "CNN",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Brain Tumor Classification from MRI Scans (CNN) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Brain Tumor Detection Using MRI Images (CNN)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "car_charging_station",
    "name": "EV Smart Charging Station Terminal",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The EV Smart Charging Station Terminal is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Car Charging Station\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "car_counter",
    "name": "Computer Vision Vehicle Traffic Counter",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Computer Vision Vehicle Traffic Counter is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Car Counter\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "clock_alarm",
    "name": "Precision RTC Digital Alarm System",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Precision RTC Digital Alarm System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Clock Alarm\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "coffee_cup",
    "name": "Thermal Sensing Smart Beverage Warmer",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Thermal Sensing Smart Beverage Warmer is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Coffee Cup\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "coffee_cup_2",
    "name": "Temperature-Controlled Smart Cup v2",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Temperature-Controlled Smart Cup v2 is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Coffee Cup 2\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "compass",
    "name": "Digital Magnetometer Compass Navigation Unit",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Digital Magnetometer Compass Navigation Unit is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Compass\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "dht_drone",
    "name": "Aerial Telemetry Drone with Environmental Sensors",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Aerial Telemetry Drone with Environmental Sensors is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// DHT Drone\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "driver_helmet",
    "name": "Smart Safety Helmet with Hazard Detection",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Smart Safety Helmet with Hazard Detection is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Driver Helmet\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "drowsiness_project",
    "name": "Real-time Driver Fatigue Detection System",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Real-time Driver Fatigue Detection System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Drowsiness Project\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "drugs",
    "name": "Smart Medication Dispenser & Tracking System",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Smart Medication Dispenser & Tracking System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Drugs\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "el_shahabia_square",
    "name": "Smart City Traffic Light Management System",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Smart City Traffic Light Management System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// El-Shahabia Square\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "eldabos",
    "name": "eldabos",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The eldabos is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// eldabos\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "face_recognition_based_attendance_monitoring_system_using_esp32_and_esp_cam",
    "name": "Edge Face Recognition Attendance (ESP32-CAM)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "ESP32",
      "ESP32 Microcontroller",
      "ESP32-CAM Module",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The Edge Face Recognition Attendance (ESP32-CAM) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using ESP32 Microcontroller, ESP32-CAM Module, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: ESP32-CAM Module capture continuous environmental or operational telemetry.",
      "Edge Processing: ESP32 Microcontroller processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Face Recognition Based Attendance Monitoring System Using ESP32 and Esp-Cam\n// Source code available in the project repository.",
    "techStack": [
      "ESP32 Microcontroller",
      "ESP32-CAM Module",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "face_recognition_based_attendance_monitoring_system22",
    "name": "Multi-User Facial Recognition Access System",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The Multi-User Facial Recognition Access System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Edge AI Compute Unit / GPU capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Face Recognition Based Attendance Monitoring System22\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "fighter_car",
    "name": "Combat Robotics RC Vehicle Platform",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Combat Robotics RC Vehicle Platform is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Fighter Car\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "firefighter_simulator_vr_main",
    "name": "VR Firefighting Incident Training Simulator",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The VR Firefighting Incident Training Simulator is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Firefighter Simulator VR Main\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "firefighter_car",
    "name": "Flame-Detecting Fire Extinguisher Rover",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Flame-Detecting Fire Extinguisher Rover is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Firefighter Car\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "fire_car",
    "name": "Autonomous Firefighting Mobile Robot",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Autonomous Firefighting Mobile Robot is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// fire car\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gas_fire_detection",
    "name": "Hazardous Gas & Flame Safety Monitoring Node",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Hazardous Gas & Flame Safety Monitoring Node is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Gas Fire Detection\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gas_fire_fighter",
    "name": "Automated Gas Suppressant Fire Robot",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Automated Gas Suppressant Fire Robot is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Gas Fire Fighter\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gaze_wheelchair_full",
    "name": "Integrated Gaze-Controlled Electric Wheelchair",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Integrated Gaze-Controlled Electric Wheelchair is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Gaze WheelChair (Full)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gazetracking",
    "name": "Eye Gaze Tracking & Landmark Vector Engine",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Eye Gaze Tracking & Landmark Vector Engine is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// GazeTracking\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gazetracking2",
    "name": "High-Precision Corneal Reflection Gaze Tracker",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The High-Precision Corneal Reflection Gaze Tracker is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// GazeTracking2\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gaze_keyboard",
    "name": "Eye-Tracking Virtual Assistive Keyboard",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Eye-Tracking Virtual Assistive Keyboard is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Gaze Keyboard\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "gender_recognition_speech_recognition",
    "name": "Acoustic Speaker Gender Classification (SVM)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The Acoustic Speaker Gender Classification (SVM) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Edge AI Compute Unit / GPU capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Gender Recognition (Speech Recognition)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "glasses_project",
    "name": "glasses project",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The glasses project is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// glasses project\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "glasses_project_final",
    "name": "Assistive Vision Glasses for Visually Impaired",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Assistive Vision Glasses for Visually Impaired is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// glasses project final\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "handwritten_digit_recognition_cnn",
    "name": "Handwritten Digit Recognition Pipeline (MNIST CNN)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "CNN",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The Handwritten Digit Recognition Pipeline (MNIST CNN) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Edge AI Compute Unit / GPU capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Handwritten Digit Recognition (CNN)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "houses_prices_feature_selection_ml",
    "name": "House Price Estimation Engine (Ensemble ML)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The House Price Estimation Engine (Ensemble ML) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Edge AI Compute Unit / GPU capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Houses Prices Feature Selection (ML)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "insulin_benkerias",
    "name": "Smart Continuous Insulin Delivery Monitor",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Smart Continuous Insulin Delivery Monitor is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Insulin Benkerias\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "joe",
    "name": "Embedded Audio Synthesizer Interface",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Embedded Audio Synthesizer Interface is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// joe\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "joe_sound",
    "name": "Digital Audio Signal Processing Module",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Digital Audio Signal Processing Module is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Joe Sound\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "joystick",
    "name": "Analog Dual-Axis Joystick Controller Node",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Analog Dual-Axis Joystick Controller Node is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// joystick\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "keyboard",
    "name": "Custom Mechanical Macro Matrix Keyboard",
    "category": "speech_vision",
    "featured": false,
    "tags": [
      "Python",
      "speech",
      "audio",
      "recognition",
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "OpenCV"
    ],
    "shortDesc": "A speech recognition or computer vision project processing audio/visual input.",
    "fullDesc": "The Custom Mechanical Macro Matrix Keyboard is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, USB HD Camera, Condenser Microphone, OLED Display.\n• Software & Algorithms: Powered by Python, OpenCV, PyAudio / SpeechRecognition, dlib Facial Landmarks.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: USB HD Camera capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Keyboard\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "last_mist_project",
    "name": "Automated Misting Nursery Controller",
    "category": "agriculture",
    "featured": false,
    "tags": [
      "ESP32",
      "sensors",
      "IoT",
      "automation",
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An agriculture or environmental monitoring project using smart sensors.",
    "fullDesc": "The Automated Misting Nursery Controller is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Capacitive Soil Moisture Sensor, Submersible 12V Water Pump, DHT22 Temp/Humidity Sensor.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Capacitive Soil Moisture Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// last Mist Project\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "lcd_alarm",
    "name": "I2C LCD Event & Alarm Terminal",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The I2C LCD Event & Alarm Terminal is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// LCD Alarm\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "line_follower_car_perfect",
    "name": "High-Speed Precision PID Line Follower Robot",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The High-Speed Precision PID Line Follower Robot is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Line Follower Car (perfect)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "line_following_car_biased",
    "name": "Biased Sensor Array Line Follower Car",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Biased Sensor Array Line Follower Car is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Line Following Car (biased)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "maze_car",
    "name": "Autonomous Maze Solving Micromouse Robot",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Autonomous Maze Solving Micromouse Robot is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// maze car\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "military_vehicle",
    "name": "Tactical RC Surveillance Vehicle",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Tactical RC Surveillance Vehicle is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Military Vehicle\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "mini_siri_speech_recognition",
    "name": "Offline Voice Command Assistant (Speech-to-Text)",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "Raspberry Pi 4 Model B",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The Offline Voice Command Assistant (Speech-to-Text) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Raspberry Pi 4 Model B, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Edge AI Compute Unit / GPU capture continuous environmental or operational telemetry.",
      "Edge Processing: Raspberry Pi 4 Model B processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Mini Siri (Speech Recognition)\n// Source code available in the project repository.",
    "techStack": [
      "Raspberry Pi 4 Model B",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "minidfplayer_nano",
    "name": "Arduino Hardware MP3 Audio Player Module",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Arduino Hardware MP3 Audio Player Module is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// MiniDfPlayer Nano\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "motor_reverse",
    "name": "H-Bridge Reversible DC Motor Driver",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The H-Bridge Reversible DC Motor Driver is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Motor Reverse\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "new_bike_system",
    "name": "Smart E-Bike Telemetry & Security Unit",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Smart E-Bike Telemetry & Security Unit is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// New Bike System\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "new_parking",
    "name": "Ultrasonic Multi-Bay Parking Indicator",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Ultrasonic Multi-Bay Parking Indicator is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// New Parking\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "period_dfplayer",
    "name": "Scheduled Voice Announcer Station",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The Scheduled Voice Announcer Station is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Period dfplayer\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "pid_controller",
    "name": "Precision Closed-Loop PID Control Unit",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Raspberry Pi",
      "Raspberry Pi 4 Model B",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Precision Closed-Loop PID Control Unit is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Raspberry Pi 4 Model B, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Raspberry Pi 4 Model B processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// PID Controller\n// Source code available in the project repository.",
    "techStack": [
      "Raspberry Pi 4 Model B",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "playtopia_web",
    "name": "Playtopia Interactive Web Gaming Platform",
    "category": "vr_games",
    "featured": false,
    "tags": [
      "Unity",
      "C#",
      "VR",
      "simulation",
      "Raspberry Pi",
      "Raspberry Pi 4 Model B",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "An interactive VR, simulation, or gaming experience project.",
    "fullDesc": "The Playtopia Interactive Web Gaming Platform is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Raspberry Pi 4 Model B, VR Headset (Oculus/Meta Quest), Motion Controllers.\n• Software & Algorithms: Powered by Unity 3D Engine, C# Scripting, Physics Engine, XR Interaction Toolkit.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: VR Headset (Oculus/Meta Quest) capture continuous environmental or operational telemetry.",
      "Edge Processing: Raspberry Pi 4 Model B processes incoming signals using Unity 3D Engine for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Playtopia (Web)\n// Source code available in the project repository.",
    "techStack": [
      "Raspberry Pi 4 Model B",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "smart_gloves",
    "name": "Sign Language Translator Flex Glove",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Sign Language Translator Flex Glove is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Gloves\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_lab_without_dashboard",
    "name": "Smart Laboratory Automation & Safety Station",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Smart Laboratory Automation & Safety Station is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Lab - Without Dashboard\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_splint_backend",
    "name": "Smart Splint Backend",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Smart Splint Backend is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Splint Backend\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smartcast_main",
    "name": "Smart Cast Wireless Telemetry System",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Smart Cast Wireless Telemetry System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// smartcast-main\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smartglasses_main",
    "name": "Heads-Up Display Smart Glasses Platform",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Heads-Up Display Smart Glasses Platform is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// SmartGlasses-main\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smartwateringsystem",
    "name": "IoT Soil Moisture Smart Irrigation System",
    "category": "agriculture",
    "featured": false,
    "tags": [
      "ESP32",
      "sensors",
      "IoT",
      "automation",
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An agriculture or environmental monitoring project using smart sensors.",
    "fullDesc": "The IoT Soil Moisture Smart Irrigation System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Capacitive Soil Moisture Sensor, Submersible 12V Water Pump, DHT22 Temp/Humidity Sensor.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Capacitive Soil Moisture Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// SmartWateringSystem\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_bin",
    "name": "Ultrasonic Touchless Smart Trash Bin",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Ultrasonic Touchless Smart Trash Bin is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Bin\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_car_w_ultrasonic",
    "name": "Autonomous Obstacle Avoidance Smart Car",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Autonomous Obstacle Avoidance Smart Car is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Car w Ultrasonic\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "smart_orange_helmet",
    "name": "Industrial Safety Helmet with Impact Detection",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Industrial Safety Helmet with Impact Detection is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Orange Helmet\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_parking",
    "name": "IoT Smart Parking Guidance System",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The IoT Smart Parking Guidance System is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Smart Parking\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "smart_safe_stm",
    "name": "Biometric & PIN Safe Security System (STM32)",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "STM32",
      "STM32F4 Arm Cortex-M4 Board",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Biometric & PIN Safe Security System (STM32) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using STM32F4 Arm Cortex-M4 Board, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: STM32F4 Arm Cortex-M4 Board processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// SMART SAFE STM\n// Source code available in the project repository.",
    "techStack": [
      "STM32F4 Arm Cortex-M4 Board",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "solar_building",
    "name": "Solar Energy Harvesting & Building Management Node",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Solar Energy Harvesting & Building Management Node is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Solar Building\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "sound_watch",
    "name": "Haptic Sound Detector Watch for Hearing Impaired",
    "category": "speech_vision",
    "featured": false,
    "tags": [
      "Python",
      "speech",
      "audio",
      "recognition",
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "OpenCV"
    ],
    "shortDesc": "A speech recognition or computer vision project processing audio/visual input.",
    "fullDesc": "The Haptic Sound Detector Watch for Hearing Impaired is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, USB HD Camera, Condenser Microphone, OLED Display.\n• Software & Algorithms: Powered by Python, OpenCV, PyAudio / SpeechRecognition, dlib Facial Landmarks.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: USB HD Camera capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Sound Watch\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "stm32_upload",
    "name": "STM32 Bootloader & Telemetry Interface",
    "category": "hardware",
    "featured": false,
    "tags": [
      "Arduino",
      "sensors",
      "embedded",
      "electronics",
      "STM32",
      "STM32F4 Arm Cortex-M4 Board",
      "Sensor Array",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An embedded electronics project using microcontrollers and sensors.",
    "fullDesc": "The STM32 Bootloader & Telemetry Interface is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using STM32F4 Arm Cortex-M4 Board, Sensor Array, Status LEDs, Custom PCB / Breadboard.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Sensor Array capture continuous environmental or operational telemetry.",
      "Edge Processing: STM32F4 Arm Cortex-M4 Board processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// STM32 Upload\n// Source code available in the project repository.",
    "techStack": [
      "STM32F4 Arm Cortex-M4 Board",
      "Sensor Array",
      "Status LEDs",
      "Custom PCB / Breadboard",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "stm_mist",
    "name": "STM32 Micro-Mist Nursery Controller",
    "category": "agriculture",
    "featured": false,
    "tags": [
      "ESP32",
      "sensors",
      "IoT",
      "automation",
      "STM32",
      "STM32F4 Arm Cortex-M4 Board",
      "Capacitive Soil Moisture Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An agriculture or environmental monitoring project using smart sensors.",
    "fullDesc": "The STM32 Micro-Mist Nursery Controller is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using STM32F4 Arm Cortex-M4 Board, Capacitive Soil Moisture Sensor, Submersible 12V Water Pump, DHT22 Temp/Humidity Sensor.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Capacitive Soil Moisture Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: STM32F4 Arm Cortex-M4 Board processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// STM Mist\n// Source code available in the project repository.",
    "techStack": [
      "STM32F4 Arm Cortex-M4 Board",
      "Capacitive Soil Moisture Sensor",
      "Submersible 12V Water Pump",
      "DHT22 Temp/Humidity Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "sumo_car",
    "name": "Autonomous Heavyweight Sumo Combat Robot",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Autonomous Heavyweight Sumo Combat Robot is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Sumo Car\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "swinging_bed",
    "name": "Infant Comfort Auto-Swinging Bed",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Infant Comfort Auto-Swinging Bed is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Swinging Bed\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "text_to_speech_speech_recognition",
    "name": "Bidirectional Voice & Text Communication Terminal",
    "category": "ai_ml",
    "featured": false,
    "tags": [
      "Python",
      "ML",
      "deep learning",
      "classification",
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Python 3.10",
      "TensorFlow / Keras"
    ],
    "shortDesc": "A machine learning or AI-powered project with intelligent decision making.",
    "fullDesc": "The Bidirectional Voice & Text Communication Terminal is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Edge AI Compute Unit / GPU, Camera Module.\n• Software & Algorithms: Powered by Python 3.10, TensorFlow / Keras, OpenCV, NumPy & Pandas, scikit-learn.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Edge AI Compute Unit / GPU capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python 3.10 for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Text To Speech (Speech Recognition)\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Edge AI Compute Unit / GPU",
      "Camera Module",
      "Python 3.10",
      "TensorFlow / Keras",
      "OpenCV",
      "NumPy & Pandas",
      "scikit-learn"
    ]
  },
  {
    "id": "touch_lcd_shield",
    "name": "Resistive Touch LCD GUI Interface Shield",
    "category": "smart_home",
    "featured": false,
    "tags": [
      "ESP32",
      "IoT",
      "WiFi",
      "dashboard",
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "An IoT / smart home project with connected sensors and automation.",
    "fullDesc": "The Resistive Touch LCD GUI Interface Shield is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, DHT22 Sensor, Relay Module, PIR Motion Sensor, 16x2 I2C LCD.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols, Firebase Realtime DB, MQTT Protocol, REST API.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: DHT22 Sensor capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Touch LCD Shield\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "DHT22 Sensor",
      "Relay Module",
      "PIR Motion Sensor",
      "16x2 I2C LCD",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols",
      "Firebase Realtime DB",
      "MQTT Protocol",
      "REST API"
    ]
  },
  {
    "id": "tts",
    "name": "Offline Text-to-Speech Engine Module",
    "category": "speech_vision",
    "featured": false,
    "tags": [
      "Python",
      "speech",
      "audio",
      "recognition",
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "OpenCV"
    ],
    "shortDesc": "A speech recognition or computer vision project processing audio/visual input.",
    "fullDesc": "The Offline Text-to-Speech Engine Module is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, USB HD Camera, Condenser Microphone, OLED Display.\n• Software & Algorithms: Powered by Python, OpenCV, PyAudio / SpeechRecognition, dlib Facial Landmarks.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: USB HD Camera capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Python for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// TTS\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "USB HD Camera",
      "Condenser Microphone",
      "OLED Display",
      "Python",
      "OpenCV",
      "PyAudio / SpeechRecognition",
      "dlib Facial Landmarks"
    ]
  },
  {
    "id": "unity_3d_physics_lab_main",
    "name": "Interactive 3D Physics Simulation Lab (Unity)",
    "category": "vr_games",
    "featured": false,
    "tags": [
      "Unity",
      "C#",
      "VR",
      "simulation",
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Unity 3D Engine",
      "C# Scripting"
    ],
    "shortDesc": "An interactive VR, simulation, or gaming experience project.",
    "fullDesc": "The Interactive 3D Physics Simulation Lab (Unity) is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, VR Headset (Oculus/Meta Quest), Motion Controllers.\n• Software & Algorithms: Powered by Unity 3D Engine, C# Scripting, Physics Engine, XR Interaction Toolkit.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: VR Headset (Oculus/Meta Quest) capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Unity 3D Engine for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// unity-3d-physics-lab-main\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "VR Headset (Oculus/Meta Quest)",
      "Motion Controllers",
      "Unity 3D Engine",
      "C# Scripting",
      "Physics Engine",
      "XR Interaction Toolkit"
    ]
  },
  {
    "id": "vibration_switch",
    "name": "Piezoelectric Shock & Motion Detection Alarm",
    "category": "robotics",
    "featured": false,
    "tags": [
      "Arduino",
      "motors",
      "embedded",
      "robotics",
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "A robotics or autonomous vehicle project with motor control and sensing.",
    "fullDesc": "The Piezoelectric Shock & Motion Detection Alarm is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, L298N Motor Driver, HC-SR04 Ultrasonic Sensor, DC Geared Motors, SG90 Servo.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: L298N Motor Driver capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// Vibration Switch\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "L298N Motor Driver",
      "HC-SR04 Ultrasonic Sensor",
      "DC Geared Motors",
      "SG90 Servo",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  },
  {
    "id": "wheelchair_esp",
    "name": "Wireless ESP32 Assistive Wheelchair Controller",
    "category": "medical",
    "featured": false,
    "tags": [
      "Arduino",
      "ESP32",
      "sensors",
      "healthcare",
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO"
    ],
    "shortDesc": "Assistive healthcare system engineered with Arduino ATmega328P Microcontroller and Embedded C / C++ for real-time monitoring and patient safety.",
    "fullDesc": "The Wireless ESP32 Assistive Wheelchair Controller is an advanced engineering project designed to address real-world challenges through integrated hardware and software development.\n\n• Hardware Architecture: Built using Arduino ATmega328P Microcontroller, Bio-Sensors, OLED Telemetry Display, Haptic Vibration Motors.\n• Software & Algorithms: Powered by Embedded C / C++, Arduino IDE / PlatformIO, FreeRTOS, SPI / I2C / UART Protocols.\n\nThe system captures continuous input data, processes signals locally or at the edge, evaluates state machine logic, and executes closed-loop actions or telemetry updates with high precision and reliability.",
    "howItWorks": [
      "Data Acquisition: Bio-Sensors capture continuous environmental or operational telemetry.",
      "Edge Processing: Arduino ATmega328P Microcontroller processes incoming signals using Embedded C / C++ for noise filtering and state evaluation.",
      "Control Execution: Microcontroller triggers physical actuators, motor drivers, or visual status displays in real-time.",
      "Telemetry & Cloud: System transmits diagnostic logs and status indicators via serial or wireless communication protocols."
    ],
    "codeSnippet": "// WheelChair ESP\n// Source code available in the project repository.",
    "techStack": [
      "Arduino ATmega328P Microcontroller",
      "Bio-Sensors",
      "OLED Telemetry Display",
      "Haptic Vibration Motors",
      "Embedded C / C++",
      "Arduino IDE / PlatformIO",
      "FreeRTOS",
      "SPI / I2C / UART Protocols"
    ]
  }
];

// ──────────────────────────────────────────────────────────
//  HELPER FUNCTIONS
// ──────────────────────────────────────────────────────────
function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id);
}

function getProjectsByCategory(catId) {
  return PROJECTS.filter(p => p.category === catId);
}

function getFeaturedProjects() {
  return PROJECTS.filter(p => p.featured);
}

function searchProjects(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PROJECTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.shortDesc.toLowerCase().includes(q) ||
    p.fullDesc.toLowerCase().includes(q) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q))) ||
    (p.techStack && p.techStack.some(t => t.toLowerCase().includes(q)))
  );
}
