# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # from PIL import Image
# # from transformers import pipeline

# # app = Flask(__name__)
# # CORS(app)  # Enable CORS for all routes

# # # # Load the VQA model and processor
# # # with open("vqa_model.pkl", "rb") as model_file:
# # #     loaded_model_data = pickle.load(model_file)

# # # loaded_model = loaded_model_data["model"]
# # # loaded_processor = loaded_model_data["processor"]
# # # print(loaded_processor)

# # # Use a lock to synchronize access to the critical section
# # # lock = threading.Lock()

# # # Set up the VQA pipeline
# # vqa_pipeline = pipeline(task="visual-question-answering", model="vamsidulam/graphcorevqa_03")

# # @app.route("/answer", methods=["POST"])
# # def VQAInference():
# #     try:
# #         image_file = request.files["image"]
# #         question = request.form["question"]

# #         image = Image.open(image_file)

# #         # Use the VQA pipeline for processing
# #         result = vqa_pipeline(image, question=question)
# #         print(result)
# #         # Access result['answer'] for the final answer
# #         answer = result

# #         return jsonify({"answer": answer})

# #     except Exception as e:
# #         return jsonify({"error": str(e)})

# # if __name__ == "__main__":
# #     app.run(debug=True)

#------------------------------------------------------------------------------------------------------------------
#BLIP MODEL


from flask import Flask,request,jsonify
import torch
import pickle
from PIL import Image
import os,io
from flask_cors import CORS
import json 
from transformers import BlipForQuestionAnswering, BlipProcessor, BlipImageProcessor
from PIL import Image
import numpy as np

app = Flask(__name__)

CORS(app)


@app.route("/api/Blip_model",methods=["POST"])
def Blip_generate_answer():
        
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    text_processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
    image_processor = BlipImageProcessor.from_pretrained("Salesforce/blip-vqa-base")

    model = torch.load("C:\\Users\\HI\\Downloads\\BLIP_Finetuned.pkl",map_location=device)
    # model = torch.load("BLIP_ORIGINAL_221.18615627288818.pkl",map_location=device)

    question = request.form.get("question")
    file = request.files.get("image")
    print(file)
    if file is not None:
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
    else:
        return jsonify({"error": "No file received"})
    
    image_encoding = image_processor(image, do_resize=True, size=(128, 128), return_tensors="pt")
    
    # Tokenize and preprocess the question
    encoding = text_processor(
        None,
        question,
        padding="max_length",
        truncation=True,
        max_length=32,
        return_tensors="pt"
    )
    encoding["pixel_values"] = image_encoding["pixel_values"].to(device)
    
    # Forward pass to generate answer
    with torch.no_grad():
        outputs = model.generate(input_ids=encoding['input_ids'], pixel_values=image_encoding['pixel_values'].to(device))
    
    # Decode the predicted answer
    predicted_answer = text_processor.decode(outputs[0], skip_special_tokens=True)
    res = {"answer":predicted_answer}
    return jsonify(res)

# if __name__ == "__main__":
#     # app.run(debug=True)
#     port = 80
#     print(f"Starting the app on port {port}")
#     app.run(debug=True, host='0.0.0.0',port=port)


#------------------------------------------------------------------------------------------------



# # from flask import Flask,request,jsonify
# # import torch
# # import pickle
# # from PIL import Image
# # import os,io
# # from flask_cors import CORS
# # import json 
# # from transformers import BlipForQuestionAnswering, BlipProcessor, BlipImageProcessor
# # from PIL import Image
# # import numpy as np

# # app = Flask(__name__)

# # CORS(app)


# # device = torch.device("cuda" if torch.cuda.is_available() else "cpu")




# # model = torch.load("C:\\Users\\HI\\Downloads\\FusionModel.pkl",map_location=device)
# # # model = torch.load("BLIP_ORIGINAL_221.18615627288818.pkl",map_location=device)


# # @app.route("/api/Blip_model",methods=["POST"])
# # def Blip_generate_answer():
# #     question = request.form.get("question")
# #     file = request.files.get("image")

# #     if file is not None:
# #         image = Image.open(io.BytesIO(file.read())).convert("RGB")
# #     # Rest of your code...
# #     else:
# #         return jsonify({"error": "No file received"})

    
# #     # Forward pass to generate answer
# #     predicted_answer="vamsi"
# #     res = {"answer":predicted_answer}
# #     return jsonify(res)

# # if __name__ == "__main__":
# #     # app.run(debug=True)
# #     port = 80
# #     print(f"Starting the app on port {port}")
# #     app.run(debug=True, host='0.0.0.0',port=port)























from flask import Flask,request,jsonify
import torch
import pickle
from PIL import Image
import os,io
from flask_cors import CORS
import json 
from PIL import Image
import numpy as np
from copy import deepcopy
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple
import torch.nn as nn
import nltk 

from transformers import (
    # Preprocessing / Common
    AutoTokenizer, AutoFeatureExtractor,
    # Text & Image Models (Now, image transformers like ViTModel, DeiTModel, BEiT can also be loaded using AutoModel)
    AutoModel
)

from nltk.corpus import wordnet
# from sklearn.metrics import accuracy_score, f1_score


app = Flask(__name__)

CORS(app)

if(torch.cuda.is_available()):
    device = torch.device("cuda")
else:
    device = torch.device("cpu")


with open("unique_answers.txt") as f:
    YNSanswer_space = f.read().splitlines()





with open("unique_answers_descriptive.txt") as f:
    YNSanswer_space_Desc = f.read().splitlines()





@dataclass
class MultimodalCollator:
    tokenizer: AutoTokenizer
    preprocessor: AutoFeatureExtractor

    def tokenize_text(self, texts: List[str]):
        encoded_text = self.tokenizer(
            text=texts,
            padding='longest',
            max_length=24,
            truncation=True,
            return_tensors='pt',
            return_token_type_ids=True,
            return_attention_mask=True,
        )
        return {
            "input_ids": encoded_text['input_ids'].squeeze(),
            "token_type_ids": encoded_text['token_type_ids'].squeeze(),
            "attention_mask": encoded_text['attention_mask'].squeeze(),
        }

    def preprocess_images(self, images: List[str]):
        processed_images = self.preprocessor(
            images=images,
            return_tensors="pt",
        )
        return {
            "pixel_values": processed_images['pixel_values'].squeeze(),
        }

    def __call__(self, raw_batch_dict):
        return {
            **self.tokenize_text(
                raw_batch_dict['question']
                if isinstance(raw_batch_dict, dict) else
                [i['question'] for i in raw_batch_dict]
            ),
            **self.preprocess_images(
                raw_batch_dict['image']
                if isinstance(raw_batch_dict, dict) else
                [i['image'] for i in raw_batch_dict]
            )
        }
    
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
preprocessor = AutoFeatureExtractor.from_pretrained("google/vit-base-patch16-224-in21k")
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


#--------------------------------------------------------------------------------------------------------------------------
#one word

# class MultimodalVQAModel(nn.Module):
#     def __init__(
#             self,
#             num_labels: int = len(YNSanswer_space),
#             intermediate_dim: int = 512,
#             pretrained_text_name: str = 'bert-base-uncased',
#             pretrained_image_name: str = 'google/vit-base-patch16-224-in21k'):

#         super(MultimodalVQAModel, self).__init__()
#         self.num_labels = num_labels
#         self.pretrained_text_name = pretrained_text_name
#         self.pretrained_image_name = pretrained_image_name

#         self.text_encoder = AutoModel.from_pretrained(
#             self.pretrained_text_name,
#         )
#         self.image_encoder = AutoModel.from_pretrained(
#             self.pretrained_image_name,
#         )
#         self.fusion = nn.Sequential(
#             nn.Linear(self.text_encoder.config.hidden_size + self.image_encoder.config.hidden_size, intermediate_dim),
#             nn.ReLU(),
#             nn.Dropout(0.5),
#         )

#         self.classifier = nn.Linear(intermediate_dim, self.num_labels)

#         self.criterion = nn.CrossEntropyLoss()

#     def forward(
#             self,
#             input_ids: torch.LongTensor,
#             pixel_values: torch.FloatTensor,
#             attention_mask: Optional[torch.LongTensor] = None,
#             token_type_ids: Optional[torch.LongTensor] = None,
#             labels: Optional[torch.LongTensor] = None):

#         encoded_text = self.text_encoder(
#             input_ids=input_ids,
#             attention_mask=attention_mask,
#             token_type_ids=token_type_ids,
#             return_dict=True,
#         )
#         encoded_image = self.image_encoder(
#             pixel_values=pixel_values,
#             return_dict=True,
#         )
#         fused_output = self.fusion(
#             torch.cat(
#                 [
#                     encoded_text['pooler_output'],
#                     encoded_image['pooler_output'],
#                 ],
#                 dim=1
#             )
#         )
#         logits = self.classifier(fused_output)

#         out = {
#             "logits": logits
#         }
#         if labels is not None:
#             loss = self.criterion(logits, labels)
#             out["loss"] = loss

#         return out
    

num_labels=0


#--------------------------------------------------------------------------------------------------
# Descriptive model 


class MultimodalVQAModel(nn.Module):
    def __init__(
            self,
            num_labels: int = num_labels,
            # num_labels: int = len(YNSanswer_space_Desc),
            intermediate_dim: int = 512,
            pretrained_text_name: str = 'bert-base-uncased',
            pretrained_image_name: str = 'google/vit-base-patch16-224-in21k'):

        super(MultimodalVQAModel, self).__init__()
        self.num_labels = num_labels
        self.pretrained_text_name = pretrained_text_name
        self.pretrained_image_name = pretrained_image_name

        self.text_encoder = AutoModel.from_pretrained(
            self.pretrained_text_name,
        )
        self.image_encoder = AutoModel.from_pretrained(
            self.pretrained_image_name,
        )
        self.fusion = nn.Sequential(
            nn.Linear(self.text_encoder.config.hidden_size + self.image_encoder.config.hidden_size, intermediate_dim),
            nn.ReLU(),
            nn.Dropout(0.5),
        )

        self.classifier = nn.Linear(intermediate_dim, self.num_labels)

        self.criterion = nn.CrossEntropyLoss()

    def forward(
            self,
            input_ids: torch.LongTensor,
            pixel_values: torch.FloatTensor,
            attention_mask: Optional[torch.LongTensor] = None,
            token_type_ids: Optional[torch.LongTensor] = None,
            labels: Optional[torch.LongTensor] = None):

        encoded_text = self.text_encoder(
            input_ids=input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            return_dict=True,
        )
        encoded_image = self.image_encoder(
            pixel_values=pixel_values,
            return_dict=True,
        )
        fused_output = self.fusion(
            torch.cat(
                [
                    encoded_text['pooler_output'],
                    encoded_image['pooler_output'],
                ],
                dim=1
            )
        )
        logits = self.classifier(fused_output)

        out = {
            "logits": logits
        }
        if labels is not None:
            loss = self.criterion(logits, labels)
            out["loss"] = loss

        return out
    
with open("FusionModelOneWord.pkl","rb") as file:
    Fusion_model = pickle.load(file)
Fusion_model.to(device)
    
with open("FusionModelOneWord.pkl","rb") as file:
    Fusion_model_descriptive = pickle.load(file)
Fusion_model_descriptive.to(device)

collator = MultimodalCollator(
    tokenizer=tokenizer,
    preprocessor=preprocessor,
) 

@app.route("/api/Fusion_model",methods=["POST"])
def Fusion_One_Word_answer():
    global num_labels
    num_labels=len(YNSanswer_space)
    question = request.form.get("question")
    file = request.files.get("image")
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    Processed = collator([{"question":question,"image":image}])

    input_ids = torch.tensor(Processed["input_ids"].to(device)).unsqueeze(0)
    token_type_ids = torch.tensor(Processed["token_type_ids"].to(device)).unsqueeze(0)
    attention_mask = torch.tensor(Processed["attention_mask"].to(device)).unsqueeze(0)
    pixel_values = torch.tensor(Processed["pixel_values"].to(device)).unsqueeze(0)
    loaded_output = Fusion_model(input_ids, pixel_values, attention_mask,token_type_ids)

    loaded_preds = loaded_output["logits"].argmax(axis=-1).cpu().numpy()
    res = {"answer":YNSanswer_space[loaded_preds[0]]}
    return jsonify(res)





@app.route("/api/Fusion_model_descriptive",methods=["POST"])
def Fusion_discripive_answer():
    global num_labels
    num_labels=len(YNSanswer_space_Desc)
    question = request.form.get("question")
    file = request.files.get("image")
    image = Image.open(io.BytesIO(file.read())).convert("RGB")
    Processed = collator([{"question":question,"image":image}])

    input_ids = torch.tensor(Processed["input_ids"].to(device)).unsqueeze(0)
    token_type_ids = torch.tensor(Processed["token_type_ids"].to(device)).unsqueeze(0)
    attention_mask = torch.tensor(Processed["attention_mask"].to(device)).unsqueeze(0)
    pixel_values = torch.tensor(Processed["pixel_values"].to(device)).unsqueeze(0)
    loaded_output = Fusion_model_descriptive(input_ids, pixel_values, attention_mask,token_type_ids)

    loaded_preds = loaded_output["logits"].argmax(axis=-1).cpu().numpy()
    res = {"answer":YNSanswer_space_Desc[loaded_preds[0]]}
    return jsonify(res)




















if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0',port=80)