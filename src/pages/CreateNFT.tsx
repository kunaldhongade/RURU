import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useContext } from "react";

import { ContractContext } from "../contexts/ContractContext";
import { Input, Button,CustomLoader, Banner } from "../components";
import CustomSnackbar,{CustomSnackbarProps,SnackbarType} from "../components/CustomSnackBar";
import { MetaMaskContext } from "../contexts/MetaMaskContext";


interface PreviewFile extends File {
  preview: string;
}

var arr;
console.log("arr", arr);

interface FormFields {
  title: string;
  price: number;
  description: string;
}

type createNftProps = {
  image: File;
  name: string;
  description: string;
  price: number;
};

const CreateNFT: React.FC = () => {

  const {account} = useContext(MetaMaskContext)
  console.log("account connected", account)
  const { handleUploadImageToIpfs } = useContext(ContractContext);
  const [snackBar, updateSnackBar] = useState<CustomSnackbarProps>({
    message: "",
    open: false,
    type:'success',
    onClose:()=>{}
  });
  const [loading,updateLoading] = useState(false)

  const handleCreateNFT = async ({
    image,
    name,
    description,
    price,
  }: createNftProps) => {
    if(!account){
      updateSnackBar({
        message:"No Wallet Detected!",
        open:true,
        type:'error',
        onClose:()=>{},
      })
      return
    }
    if(!image && !name && !price){
      updateSnackBar({
        message:"Please fill all the details!",
        open:true,
        type:'error',
        onClose:()=>{},
      })
      return

    }
    updateLoading(true)
    const res = await handleUploadImageToIpfs(image, name, description, price);
    if (res) {
      updateSnackBar({
        message: "NFT Created Successfully!",
        open: true,
        type:'success',
        onClose:()=>{}
      });
      updateLoading(false)
      updateFormFields({description:"",price:0.0,title:""})
      setImage(null)
      return;
    }
    updateSnackBar({
      message: "Something Went Wrong Please Try Again Later!",
      open: true,
      type:'error',
      onClose:()=>{}
    });
    updateLoading(false)
  };
  const handleCloseSnackBar=()=>{
    updateSnackBar({message:'',open:false,type:'success',onClose:()=>{}})
  }

  const [formFields, updateFormFields] = useState<FormFields>({
    title: "",
    price: 0.0,
    description: "",
  });

  const [image, setImage] = useState<PreviewFile | any>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    multiple: false,
    onDrop: (acceptedFiles:any) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile) {
        console.log("uploaded file", uploadedFile);
        setImage(
          Object.assign(uploadedFile, {
            preview: URL.createObjectURL(uploadedFile),
          })
        );
      }
    },
  });

  return (
    <main className=" dark:bg-zinc-900 md:p-10 p-4 bg-white w-full flex flex-col justify-center items-center mb-10">
      <CustomSnackbar {...{...snackBar,onClose:handleCloseSnackBar}}/>
      <div className="flex flex-col justify-center items-center md:w-5/5 w-full">
        <div className="flex justify-center w-full md:w-10/12">
          <Banner  title="Create NFT"/>
        </div>

        <div className="flex flex-col justify-center items-center  py-16 md:px-8 px-4 md:w-8/12 w-full rounded-md">
          <div className="w-full dark:bg-[rgb(255,253,253)] bg-gray-50 rounded-md flex justify-center">
            <div
              {...getRootProps()}
              className="upload-image w-full border-2 border-gray-500 border-dotted dark:border-white flex py-8 px-8 flex-col items-center rounded-md"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="font-semibold font-poppins dark:text-white text-black">
                  Drop the files here...
                </p>
              ) : (
                <div className="text-center ">
                  {image ? (
                    <>
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="md:w-32 md:h-32 w-28 h-28 object-cover mb-4"
                      />
                      <p className="font-semibold font-poppins dark:text-black text-black">
                        File Uploaded: {image.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold font-poppins dark:text-black text-black">
                        Upload: SVG, PNG, JPG
                      </p>
                      <AddPhotoAlternateIcon style={{ fontSize: 150 }} />
                      <p className="font-semibold font-poppins dark:text-black text-black">
                        Drag & Drop Or{" "}
                      </p>
                      <p>
                        <Link to="" className=" font-poppins underline md:font-semibold text-sm font-normal">
                          {" "}
                          Browse A File From Your Computer{" "}
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 w-full">
            <Input
              title="Title"
              inputType="text"
              handleOnChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                updateFormFields((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              placeHolder="Title"
              
            />
          
            <Input
              title="Description"
              inputType="textarea"
              handleOnChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                updateFormFields((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              placeHolder="Description ..."
            />
            <Input
              title="Price"
              inputType="price"
              handleOnChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                updateFormFields((prev) => ({
                  ...prev,
                  price: parseFloat(e.target.value),
                }));
              }}
              placeHolder="Price"
            />
            <div className="flex mt-8">
            {loading?<CustomLoader />:

              <Button
                title="Create"
                path=""
                handleOnClickOrChange={
                  async() => {
                  console.log("handling image uploadation...");
                 await handleCreateNFT({
                    image,
                    name: formFields.title,
                    description: formFields.description,
                    price: formFields.price,
                  });
                  //yea
                }}
              />
}
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </main>
  );
};

export default CreateNFT;
