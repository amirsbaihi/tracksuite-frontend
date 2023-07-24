"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { Dropzone, FileMosaic, ExtFile } from "@files-ui/react";
import { SetStateAction } from "jotai";

const defaultFields = [
  "title",
  "category",
  "brand",
  "description",
  "optionName1",
  "optionName2",
  "quantity",
  "media",
  "optionValue1",
  "optionValue2",
  "price",
];

const mutation = gql`
  mutation AddProduct($newProductData: NewProductInput!) {
    addProduct(newProductData: $newProductData) {
      id
      title
      category
      brand
      description
      optionNames
      variants {
        quantity
        media
        optionValues
        price
      }
    }
  }
`;

export default function AddProductForm() {
  const [submit, setSubmit] = useState(false);
  const [fileUrls, setFileUrls] :[fileUrls:string[] , setFileUrls:Function ] = useState([]);
  const [section, setSection] = useState("upload");
  const { data: session, status } = useSession();

  const [fields, setFields]:[fields:string[] , setFields:Function ] = useState([]);
  const [associations, setAssociations]:[associations:{[index:string]:string}, setAssociations:Function ] = useState({});

  function handleAssociationChange(event: SelectChangeEvent) {
    const originalField = event.target.name as string;
    const targetField = event.target.value as string;
    setAssociations({ ...associations, [originalField]: targetField });
  }

  function UploadSection() {
    const [extFiles, setExtFiles ]:[extFiles:ExtFile[] , setExtFiles:Function ] = useState([]);
    const updateFiles = (incommingFiles:ExtFile[]) => {
      console.log("incomming files", incommingFiles);
      setExtFiles(incommingFiles);
    };
    const handleStart = (filesToUpload:ExtFile[]) => {
      console.log("start upload", filesToUpload);
    };
    const onDelete = (id:string|number|undefined) => {
      setExtFiles(extFiles.filter((x) => x.id !== id));
    };

    const handleFinish = (uploadedFiles:ExtFile[]) => {
      console.log(uploadedFiles);
      setFileUrls(uploadedFiles.map((f) => f.serverResponse?.payload.url));
      addFields(uploadedFiles.map((f) => f.serverResponse?.payload.fields));
    };
    const handleAbort = (id:string|number|undefined) => {
      setExtFiles(
        extFiles.map((ef) => {
          if (ef.id === id) {
            return { ...ef, uploadStatus: "aborted" };
          } else return { ...ef };
        })
      );
    };
    const handleCancel = (id:string|number|undefined) => {
      setExtFiles(
        extFiles.map((ef) => {
          if (ef.id === id) {
            return { ...ef, uploadStatus: undefined };
          } else return { ...ef };
        })
      );
    };
    return (
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1 },
          margin: 5,
        }}
      >
        <Dropzone
          onChange={updateFiles}
          minHeight="195px"
          value={extFiles}
          accept="text/csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json, application/vnd.oasis.opendocument.spreadsheet"
          maxFiles={10}
          maxFileSize={20 * 1024 * 1024}
          label="Trascina qui i file o clicca per sfogliare"
          uploadConfig={{
            // autoUpload: true
            url: "/backend/import/file",
            cleanOnUpload: true,
            headers: {
              Authorization: "Bearer " + session?.user.access_token,
            },
          }}
          onUploadStart={handleStart}
          onUploadFinish={handleFinish}
          actionButtons={{
            position: "after",
            abortButton: {},
            deleteButton: {},
            uploadButton: {},
          }}
        >
          {extFiles.map((file) => (
            <FileMosaic
              {...file}
              key={file.id}
              onDelete={onDelete}
              onAbort={handleAbort}
              onCancel={handleCancel}
              resultOnTooltip
              alwaysActive
              preview
              info
            />
          ))}
        </Dropzone>
      </Box>
    );
  }

  function FieldAssociation() {
    return (
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1 },
          margin: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          {defaultFields.map((df, i) => (
            <FormControl sx={{ width: "30%", margin: 5 }} key={i}>
              <InputLabel id={df + "-label"}>{df}</InputLabel>
              <Select
                labelId={df + "-label"}
                id={df + "-id"}
                name={df}
                label={df}
                onChange={handleAssociationChange}
                value={associations[df]}
              >
                {fields.map((f, i) => (
                  <MenuItem value={f} key={i}>{f}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </div>

        <Button
          variant="contained"
          sx={{ alignSelf: "center" }}
          onClick={() => setSubmit(!submit)}
        >
          Associa
        </Button>
      </Box>
    );
  }

  const addFields = (fields: String[][]) => {
    const testFields : String[]= fields[0];
    if (fields.every((fs) => fs.every((f) => testFields.includes(f)))) {
      setFields(testFields);
      setSection("fieldAssociation");
    } else {
      console.log("ERROR:all fields must be equal");
    }
  };

  //addProduct({ variables: { newProductData:{} } })
  switch (section) {
    case "upload":
      return (
        <>
          <Typography variant="h3" sx={{ margin: 5 }}>
            1. Importa il file
          </Typography>
          <UploadSection />
        </>
      );
    case "fieldAssociation":
      return (
        <>
          <Typography variant="h3" sx={{ margin: 5 }}>
            2. Associa i campi
          </Typography>
          <FieldAssociation />
        </>
      );
    case "summary":
      return <></>;
  }
  return <UploadSection />;
}
