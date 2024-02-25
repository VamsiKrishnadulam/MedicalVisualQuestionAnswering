// import React, { useState } from "react";
// import axios from "axios";
// import image4 from "./images/image2239.jpg";
// import image5 from "./images/image2774.jpg";
// import image6 from "./images/image609.jpg";

// const QueryHere = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [responseHistory, setResponseHistory] = useState([]);
//   const [model, setModel] = useState("");
//   const [showSamplesData, setShowSamplesData] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!selectedFile || !question) {
//       setError("Please select an image and enter a question.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("image", selectedFile);
//       formData.append("question", question);

//       let response;

//       if (model === "BLIP") {
//         response = await axios.post(
//           "http://51.20.87.205:80/api/Blip_model",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else if (model === "FusionDescriptive") {
//         response = await axios.post(
//           "http://127.0.0.1:80/api/Fusion_model_descriptive",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else if (model === "FusionOneWord") {
//         response = await axios.post(
//           "http://127.0.0.1:80/api/Fusion_model",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }

//       if (response && response.data) {
//         const newResult = response.data.answer;
//         setResult(newResult);

//         // Update response history
//         setResponseHistory((prevHistory) => [...prevHistory, newResult]);
//       } else {
//         setError("Invalid server response.");
//       }
//     } catch (error) {
//       setError("Error during upload. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOnChangeselect = (e) => {
//     setModel(e.target.value);
//   };

//   const handleClear = () => {
//     setSelectedFile(null);
//     setQuestion("");
//     setResult(null);
//     setError(null);

//     const fileInput = document.getElementById("formFile");
//     const questionInput = document.getElementById("question");

//     if (fileInput && questionInput) {
//       fileInput.value = null;
//       questionInput.value = null;
//     }
//   };

//   const showSamples = () => {
//     setShowSamplesData(true);
//   };
  
//   return (
//     <>
      
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
//       <br/>
      
//         <br/>
//         <br/>
//         <br/>
//         {!showSamplesData && (
//           <div className="container mt-5">
//             <div className="row mt-4">
//               <h1>Welcome to MED</h1>
//               <h2>Click on samples to get sample data of images and questions</h2>
              
//             </div>
//           </div>
//         )}
//         <br/>
//         <br/>
//         <br/>
         
      
//         <br/>
//         <br/>

//         <button className="btn btn-dark" onClick={showSamples}>
//         Samples
//       </button>
     
        
//       <div className="container">
//         {showSamplesData && (
//           <div className="container mt-5">
//             <div className="row mt-4">
//               <div className="col-md-4 mb-4">
//                 <div className="card">
//                   <img
//                     src={image4}
//                     className="card-img-top"
//                     alt="Sample 4"
//                     style={{ height: "200px" }}
//                     onClick={(e) => e.preventDefault()}
//                   />
//                   <div className="card-body">
//                     <p className="card-text">
//                     Does this image show traumatic aneurysm aortogram?
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4 mb-4">
//                 <div className="card">
//                   <img
//                     src={image5}
//                     className="card-img-top"
//                     alt="Sample 5"
//                     style={{ height: "200px"}}
//                     onClick={(e) => e.preventDefault()}
//                   />
//                   <div className="card-body">
//                     <p className="card-text">
//                     What is present?
//                     </p>
//                     <p></p>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4 mb-4">
//                 <div className="card">
//                   <img
//                     src={image6}
//                     className="card-img-top"
//                     alt="Sample 6"
//                     style={{ height: "200px" }}
//                     onClick={(e) => e.preventDefault()}
//                   />
//                   <div className="card-body">
//                     <p className="card-text">
//                     Is an opened peritoneal cavity cause by fibrous band strangulation present?
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div
//           className="container mt-4"
//           style={{
//             background: "linear-gradient(to right, #ff5e62, #ff9966)",
//             padding: "20px",
//             borderRadius: "15px",
//             boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//             // minHeight: "80vh",
//             position: "relative",
//           }}
//         >
//           <div className="d-flex ">
//             <div className="justify-content-end">
//               <select
//                 id="mySelect"
//                 className="form-control "
//                 onChange={handleOnChangeselect}
//                 defaultValue="Select Software"
//               >
//                 <option value="Select Software">Select Model</option>
//                 <option value="BLIP">BLIP</option>
//                 <option value="FusionOneWord">Fusion One Word</option>
//                 <option value="FusionDescriptive">Fusion Descriptive</option>
//               </select>
//             </div>
//           </div>

//           <h3 className="text-center mb-4 text-white">
//             Upload Image and Question
//           </h3>
//           <div className="row justify-content-center">
//             <form
//               className="col-md-6 border p-4 rounded bg-light"
//               style={{
//                 borderRadius: "10px",
//                 boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <div className="mb-3">
//                 <label htmlFor="formFile" className="form-label">
//                   Choose an Image
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="formFile"
//                   name="image"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               {selectedFile && (
//                 <div className="mb-3">
//                   <label className="form-label">Selected Image:</label>
//                   <img
//                     src={URL.createObjectURL(selectedFile)}
//                     alt="Selected"
//                     className="img-fluid rounded"
//                   />
//                 </div>
//               )}
//               <div className="mb-3">
//                 <label htmlFor="question" className="form-label">
//                   Ask Question
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="question"
//                   name="question"
//                   onChange={(e) => setQuestion(e.target.value)}
//                 />
//               </div>
//               <div className="row gap-4">
//                 <div className="col-md-6">
//                   <button
//                     type="button"
//                     className="btn btn-danger w-100"
//                     onClick={handleClear}
//                     style={{
//                       boxShadow: "0px 0px 5px rgba(255, 0, 0, 0.3)",
//                       background: "linear-gradient(to right, #ff6666, #ff9999)",
//                     }}
//                   >
//                     Clear
//                   </button>
//                 </div>
//                 <div className="col-md-6">
//                   <button
//                     type="button"
//                     className="btn btn-primary w-100"
//                     onClick={handleUpload}
//                     disabled={loading}
//                     style={{
//                       boxShadow: "0px 0px 5px rgba(0, 0, 255, 0.3)",
//                       background: "linear-gradient(to right, #4da1ff, #66a3ff)",
//                     }}
//                   >
//                     {loading ? "Uploading..." : "Upload"}
//                   </button>
//                 </div>
//               </div>
//               {error && <div className="text-danger mt-2">{error}</div>}
//             </form>
//           </div>
//           <hr />

//           <div className="mt-4">
//             <h4 className="text-center mb-3 text-white">Previous Responses</h4>
//             <ul>
//               {responseHistory.map((response, index) => (
//                 <li key={index} className="text-muted">
//                   {response}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {result && (
//             <div className="mt-4">
//               <h4 className="text-center mb-3 text-white">Prediction Result</h4>
//               <div className="row justify-content-center">
//                 <div className="col-md-6">
//                   <div
//                     className="card bg-light"
//                     style={{
//                       borderRadius: "10px",
//                       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     <div className="card-body">
//                       <p className="card-text">{result}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default QueryHere;




















// import React, { useState } from "react";
// import axios from "axios";
// import image4 from "./images/image2239.jpg";
// import image5 from "./images/image2774.jpg";
// import image6 from "./images/image609.jpg";

// const QueryHere = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [responseHistory, setResponseHistory] = useState([]);
//   const [model, setModel] = useState("");
//   const [showSamplesData, setShowSamplesData] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//   };


//   const handleUpload = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!selectedFile || !question) {
//       setError("Please select an image and enter a question.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("image", selectedFile);
//       formData.append("question", question);

//       let response;

//       if (model === "BLIP") {
//         response = await axios.post(
//           "http://51.20.35.47:80/api/Blip_model",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else if (model === "FusionDescriptive") {
//         response = await axios.post(
//           "http://127.0.0.1:80/api/Fusion_model_descriptive",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else if (model === "FusionOneWord") {
//         response = await axios.post(
//           "http://127.0.0.1:80/api/Fusion_model",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       }

//       if (response && response.data) {
//         const newResult = response.data.answer;
//         setResult(newResult);

//         // Update response history
//         setResponseHistory((prevHistory) => [...prevHistory, newResult]);
//       } else {
//         setError("Invalid server response.");
//       }
//     } catch (error) {
//       setError("Error during upload. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOnChangeselect = (e) => {
//     setModel(e.target.value);
//   };

//   const handleClear = () => {
//     setSelectedFile(null);
//     setQuestion("");
//     setResult(null);
//     setError(null);

//     const fileInput = document.getElementById("formFile");
//     const questionInput = document.getElementById("question");

//     if (fileInput && questionInput) {
//       fileInput.value = null;
//       questionInput.value = null;
//     }
//   };

//   const showSamples = () => {
//     setShowSamplesData(true);
//   };

//   return (
//     <>
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       <br />
//       {!showSamplesData && (
//         <div className="container mt-5">
//           <div className="row mt-4">
//             <h1>Welcome to MED</h1>
//             <h2>Click on samples to get sample data of images and questions</h2>
//           </div>
//         </div>
//       )}
//       <br />
//       <br />
//       <br />

//       <br />
//       <br />

//       <button className="btn btn-dark" onClick={showSamples}>
//         Samples
//       </button>

//       <div className="container">
//       {showSamplesData && (
//         <div className="container mt-5">
//           <style>
//             {`
//               @keyframes glow {
//                 0% {
//                   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
//                   transform: scale(1);
//                   background-color: #ffffff;
//                 }
//                 50% {
//                   box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
//                   transform: scale(1.05);
//                   background-color: #f0f0f0;
//                 }
//                 100% {
//                   box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
//                   transform: scale(1);
//                   background-color: #ffffff;
//                 }
//               }

//               // .glow-card {
//               //   animation: glow 2s infinite alternate;
//               // }

//               .glow-img {
//                 transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
//               }

//               .glow-img:hover {
//                 box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
//                 transform: scale(1.1);
//               }
//             `}
//           </style>
//           <div className="row mt-4">
//             <div className="col-md-4 mb-4">
//               <div className="card border-0 shadow-lg glow-card">
//                 <img
//                   src={image4}
//                   className="card-img-top rounded glow-img"
//                   alt="Sample 4"
//                   onClick={(e) => e.preventDefault()}
//                 />
//                 <div className="card-body">
//                   <p className="card-text">
//                     Does this image show traumatic aneurysm aortogram?
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-4">
//               <div className="card border-0 shadow-lg glow-card">
//                 <img
//                   src={image5}
//                   className="card-img-top rounded glow-img"
//                   alt="Sample 5"
//                   onClick={(e) => e.preventDefault()}
//                 />
//                 <div className="card-body">
//                   <p className="card-text">What is present?</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 mb-4">
//               <div className="card border-0 shadow-lg glow-card">
//                 <img
//                   src={image6}
//                   className="card-img-top rounded glow-img"
//                   alt="Sample 6"
//                   onClick={(e) => e.preventDefault()}
//                 />
//                 <div className="card-body">
//                   <p className="card-text">
//                     Is an opened peritoneal cavity cause by fibrous band strangulation present?
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//         <div
//           className="container mt-4"
//           style={{
//             background: "linear-gradient(to right, #ff5e62, #ff9966)",
//             padding: "20px",
//             borderRadius: "15px",
//             boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//             position: "relative",
//           }}
//         >
//           <div className="d-flex ">
//             <div className="justify-content-end">
//               <select
//                 id="mySelect"
//                 className="form-control "
//                 onChange={handleOnChangeselect}
//                 defaultValue="Select Software"
//               >
//                 <option value="Select Software">Select Model</option>
//                 <option value="BLIP">BLIP</option>
//                 <option value="FusionOneWord">Fusion One Word</option>
//                 <option value="FusionDescriptive">Fusion Descriptive</option>
//               </select>
//             </div>
//           </div>

//           <h3 className="text-center mb-4 text-white">
//             Upload Image and Question
//           </h3>
//           <div className="row justify-content-center">
//             <form
//               className="col-md-6 border p-4 rounded bg-light"
//               style={{
//                 borderRadius: "10px",
//                 boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//               }}
//             >
//               <div className="mb-3">
//                 <label htmlFor="formFile" className="form-label">
//                   Choose an Image
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="formFile"
//                   name="image"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               {selectedFile && (
//                 <div className="mb-3">
//                   <label className="form-label">Selected Image:</label>
//                   <img
//                     src={URL.createObjectURL(selectedFile)}
//                     alt="Selected"
//                     className="img-fluid rounded"
//                   />
//                 </div>
//               )}
//               <div className="mb-3">
//                 <label htmlFor="question" className="form-label">
//                   Ask Question
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="question"
//                   name="question"
//                   onChange={(e) => setQuestion(e.target.value)}
//                 />
//               </div>
//               <div className="row gap-4">
//                 <div className="col-md-6">
//                   <button
//                     type="button"
//                     className="btn btn-danger w-100"
//                     onClick={handleClear}
//                     style={{
//                       boxShadow: "0px 0px 5px rgba(255, 0, 0, 0.3)",
//                       background: "linear-gradient(to right, #ff6666, #ff9999)",
//                     }}
//                   >
//                     Clear
//                   </button>
//                 </div>
//                 <div className="col-md-6">
//                   <button
//                     type="button"
//                     className="btn btn-primary w-100"
//                     onClick={handleUpload}
//                     disabled={loading}
//                     style={{
//                       boxShadow: "0px 0px 5px rgba(0, 0, 255, 0.3)",
//                       background: "linear-gradient(to right, #4da1ff, #66a3ff)",
//                     }}
//                   >
//                     {loading ? "Uploading..." : "Upload"}
//                   </button>
//                 </div>
//               </div>
//               {error && <div className="text-danger mt-2">{error}</div>}
//             </form>
//           </div>
//           <hr />

//           <div className="mt-4">
//             <h4 className="text-center mb-3 text-white">Previous Responses</h4>
//             <ul>
//               {responseHistory.map((response, index) => (
//                 <li key={index} className="text-muted">
//                   {response}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {result && (
//             <div className="mt-4">
//               <h4 className="text-center mb-3 text-white">Prediction Result</h4>
//               <div className="row justify-content-center">
//                 <div className="col-md-6">
//                   <div
//                     className="card bg-light"
//                     style={{
//                       borderRadius: "10px",
//                       boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
//                     }}
//                   >
//                     <div className="card-body">
//                       <p className="card-text">{result}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default QueryHere;






















import React, { useState } from "react";
import axios from "axios";
import image4 from "./images/image656.jpg";
import image5 from "./images/image2774.jpg";
import image6 from "./images/image609.jpg";

const QueryHere = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseHistory, setResponseHistory] = useState([]);
  const [model, setModel] = useState("");
  const [showSamplesData, setShowSamplesData] = useState(false);

  // const handleCopyClick = (text) => {
  //   navigator.clipboard.writeText(text);
  //   alert('Copied to clipboard!');
  // };

  const handleImageClick = async(e) => {
    const response = await axios.get(e.target.src, { responseType: 'blob' });
    const file = new File([response.data], "sample_image.jpg", { type: response.headers['content-type'] })
    e.preventDefault();
    setSelectedFile(file);
    // const fileInput = e.target.nextElementSibling;
    // fileInput.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);
  };

  const cardData = [
    {
      image: image4,
      text: 'Does this image show cat scan hemorrhage in putamen area?',
    },
    {
      image: image5,
      text: 'What is present?',
    },
    {
      image: image6,
      text: 'Is an opened peritoneal cavity cause by fibrous band strangulation present?',
    },
    // Add more card data as needed
  ];
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedFile || !question) {
      setError("Please select an image and enter a question.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("question", question);

      let response;

      if (model === "BLIP") {
        response = await axios.post(
          // "http://16.171.60.140:80/api/Blip_model",
          "http://51.20.94.206/api/Blip_model",
         
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else if (model === "FusionDescriptive") {
        response = await axios.post(
          "http://127.0.0.1:80/api/Fusion_model_descriptive",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else if (model === "FusionOneWord") {
        response = await axios.post(
          "http://127.0.0.1:80/api/Fusion_model",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response && response.data) {
        const newResult = response.data.answer;
        setResult(newResult);

        // Update response history
        setResponseHistory((prevHistory) => [...prevHistory, newResult]);
      } else {
        setError("Invalid server response.");
      }
    } catch (error) {
      setError("Error during upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnChangeselect = (e) => {
    setModel(e.target.value);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setQuestion("");
    setResult(null);
    setError(null);

    const fileInput = document.getElementById("formFile");
    const questionInput = document.getElementById("question");

    if (fileInput && questionInput) {
      fileInput.value = null;
      questionInput.value = null;
    }
  };

  const showSamples = () => {
    setShowSamplesData(true);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {!showSamplesData && (
        <div className="container mt-5">
          <div className="row mt-4">
            <h1>Welcome to MED-VQA</h1>
            <h2>Click on samples to get sample data of images and questions</h2>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />

      <br />
      <br />

      <button className="btn btn-dark" onClick={showSamples}>
        Samples
      </button>
        

      {showSamplesData && (
        <div className="container mt-5">
          <style>
            {`
              @keyframes glow {
                0% {
                  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                  transform: scale(1);
                  background-color: #ffffff;
                }
                50% {
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                  transform: scale(1.05);
                  background-color: #f0f0f0;
                }
                100% {
                  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                  transform: scale(1);
                  background-color: #ffffff;
                }
              }

              .glow-card {
                // animation: glow 2s infinite alternate;
                height: 200px; /* Fixing height to 200px */
              }

              .glow-img {
                transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
              }

              .glow-img:hover {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
                transform: scale(1.1);
              }

              .copy-btn {
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 10px;
              }

              .file-input {
                display: none;
              }
            `}
          </style>
          <div className="row mt-4">
            {cardData.map((card, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card border-0 shadow-lg glow-card">
                  <img
                    src={card.image}
                    className="card-img-top rounded glow-img"
                    alt={`Sample ${index + 4}`}
                    onClick={(e) => handleImageClick(e)}
                  />
                  <div className="card-body">
                    <p className="card-text">{card.text}</p>
                    {/* <button
                      className="copy-btn"
                      onClick={() => handleCopyClick(card.text)}
                    >
                      <img src="path-to-copy-symbol.png" alt="Copy" />
                    </button> */}
                  </div>
                  <input
                    type="file"
                    className="file-input"
                    onChange={(e) => handleFileInputChange(e)}
                  />
                </div>
              </div>
            ))}
          </div>
          <br />
      <br />
      <br />
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br /> */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
        </div>
      )}
      
        <div
          className="container mt-4"
          style={{
            background: "linear-gradient(to right, #ff5e62, #ff9966)",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <div className="d-flex ">
            <div className="justify-content-end">
              <select
                id="mySelect"
                className="form-control "
                onChange={handleOnChangeselect}
                defaultValue="Select Software"
              >
                <option value="Select Software">Select Model</option>
                <option value="BLIP">BLIP</option>
                <option value="FusionOneWord">Fusion One Word</option>
                <option value="FusionDescriptive">Fusion Descriptive</option>
              </select>
            </div>
          </div>

          <h3 className="text-center mb-4 text-white">
            Upload Image and Question
          </h3>
          <div className="row justify-content-center">
            <form
              className="col-md-6 border p-4 rounded bg-light"
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Choose an Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="formFile"
                  name="image"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <div className="mb-3">
                  <label className="form-label">Selected Image:</label>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected"
                    className="img-fluid rounded"
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="question" className="form-label">
                  Ask Question
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="question"
                  name="question"
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="row gap-4">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={handleClear}
                    style={{
                      boxShadow: "0px 0px 5px rgba(255, 0, 0, 0.3)",
                      background: "linear-gradient(to right, #ff6666, #ff9999)",
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleUpload}
                    disabled={loading}
                    style={{
                      boxShadow: "0px 0px 5px rgba(0, 0, 255, 0.3)",
                      background: "linear-gradient(to right, #4da1ff, #66a3ff)",
                    }}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
              {error && <div className="text-danger mt-2">{error}</div>}
            </form>
          </div>
          <hr />
          <div className="mt-4">
            <h4 className="text-center mb-3 text-white">Previous Responses</h4>
            <ul>
              {responseHistory.map((response, index) => (
                <li key={index} className="text-muted">
                  {response}
                </li>
              ))}
            </ul>
          </div>
          
              

          {result && (
            <div className="mt-4">
              <h4 className="text-center mb-3 text-white">Prediction Result</h4>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div
                    className="card bg-light"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="card-body">
                      <p className="card-text">{result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      
    </>
  );
};

export default QueryHere;
